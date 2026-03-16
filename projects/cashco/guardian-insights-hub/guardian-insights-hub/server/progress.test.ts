import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1, role: "user" | "admin" = "user"): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    notifyOnNewEntry: false,
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

function createPublicContext(): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("progress API", () => {
  describe("progress.getMyProgress", () => {
    it("returns progress stats for authenticated user", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);
      
      const progress = await caller.progress.getMyProgress();
      
      expect(progress).toHaveProperty("hasSubmitted");
      expect(progress).toHaveProperty("submissionStatus");
      expect(progress).toHaveProperty("questionsAnswered");
      expect(progress).toHaveProperty("isEligibleJudge");
      expect(progress).toHaveProperty("gradesGiven");
      expect(progress).toHaveProperty("totalAnswersToGrade");
      expect(typeof progress.hasSubmitted).toBe("boolean");
      expect(typeof progress.questionsAnswered).toBe("number");
      expect(typeof progress.isEligibleJudge).toBe("boolean");
      expect(typeof progress.gradesGiven).toBe("number");
    });
  });
});

describe("bestAnswers API", () => {
  describe("bestAnswers.getSummary", () => {
    it("returns best answers summary for all questions", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      
      const summary = await caller.bestAnswers.getSummary();
      
      expect(Array.isArray(summary)).toBe(true);
      // Each item should have questionNumber, questionText, bestAnswer, runnerUp
      if (summary.length > 0) {
        const firstItem = summary[0];
        expect(firstItem).toHaveProperty("questionNumber");
        expect(firstItem).toHaveProperty("questionText");
        expect(firstItem).toHaveProperty("bestAnswer");
        expect(firstItem).toHaveProperty("runnerUp");
      }
    });
  });
});

describe("reminders API (admin)", () => {
  describe("reminders.getIncomplete", () => {
    it("returns incomplete submissions for admin", async () => {
      const { ctx } = createAuthContext(1, "admin");
      const caller = appRouter.createCaller(ctx);
      
      const incomplete = await caller.reminders.getIncomplete();
      
      expect(Array.isArray(incomplete)).toBe(true);
    });
    
    it("rejects non-admin users", async () => {
      const { ctx } = createAuthContext(1, "user");
      const caller = appRouter.createCaller(ctx);
      
      await expect(caller.reminders.getIncomplete()).rejects.toThrow();
    });
  });
  
  describe("reminders.getNonSubmitters", () => {
    it("returns non-submitters for admin", async () => {
      const { ctx } = createAuthContext(1, "admin");
      const caller = appRouter.createCaller(ctx);
      
      const nonSubmitters = await caller.reminders.getNonSubmitters();
      
      expect(Array.isArray(nonSubmitters)).toBe(true);
    });
  });
  
  describe("reminders.sendReminder", () => {
    it("sends reminder notification for admin", async () => {
      const { ctx } = createAuthContext(1, "admin");
      const caller = appRouter.createCaller(ctx);
      
      const result = await caller.reminders.sendReminder({
        userId: 1,
        reminderType: "incomplete",
      });
      
      expect(result).toHaveProperty("success", true);
      expect(result).toHaveProperty("message");
    });
  });
});
