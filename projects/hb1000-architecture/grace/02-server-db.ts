// server/db.ts
// Database query helpers for Grace

import { db } from "./_core/db";
import { customerIntakes, conversationHistory, flypaperThoughts, knowledgeEntries } from "../drizzle/schema";
import { eq, desc, and, like, or } from "drizzle-orm";
import type { InsertCustomerIntake, InsertConversationMessage, InsertFlypaperThought, InsertKnowledgeEntry } from "../drizzle/schema";

// ============ Customer Intakes ============

export async function createCustomerIntake(data: InsertCustomerIntake) {
  const result = await db.insert(customerIntakes).values(data);
  return { id: result[0].insertId };
}

export async function getCustomerIntakes() {
  return db.select().from(customerIntakes).orderBy(desc(customerIntakes.createdAt));
}

export async function getCustomerIntakeById(id: number) {
  const results = await db.select().from(customerIntakes).where(eq(customerIntakes.id, id));
  return results[0] || null;
}

export async function updateIntakeStatus(id: number, status: "pending" | "contacted" | "completed" | "cancelled") {
  await db.update(customerIntakes).set({ status }).where(eq(customerIntakes.id, id));
}

// ============ Conversation History ============

export async function saveConversationMessage(data: InsertConversationMessage) {
  const result = await db.insert(conversationHistory).values(data);
  return { id: result[0].insertId };
}

export async function getConversationBySession(sessionId: string) {
  return db.select().from(conversationHistory)
    .where(eq(conversationHistory.sessionId, sessionId))
    .orderBy(conversationHistory.createdAt);
}

export async function getConversationByIntake(intakeId: number) {
  return db.select().from(conversationHistory)
    .where(eq(conversationHistory.intakeId, intakeId))
    .orderBy(conversationHistory.createdAt);
}

export async function linkConversationToIntake(sessionId: string, intakeId: number) {
  await db.update(conversationHistory)
    .set({ intakeId })
    .where(eq(conversationHistory.sessionId, sessionId));
}

// ============ Flypaper Thoughts ============

export async function createFlypaperThought(data: InsertFlypaperThought) {
  const result = await db.insert(flypaperThoughts).values(data);
  return { id: result[0].insertId };
}

export async function getFlypaperThoughts() {
  return db.select().from(flypaperThoughts).orderBy(desc(flypaperThoughts.createdAt));
}

export async function deleteFlypaperThought(id: number) {
  await db.delete(flypaperThoughts).where(eq(flypaperThoughts.id, id));
}

// ============ Knowledge Entries ============

export async function createKnowledgeEntry(data: InsertKnowledgeEntry) {
  const result = await db.insert(knowledgeEntries).values(data);
  return { id: result[0].insertId };
}

export async function getKnowledgeEntries(activeOnly = true) {
  if (activeOnly) {
    return db.select().from(knowledgeEntries)
      .where(eq(knowledgeEntries.isActive, 1))
      .orderBy(desc(knowledgeEntries.priority), knowledgeEntries.category);
  }
  return db.select().from(knowledgeEntries)
    .orderBy(desc(knowledgeEntries.priority), knowledgeEntries.category);
}

export async function updateKnowledgeEntry(id: number, data: Partial<InsertKnowledgeEntry>) {
  await db.update(knowledgeEntries).set(data).where(eq(knowledgeEntries.id, id));
}

export async function deleteKnowledgeEntry(id: number) {
  await db.delete(knowledgeEntries).where(eq(knowledgeEntries.id, id));
}

export async function searchKnowledge(query: string) {
  return db.select().from(knowledgeEntries)
    .where(
      and(
        eq(knowledgeEntries.isActive, 1),
        or(
          like(knowledgeEntries.title, `%${query}%`),
          like(knowledgeEntries.content, `%${query}%`),
          like(knowledgeEntries.tags, `%${query}%`)
        )
      )
    )
    .orderBy(desc(knowledgeEntries.priority));
}
