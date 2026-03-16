import { exec } from "child_process";
import { promisify } from "util";
import * as db from "./db";
import { PREDEFINED_TAGS } from "../shared/tags";

const execAsync = promisify(exec);

interface EmailNotificationData {
  recipientEmail: string;
  recipientName: string;
  tagSummary: {
    category: string;
    tags: string[];
  }[];
  completionDate: Date;
}

/**
 * Generate a personalized email content for North Star insights summary
 */
function generateInsightsEmailContent(data: EmailNotificationData): string {
  const { recipientName, tagSummary, completionDate } = data;
  
  const formattedDate = completionDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let content = `Dear ${recipientName},

Thank you for completing the Destiny Discovered questionnaire on ${formattedDate}!

Your responses have been analyzed and we've identified key themes that illuminate your North Star - the values, beliefs, and purpose that guide your journey.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR NORTH STAR INSIGHTS

`;

  // Add tag summary by category
  tagSummary.forEach(({ category, tags }) => {
    if (tags.length > 0) {
      content += `\n${category.toUpperCase()}\n`;
      tags.forEach(tag => {
        content += `  • ${tag}\n`;
      });
    }
  });

  content += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT THIS MEANS

These themes represent the core elements of your personal philosophy and approach to life. They reflect:

• Your fundamental values and what you hold most important
• How you take action and engage with the world
• Your worldview and perspective on life's big questions
• What you believe drives success and achievement
• Your sense of purpose and legacy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS

You can view your complete responses and detailed insights anytime by logging into your Destiny Discovered dashboard. There you'll find:

• All your questionnaire responses
• Detailed tag analysis
• The ability to edit or update your answers as you grow and evolve

Remember, your North Star isn't fixed - it's a living guide that can evolve as you do. We encourage you to revisit your responses periodically to see how your insights change over time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With empathy and understanding,
The Destiny Discovered Team

P.S. We recognize that life's journey is complex, especially when navigating the challenges of making difficult decisions with limited resources. Your insights matter, and we're honored to be part of your self-discovery process.
`;

  return content;
}

/**
 * Send email notification via Gmail MCP
 */
async function sendEmailViaGmail(
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
      console.error('[Email] Error sending email:', stderr);
      return { success: false, error: stderr };
    }

    console.log('[Email] Email sent successfully to:', to);
    return { success: true };
  } catch (error) {
    console.error('[Email] Failed to send email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Send North Star insights summary email to user
 */
export async function sendCompletionEmail(
  respondentId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get respondent details
    const respondent = await db.getRespondentById(respondentId);
    if (!respondent) {
      return { success: false, error: 'Respondent not found' };
    }

    if (!respondent.email) {
      return { success: false, error: 'No email address on file' };
    }

    // Get all tags applied to this respondent's responses
    const responses = await db.getResponsesByRespondent(respondentId);
    if (!responses || responses.length === 0) {
      return { success: false, error: 'No responses found' };
    }

    // Organize tags by category
    const tagsByCategory: Record<string, Set<string>> = {
      'Core Values': new Set(),
      'Action Orientation': new Set(),
      'Worldview': new Set(),
      'Success Mindset': new Set(),
      'Purpose & Legacy': new Set()
    };

    // Collect all unique tags from all responses
    const allTagIds = new Set<number>();
    for (const response of responses) {
      const responseTags = await db.getTagsByResponse(response.id);
      responseTags.forEach(rt => {
        allTagIds.add(rt.tagId);
      });
    }

    // Get all tags from database and organize by category
    const allTags = await db.getAllTags();
    allTagIds.forEach(tagId => {
      const tag = allTags.find(t => t.id === tagId);
      if (tag && tag.tagCategory) {
        const categoryName = tag.tagCategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        if (!tagsByCategory[categoryName]) {
          tagsByCategory[categoryName] = new Set();
        }
        tagsByCategory[categoryName].add(tag.tagName);
      }
    });

    // Convert to array format
    const tagSummary = Object.entries(tagsByCategory).map(([category, tags]) => ({
      category,
      tags: Array.from(tags)
    }));

    // Generate email content
    const emailData: EmailNotificationData = {
      recipientEmail: respondent.email,
      recipientName: respondent.fullName,
      tagSummary,
      completionDate: respondent.dateSubmitted || new Date()
    };

    const content = generateInsightsEmailContent(emailData);
    const subject = `Your Destiny Discovered North Star Insights - ${respondent.fullName}`;

    // Send email
    return await sendEmailViaGmail(respondent.email, subject, content);
  } catch (error) {
    console.error('[Email] Error in sendCompletionEmail:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
