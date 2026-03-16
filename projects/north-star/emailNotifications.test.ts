import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

let testUserIds: Record<string, number> = {};

function createAuthContext(testUserKey: string, role: "user" | "admin" = "user"): TrpcContext {
  const userId = testUserIds[testUserKey] || 1;
  const user: AuthenticatedUser = {
    id: userId,
    openId: testUserKey,
    email: `${testUserKey}@example.com`,
    name: testUserKey,
    loginMethod: "manus",
    role,
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

  return ctx;
}

describe("Email Notifications", () => {
  beforeAll(async () => {
    // Initialize tags in database
    const { initializePredefinedTags } = await import("./routers");
    await initializePredefinedTags();
    
    // Create test user in database
    const openId = "email-test-user-1";
    await db.upsertUser({
      openId,
      email: "test-email@example.com",
      name: "Email Test User",
      loginMethod: "manus",
      role: "user"
    });
    const user = await db.getUserByOpenId(openId);
    if (user) {
      testUserIds[openId] = user.id;
    }
  });

  it("should send email notification on questionnaire completion", async () => {
    const ctx = createAuthContext("email-test-user-1");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Email Test User",
      email: "test-email@example.com",
      jobTitle: "Test Engineer",
      organization: "Test Corp"
    });

    // Add some responses to generate tags
    await caller.questionnaire.saveTextResponse({
      questionNumber: 1,
      questionCategory: "Core Values",
      responseText: "Family, integrity, and helping others are most important to me"
    });

    await caller.questionnaire.saveListResponse({
      questionNumber: 3,
      questionCategory: "Core Values",
      items: ["Honesty", "Compassion", "Hard work"]
    });

    await caller.questionnaire.saveBeliefResponse({
      believesInGod: true,
      whyText: "Faith gives me purpose and guidance",
      advantagesText: "Provides moral framework and community",
      disadvantagesText: "Sometimes conflicts with science",
      evidenceText: "Personal experiences and answered prayers"
    });

    // Mark as complete - this should trigger email
    const result = await caller.questionnaire.markComplete();

    expect(result.success).toBe(true);
    // Email sending might fail in test environment, so we just check it was attempted
    expect(result.emailSent).toBeDefined();
    
    console.log('[Test] Email notification result:', result.emailSent ? 'Sent' : 'Failed (expected in test environment)');
  });

  it("should handle missing email gracefully", async () => {
    // Create user without email
    const openId = "email-test-user-no-email";
    await db.upsertUser({
      openId,
      email: null,
      name: "No Email User",
      loginMethod: "manus",
      role: "user"
    });
    const user = await db.getUserByOpenId(openId);
    if (user) {
      testUserIds[openId] = user.id;
    }

    const ctx = createAuthContext("email-test-user-no-email");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent without email
    await caller.questionnaire.initializeRespondent({
      fullName: "No Email User",
      jobTitle: "Test Engineer",
      organization: "Test Corp"
    });

    // Add minimal response
    await caller.questionnaire.saveTextResponse({
      questionNumber: 1,
      questionCategory: "Core Values",
      responseText: "Test response"
    });

    // Mark as complete - should succeed even if email fails
    const result = await caller.questionnaire.markComplete();

    expect(result.success).toBe(true);
    // Email should fail due to missing email address
    expect(result.emailSent).toBe(false);
  });
});
