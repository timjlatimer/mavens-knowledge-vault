// drizzle/schema.ts
// Complete database schema for Grace - Maven's AI Assistant

import { mysqlTable, varchar, text, int, timestamp, mysqlEnum } from "drizzle-orm/mysql-core";

/**
 * Users table (provided by template - do not modify)
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("open_id", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  avatar: varchar("avatar", { length: 500 }),
  role: mysqlEnum("role", ["admin", "user"]).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

/**
 * Customer intakes - stores information collected by Grace
 */
export const customerIntakes = mysqlTable("customer_intakes", {
  id: int("id").autoincrement().primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  phone: varchar("phone", { length: 50 }),
  email: varchar("email", { length: 255 }),
  contactPreference: mysqlEnum("contact_preference", ["phone", "text", "email", "any"]).default("any"),
  story: text("story"),
  status: mysqlEnum("status", ["pending", "contacted", "completed", "cancelled"]).default("pending").notNull(),
  source: mysqlEnum("source", ["chat", "voice"]).default("chat").notNull(),
  sessionId: varchar("session_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

/**
 * Conversation history - stores all chat messages
 */
export const conversationHistory = mysqlTable("conversation_history", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("session_id", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant"]).notNull(),
  content: text("content").notNull(),
  intakeId: int("intake_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Flypaper thoughts - "Catch cloud butterflies" idea capture
 */
export const flypaperThoughts = mysqlTable("flypaper_thoughts", {
  id: int("id").autoincrement().primaryKey(),
  content: text("content").notNull(),
  category: varchar("category", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Knowledge entries - stores project knowledge, decisions, protocols
 */
export const knowledgeEntries = mysqlTable("knowledge_entries", {
  id: int("id").autoincrement().primaryKey(),
  category: mysqlEnum("category", [
    "persona", "protocol", "preference", "context",
    "decision", "voice", "technical", "feature"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  useWhen: text("use_when"),
  content: text("content").notNull(),
  tags: varchar("tags", { length: 500 }),
  priority: int("priority").default(0),
  isActive: int("is_active").default(1),
  createdBy: varchar("created_by", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CustomerIntake = typeof customerIntakes.$inferSelect;
export type InsertCustomerIntake = typeof customerIntakes.$inferInsert;
export type ConversationMessage = typeof conversationHistory.$inferSelect;
export type InsertConversationMessage = typeof conversationHistory.$inferInsert;
export type FlypaperThought = typeof flypaperThoughts.$inferSelect;
export type InsertFlypaperThought = typeof flypaperThoughts.$inferInsert;
export type KnowledgeEntry = typeof knowledgeEntries.$inferSelect;
export type InsertKnowledgeEntry = typeof knowledgeEntries.$inferInsert;
