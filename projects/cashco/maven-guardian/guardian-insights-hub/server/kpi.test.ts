import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  getKPIStats: vi.fn().mockResolvedValue({
    totalInsights: 21,
    totalVotes: 15,
    totalComments: 3,
    totalRespondents: 5,
    totalThemes: 9,
    totalParticipants: 8,
    topThemes: [
      { themeId: 1, themeName: "Empathy First Protocols", totalVotes: 10, netScore: 8 },
      { themeId: 2, themeName: "The Rock Bottom Partnership", totalVotes: 5, netScore: 3 },
    ],
    topInsights: [
      { id: 1, title: "The Empathy First Protocol", upvotes: 5, downvotes: 0, netScore: 5, respondentName: "Michelle Craig", themeName: "Empathy First Protocols" },
    ],
    contributorLeaderboard: [
      { respondentId: 1, respondentName: "Michelle Craig", insightCount: 5, totalUpvotes: 10, totalDownvotes: 2, netScore: 8 },
    ],
  }),
  getVotingTrends: vi.fn().mockResolvedValue([
    { date: "2026-01-28", upvotes: 10, downvotes: 2, totalVotes: 12 },
    { date: "2026-01-27", upvotes: 5, downvotes: 1, totalVotes: 6 },
  ]),
  getThemePerformance: vi.fn().mockResolvedValue([
    { themeId: 1, themeName: "Empathy First Protocols", insightCount: 5, totalUpvotes: 10, totalDownvotes: 2, netScore: 8, avgScore: 1.6 },
    { themeId: 2, themeName: "The Rock Bottom Partnership", insightCount: 3, totalUpvotes: 5, totalDownvotes: 1, netScore: 4, avgScore: 1.33 },
  ]),
}));

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

describe("kpi.getStats", () => {
  it("returns KPI statistics", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.kpi.getStats();

    expect(result).toHaveProperty("totalInsights");
    expect(result).toHaveProperty("totalVotes");
    expect(result).toHaveProperty("totalComments");
    expect(result).toHaveProperty("totalRespondents");
    expect(result).toHaveProperty("totalThemes");
    expect(result).toHaveProperty("totalParticipants");
    expect(result).toHaveProperty("topThemes");
    expect(result).toHaveProperty("topInsights");
    expect(result).toHaveProperty("contributorLeaderboard");
    expect(result.totalInsights).toBe(21);
    expect(result.totalRespondents).toBe(5);
  });
});

describe("kpi.getVotingTrends", () => {
  it("returns voting trends data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.kpi.getVotingTrends();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("date");
    expect(result[0]).toHaveProperty("upvotes");
    expect(result[0]).toHaveProperty("downvotes");
    expect(result[0]).toHaveProperty("totalVotes");
  });
});

describe("kpi.getThemePerformance", () => {
  it("returns theme performance data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.kpi.getThemePerformance();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("themeId");
    expect(result[0]).toHaveProperty("themeName");
    expect(result[0]).toHaveProperty("insightCount");
    expect(result[0]).toHaveProperty("netScore");
  });
});
