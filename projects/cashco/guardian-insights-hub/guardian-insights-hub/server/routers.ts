import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./_core/notification";

// Admin-only procedure
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ===== RESPONDENTS =====
  respondents: router({
    list: publicProcedure.query(async () => {
      return await db.getAllRespondents();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const respondent = await db.getRespondentById(input.id);
        if (!respondent) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Respondent not found' });
        }
        const responses = await db.getSurveyResponsesByRespondent(input.id);
        return { respondent, responses };
      }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        title: z.string().optional(),
        organization: z.string().optional(),
        surveyResponses: z.array(z.object({
          questionNumber: z.number(),
          questionText: z.string(),
          answerText: z.string(),
        })),
      }))
      .mutation(async ({ input }) => {
        const respondentId = await db.createRespondent({
          name: input.name,
          title: input.title,
          organization: input.organization,
        });
        
        for (const response of input.surveyResponses) {
          await db.createSurveyResponse({
            respondentId,
            questionNumber: response.questionNumber,
            questionText: response.questionText,
            answerText: response.answerText,
          });
        }
        
        // Notify owner about new respondent
        notifyOwner({
          title: `New Frontline Expert Added: ${input.name}`,
          content: `A new respondent has been added to the Guardian Insights Hub.\n\nName: ${input.name}\nTitle: ${input.title || 'N/A'}\nOrganization: ${input.organization || 'N/A'}\nSurvey Responses: ${input.surveyResponses.length} answers\n\nVisit the Insights Hub to review their contributions.`,
        }).catch(console.error);

        return { id: respondentId };
      }),
  }),

  // ===== THEMES =====
  themes: router({
    list: publicProcedure.query(async () => {
      return await db.getAllThemes();
    }),
    
    create: adminProcedure
      .input(z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createTheme(input);
        return { id };
      }),
  }),

  // ===== INSIGHTS =====
  insights: router({
    listGroupedByTheme: publicProcedure.query(async () => {
      return await db.getAllInsightsGroupedByTheme();
    }),
    
    getByTheme: publicProcedure
      .input(z.object({ themeId: z.number() }))
      .query(async ({ input }) => {
        return await db.getInsightsByTheme(input.themeId);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const insight = await db.getInsightById(input.id);
        if (!insight) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Insight not found' });
        }
        const comments = await db.getCommentsByInsight(input.id);
        return { insight, comments };
      }),
    
    create: adminProcedure
      .input(z.object({
        themeId: z.number(),
        respondentId: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
        guardianBehavior: z.string().optional(),
        scriptIdea: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createInsight(input);
        return { id };
      }),
    
    createWithTheme: adminProcedure
      .input(z.object({
        themeName: z.string().min(1),
        themeDescription: z.string().optional(),
        respondentId: z.number(),
        title: z.string().min(1),
        description: z.string().min(1),
        guardianBehavior: z.string().optional(),
        scriptIdea: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const themeId = await db.getOrCreateTheme(input.themeName, input.themeDescription);
        const id = await db.createInsight({
          themeId,
          respondentId: input.respondentId,
          title: input.title,
          description: input.description,
          guardianBehavior: input.guardianBehavior,
          scriptIdea: input.scriptIdea,
        });
        // Notify owner about new insight
        notifyOwner({
          title: `New Insight Added: ${input.title}`,
          content: `A new insight has been added to the Guardian Insights Hub.\n\nTheme: ${input.themeName}\nTitle: ${input.title}\nDescription: ${input.description.substring(0, 200)}${input.description.length > 200 ? '...' : ''}\n\nVisit the Insights Hub to vote and comment.`,
        }).catch(console.error);

        return { id, themeId };
      }),
  }),

  // ===== VOTES =====
  votes: router({
    cast: publicProcedure
      .input(z.object({
        insightId: z.number(),
        visitorId: z.string().min(1),
        voteType: z.enum(['up', 'down']),
      }))
      .mutation(async ({ input }) => {
        await db.castVote(input);
        return { success: true };
      }),
    
    remove: publicProcedure
      .input(z.object({
        insightId: z.number(),
        visitorId: z.string().min(1),
      }))
      .mutation(async ({ input }) => {
        await db.removeVote(input.visitorId, input.insightId);
        return { success: true };
      }),
    
    getMyVote: publicProcedure
      .input(z.object({
        insightId: z.number(),
        visitorId: z.string().min(1),
      }))
      .query(async ({ input }) => {
        const vote = await db.getVoteByVisitorAndInsight(input.visitorId, input.insightId);
        return vote ? { voteType: vote.voteType } : null;
      }),
  }),

  // ===== KPI / ANALYTICS =====
  kpi: router({
    getStats: publicProcedure.query(async () => {
      return await db.getKPIStats();
    }),
    
    getVotingTrends: publicProcedure.query(async () => {
      return await db.getVotingTrends();
    }),
    
    getThemePerformance: publicProcedure.query(async () => {
      return await db.getThemePerformance();
    }),
  }),

  // ===== WISDOM LIBRARY =====
  wisdom: router({
    categories: publicProcedure.query(async () => {
      return await db.getAllWisdomCategories();
    }),
    
    getCategoryBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const category = await db.getWisdomCategoryBySlug(input.slug);
        if (!category) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Category not found' });
        }
        const entries = await db.getWisdomEntriesByCategory(category.id);
        return { category, entries };
      }),
    
    entries: publicProcedure.query(async () => {
      return await db.getAllWisdomEntries();
    }),
    
    getEntryBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const entry = await db.getWisdomEntryBySlug(input.slug);
        if (!entry) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Entry not found' });
        }
        return entry;
      }),
    
    stats: publicProcedure.query(async () => {
      return await db.getWisdomLibraryStats();
    }),
    
    search: publicProcedure
      .input(z.object({ query: z.string().min(1) }))
      .query(async ({ input }) => {
        return await db.searchWisdomEntries(input.query);
      }),
    
    export: publicProcedure.query(async () => {
      const categories = await db.getAllWisdomCategories();
      const entries = await db.getAllWisdomEntries();
      return {
        exportedAt: new Date().toISOString(),
        categories,
        entries,
      };
    }),
    
    createCategory: adminProcedure
      .input(z.object({
        slug: z.string().min(1),
        name: z.string().min(1),
        description: z.string().optional(),
        icon: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = await db.createWisdomCategory(input);
        return { id };
      }),
    
    createEntry: adminProcedure
      .input(z.object({
        categorySlug: z.string().min(1),
        categoryName: z.string().min(1),
        categoryDescription: z.string().optional(),
        categoryIcon: z.string().optional(),
        slug: z.string().min(1),
        title: z.string().min(1),
        subtitle: z.string().optional(),
        content: z.string().min(1),
        scriptExample: z.string().optional(),
        antiPattern: z.string().optional(),
        source: z.string().optional(),
        sourceType: z.enum(['frontline', 'philosophy', 'external', 'anti-pattern']).optional(),
        tags: z.string().optional(),
        displayOrder: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const categoryId = await db.getOrCreateWisdomCategory(
          input.categorySlug, 
          input.categoryName, 
          input.categoryDescription,
          input.categoryIcon
        );
        const id = await db.createWisdomEntry({
          categoryId,
          slug: input.slug,
          title: input.title,
          subtitle: input.subtitle,
          content: input.content,
          scriptExample: input.scriptExample,
          antiPattern: input.antiPattern,
          source: input.source,
          sourceType: input.sourceType,
          tags: input.tags,
          displayOrder: input.displayOrder,
        });
        return { id, categoryId };
      }),
  }),

  // ===== COMMENTS =====
  comments: router({
    getByInsight: publicProcedure
      .input(z.object({ insightId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCommentsByInsight(input.insightId);
      }),
    
    create: protectedProcedure
      .input(z.object({
        insightId: z.number(),
        content: z.string().min(1),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createComment({
          insightId: input.insightId,
          userId: ctx.user.id,
          content: input.content,
        });
        return { id };
      }),
  }),

  // ===== JUDGING =====
  judging: router({
    // Check if current user is eligible to judge
    checkEligibility: protectedProcedure.query(async ({ ctx }) => {
      const isEligible = await db.checkJudgeEligibility(ctx.user.id);
      return { isEligible };
    }),
    
    // Get all answers grouped by question for judging
    getAnswersByQuestion: publicProcedure.query(async () => {
      return await db.getAllAnswersByQuestion();
    }),
    
    // Grade an answer (requires eligibility)
    gradeAnswer: protectedProcedure
      .input(z.object({
        surveyResponseId: z.number(),
        grade: z.number().min(1).max(10),
      }))
      .mutation(async ({ ctx, input }) => {
        // Check eligibility
        const isEligible = await db.checkJudgeEligibility(ctx.user.id);
        if (!isEligible) {
          throw new TRPCError({ 
            code: 'FORBIDDEN', 
            message: 'You must submit your own story before you can judge others. Please complete the "Share Your Story" form first.' 
          });
        }
        
        await db.gradeAnswer(input.surveyResponseId, ctx.user.id, input.grade);
        return { success: true };
      }),
    
    // Get user's grade for a specific answer
    getMyGrade: protectedProcedure
      .input(z.object({ surveyResponseId: z.number() }))
      .query(async ({ ctx, input }) => {
        const grade = await db.getUserGradeForAnswer(input.surveyResponseId, ctx.user.id);
        return { grade };
      }),
    
    // Get judging statistics
    getStats: publicProcedure.query(async () => {
      return await db.getJudgingStats();
    }),
  }),

  // ===== USER PROGRESS =====
  progress: router({
    // Get current user's progress stats
    getMyProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserProgressStats(ctx.user.id);
    }),
  }),

  // ===== BEST ANSWERS SUMMARY =====
  bestAnswers: router({
    // Get the best answer for each question
    getSummary: publicProcedure.query(async () => {
      return await db.getBestAnswersSummary();
    }),
  }),

  // ===== EMAIL REMINDERS (Admin) =====
  reminders: router({
    // Get users with incomplete submissions
    getIncomplete: adminProcedure.query(async () => {
      return await db.getIncompleteSubmissions();
    }),
    
    // Get users who signed in but haven't submitted
    getNonSubmitters: adminProcedure.query(async () => {
      return await db.getUsersWhoHaventSubmitted();
    }),
    
    // Send reminder email to a specific user
    sendReminder: adminProcedure
      .input(z.object({
        userId: z.number(),
        reminderType: z.enum(['incomplete', 'not_started']),
      }))
      .mutation(async ({ input }) => {
        // For now, we'll just log and notify the owner
        // In a real implementation, this would send an email
        await notifyOwner({
          title: `Reminder Sent: User ${input.userId}`,
          content: `A ${input.reminderType === 'incomplete' ? 'completion' : 'participation'} reminder was triggered for user ID ${input.userId}.\n\nNote: Email sending is simulated. In production, this would send an actual email to the user.`,
        });
        return { success: true, message: 'Reminder logged (email simulation)' };
      }),
  }),

  // ===== STORY SUBMISSIONS =====
  submissions: router({
    // Get all submissions (admin only)
    list: adminProcedure.query(async () => {
      return await db.getAllStorySubmissions();
    }),
    
    // Get pending submissions (admin only)
    pending: adminProcedure.query(async () => {
      return await db.getPendingStorySubmissions();
    }),
    
    // Get submission stats (admin only)
    stats: adminProcedure.query(async () => {
      return await db.getStorySubmissionStats();
    }),
    
    // Get a single submission by ID (admin only)
    getById: adminProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const submission = await db.getStorySubmissionById(input.id);
        if (!submission) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Submission not found' });
        }
        return submission;
      }),
    
    // Submit a new story (public - anyone can submit)
    create: publicProcedure
      .input(z.object({
        submitterName: z.string().min(1),
        submitterEmail: z.string().email().optional(),
        submitterTitle: z.string().optional(),
        submitterOrganization: z.string().optional(),
        q1ToughestConversation: z.string().optional(),
        q2BuildingTrust: z.string().optional(),
        q3FirstInteraction: z.string().optional(),
        q4DenialConversation: z.string().optional(),
        q5CommunityResources: z.string().optional(),
        q6ClientWins: z.string().optional(),
        q7SecretWeapon: z.string().optional(),
        q8IdealBotFeatures: z.string().optional(),
        q9AdditionalThoughts: z.string().optional(),
        q10MemorableStory: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const id = await db.createStorySubmission({
          ...input,
          userId: ctx.user?.id || null,
        });
        
        // Notify owner of new submission
        await notifyOwner({
          title: `New Story Submission from ${input.submitterName}`,
          content: `A new frontline story has been submitted and is awaiting review.\n\nSubmitter: ${input.submitterName}${input.submitterTitle ? ` (${input.submitterTitle})` : ''}${input.submitterOrganization ? ` at ${input.submitterOrganization}` : ''}\n\nPlease review in the Admin panel.`,
        });
        
        return { id, success: true };
      }),
    
    // Approve a submission (admin only)
    approve: adminProcedure
      .input(z.object({
        id: z.number(),
        reviewNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get the submission to find the userId
        const submission = await db.getStorySubmissionById(input.id);
        if (!submission) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Submission not found' });
        }
        
        await db.updateStorySubmissionStatus(input.id, 'approved', ctx.user.id, input.reviewNotes);
        
        // Grant judge eligibility if the submitter was logged in
        if (submission.userId) {
          await db.grantJudgeEligibility(submission.userId, input.id);
        }
        
        return { success: true };
      }),
    
    // Reject a submission (admin only)
    reject: adminProcedure
      .input(z.object({
        id: z.number(),
        reviewNotes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.updateStorySubmissionStatus(input.id, 'rejected', ctx.user.id, input.reviewNotes);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
