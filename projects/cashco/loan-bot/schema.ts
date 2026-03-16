import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

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
  notifyOnNewEntry: boolean("notifyOnNewEntry").default(true).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Frontline staff respondents who submitted survey answers
 */
export const respondents = mysqlTable("respondents", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  organization: varchar("organization", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Respondent = typeof respondents.$inferSelect;
export type InsertRespondent = typeof respondents.$inferInsert;

/**
 * Full survey responses from each respondent
 */
export const surveyResponses = mysqlTable("survey_responses", {
  id: int("id").autoincrement().primaryKey(),
  respondentId: int("respondentId").notNull(),
  questionNumber: int("questionNumber").notNull(),
  questionText: text("questionText").notNull(),
  answerText: text("answerText").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type SurveyResponse = typeof surveyResponses.$inferSelect;
export type InsertSurveyResponse = typeof surveyResponses.$inferInsert;

/**
 * Themes for grouping insights
 */
export const themes = mysqlTable("themes", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  description: text("description"),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Theme = typeof themes.$inferSelect;
export type InsertTheme = typeof themes.$inferInsert;

/**
 * Extracted insights from survey responses
 */
export const insights = mysqlTable("insights", {
  id: int("id").autoincrement().primaryKey(),
  themeId: int("themeId").notNull(),
  respondentId: int("respondentId").notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  guardianBehavior: text("guardianBehavior"),
  scriptIdea: text("scriptIdea"),
  upvotes: int("upvotes").default(0).notNull(),
  downvotes: int("downvotes").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Insight = typeof insights.$inferSelect;
export type InsertInsight = typeof insights.$inferInsert;

/**
 * Anonymous votes on insights
 */
export const votes = mysqlTable("votes", {
  id: int("id").autoincrement().primaryKey(),
  insightId: int("insightId").notNull(),
  visitorId: varchar("visitorId", { length: 64 }).notNull(),
  voteType: mysqlEnum("voteType", ["up", "down"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Vote = typeof votes.$inferSelect;
export type InsertVote = typeof votes.$inferInsert;

/**
 * Comments on insights (non-anonymous, shows commenter name)
 */
export const comments = mysqlTable("comments", {
  id: int("id").autoincrement().primaryKey(),
  insightId: int("insightId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Comment = typeof comments.$inferSelect;
export type InsertComment = typeof comments.$inferInsert;

/**
 * Wisdom Library Categories
 */
export const wisdomCategories = mysqlTable("wisdom_categories", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WisdomCategory = typeof wisdomCategories.$inferSelect;
export type InsertWisdomCategory = typeof wisdomCategories.$inferInsert;

/**
 * Wisdom Library Entries (protocols, scripts, anti-patterns, etc.)
 */
export const wisdomEntries = mysqlTable("wisdom_entries", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("categoryId").notNull(),
  slug: varchar("slug", { length: 200 }).notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  subtitle: varchar("subtitle", { length: 500 }),
  content: text("content").notNull(),
  scriptExample: text("scriptExample"),
  antiPattern: text("antiPattern"),
  source: varchar("source", { length: 255 }),
  sourceType: mysqlEnum("sourceType", ["frontline", "philosophy", "external", "anti-pattern"]).default("frontline").notNull(),
  tags: text("tags"),
  displayOrder: int("displayOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WisdomEntry = typeof wisdomEntries.$inferSelect;
export type InsertWisdomEntry = typeof wisdomEntries.$inferInsert;

/**
 * Story submissions from team members (pending admin review)
 */
export const storySubmissions = mysqlTable("story_submissions", {
  id: int("id").autoincrement().primaryKey(),
  // Submitter info
  submitterName: varchar("submitterName", { length: 255 }).notNull(),
  submitterEmail: varchar("submitterEmail", { length: 320 }),
  submitterTitle: varchar("submitterTitle", { length: 255 }),
  submitterOrganization: varchar("submitterOrganization", { length: 255 }),
  userId: int("userId"), // If logged in
  
  // Survey responses (the 10 questions)
  q1ToughestConversation: text("q1ToughestConversation"),
  q2BuildingTrust: text("q2BuildingTrust"),
  q3FirstInteraction: text("q3FirstInteraction"),
  q4DenialConversation: text("q4DenialConversation"),
  q5CommunityResources: text("q5CommunityResources"),
  q6ClientWins: text("q6ClientWins"),
  q7SecretWeapon: text("q7SecretWeapon"),
  q8IdealBotFeatures: text("q8IdealBotFeatures"),
  q9AdditionalThoughts: text("q9AdditionalThoughts"),
  q10MemorableStory: text("q10MemorableStory"),
  
  // Review status
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  reviewedBy: int("reviewedBy"),
  reviewedAt: timestamp("reviewedAt"),
  reviewNotes: text("reviewNotes"),
  
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StorySubmission = typeof storySubmissions.$inferSelect;
export type InsertStorySubmission = typeof storySubmissions.$inferInsert;


/**
 * Grades for survey responses (judging system)
 * Only users who have submitted their own story can grade others
 */
export const answerGrades = mysqlTable("answer_grades", {
  id: int("id").autoincrement().primaryKey(),
  surveyResponseId: int("surveyResponseId").notNull(),
  userId: int("userId").notNull(),
  grade: int("grade").notNull(), // 1-10 scale
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AnswerGrade = typeof answerGrades.$inferSelect;
export type InsertAnswerGrade = typeof answerGrades.$inferInsert;

/**
 * Track which users are eligible to judge (have submitted their own story)
 */
export const judgeEligibility = mysqlTable("judge_eligibility", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  submissionId: int("submissionId").notNull(), // Reference to their approved submission
  eligibleSince: timestamp("eligibleSince").defaultNow().notNull(),
});

export type JudgeEligibility = typeof judgeEligibility.$inferSelect;
export type InsertJudgeEligibility = typeof judgeEligibility.$inferInsert;
