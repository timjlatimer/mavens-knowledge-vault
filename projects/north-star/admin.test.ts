import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

let adminUserIds: Record<string, number> = {};
let regularUserIds: Record<string, number> = {};

function createAdminContext(testUserKey: string): TrpcContext {
  const userId = adminUserIds[testUserKey] || 1;
  const user: AuthenticatedUser = {
    id: userId,
    openId: testUserKey,
    email: `${testUserKey}@example.com`,
    name: testUserKey,
    loginMethod: "manus",
    role: "admin",
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

function createUserContext(testUserKey: string): TrpcContext {
  const userId = regularUserIds[testUserKey] || 1;
  const user: AuthenticatedUser = {
    id: userId,
    openId: testUserKey,
    email: `${testUserKey}@example.com`,
    name: testUserKey,
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
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Admin Procedures", () => {
  beforeAll(async () => {
    // Initialize tags
    const { initializePredefinedTags } = await import("./routers");
    await initializePredefinedTags();
    
    // Create test users in database
    const { upsertUser } = await import("./db");
    
    // Create admin users
    for (let i = 100; i <= 110; i++) {
      const openId = `admin-user-${i}`;
      await upsertUser({
        openId,
        email: `${openId}@example.com`,
        name: `Admin User ${i}`,
        loginMethod: "manus",
        role: "admin"
      });
      const user = await import("./db").then(m => m.getUserByOpenId(openId));
      if (user) {
        adminUserIds[openId] = user.id;
      }
    }
    
    // Create regular users
    for (let i = 200; i <= 210; i++) {
      const openId = `regular-user-${i}`;
      await upsertUser({
        openId,
        email: `${openId}@example.com`,
        name: `Regular User ${i}`,
        loginMethod: "manus",
        role: "user"
      });
      const user = await import("./db").then(m => m.getUserByOpenId(openId));
      if (user) {
        regularUserIds[openId] = user.id;
      }
    }

    // Create some test data
    const userCtx = createUserContext("regular-user-201");
    const userCaller = appRouter.createCaller(userCtx);

    await userCaller.questionnaire.initializeRespondent({
      fullName: "Test Respondent",
      email: "test@example.com"
    });

    await userCaller.questionnaire.saveTextResponse({
      questionNumber: 1,
      questionCategory: "Core Values",
      responseText: "Faith and family are most important."
    });

    await userCaller.questionnaire.saveSuccessFactors({
      personalInfluencePct: 50,
      othersInfluencePct: 25,
      economicSocialPct: 15,
      uncontrollablePct: 10
    });

    await userCaller.questionnaire.saveBeliefResponse({
      believesInGod: true,
      whyText: "Personal conviction",
      advantagesText: "Provides guidance",
      disadvantagesText: "None",
      evidenceText: "Personal experience"
    });
  });

  it("should allow admin to get all respondents", async () => {
    const ctx = createAdminContext("admin-user-101");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getAllRespondents();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should reject non-admin access to admin procedures", async () => {
    const ctx = createUserContext("regular-user-202");
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.admin.getAllRespondents()
    ).rejects.toThrow("Admin access required");
  });

  it("should get tag frequency data", async () => {
    const ctx = createAdminContext("admin-user-102");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getTagFrequency();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    
    // Should have tag data
    if (result.length > 0) {
      const firstTag = result[0];
      expect(firstTag).toHaveProperty("tagName");
      expect(firstTag).toHaveProperty("tagCategory");
      expect(firstTag).toHaveProperty("count");
    }
  });

  it("should get success factor averages", async () => {
    const ctx = createAdminContext("admin-user-103");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getSuccessFactorAverages();

    expect(result).toBeDefined();
    
    if (result && result.count > 0) {
      expect(result).toHaveProperty("avgPersonal");
      expect(result).toHaveProperty("avgOthers");
      expect(result).toHaveProperty("avgEconomic");
      expect(result).toHaveProperty("avgUncontrollable");
      expect(result).toHaveProperty("count");
      
      // Verify averages are reasonable numbers
      expect(Number(result.avgPersonal)).toBeGreaterThanOrEqual(0);
      expect(Number(result.avgPersonal)).toBeLessThanOrEqual(100);
    }
  });

  it("should get belief distribution", async () => {
    const ctx = createAdminContext("admin-user-104");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getBeliefDistribution();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    
    if (result.length > 0) {
      const firstEntry = result[0];
      expect(firstEntry).toHaveProperty("believesInGod");
      expect(firstEntry).toHaveProperty("count");
      expect(typeof firstEntry.believesInGod).toBe("number");
    }
  });

  it("should get common values", async () => {
    const ctx = createAdminContext("admin-user-105");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.getCommonValues({ limit: 10 });

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    
    if (result.length > 0) {
      const firstValue = result[0];
      expect(firstValue).toHaveProperty("itemText");
      expect(firstValue).toHaveProperty("count");
    }
  });

  it("should get respondent detail", async () => {
    const ctx = createAdminContext("admin-user-106");
    const caller = appRouter.createCaller(ctx);

    // First get all respondents to get a valid ID
    const respondents = await caller.admin.getAllRespondents();
    expect(respondents.length).toBeGreaterThan(0);

    const respondentId = respondents[0].id;

    // Get detail
    const result = await caller.admin.getRespondentDetail({ respondentId });

    expect(result).toBeDefined();
    expect(result).toHaveProperty("responses");
    expect(Array.isArray(result.responses)).toBe(true);
  });

  it("should export all data", async () => {
    const ctx = createAdminContext("admin-user-107");
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.exportData();

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    
    if (result.length > 0) {
      const firstEntry = result[0];
      expect(firstEntry).toHaveProperty("respondent");
      expect(firstEntry).toHaveProperty("responses");
      expect(firstEntry).toHaveProperty("beliefResponse");
      expect(firstEntry).toHaveProperty("successFactors");
    }
  });
});
