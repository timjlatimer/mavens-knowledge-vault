import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { getDb, upsertUser } from "./db";
import { users } from "../drizzle/schema";
import { eq } from "drizzle-orm";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

async function createAdminContext(): Promise<{ ctx: TrpcContext }> {
  // Create admin user in database
  await upsertUser({
    openId: "admin-digest-test",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    lastSignedIn: new Date()
  });

  // Get the created user
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.select().from(users).where(eq(users.openId, "admin-digest-test")).limit(1);
  const dbUser = result[0];
  if (!dbUser) throw new Error("Failed to create admin user");

  const user: AuthenticatedUser = {
    id: dbUser.id,
    openId: dbUser.openId,
    email: dbUser.email,
    name: dbUser.name,
    loginMethod: dbUser.loginMethod || "manus",
    role: dbUser.role,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
    lastSignedIn: dbUser.lastSignedIn
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

describe("Weekly Digest System", () => {
  let adminCaller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(async () => {
    const { ctx } = await createAdminContext();
    adminCaller = appRouter.createCaller(ctx);
  });

  it("should have digest history query available", async () => {
    const history = await adminCaller.admin.getDigestHistory({ limit: 10 });
    
    expect(Array.isArray(history)).toBe(true);
    // History might be empty if no digests have been sent yet
  });

  it("should have manual digest trigger available", async () => {
    // This test just verifies the mutation exists and can be called
    // Note: This will actually attempt to send emails but should complete quickly
    // if there are no users needing digests
    const result = await adminCaller.admin.sendWeeklyDigestsNow();
    
    expect(result).toBeDefined();
    expect(typeof result.sent).toBe("number");
    expect(typeof result.failed).toBe("number");
  }, { timeout: 15000 }); // Increase timeout to 15 seconds

  it("should return digest history with correct structure", async () => {
    const history = await adminCaller.admin.getDigestHistory({ limit: 5 });
    
    expect(Array.isArray(history)).toBe(true);
    
    // If there are any records, check their structure
    if (history.length > 0) {
      const record = history[0];
      expect(record).toHaveProperty("id");
      expect(record).toHaveProperty("userId");
      expect(record).toHaveProperty("userName");
      expect(record).toHaveProperty("userEmail");
      expect(record).toHaveProperty("sentAt");
      expect(record).toHaveProperty("questionsAnswered");
      expect(record).toHaveProperty("progressPercentage");
    }
  });
});
