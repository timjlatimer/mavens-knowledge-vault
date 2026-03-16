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
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Questionnaire Procedures", () => {
  beforeAll(async () => {
    // Initialize tags in database
    const { initializePredefinedTags } = await import("./routers");
    await initializePredefinedTags();
    
    // Create test users in database and store their IDs
    for (let i = 1; i <= 10; i++) {
      const openId = `test-user-${i}`;
      await db.upsertUser({
        openId,
        email: `${openId}@example.com`,
        name: `Test User ${i}`,
        loginMethod: "manus",
        role: "user"
      });
      const user = await db.getUserByOpenId(openId);
      if (user) {
        testUserIds[openId] = user.id;
      }
    }
  });

  it("should initialize a respondent", async () => {
    const ctx = createAuthContext("test-user-1");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.questionnaire.initializeRespondent({
      fullName: "John Doe",
      email: "john@example.com",
      jobTitle: "Software Engineer",
      organization: "Tech Corp"
    });

    expect(result).toBeDefined();
    expect(result.userId).toBe(testUserIds["test-user-1"]);
    expect(result.isComplete).toBeDefined();
  });

  it("should save a text response", async () => {
    const ctx = createAuthContext("test-user-2");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent first
    await caller.questionnaire.initializeRespondent({
      fullName: "Jane Smith",
      email: "jane@example.com"
    });

    // Save text response
    const result = await caller.questionnaire.saveTextResponse({
      questionNumber: 1,
      questionCategory: "Core Values",
      responseText: "Freedom and autonomy are most important to me."
    });

    expect(result.success).toBe(true);
    expect(result.responseId).toBeGreaterThan(0);
  });

  it("should save a list response", async () => {
    const ctx = createAuthContext("test-user-3");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Bob Johnson",
      email: "bob@example.com"
    });

    // Save list response
    const result = await caller.questionnaire.saveListResponse({
      questionNumber: 3,
      questionCategory: "Self-Awareness",
      items: ["Be more patient", "Listen better", "Exercise regularly"]
    });

    expect(result.success).toBe(true);
    expect(result.responseId).toBeGreaterThan(0);
  });

  it("should save a multiple choice response", async () => {
    const ctx = createAuthContext("test-user-4");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Alice Brown",
      email: "alice@example.com"
    });

    // Save multiple choice response
    const result = await caller.questionnaire.saveMultipleChoiceResponse({
      questionNumber: 9,
      questionCategory: "Purpose & Legacy",
      selectedOption: "Excellent"
    });

    expect(result.success).toBe(true);
    expect(result.responseId).toBeGreaterThan(0);
  });

  it("should save belief system response", async () => {
    const ctx = createAuthContext("test-user-5");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Charlie Davis",
      email: "charlie@example.com"
    });

    // Save belief response
    const result = await caller.questionnaire.saveBeliefResponse({
      believesInGod: true,
      whyText: "I believe in a higher power that guides the universe.",
      advantagesText: "It gives me comfort and purpose.",
      disadvantagesText: "Sometimes I struggle with doubt.",
      evidenceText: "Personal experiences and the complexity of nature."
    });

    expect(result.success).toBe(true);
    expect(result.beliefId).toBeGreaterThan(0);
  });

  it("should save success factors with validation", async () => {
    const ctx = createAuthContext("test-user-6");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Diana Evans",
      email: "diana@example.com"
    });

    // Save success factors (must total 100%)
    const result = await caller.questionnaire.saveSuccessFactors({
      personalInfluencePct: 40,
      othersInfluencePct: 30,
      economicSocialPct: 20,
      uncontrollablePct: 10
    });

    expect(result.success).toBe(true);
    expect(result.factorId).toBeGreaterThan(0);
  });

  it("should reject success factors that don't total 100%", async () => {
    const ctx = createAuthContext("test-user-7");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Frank Green",
      email: "frank@example.com"
    });

    // Try to save invalid success factors
    await expect(
      caller.questionnaire.saveSuccessFactors({
        personalInfluencePct: 40,
        othersInfluencePct: 30,
        economicSocialPct: 20,
        uncontrollablePct: 5  // Only totals 95%
      })
    ).rejects.toThrow();
  });

  it("should retrieve user's responses", async () => {
    const ctx = createAuthContext("test-user-8");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Grace Hill",
      email: "grace@example.com"
    });

    // Save some responses
    await caller.questionnaire.saveTextResponse({
      questionNumber: 1,
      questionCategory: "Core Values",
      responseText: "Integrity is most important."
    });

    await caller.questionnaire.saveListResponse({
      questionNumber: 3,
      questionCategory: "Self-Awareness",
      items: ["Be more organized", "Communicate clearly", "Stay focused"]
    });

    // Retrieve responses
    const result = await caller.questionnaire.getMyResponses();

    expect(result).toBeDefined();
    expect(result?.respondent).toBeDefined();
    expect(result?.responses).toBeDefined();
    expect(result?.responses.length).toBeGreaterThan(0);
  });

  it("should mark questionnaire as complete", async () => {
    const ctx = createAuthContext("test-user-9");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Henry Irving",
      email: "henry@example.com"
    });

    // Mark complete
    const result = await caller.questionnaire.markComplete();

    expect(result.success).toBe(true);

    // Verify it's marked complete
    const responses = await caller.questionnaire.getMyResponses();
    expect(responses?.respondent?.isComplete).toBe(true);
  });

  it("should apply automated tags to responses", async () => {
    const ctx = createAuthContext("test-user-10");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Iris Jackson",
      email: "iris@example.com"
    });

    // Save response with keywords that should trigger tags
    await caller.questionnaire.saveTextResponse({
      questionNumber: 1,
      questionCategory: "Core Values",
      responseText: "Faith and integrity are the foundation of my life. I believe in God and try to live with honesty and compassion."
    });

    // Retrieve responses with tags
    const result = await caller.questionnaire.getMyResponses();
    
    expect(result?.responses).toBeDefined();
    expect(result?.responses.length).toBeGreaterThan(0);
    
    const firstResponse = result?.responses[0];
    expect(firstResponse?.tags).toBeDefined();
    expect(firstResponse?.tags.length).toBeGreaterThan(0);
    
    // Check if appropriate tags were applied
    const tagNames = firstResponse?.tags.map((t: any) => t.tagName) || [];
    expect(tagNames.some((name: string) => 
      name === "Faith/Spirituality" || 
      name === "Integrity" || 
      name === "Compassion"
    )).toBe(true);
  });
});
