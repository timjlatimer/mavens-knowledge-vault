import { eq, desc, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  respondents, InsertRespondent, Respondent,
  surveyResponses, InsertSurveyResponse, SurveyResponse,
  themes, InsertTheme, Theme,
  insights, InsertInsight, Insight,
  votes, InsertVote, Vote,
  comments, InsertComment, Comment,
  storySubmissions, InsertStorySubmission, StorySubmission,
  answerGrades, InsertAnswerGrade, AnswerGrade,
  judgeEligibility, InsertJudgeEligibility, JudgeEligibility
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ===== USER QUERIES =====
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsersForNotification() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(users).where(eq(users.notifyOnNewEntry, true));
  return result;
}

// ===== RESPONDENT QUERIES =====
export async function createRespondent(data: InsertRespondent): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(respondents).values(data);
  return Number(result[0].insertId);
}

export async function getAllRespondents(): Promise<Respondent[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(respondents).orderBy(respondents.name);
}

export async function getRespondentById(id: number): Promise<Respondent | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(respondents).where(eq(respondents.id, id)).limit(1);
  return result[0];
}

// ===== SURVEY RESPONSE QUERIES =====
export async function createSurveyResponse(data: InsertSurveyResponse): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(surveyResponses).values(data);
  return Number(result[0].insertId);
}

export async function getSurveyResponsesByRespondent(respondentId: number): Promise<SurveyResponse[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(surveyResponses)
    .where(eq(surveyResponses.respondentId, respondentId))
    .orderBy(surveyResponses.questionNumber);
}

// ===== THEME QUERIES =====
export async function createTheme(data: InsertTheme): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(themes).values(data);
  return Number(result[0].insertId);
}

export async function getAllThemes(): Promise<Theme[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(themes).orderBy(themes.displayOrder);
}

export async function getThemeByName(name: string): Promise<Theme | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(themes).where(eq(themes.name, name)).limit(1);
  return result[0];
}

export async function getOrCreateTheme(name: string, description?: string): Promise<number> {
  const existing = await getThemeByName(name);
  if (existing) return existing.id;
  return await createTheme({ name, description });
}

// ===== INSIGHT QUERIES =====
export async function createInsight(data: InsertInsight): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(insights).values(data);
  return Number(result[0].insertId);
}

export async function getInsightsByTheme(themeId: number): Promise<(Insight & { respondentName: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: insights.id,
    themeId: insights.themeId,
    respondentId: insights.respondentId,
    title: insights.title,
    description: insights.description,
    guardianBehavior: insights.guardianBehavior,
    scriptIdea: insights.scriptIdea,
    upvotes: insights.upvotes,
    downvotes: insights.downvotes,
    createdAt: insights.createdAt,
    updatedAt: insights.updatedAt,
    respondentName: respondents.name,
  })
    .from(insights)
    .innerJoin(respondents, eq(insights.respondentId, respondents.id))
    .where(eq(insights.themeId, themeId))
    .orderBy(desc(sql`${insights.upvotes} - ${insights.downvotes}`));
  
  return result;
}

export async function getAllInsightsGroupedByTheme() {
  const db = await getDb();
  if (!db) return [];
  
  const allThemes = await getAllThemes();
  const result = [];
  
  for (const theme of allThemes) {
    const themeInsights = await getInsightsByTheme(theme.id);
    result.push({
      theme,
      insights: themeInsights,
    });
  }
  
  return result;
}

export async function getInsightById(id: number): Promise<Insight | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(insights).where(eq(insights.id, id)).limit(1);
  return result[0];
}

// ===== VOTE QUERIES =====
export async function getVoteByVisitorAndInsight(visitorId: string, insightId: number): Promise<Vote | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(votes)
    .where(and(eq(votes.visitorId, visitorId), eq(votes.insightId, insightId)))
    .limit(1);
  return result[0];
}

export async function castVote(data: InsertVote): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getVoteByVisitorAndInsight(data.visitorId, data.insightId);
  
  if (existing) {
    // Update existing vote
    if (existing.voteType !== data.voteType) {
      // Changing vote direction
      await db.update(votes).set({ voteType: data.voteType }).where(eq(votes.id, existing.id));
      
      // Update insight counts
      if (data.voteType === 'up') {
        await db.update(insights).set({
          upvotes: sql`${insights.upvotes} + 1`,
          downvotes: sql`${insights.downvotes} - 1`,
        }).where(eq(insights.id, data.insightId));
      } else {
        await db.update(insights).set({
          upvotes: sql`${insights.upvotes} - 1`,
          downvotes: sql`${insights.downvotes} + 1`,
        }).where(eq(insights.id, data.insightId));
      }
    }
  } else {
    // New vote
    await db.insert(votes).values(data);
    
    if (data.voteType === 'up') {
      await db.update(insights).set({
        upvotes: sql`${insights.upvotes} + 1`,
      }).where(eq(insights.id, data.insightId));
    } else {
      await db.update(insights).set({
        downvotes: sql`${insights.downvotes} + 1`,
      }).where(eq(insights.id, data.insightId));
    }
  }
}

export async function removeVote(visitorId: string, insightId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getVoteByVisitorAndInsight(visitorId, insightId);
  if (!existing) return;
  
  await db.delete(votes).where(eq(votes.id, existing.id));
  
  if (existing.voteType === 'up') {
    await db.update(insights).set({
      upvotes: sql`${insights.upvotes} - 1`,
    }).where(eq(insights.id, insightId));
  } else {
    await db.update(insights).set({
      downvotes: sql`${insights.downvotes} - 1`,
    }).where(eq(insights.id, insightId));
  }
}

// ===== COMMENT QUERIES =====
export async function createComment(data: InsertComment): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(comments).values(data);
  return Number(result[0].insertId);
}

export async function getCommentsByInsight(insightId: number): Promise<(Comment & { userName: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: comments.id,
    insightId: comments.insightId,
    userId: comments.userId,
    content: comments.content,
    createdAt: comments.createdAt,
    userName: users.name,
  })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.insightId, insightId))
    .orderBy(desc(comments.createdAt));
  
  return result.map(r => ({ ...r, userName: r.userName || 'Anonymous' }));
}


// ===== KPI / ANALYTICS QUERIES =====
export async function getKPIStats() {
  const db = await getDb();
  if (!db) return {
    totalInsights: 0,
    totalVotes: 0,
    totalComments: 0,
    totalRespondents: 0,
    totalThemes: 0,
    totalParticipants: 0,
    topThemes: [],
    topInsights: [],
    recentActivity: [],
  };
  
  // Basic counts
  const [insightCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(insights);
  const [voteCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(votes);
  const [commentCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(comments);
  const [respondentCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(respondents);
  const [themeCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(themes);
  
  // Unique voters (participants)
  const [participantCount] = await db.select({ count: sql<number>`COUNT(DISTINCT visitorId)` }).from(votes);
  
  // Top themes by total votes
  const topThemesResult = await db.select({
    themeId: insights.themeId,
    themeName: themes.name,
    totalVotes: sql<number>`SUM(${insights.upvotes} + ${insights.downvotes})`,
    netScore: sql<number>`SUM(${insights.upvotes} - ${insights.downvotes})`,
  })
    .from(insights)
    .innerJoin(themes, eq(insights.themeId, themes.id))
    .groupBy(insights.themeId, themes.name)
    .orderBy(desc(sql`SUM(${insights.upvotes} - ${insights.downvotes})`))
    .limit(5);
  
  // Top insights by net score
  const topInsightsResult = await db.select({
    id: insights.id,
    title: insights.title,
    upvotes: insights.upvotes,
    downvotes: insights.downvotes,
    netScore: sql<number>`${insights.upvotes} - ${insights.downvotes}`,
    respondentName: respondents.name,
    themeName: themes.name,
  })
    .from(insights)
    .innerJoin(respondents, eq(insights.respondentId, respondents.id))
    .innerJoin(themes, eq(insights.themeId, themes.id))
    .orderBy(desc(sql`${insights.upvotes} - ${insights.downvotes}`))
    .limit(10);
  
  // Contributor leaderboard (respondents by total net score of their insights)
  const contributorLeaderboard = await db.select({
    respondentId: respondents.id,
    respondentName: respondents.name,
    insightCount: sql<number>`COUNT(${insights.id})`,
    totalUpvotes: sql<number>`SUM(${insights.upvotes})`,
    totalDownvotes: sql<number>`SUM(${insights.downvotes})`,
    netScore: sql<number>`SUM(${insights.upvotes} - ${insights.downvotes})`,
  })
    .from(respondents)
    .leftJoin(insights, eq(respondents.id, insights.respondentId))
    .groupBy(respondents.id, respondents.name)
    .orderBy(desc(sql`SUM(${insights.upvotes} - ${insights.downvotes})`));
  
  return {
    totalInsights: Number(insightCount?.count || 0),
    totalVotes: Number(voteCount?.count || 0),
    totalComments: Number(commentCount?.count || 0),
    totalRespondents: Number(respondentCount?.count || 0),
    totalThemes: Number(themeCount?.count || 0),
    totalParticipants: Number(participantCount?.count || 0),
    topThemes: topThemesResult,
    topInsights: topInsightsResult,
    contributorLeaderboard,
  };
}

export async function getVotingTrends() {
  const db = await getDb();
  if (!db) return [];
  
  // Get votes grouped by date
  const result = await db.select({
    date: sql<string>`DATE(${votes.createdAt})`,
    upvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END)`,
    downvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`,
    totalVotes: sql<number>`COUNT(*)`,
  })
    .from(votes)
    .groupBy(sql`DATE(${votes.createdAt})`)
    .orderBy(sql`DATE(${votes.createdAt})`);
  
  return result;
}

export async function getThemePerformance() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    themeId: themes.id,
    themeName: themes.name,
    insightCount: sql<number>`COUNT(${insights.id})`,
    totalUpvotes: sql<number>`SUM(${insights.upvotes})`,
    totalDownvotes: sql<number>`SUM(${insights.downvotes})`,
    netScore: sql<number>`SUM(${insights.upvotes} - ${insights.downvotes})`,
    avgScore: sql<number>`AVG(${insights.upvotes} - ${insights.downvotes})`,
  })
    .from(themes)
    .leftJoin(insights, eq(themes.id, insights.themeId))
    .groupBy(themes.id, themes.name)
    .orderBy(desc(sql`SUM(${insights.upvotes} - ${insights.downvotes})`));
  
  return result;
}

// ===== WISDOM LIBRARY QUERIES =====
import { wisdomCategories, wisdomEntries, InsertWisdomCategory, InsertWisdomEntry, WisdomCategory, WisdomEntry } from "../drizzle/schema";

export async function getAllWisdomCategories(): Promise<WisdomCategory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(wisdomCategories).orderBy(wisdomCategories.displayOrder);
}

export async function getWisdomCategoryBySlug(slug: string): Promise<WisdomCategory | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(wisdomCategories).where(eq(wisdomCategories.slug, slug)).limit(1);
  return result[0];
}

export async function createWisdomCategory(data: InsertWisdomCategory): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(wisdomCategories).values(data);
  return Number(result[0].insertId);
}

export async function getAllWisdomEntries(): Promise<(WisdomEntry & { categoryName: string; categorySlug: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: wisdomEntries.id,
    categoryId: wisdomEntries.categoryId,
    slug: wisdomEntries.slug,
    title: wisdomEntries.title,