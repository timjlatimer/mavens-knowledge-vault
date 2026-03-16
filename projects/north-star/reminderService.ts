import { exec } from "child_process";
import { promisify } from "util";
import * as db from "./db";

const execAsync = promisify(exec);

/**
 * Generate reminder email content
 */
function generateReminderEmailContent(data: {
  recipientName: string;
  lastQuestionNumber: number;
  reminderNote?: string;
  resumeUrl: string;
}): string {
  const { recipientName, lastQuestionNumber, reminderNote, resumeUrl } = data;

  let content = `Dear ${recipientName},

This is your gentle reminder to continue your Destiny Discovered journey.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR PROGRESS

You're on question ${lastQuestionNumber} of 30 - you've made great progress!

`;

  if (reminderNote) {
    content += `You left yourself this note:\n"${reminderNote}"\n\n`;
  }

  content += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

READY TO CONTINUE?

When you're ready, click the link below to pick up exactly where you left off:

${resumeUrl}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TAKE YOUR TIME

Remember, there's no rush. Deep reflection takes time, and your insights are worth the wait. If you need more time, simply log in and schedule another reminder for when you're ready.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With empathy and understanding,
The Destiny Discovered Team

P.S. Your progress is automatically saved, so you can pick up exactly where you left off whenever you're ready.
`;

  return content;
}

/**
 * Send reminder email via Gmail MCP
 */
async function sendReminderEmail(
  to: string,
  subject: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const messageData = JSON.stringify({
      messages: [
        {
          to: [to],
          subject,
          content
        }
      ]
    });

    const command = `manus-mcp-cli tool call gmail_send_messages --server gmail --input '${messageData.replace(/'/g, "'\\''")}'`;
    
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr && !stderr.includes('Tip:')) {
      console.error('[ReminderService] Error sending email:', stderr);
      return { success: false, error: stderr };
    }

    console.log('[ReminderService] Reminder email sent successfully to:', to);
    return { success: true };
  } catch (error) {
    console.error('[ReminderService] Failed to send reminder email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Process pending reminders and send emails
 * This should be called periodically (e.g., every hour)
 */
export async function processPendingReminders(): Promise<{
  processed: number;
  sent: number;
  failed: number;
}> {
  console.log('[ReminderService] Checking for pending reminders...');
  
  const pendingReminders = await db.getPendingReminders();
  
  if (pendingReminders.length === 0) {
    console.log('[ReminderService] No pending reminders found');
    return { processed: 0, sent: 0, failed: 0 };
  }

  console.log(`[ReminderService] Found ${pendingReminders.length} pending reminders`);

  let sent = 0;
  let failed = 0;

  for (const reminder of pendingReminders) {
    try {
      // Get respondent details
      const respondent = await db.getRespondentById(reminder.respondentId);
      
      if (!respondent || !respondent.email) {
        console.warn(`[ReminderService] Skipping reminder ${reminder.id}: no email found`);
        await db.markReminderSent(reminder.id);
        failed++;
        continue;
      }

      // Generate email content
      const resumeUrl = `${process.env.VITE_OAUTH_PORTAL_URL || 'https://app.manus.im'}/questionnaire`;
      const emailContent = generateReminderEmailContent({
        recipientName: respondent.fullName,
        lastQuestionNumber: reminder.lastQuestionNumber,
        reminderNote: reminder.reminderNote || undefined,
        resumeUrl
      });

      const subject = `Destiny Discovered: Ready to Continue Your Journey?`;

      // Send email
      const result = await sendReminderEmail(respondent.email, subject, emailContent);

      if (result.success) {
        sent++;
        console.log(`[ReminderService] Sent reminder ${reminder.id} to ${respondent.email}`);
      } else {
        failed++;
        console.error(`[ReminderService] Failed to send reminder ${reminder.id}:`, result.error);
      }

      // Mark as sent regardless of success (to avoid retrying indefinitely)
      await db.markReminderSent(reminder.id);

    } catch (error) {
      console.error(`[ReminderService] Error processing reminder ${reminder.id}:`, error);
      failed++;
      // Mark as sent to avoid retrying
      await db.markReminderSent(reminder.id);
    }
  }

  console.log(`[ReminderService] Processed ${pendingReminders.length} reminders: ${sent} sent, ${failed} failed`);

  return {
    processed: pendingReminders.length,
    sent,
    failed
  };
}

/**
 * Start reminder processing interval
 * Checks every hour for pending reminders
 */
export function startReminderService() {
  console.log('[ReminderService] Starting reminder service...');
  
  // Process immediately on startup
  processPendingReminders().catch(error => {
    console.error('[ReminderService] Error in initial processing:', error);
  });

  // Then process every hour
  const intervalMs = 60 * 60 * 1000; // 1 hour
  setInterval(() => {
    processPendingReminders().catch(error => {
      console.error('[ReminderService] Error in scheduled processing:', error);
    });
  }, intervalMs);

  console.log('[ReminderService] Reminder service started (checking every hour)');
}
