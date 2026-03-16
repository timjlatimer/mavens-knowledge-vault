
/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Respondents table - tracks who has completed the questionnaire
 * Links to users table for authentication
 */
export const respondents = mysqlTable("respondents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  fullName: text("fullName").notNull(),
  email: varchar("email", { length: 320 }),
  jobTitle: text("jobTitle"),
  organization: text("organization"),
  dateSubmitted: timestamp("dateSubmitted").defaultNow().notNull(),
  isComplete: boolean("isComplete").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  userIdIdx: index("userId_idx").on(table.userId),
}));

export type Respondent = typeof respondents.$inferSelect;
export type InsertRespondent = typeof respondents.$inferInsert;

/**
 * Question definitions - stores all 30 Destiny Discovered questions
 */
export const questionDefinitions = mysqlTable("questionDefinitions", {
  id: int("id").autoincrement().primaryKey(),
  questionNumber: int("questionNumber").notNull().unique(),
  questionText: text("questionText").notNull(),
  questionCategory: varchar("questionCategory", { length: 100 }).notNull(),
  responseType: mysqlEnum("responseType", ["text", "list", "multiple_choice", "structured"]).notNull(),
  expectedItemCount: int("expectedItemCount"), // For list questions (e.g., 3, 6)
  options: text("options"), // JSON array for multiple choice
  helpText: text("helpText"),
});

export type QuestionDefinition = typeof questionDefinitions.$inferSelect;
export type InsertQuestionDefinition = typeof questionDefinitions.$inferInsert;

/**
 * Responses table - main storage for all question responses
 */
export const responses = mysqlTable("responses", {
  id: int("id").autoincrement().primaryKey(),
  respondentId: int("respondentId").notNull().references(() => respondents.id, { onDelete: "cascade" }),
  questionNumber: int("questionNumber").notNull(),
  questionCategory: varchar("questionCategory", { length: 100 }),
  responseType: mysqlEnum("responseType", ["text", "list", "multiple_choice", "structured"]).notNull(),
  responseText: text("responseText"), // For simple text responses
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  respondentIdIdx: index("respondentId_idx").on(table.respondentId),
  questionNumberIdx: index("questionNumber_idx").on(table.questionNumber),
}));

export type Response = typeof responses.$inferSelect;
export type InsertResponse = typeof responses.$inferInsert;

/**
 * List responses - for questions requiring multiple items (e.g., "three things", "six ways")
 */
export const listResponses = mysqlTable("listResponses", {
  id: int("id").autoincrement().primaryKey(),
  responseId: int("responseId").notNull().references(() => responses.id, { onDelete: "cascade" }),
  itemNumber: int("itemNumber").notNull(),
  itemText: text("itemText").notNull(),
  itemReason: text("itemReason"), // Optional explanation for the item
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  responseIdIdx: index("responseId_idx").on(table.responseId),
}));

export type ListResponse = typeof listResponses.$inferSelect;
export type InsertListResponse = typeof listResponses.$inferInsert;

/**
 * Multiple choice responses
 */