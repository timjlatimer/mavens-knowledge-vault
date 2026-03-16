import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `test-user-${userId}`,
    email: `test${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
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

describe("judging.checkEligibility", () => {
  it("returns eligibility status for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.judging.checkEligibility();

    expect(result).toHaveProperty("isEligible");
    expect(typeof result.isEligible).toBe("boolean");
  });
});

describe("judging.getAnswersByQuestion", () => {
  it("returns answers grouped by question", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.judging.getAnswersByQuestion();

    expect(Array.isArray(result)).toBe(true);
    // Each item should have questionNumber, questionText, and answers
    if (result.length > 0) {
      expect(result[0]).toHaveProperty("questionNumber");
      expect(result[0]).toHaveProperty("questionText");
      expect(result[0]).toHaveProperty("answers");
      expect(Array.isArray(result[0].answers)).toBe(true);
    }
  });
});

describe("judging.getStats", () => {
  it("returns judging statistics", async () => {
    const { ctx } = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.judging.getStats();

    expect(result).toHaveProperty("totalJudges");
    expect(result).toHaveProperty("totalGrades");
    expect(result).toHaveProperty("questionsGraded");
    expect(result).toHaveProperty("topAnswers");
    expect(typeof result.totalJudges).toBe("number");
    expect(typeof result.totalGrades).toBe("number");
    expect(Array.isArray(result.topAnswers)).toBe(true);
  });
});

describe("judging.gradeAnswer", () => {
  it("rejects grading from ineligible user", async () => {
    const { ctx } = createAuthContext(999); // User who hasn't submitted
    const caller = appRouter.createCaller(ctx);

    // Should throw FORBIDDEN error
    await expect(
      caller.judging.gradeAnswer({ surveyResponseId: 1, grade: 8 })
    ).rejects.toThrow();
  });

  it("validates grade is between 1 and 10", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Grade of 0 should fail validation
    await expect(
      caller.judging.gradeAnswer({ surveyResponseId: 1, grade: 0 })
    ).rejects.toThrow();

    // Grade of 11 should fail validation
    await expect(
      caller.judging.gradeAnswer({ surveyResponseId: 1, grade: 11 })
    ).rejects.toThrow();
  });
});

describe("judging.getMyGrade", () => {
  it("returns null grade for ungraded answer", async () => {
    const { ctx } = createAuthContext(999);
    const caller = appRouter.createCaller(ctx);

    const result = await caller.judging.getMyGrade({ surveyResponseId: 9999 });

    expect(result).toHaveProperty("grade");
    expect(result.grade).toBeNull();
  });
});
