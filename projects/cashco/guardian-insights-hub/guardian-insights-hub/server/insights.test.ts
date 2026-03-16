import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database module
vi.mock("./db", () => ({
  getAllRespondents: vi.fn().mockResolvedValue([
    { id: 1, name: "Michelle Craig", title: "Branch Manager", organization: "Venue Financial", createdAt: new Date() },
    { id: 2, name: "Katreena Morris", title: "Operations Manager", organization: "Cashco Financial", createdAt: new Date() },
  ]),
  getRespondentById: vi.fn().mockImplementation((id: number) => {
    if (id === 1) {
      return Promise.resolve({ id: 1, name: "Michelle Craig", title: "Branch Manager", organization: "Venue Financial", createdAt: new Date() });
    }
    return Promise.resolve(undefined);
  }),
  getSurveyResponsesByRespondent: vi.fn().mockResolvedValue([
    { id: 1, respondentId: 1, questionNumber: 1, questionText: "Test question", answerText: "Test answer", createdAt: new Date() },
  ]),
  getAllThemes: vi.fn().mockResolvedValue([
    { id: 1, name: "Empathy First Protocols", description: "Techniques for leading with empathy", displayOrder: 0, createdAt: new Date() },
  ]),
  getAllInsightsGroupedByTheme: vi.fn().mockResolvedValue([
    {
      theme: { id: 1, name: "Empathy First Protocols", description: "Techniques for leading with empathy", displayOrder: 0, createdAt: new Date() },
      insights: [
        { id: 1, themeId: 1, respondentId: 1, title: "Test Insight", description: "Test description", guardianBehavior: null, scriptIdea: null, upvotes: 5, downvotes: 1, createdAt: new Date(), updatedAt: new Date(), respondentName: "Michelle Craig" },
      ],
    },
  ]),
  getInsightsByTheme: vi.fn().mockResolvedValue([
    { id: 1, themeId: 1, respondentId: 1, title: "Test Insight", description: "Test description", guardianBehavior: null, scriptIdea: null, upvotes: 5, downvotes: 1, createdAt: new Date(), updatedAt: new Date(), respondentName: "Michelle Craig" },
  ]),
  getInsightById: vi.fn().mockImplementation((id: number) => {
    if (id === 1) {
      return Promise.resolve({ id: 1, themeId: 1, respondentId: 1, title: "Test Insight", description: "Test description", guardianBehavior: null, scriptIdea: null, upvotes: 5, downvotes: 1, createdAt: new Date(), updatedAt: new Date() });
    }
    return Promise.resolve(undefined);
  }),
  getCommentsByInsight: vi.fn().mockResolvedValue([]),
  getVoteByVisitorAndInsight: vi.fn().mockResolvedValue(null),
  castVote: vi.fn().mockResolvedValue(undefined),
  removeVote: vi.fn().mockResolvedValue(undefined),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAuthContext(role: "user" | "admin" = "user"): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("respondents router", () => {
  it("lists all respondents", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.respondents.list();

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Michelle Craig");
    expect(result[1].name).toBe("Katreena Morris");
  });

  it("gets a respondent by id with survey responses", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.respondents.getById({ id: 1 });

    expect(result.respondent.name).toBe("Michelle Craig");
    expect(result.responses).toHaveLength(1);
  });

  it("throws NOT_FOUND for non-existent respondent", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.respondents.getById({ id: 999 })).rejects.toThrow("Respondent not found");
  });
});

describe("themes router", () => {
  it("lists all themes", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.themes.list();

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Empathy First Protocols");
  });
});

describe("insights router", () => {
  it("lists insights grouped by theme", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.insights.listGroupedByTheme();

    expect(result).toHaveLength(1);
    expect(result[0].theme.name).toBe("Empathy First Protocols");
    expect(result[0].insights).toHaveLength(1);
    expect(result[0].insights[0].title).toBe("Test Insight");
  });

  it("gets insights by theme", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.insights.getByTheme({ themeId: 1 });

    expect(result).toHaveLength(1);
    expect(result[0].respondentName).toBe("Michelle Craig");
  });

  it("gets an insight by id with comments", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.insights.getById({ id: 1 });

    expect(result.insight.title).toBe("Test Insight");
    expect(result.comments).toHaveLength(0);
  });

  it("throws NOT_FOUND for non-existent insight", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.insights.getById({ id: 999 })).rejects.toThrow("Insight not found");
  });
});

describe("votes router", () => {
  it("casts a vote", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.cast({
      insightId: 1,
      visitorId: "test-visitor",
      voteType: "up",
    });

    expect(result.success).toBe(true);
  });

  it("removes a vote", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.remove({
      insightId: 1,
      visitorId: "test-visitor",
    });

    expect(result.success).toBe(true);
  });

  it("gets my vote for an insight", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.votes.getMyVote({
      insightId: 1,
      visitorId: "test-visitor",
    });

    expect(result).toBeNull();
  });
});

describe("auth router", () => {
  it("returns null for unauthenticated user", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result).toBeNull();
  });

  it("returns user for authenticated user", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.me();

    expect(result?.name).toBe("Test User");
    expect(result?.role).toBe("user");
  });

  it("logs out and clears cookie", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.auth.logout();

    expect(result.success).toBe(true);
    expect(ctx.res.clearCookie).toHaveBeenCalled();
  });
});
