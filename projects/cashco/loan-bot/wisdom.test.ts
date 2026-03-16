import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("wisdom library", () => {
  it("lists all wisdom categories", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const categories = await caller.wisdom.categories();

    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
    
    // Verify category structure
    const category = categories[0];
    expect(category).toHaveProperty("id");
    expect(category).toHaveProperty("name");
    expect(category).toHaveProperty("slug");
    expect(category).toHaveProperty("description");
  });

  it("lists all wisdom entries", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const entries = await caller.wisdom.entries();

    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
    
    // Verify entry structure
    const entry = entries[0];
    expect(entry).toHaveProperty("id");
    expect(entry).toHaveProperty("title");
    expect(entry).toHaveProperty("slug");
    expect(entry).toHaveProperty("content");
    expect(entry).toHaveProperty("categoryId");
  });

  it("gets entries by category slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.wisdom.getCategoryBySlug({ slug: "north-star" });
    const entries = result.entries;

    expect(Array.isArray(entries)).toBe(true);
    // North Star category should have entries
    expect(entries.length).toBeGreaterThan(0);
  });

  it("gets a single entry by slug", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const entry = await caller.wisdom.getEntryBySlug({ slug: "relief-today-hope-tomorrow" });

    expect(entry).not.toBeNull();
    expect(entry?.title).toBe("Relief Today, Hope for Tomorrow");
    expect(entry?.content).toBeTruthy();
  });

  it("exports all wisdom data for bot integration", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const exportData = await caller.wisdom.export();

    expect(exportData).toHaveProperty("exportedAt");
    expect(exportData).toHaveProperty("categories");
    expect(exportData).toHaveProperty("entries");
    expect(Array.isArray(exportData.categories)).toBe(true);
    expect(Array.isArray(exportData.entries)).toBe(true);
    expect(exportData.categories.length).toBeGreaterThan(0);
    expect(exportData.entries.length).toBeGreaterThan(0);
  });

  it("searches wisdom entries", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const results = await caller.wisdom.search({ query: "empathy" });

    expect(Array.isArray(results)).toBe(true);
    // Should find entries related to empathy
    expect(results.length).toBeGreaterThan(0);
  });
});
