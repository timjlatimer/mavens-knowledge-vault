import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type CookieCall = {
  name: string;
  options: Record<string, unknown>;
};

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): { ctx: TrpcContext; clearedCookies: CookieCall[] } {
  const clearedCookies: CookieCall[] = [];

  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
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
    res: {
      clearCookie: (name: string, options: Record<string, unknown>) => {
        clearedCookies.push({ name, options });
      },
    } as TrpcContext["res"],
  };

  return { ctx, clearedCookies };
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

describe("submissions API", () => {
  describe("submissions.create", () => {
    it("accepts a story submission from public user", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.submissions.create({
        submitterName: "Test User",
        submitterEmail: "test@example.com",
        submitterTitle: "Branch Manager",
        submitterOrganization: "Maven",
        q1ToughestConversation: "A difficult conversation about missed payments.",
        q2BuildingTrust: "I always listen first before offering solutions.",
      });

      expect(result).toHaveProperty("id");
      expect(result).toHaveProperty("success", true);
      expect(typeof result.id).toBe("number");
    });

    it("requires submitter name", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.submissions.create({
          submitterName: "",
          q1ToughestConversation: "Some content",
        })
      ).rejects.toThrow();
    });
  });

  describe("submissions.stats (admin only)", () => {
    it("returns submission statistics for admin", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const stats = await caller.submissions.stats();

      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("pending");
      expect(stats).toHaveProperty("approved");
      expect(stats).toHaveProperty("rejected");
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.pending).toBe("number");
    });

    it("rejects non-admin users", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.submissions.stats()).rejects.toThrow();
    });
  });

  describe("submissions.pending (admin only)", () => {
    it("returns pending submissions for admin", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const pending = await caller.submissions.pending();

      expect(Array.isArray(pending)).toBe(true);
    });
  });

  describe("submissions.list (admin only)", () => {
    it("returns all submissions for admin", async () => {
      const { ctx } = createAdminContext();
      const caller = appRouter.createCaller(ctx);

      const all = await caller.submissions.list();

      expect(Array.isArray(all)).toBe(true);
    });
  });
});
