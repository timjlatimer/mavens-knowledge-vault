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

describe("Reminder System", () => {
  beforeAll(async () => {
    // Create test user in database
    const openId = "reminder-test-user";
    await db.upsertUser({
      openId,
      email: "reminder@example.com",
      name: "Reminder Test User",
      loginMethod: "manus",
      role: "user"
    });
    const user = await db.getUserByOpenId(openId);
    if (user) {
      testUserIds[openId] = user.id;
    }
  });

  it("should schedule a reminder for future date", async () => {
    const ctx = createAuthContext("reminder-test-user");
    const caller = appRouter.createCaller(ctx);

    // Initialize respondent
    await caller.questionnaire.initializeRespondent({
      fullName: "Reminder Test User",
      email: "reminder@example.com",
      jobTitle: "Test Engineer",
      organization: "Test Corp"
    });

    // Schedule reminder for 3 days from now
    const scheduledFor = new Date();
    scheduledFor.setDate(scheduledFor.getDate() + 3);

    const result = await caller.questionnaire.scheduleReminder({
      scheduledFor,
      lastQuestionNumber: 5,
      reminderNote: "Remember to think about core values"
    });

    expect(result.success).toBe(true);
    expect(result.reminder).toBeDefined();
    expect(result.reminder?.lastQuestionNumber).toBe(5);
    expect(result.reminder?.reminderNote).toBe("Remember to think about core values");
  });

  it("should retrieve upcoming reminders for user", async () => {
    const ctx = createAuthContext("reminder-test-user");
    const caller = appRouter.createCaller(ctx);

    const reminders = await caller.questionnaire.getMyReminders();

    expect(Array.isArray(reminders)).toBe(true);
    expect(reminders.length).toBeGreaterThan(0);
    
    // Check that reminder is not yet sent
    const latestReminder = reminders[0];
    expect(latestReminder.isSent).toBe(false);
  });

  it("should handle scheduling multiple reminders", async () => {
    const ctx = createAuthContext("reminder-test-user");
    const caller = appRouter.createCaller(ctx);

    // Schedule another reminder
    const scheduledFor = new Date();
    scheduledFor.setDate(scheduledFor.getDate() + 7);

    const result = await caller.questionnaire.scheduleReminder({
      scheduledFor,
      lastQuestionNumber: 10,
    });

    expect(result.success).toBe(true);

    // Check we now have multiple reminders
    const reminders = await caller.questionnaire.getMyReminders();
    expect(reminders.length).toBeGreaterThanOrEqual(2);
  });

  it("should get pending reminders from database", async () => {
    // Create a reminder scheduled for the past (should be pending)
    const openId = "reminder-test-user";
    const user = await db.getUserByOpenId(openId);
    if (!user) throw new Error("Test user not found");

    const respondent = await db.getRespondentByUserId(user.id);
    if (!respondent) throw new Error("Respondent not found");

    const pastDate = new Date();
    pastDate.setHours(pastDate.getHours() - 1); // 1 hour ago

    await db.scheduleReminder(
      respondent.id,
      pastDate,
      15,
      "This should be pending"
    );

    // Get pending reminders
    const pendingReminders = await db.getPendingReminders();
    
    expect(Array.isArray(pendingReminders)).toBe(true);
    expect(pendingReminders.length).toBeGreaterThan(0);
    
    // Verify at least one is actually pending (scheduled for past, not sent)
    const hasPending = pendingReminders.some(r => 
      r.scheduledFor <= new Date() && !r.isSent
    );
    expect(hasPending).toBe(true);
  });
});
