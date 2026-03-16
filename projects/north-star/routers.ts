import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { PREDEFINED_TAGS, findMatchingTags } from "../shared/tags";
import { QUESTIONS } from "../shared/questions";

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

  // Questionnaire operations
  questionnaire: router({
    // Get or create respondent for current user
    getMyRespondent: protectedProcedure.query(async ({ ctx }) => {
      const respondent = await db.getRespondentByUserId(ctx.user.id);
      return respondent;
    }),

    // Initialize respondent
    initializeRespondent: protectedProcedure
      .input(z.object({
        fullName: z.string().min(1),
        email: z.string().email().optional(),
        jobTitle: z.string().optional(),
        organization: z.string().optional()
      }))
      .mutation(async ({ ctx, input }) => {
        const respondent = await db.getOrCreateRespondent(
          ctx.user.id,
          input.fullName,
          input.email
        );
        return respondent;
      }),

    // Save text response
    saveTextResponse: protectedProcedure
      .input(z.object({
        questionNumber: z.number().min(1).max(30),
        questionCategory: z.string(),
        responseText: z.string().min(1)
      }))
      .mutation(async ({ ctx, input }) => {
        const respondent = await db.getRespondentByUserId(ctx.user.id);
        if (!respondent) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Respondent not found' });
        }

        const responseId = await db.saveTextResponse(
          respondent.id,
          input.questionNumber,
          input.questionCategory,
          input.responseText
        );

        // Apply automated tags
        await applyAutomatedTags(responseId, input.responseText);

        return { success: true, responseId };
      }),

    // Save list response
    saveListResponse: protectedProcedure
      .input(z.object({
        questionNumber: z.number().min(1).max(30),
        questionCategory: z.string(),
        items: z.array(z.string().min(1)).min(1)
      }))
      .mutation(async ({ ctx, input }) => {
        const respondent = await db.getRespondentByUserId(ctx.user.id);
        if (!respondent) {
          throw new TRPCError({ code: 'NOT_FOUND', message: 'Respondent not found' });
        }

        const responseId = await db.saveListResponse(
          respondent.id,
          input.questionNumber,
          input.questionCategory,
          input.items
        );