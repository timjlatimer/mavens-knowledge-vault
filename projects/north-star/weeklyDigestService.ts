import { execSync } from "child_process";
import { getDb } from "./db";
import { users, respondents, responses, weeklyDigests } from "../drizzle/schema";
import { eq, and, sql, lt } from "drizzle-orm";

/**
 * Send weekly digest email to a user
 */
async function sendWeeklyDigestEmail(
  userEmail: string,
  userName: string,
  questionsAnswered: number,
  totalQuestions: number,
  progressPercentage: number
): Promise<boolean> {
  const subject = `Your Destiny Discovered Journey - ${questionsAnswered} of ${totalQuestions} Questions Completed`;
  
  const body = `
Hi ${userName},

We wanted to check in on your Destiny Discovered journey! 

**Your Progress:**
- Questions Answered: ${questionsAnswered} of ${totalQuestions}
- Progress: ${progressPercentage}% Complete
- Questions Remaining: ${totalQuestions - questionsAnswered}

**Why Continue?**

Deep self-reflection takes time, and every question you answer brings you closer to understanding your North Star - the values, beliefs, and purpose that guide your life. Your insights are valuable, and we're here to support your journey.

**What's Next?**

Take a moment this week to continue your reflection. Even answering one or two more questions can reveal new insights about yourself.

[Continue Your Journey →]

Remember: There's no rush. Many people complete this questionnaire over several weeks, taking time to truly reflect on each question.

**Need Help?**

If you have any questions or need support, we're here for you.

With encouragement,
The Destiny Discovered Team

---
*You're receiving this because you started the Destiny Discovered questionnaire. These weekly check-ins help you stay connected to your reflection journey.*
`.trim();

  try {
    const input = JSON.stringify({
      messages: [{
        to: [userEmail],
        subject,
        body
      }]
    });

    const result = execSync(
      `manus-mcp-cli tool call gmail_send_messages --server gmail --input '${input.replace(/'/g, "'\\''")}'`,
      { encoding: "utf-8", maxBuffer: 10 * 1024 * 1024 }
    );

    console.log(`[WeeklyDigest] Email sent to ${userEmail}:`, result);
    return true;
  } catch (error) {
    console.error(`[WeeklyDigest] Failed to send email to ${userEmail}:`, error);
    return false;
  }
}

/**
 * Get users who need weekly digest
 * - Have started but not completed the questionnaire
 * - Haven't received a digest in the past 7 days
 * - Have an email address
 */
async function getUsersNeedingDigest() {
  const db = await getDb();
  if (!db) {
    console.warn("[WeeklyDigest] Database not available");
    return [];
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  try {
    // Get all users with respondents who haven't completed
    const usersWithProgress = await db
      .select({
        userId: users.id,
        userEmail: users.email,
        userName: users.name,
        respondentId: respondents.id,
        isComplete: respondents.isComplete,
        lastDigestSent: sql<Date | null>`(
          SELECT MAX(sentAt) 
          FROM weeklyDigests 
          WHERE userId = ${users.id}
        )`.as('lastDigestSent')
      })
      .from(users)
      .innerJoin(respondents, eq(respondents.userId, users.id))
      .where(
        and(
          eq(respondents.isComplete, false),
          sql`${users.email} IS NOT NULL`
        )
      );

    // Filter users who haven't received digest in past 7 days
    const usersNeedingDigest = usersWithProgress.filter(user => {
      if (!user.lastDigestSent) return true; // Never received digest
      return new Date(user.lastDigestSent) < sevenDaysAgo;
    });

    return usersNeedingDigest;
  } catch (error) {
    console.error("[WeeklyDigest] Error getting users:", error);
    return [];
  }
}

/**
 * Calculate user progress
 */
async function calculateUserProgress(respondentId: number) {
  const db = await getDb();
  if (!db) return { questionsAnswered: 0, progressPercentage: 0 };

  try {
    const result = await db
      .select({
        count: sql<number>`COUNT(DISTINCT ${responses.questionNumber})`
      })
      .from(responses)
      .where(eq(responses.respondentId, respondentId));

    const questionsAnswered = result[0]?.count || 0;
    const totalQuestions = 30;
    const progressPercentage = Math.round((questionsAnswered / totalQuestions) * 100);

    return { questionsAnswered, progressPercentage };
  } catch (error) {
    console.error("[WeeklyDigest] Error calculating progress:", error);
    return { questionsAnswered: 0, progressPercentage: 0 };
  }
}

/**
 * Record that digest was sent
 */
async function recordDigestSent(
  userId: number,
  questionsAnswered: number,
  progressPercentage: number
) {
  const db = await getDb();
  if (!db) return;

  try {
    await db.insert(weeklyDigests).values({
      userId,
      questionsAnswered,
      progressPercentage,
      sentAt: new Date()
    });
  } catch (error) {
    console.error("[WeeklyDigest] Error recording digest:", error);
  }
}

/**
 * Main function to send weekly digests
 */
export async function sendWeeklyDigests() {
  console.log("[WeeklyDigest] Starting weekly digest job...");

  const usersNeedingDigest = await getUsersNeedingDigest();
  console.log(`[WeeklyDigest] Found ${usersNeedingDigest.length} users needing digest`);

  let sentCount = 0;
  let failedCount = 0;

  for (const user of usersNeedingDigest) {
    if (!user.userEmail) continue;

    const { questionsAnswered, progressPercentage } = await calculateUserProgress(user.respondentId);

    // Skip if they haven't answered any questions yet
    if (questionsAnswered === 0) continue;

    const success = await sendWeeklyDigestEmail(
      user.userEmail,
      user.userName || "there",
      questionsAnswered,
      30,
      progressPercentage
    );

    if (success) {
      await recordDigestSent(user.userId, questionsAnswered, progressPercentage);
      sentCount++;
    } else {
      failedCount++;
    }

    // Small delay between emails to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`[WeeklyDigest] Digest job complete. Sent: ${sentCount}, Failed: ${failedCount}`);
  return { sent: sentCount, failed: failedCount };
}

/**
 * Start weekly digest service (runs once per week)
 */
export function startWeeklyDigestService() {
  console.log("[WeeklyDigest] Starting weekly digest service...");

  // Run immediately on startup (for testing)
  // Comment this out in production
  // sendWeeklyDigests();

  // Run every week (7 days = 604800000 milliseconds)
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  
  setInterval(() => {
    sendWeeklyDigests();
  }, oneWeek);

  console.log("[WeeklyDigest] Service started. Will run weekly.");
}
