import { eq, desc, sql, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, users, 
  respondents, InsertRespondent, Respondent,
  surveyResponses, InsertSurveyResponse, SurveyResponse,
  themes, InsertTheme, Theme,
  insights, InsertInsight, Insight,
  votes, InsertVote, Vote,
  comments, InsertComment, Comment,
  storySubmissions, InsertStorySubmission, StorySubmission,
  answerGrades, InsertAnswerGrade, AnswerGrade,
  judgeEligibility, InsertJudgeEligibility, JudgeEligibility
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ===== USER QUERIES =====
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllUsersForNotification() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select().from(users).where(eq(users.notifyOnNewEntry, true));
  return result;
}

// ===== RESPONDENT QUERIES =====
export async function createRespondent(data: InsertRespondent): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(respondents).values(data);
  return Number(result[0].insertId);
}

export async function getAllRespondents(): Promise<Respondent[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(respondents).orderBy(respondents.name);
}

export async function getRespondentById(id: number): Promise<Respondent | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(respondents).where(eq(respondents.id, id)).limit(1);
  return result[0];
}

// ===== SURVEY RESPONSE QUERIES =====
export async function createSurveyResponse(data: InsertSurveyResponse): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(surveyResponses).values(data);
  return Number(result[0].insertId);
}

export async function getSurveyResponsesByRespondent(respondentId: number): Promise<SurveyResponse[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(surveyResponses)
    .where(eq(surveyResponses.respondentId, respondentId))
    .orderBy(surveyResponses.questionNumber);
}

// ===== THEME QUERIES =====
export async function createTheme(data: InsertTheme): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(themes).values(data);
  return Number(result[0].insertId);
}

export async function getAllThemes(): Promise<Theme[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(themes).orderBy(themes.displayOrder);
}

export async function getThemeByName(name: string): Promise<Theme | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(themes).where(eq(themes.name, name)).limit(1);
  return result[0];
}

export async function getOrCreateTheme(name: string, description?: string): Promise<number> {
  const existing = await getThemeByName(name);
  if (existing) return existing.id;
  return await createTheme({ name, description });
}

// ===== INSIGHT QUERIES =====
export async function createInsight(data: InsertInsight): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(insights).values(data);
  return Number(result[0].insertId);
}

export async function getInsightsByTheme(themeId: number): Promise<(Insight & { respondentName: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: insights.id,
    themeId: insights.themeId,
    respondentId: insights.respondentId,
    title: insights.title,
    description: insights.description,
    guardianBehavior: insights.guardianBehavior,
    scriptIdea: insights.scriptIdea,
    upvotes: insights.upvotes,
    downvotes: insights.downvotes,
    createdAt: insights.createdAt,
    updatedAt: insights.updatedAt,
    respondentName: respondents.name,
  })
    .from(insights)
    .innerJoin(respondents, eq(insights.respondentId, respondents.id))
    .where(eq(insights.themeId, themeId))
    .orderBy(desc(sql`${insights.upvotes} - ${insights.downvotes}`));
  
  return result;
}

export async function getAllInsightsGroupedByTheme() {
  const db = await getDb();
  if (!db) return [];
  
  const allThemes = await getAllThemes();
  const result = [];
  
  for (const theme of allThemes) {
    const themeInsights = await getInsightsByTheme(theme.id);
    result.push({
      theme,
      insights: themeInsights,
    });
  }
  
  return result;
}

export async function getInsightById(id: number): Promise<Insight | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(insights).where(eq(insights.id, id)).limit(1);
  return result[0];
}

// ===== VOTE QUERIES =====
export async function getVoteByVisitorAndInsight(visitorId: string, insightId: number): Promise<Vote | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(votes)
    .where(and(eq(votes.visitorId, visitorId), eq(votes.insightId, insightId)))
    .limit(1);
  return result[0];
}

export async function castVote(data: InsertVote): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getVoteByVisitorAndInsight(data.visitorId, data.insightId);
  
  if (existing) {
    // Update existing vote
    if (existing.voteType !== data.voteType) {
      // Changing vote direction
      await db.update(votes).set({ voteType: data.voteType }).where(eq(votes.id, existing.id));
      
      // Update insight counts
      if (data.voteType === 'up') {
        await db.update(insights).set({
          upvotes: sql`${insights.upvotes} + 1`,
          downvotes: sql`${insights.downvotes} - 1`,
        }).where(eq(insights.id, data.insightId));
      } else {
        await db.update(insights).set({
          upvotes: sql`${insights.upvotes} - 1`,
          downvotes: sql`${insights.downvotes} + 1`,
        }).where(eq(insights.id, data.insightId));
      }
    }
  } else {
    // New vote
    await db.insert(votes).values(data);
    
    if (data.voteType === 'up') {
      await db.update(insights).set({
        upvotes: sql`${insights.upvotes} + 1`,
      }).where(eq(insights.id, data.insightId));
    } else {
      await db.update(insights).set({
        downvotes: sql`${insights.downvotes} + 1`,
      }).where(eq(insights.id, data.insightId));
    }
  }
}

export async function removeVote(visitorId: string, insightId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await getVoteByVisitorAndInsight(visitorId, insightId);
  if (!existing) return;
  
  await db.delete(votes).where(eq(votes.id, existing.id));
  
  if (existing.voteType === 'up') {
    await db.update(insights).set({
      upvotes: sql`${insights.upvotes} - 1`,
    }).where(eq(insights.id, insightId));
  } else {
    await db.update(insights).set({
      downvotes: sql`${insights.downvotes} - 1`,
    }).where(eq(insights.id, insightId));
  }
}

// ===== COMMENT QUERIES =====
export async function createComment(data: InsertComment): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(comments).values(data);
  return Number(result[0].insertId);
}

export async function getCommentsByInsight(insightId: number): Promise<(Comment & { userName: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: comments.id,
    insightId: comments.insightId,
    userId: comments.userId,
    content: comments.content,
    createdAt: comments.createdAt,
    userName: users.name,
  })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.insightId, insightId))
    .orderBy(desc(comments.createdAt));
  
  return result.map(r => ({ ...r, userName: r.userName || 'Anonymous' }));
}


// ===== KPI / ANALYTICS QUERIES =====
export async function getKPIStats() {
  const db = await getDb();
  if (!db) return {
    totalInsights: 0,
    totalVotes: 0,
    totalComments: 0,
    totalRespondents: 0,
    totalThemes: 0,
    totalParticipants: 0,
    topThemes: [],
    topInsights: [],
    recentActivity: [],
  };
  
  // Basic counts
  const [insightCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(insights);
  const [voteCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(votes);
  const [commentCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(comments);
  const [respondentCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(respondents);
  const [themeCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(themes);
  
  // Unique voters (participants)
  const [participantCount] = await db.select({ count: sql<number>`COUNT(DISTINCT visitorId)` }).from(votes);
  
  // Top themes by total votes
  const topThemesResult = await db.select({
    themeId: insights.themeId,
    themeName: themes.name,
    totalVotes: sql<number>`SUM(${insights.upvotes} + ${insights.downvotes})`,
    netScore: sql<number>`SUM(${insights.upvotes} - ${insights.downvotes})`,
  })
    .from(insights)
    .innerJoin(themes, eq(insights.themeId, themes.id))
    .groupBy(insights.themeId, themes.name)
    .orderBy(desc(sql`SUM(${insights.upvotes} - ${insights.downvotes})`))
    .limit(5);
  
  // Top insights by net score
  const topInsightsResult = await db.select({
    id: insights.id,
    title: insights.title,
    upvotes: insights.upvotes,
    downvotes: insights.downvotes,
    netScore: sql<number>`${insights.upvotes} - ${insights.downvotes}`,
    respondentName: respondents.name,
    themeName: themes.name,
  })
    .from(insights)
    .innerJoin(respondents, eq(insights.respondentId, respondents.id))
    .innerJoin(themes, eq(insights.themeId, themes.id))
    .orderBy(desc(sql`${insights.upvotes} - ${insights.downvotes}`))
    .limit(10);
  
  // Contributor leaderboard (respondents by total net score of their insights)
  const contributorLeaderboard = await db.select({
    respondentId: respondents.id,
    respondentName: respondents.name,
    insightCount: sql<number>`COUNT(${insights.id})`,
    totalUpvotes: sql<number>`SUM(${insights.upvotes})`,
    totalDownvotes: sql<number>`SUM(${insights.downvotes})`,
    netScore: sql<number>`SUM(${insights.upvotes} - ${insights.downvotes})`,
  })
    .from(respondents)
    .leftJoin(insights, eq(respondents.id, insights.respondentId))
    .groupBy(respondents.id, respondents.name)
    .orderBy(desc(sql`SUM(${insights.upvotes} - ${insights.downvotes})`));
  
  return {
    totalInsights: Number(insightCount?.count || 0),
    totalVotes: Number(voteCount?.count || 0),
    totalComments: Number(commentCount?.count || 0),
    totalRespondents: Number(respondentCount?.count || 0),
    totalThemes: Number(themeCount?.count || 0),
    totalParticipants: Number(participantCount?.count || 0),
    topThemes: topThemesResult,
    topInsights: topInsightsResult,
    contributorLeaderboard,
  };
}

export async function getVotingTrends() {
  const db = await getDb();
  if (!db) return [];
  
  // Get votes grouped by date
  const result = await db.select({
    date: sql<string>`DATE(${votes.createdAt})`,
    upvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'up' THEN 1 ELSE 0 END)`,
    downvotes: sql<number>`SUM(CASE WHEN ${votes.voteType} = 'down' THEN 1 ELSE 0 END)`,
    totalVotes: sql<number>`COUNT(*)`,
  })
    .from(votes)
    .groupBy(sql`DATE(${votes.createdAt})`)
    .orderBy(sql`DATE(${votes.createdAt})`);
  
  return result;
}

export async function getThemePerformance() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    themeId: themes.id,
    themeName: themes.name,
    insightCount: sql<number>`COUNT(${insights.id})`,
    totalUpvotes: sql<number>`SUM(${insights.upvotes})`,
    totalDownvotes: sql<number>`SUM(${insights.downvotes})`,
    netScore: sql<number>`SUM(${insights.upvotes} - ${insights.downvotes})`,
    avgScore: sql<number>`AVG(${insights.upvotes} - ${insights.downvotes})`,
  })
    .from(themes)
    .leftJoin(insights, eq(themes.id, insights.themeId))
    .groupBy(themes.id, themes.name)
    .orderBy(desc(sql`SUM(${insights.upvotes} - ${insights.downvotes})`));
  
  return result;
}

// ===== WISDOM LIBRARY QUERIES =====
import { wisdomCategories, wisdomEntries, InsertWisdomCategory, InsertWisdomEntry, WisdomCategory, WisdomEntry } from "../drizzle/schema";

export async function getAllWisdomCategories(): Promise<WisdomCategory[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(wisdomCategories).orderBy(wisdomCategories.displayOrder);
}

export async function getWisdomCategoryBySlug(slug: string): Promise<WisdomCategory | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(wisdomCategories).where(eq(wisdomCategories.slug, slug)).limit(1);
  return result[0];
}

export async function createWisdomCategory(data: InsertWisdomCategory): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(wisdomCategories).values(data);
  return Number(result[0].insertId);
}

export async function getAllWisdomEntries(): Promise<(WisdomEntry & { categoryName: string; categorySlug: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({
    id: wisdomEntries.id,
    categoryId: wisdomEntries.categoryId,
    slug: wisdomEntries.slug,
    title: wisdomEntries.title,
    subtitle: wisdomEntries.subtitle,
    content: wisdomEntries.content,
    scriptExample: wisdomEntries.scriptExample,
    antiPattern: wisdomEntries.antiPattern,
    source: wisdomEntries.source,
    sourceType: wisdomEntries.sourceType,
    tags: wisdomEntries.tags,
    displayOrder: wisdomEntries.displayOrder,
    createdAt: wisdomEntries.createdAt,
    updatedAt: wisdomEntries.updatedAt,
    categoryName: wisdomCategories.name,
    categorySlug: wisdomCategories.slug,
  })
    .from(wisdomEntries)
    .innerJoin(wisdomCategories, eq(wisdomEntries.categoryId, wisdomCategories.id))
    .orderBy(wisdomCategories.displayOrder, wisdomEntries.displayOrder);
  
  return result;
}

export async function getWisdomEntriesByCategory(categoryId: number): Promise<WisdomEntry[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(wisdomEntries)
    .where(eq(wisdomEntries.categoryId, categoryId))
    .orderBy(wisdomEntries.displayOrder);
}

export async function getWisdomEntryBySlug(slug: string): Promise<(WisdomEntry & { categoryName: string; categorySlug: string }) | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select({
    id: wisdomEntries.id,
    categoryId: wisdomEntries.categoryId,
    slug: wisdomEntries.slug,
    title: wisdomEntries.title,
    subtitle: wisdomEntries.subtitle,
    content: wisdomEntries.content,
    scriptExample: wisdomEntries.scriptExample,
    antiPattern: wisdomEntries.antiPattern,
    source: wisdomEntries.source,
    sourceType: wisdomEntries.sourceType,
    tags: wisdomEntries.tags,
    displayOrder: wisdomEntries.displayOrder,
    createdAt: wisdomEntries.createdAt,
    updatedAt: wisdomEntries.updatedAt,
    categoryName: wisdomCategories.name,
    categorySlug: wisdomCategories.slug,
  })
    .from(wisdomEntries)
    .innerJoin(wisdomCategories, eq(wisdomEntries.categoryId, wisdomCategories.id))
    .where(eq(wisdomEntries.slug, slug))
    .limit(1);
  
  return result[0];
}

export async function createWisdomEntry(data: InsertWisdomEntry): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(wisdomEntries).values(data);
  return Number(result[0].insertId);
}

export async function getOrCreateWisdomCategory(slug: string, name: string, description?: string, icon?: string): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(wisdomCategories).where(eq(wisdomCategories.slug, slug)).limit(1);
  if (existing.length > 0) {
    return existing[0].id;
  }
  
  const result = await db.insert(wisdomCategories).values({ slug, name, description, icon });
  return Number(result[0].insertId);
}

export async function getWisdomLibraryStats() {
  const db = await getDb();
  if (!db) return { totalCategories: 0, totalEntries: 0, entriesByCategory: [], sourceBreakdown: [] };
  
  const [categoryCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(wisdomCategories);
  const [entryCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(wisdomEntries);
  
  const entriesByCategory = await db.select({
    categoryId: wisdomCategories.id,
    categoryName: wisdomCategories.name,
    categorySlug: wisdomCategories.slug,
    entryCount: sql<number>`COUNT(${wisdomEntries.id})`,
  })
    .from(wisdomCategories)
    .leftJoin(wisdomEntries, eq(wisdomCategories.id, wisdomEntries.categoryId))
    .groupBy(wisdomCategories.id, wisdomCategories.name, wisdomCategories.slug)
    .orderBy(wisdomCategories.displayOrder);
  
  const sourceBreakdown = await db.select({
    sourceType: wisdomEntries.sourceType,
    count: sql<number>`COUNT(*)`,
  })
    .from(wisdomEntries)
    .groupBy(wisdomEntries.sourceType);
  
  return {
    totalCategories: Number(categoryCount?.count || 0),
    totalEntries: Number(entryCount?.count || 0),
    entriesByCategory,
    sourceBreakdown,
  };
}

export async function searchWisdomEntries(query: string): Promise<(WisdomEntry & { categoryName: string; categorySlug: string })[]> {
  const db = await getDb();
  if (!db) return [];
  
  const searchTerm = `%${query}%`;
  
  const result = await db.select({
    id: wisdomEntries.id,
    categoryId: wisdomEntries.categoryId,
    slug: wisdomEntries.slug,
    title: wisdomEntries.title,
    subtitle: wisdomEntries.subtitle,
    content: wisdomEntries.content,
    scriptExample: wisdomEntries.scriptExample,
    antiPattern: wisdomEntries.antiPattern,
    source: wisdomEntries.source,
    sourceType: wisdomEntries.sourceType,
    tags: wisdomEntries.tags,
    displayOrder: wisdomEntries.displayOrder,
    createdAt: wisdomEntries.createdAt,
    updatedAt: wisdomEntries.updatedAt,
    categoryName: wisdomCategories.name,
    categorySlug: wisdomCategories.slug,
  })
    .from(wisdomEntries)
    .innerJoin(wisdomCategories, eq(wisdomEntries.categoryId, wisdomCategories.id))
    .where(
      sql`${wisdomEntries.title} LIKE ${searchTerm} OR ${wisdomEntries.content} LIKE ${searchTerm} OR ${wisdomEntries.tags} LIKE ${searchTerm}`
    )
    .orderBy(wisdomCategories.displayOrder, wisdomEntries.displayOrder);
  
  return result;
}


// ===== STORY SUBMISSION QUERIES =====

export async function createStorySubmission(submission: Omit<InsertStorySubmission, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(storySubmissions).values(submission);
  return result[0].insertId;
}

export async function getAllStorySubmissions(): Promise<StorySubmission[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(storySubmissions).orderBy(desc(storySubmissions.createdAt));
}

export async function getPendingStorySubmissions(): Promise<StorySubmission[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(storySubmissions)
    .where(eq(storySubmissions.status, 'pending'))
    .orderBy(desc(storySubmissions.createdAt));
}

export async function getApprovedStorySubmissions(): Promise<StorySubmission[]> {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select()
    .from(storySubmissions)
    .where(eq(storySubmissions.status, 'approved'))
    .orderBy(desc(storySubmissions.createdAt));
}

export async function getStorySubmissionById(id: number): Promise<StorySubmission | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select()
    .from(storySubmissions)
    .where(eq(storySubmissions.id, id))
    .limit(1);
  
  return result[0];
}

export async function updateStorySubmissionStatus(
  id: number, 
  status: 'pending' | 'approved' | 'rejected',
  reviewedBy: number,
  reviewNotes?: string
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.update(storySubmissions)
    .set({
      status,
      reviewedBy,
      reviewedAt: new Date(),
      reviewNotes: reviewNotes || null,
    })
    .where(eq(storySubmissions.id, id));
}

export async function getStorySubmissionStats(): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}> {
  const db = await getDb();
  if (!db) return { total: 0, pending: 0, approved: 0, rejected: 0 };
  
  const stats = await db.select({
    status: storySubmissions.status,
    count: sql<number>`COUNT(*)`,
  })
    .from(storySubmissions)
    .groupBy(storySubmissions.status);
  
  const result = { total: 0, pending: 0, approved: 0, rejected: 0 };
  for (const stat of stats) {
    const count = Number(stat.count);
    result.total += count;
    if (stat.status === 'pending') result.pending = count;
    if (stat.status === 'approved') result.approved = count;
    if (stat.status === 'rejected') result.rejected = count;
  }
  
  return result;
}


// ===== GRADING & JUDGING QUERIES =====

export async function checkJudgeEligibility(userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  const result = await db.select().from(judgeEligibility)
    .where(eq(judgeEligibility.userId, userId))
    .limit(1);
  return result.length > 0;
}

export async function grantJudgeEligibility(userId: number, submissionId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  await db.insert(judgeEligibility).values({
    userId,
    submissionId,
  }).onDuplicateKeyUpdate({
    set: { submissionId },
  });
}

export async function gradeAnswer(
  surveyResponseId: number,
  userId: number,
  grade: number
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if user already graded this response
  const existing = await db.select().from(answerGrades)
    .where(and(
      eq(answerGrades.surveyResponseId, surveyResponseId),
      eq(answerGrades.userId, userId)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    // Update existing grade
    await db.update(answerGrades)
      .set({ grade })
      .where(eq(answerGrades.id, existing[0].id));
  } else {
    // Create new grade
    await db.insert(answerGrades).values({
      surveyResponseId,
      userId,
      grade,
    });
  }
}

export async function getUserGradeForAnswer(
  surveyResponseId: number,
  userId: number
): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(answerGrades)
    .where(and(
      eq(answerGrades.surveyResponseId, surveyResponseId),
      eq(answerGrades.userId, userId)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0].grade : null;
}

export async function getAverageGradeForAnswer(surveyResponseId: number): Promise<{
  average: number;
  count: number;
}> {
  const db = await getDb();
  if (!db) return { average: 0, count: 0 };
  
  const result = await db.select({
    average: sql<number>`AVG(${answerGrades.grade})`,
    count: sql<number>`COUNT(*)`,
  })
    .from(answerGrades)
    .where(eq(answerGrades.surveyResponseId, surveyResponseId));
  
  return {
    average: Number(result[0]?.average) || 0,
    count: Number(result[0]?.count) || 0,
  };
}

export async function getAllAnswersByQuestion(): Promise<{
  questionNumber: number;
  questionText: string;
  answers: {
    id: number;
    respondentId: number;
    respondentName: string;
    answerText: string;
    averageGrade: number;
    gradeCount: number;
  }[];
}[]> {
  const db = await getDb();
  if (!db) return [];
  
  // Get all unique questions
  const questions = await db.selectDistinct({
    questionNumber: surveyResponses.questionNumber,
    questionText: surveyResponses.questionText,
  })
    .from(surveyResponses)
    .orderBy(surveyResponses.questionNumber);
  
  const result = [];
  
  for (const q of questions) {
    // Get all answers for this question with grades
    const answers = await db.select({
      id: surveyResponses.id,
      respondentId: surveyResponses.respondentId,
      respondentName: respondents.name,
      answerText: surveyResponses.answerText,
    })
      .from(surveyResponses)
      .innerJoin(respondents, eq(surveyResponses.respondentId, respondents.id))
      .where(eq(surveyResponses.questionNumber, q.questionNumber));
    
    // Get grades for each answer
    const answersWithGrades = await Promise.all(answers.map(async (a) => {
      const gradeInfo = await getAverageGradeForAnswer(a.id);
      return {
        ...a,
        averageGrade: gradeInfo.average,
        gradeCount: gradeInfo.count,
      };
    }));
    
    // Sort by average grade descending
    answersWithGrades.sort((a, b) => b.averageGrade - a.averageGrade);
    
    result.push({
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      answers: answersWithGrades,
    });
  }
  
  return result;
}

export async function getJudgingStats(): Promise<{
  totalJudges: number;
  totalGrades: number;
  questionsGraded: number;
  topAnswers: {
    questionNumber: number;
    questionText: string;
    respondentName: string;
    averageGrade: number;
  }[];
}> {
  const db = await getDb();
  if (!db) return { totalJudges: 0, totalGrades: 0, questionsGraded: 0, topAnswers: [] };
  
  // Count judges
  const judgesResult = await db.select({
    count: sql<number>`COUNT(*)`,
  }).from(judgeEligibility);
  const totalJudges = Number(judgesResult[0]?.count) || 0;
  
  // Count total grades
  const gradesResult = await db.select({
    count: sql<number>`COUNT(*)`,
  }).from(answerGrades);
  const totalGrades = Number(gradesResult[0]?.count) || 0;
  
  // Count questions with at least one graded answer
  const questionsResult = await db.selectDistinct({
    questionNumber: surveyResponses.questionNumber,
  })
    .from(surveyResponses)
    .innerJoin(answerGrades, eq(surveyResponses.id, answerGrades.surveyResponseId));
  const questionsGraded = questionsResult.length;
  
  // Get top answer for each question
  const allByQuestion = await getAllAnswersByQuestion();
  const topAnswers = allByQuestion
    .filter(q => q.answers.length > 0 && q.answers[0].gradeCount > 0)
    .map(q => ({
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      respondentName: q.answers[0].respondentName,
      averageGrade: q.answers[0].averageGrade,
    }));
  
  return { totalJudges, totalGrades, questionsGraded, topAnswers };
}


// ===== PROGRESS TRACKING QUERIES =====

export async function getUserProgressStats(userId: number): Promise<{
  hasSubmitted: boolean;
  submissionStatus: 'none' | 'pending' | 'approved' | 'rejected';
  submissionId: number | null;
  isEligibleJudge: boolean;
  questionsAnswered: number;
  totalQuestions: number;
  gradesGiven: number;
  totalAnswersToGrade: number;
}> {
  const db = await getDb();
  if (!db) return {
    hasSubmitted: false,
    submissionStatus: 'none',
    submissionId: null,
    isEligibleJudge: false,
    questionsAnswered: 0,
    totalQuestions: 10,
    gradesGiven: 0,
    totalAnswersToGrade: 0,
  };
  
  // Check user's submission status
  const submission = await db.select()
    .from(storySubmissions)
    .where(eq(storySubmissions.userId, userId))
    .orderBy(desc(storySubmissions.createdAt))
    .limit(1);
  
  const hasSubmitted = submission.length > 0;
  const submissionStatus = hasSubmitted ? submission[0].status : 'none';
  const submissionId = hasSubmitted ? submission[0].id : null;
  
  // Check judge eligibility
  const isEligibleJudge = await checkJudgeEligibility(userId);
  
  // Count questions answered (from their submission)
  let questionsAnswered = 0;
  if (hasSubmitted) {
    const answers = [
      submission[0].q1ToughestConversation,
      submission[0].q2BuildingTrust,
      submission[0].q3FirstInteraction,
      submission[0].q4DenialConversation,
      submission[0].q5CommunityResources,
      submission[0].q6ClientWins,
      submission[0].q7SecretWeapon,
      submission[0].q8IdealBotFeatures,
      submission[0].q9AdditionalThoughts,
      submission[0].q10MemorableStory,
    ];
    questionsAnswered = answers.filter(a => a && a.trim().length > 0).length;
  }
  
  // Count grades given by this user
  const gradesResult = await db.select({
    count: sql<number>`COUNT(*)`,
  })
    .from(answerGrades)
    .where(eq(answerGrades.userId, userId));
  const gradesGiven = Number(gradesResult[0]?.count) || 0;
  
  // Count total answers available to grade
  const totalAnswersResult = await db.select({
    count: sql<number>`COUNT(*)`,
  }).from(surveyResponses);
  const totalAnswersToGrade = Number(totalAnswersResult[0]?.count) || 0;
  
  return {
    hasSubmitted,
    submissionStatus,
    submissionId,
    isEligibleJudge,
    questionsAnswered,
    totalQuestions: 10,
    gradesGiven,
    totalAnswersToGrade,
  };
}

// ===== BEST ANSWERS QUERIES =====

export async function getBestAnswersSummary(): Promise<{
  questionNumber: number;
  questionText: string;
  bestAnswer: {
    id: number;
    respondentName: string;
    respondentTitle: string | null;
    answerText: string;
    averageGrade: number;
    gradeCount: number;
  } | null;
  runnerUp: {
    id: number;
    respondentName: string;
    answerText: string;
    averageGrade: number;
    gradeCount: number;
  } | null;
}[]> {
  const db = await getDb();
  if (!db) return [];
  
  const allByQuestion = await getAllAnswersByQuestion();
  
  const result = await Promise.all(allByQuestion.map(async (q) => {
    let bestAnswer = null;
    let runnerUp = null;
    
    if (q.answers.length > 0 && q.answers[0].gradeCount > 0) {
      // Get respondent details for best answer
      const respondent = await getRespondentById(q.answers[0].respondentId);
      bestAnswer = {
        id: q.answers[0].id,
        respondentName: q.answers[0].respondentName,
        respondentTitle: respondent?.title || null,
        answerText: q.answers[0].answerText,
        averageGrade: q.answers[0].averageGrade,
        gradeCount: q.answers[0].gradeCount,
      };
    }
    
    if (q.answers.length > 1 && q.answers[1].gradeCount > 0) {
      runnerUp = {
        id: q.answers[1].id,
        respondentName: q.answers[1].respondentName,
        answerText: q.answers[1].answerText,
        averageGrade: q.answers[1].averageGrade,
        gradeCount: q.answers[1].gradeCount,
      };
    }
    
    return {
      questionNumber: q.questionNumber,
      questionText: q.questionText,
      bestAnswer,
      runnerUp,
    };
  }));
  
  return result;
}

// ===== INCOMPLETE SUBMISSIONS QUERIES =====

export async function getIncompleteSubmissions(): Promise<{
  id: number;
  userId: number;
  userName: string;
  userEmail: string | null;
  questionsAnswered: number;
  createdAt: Date;
  daysSinceCreated: number;
}[]> {
  const db = await getDb();
  if (!db) return [];
  
  // Get all pending submissions
  const submissions = await db.select({
    id: storySubmissions.id,
    userId: storySubmissions.userId,
    userName: storySubmissions.submitterName,
    userEmail: storySubmissions.submitterEmail,
    q1: storySubmissions.q1ToughestConversation,
    q2: storySubmissions.q2BuildingTrust,
    q3: storySubmissions.q3FirstInteraction,
    q4: storySubmissions.q4DenialConversation,
    q5: storySubmissions.q5CommunityResources,
    q6: storySubmissions.q6ClientWins,
    q7: storySubmissions.q7SecretWeapon,
    q8: storySubmissions.q8IdealBotFeatures,
    q9: storySubmissions.q9AdditionalThoughts,
    q10: storySubmissions.q10MemorableStory,
    createdAt: storySubmissions.createdAt,
  })
    .from(storySubmissions)
    .where(eq(storySubmissions.status, 'pending'))
    .orderBy(storySubmissions.createdAt);
  
  const now = new Date();
  
  return submissions
    .filter(s => s.userId !== null) // Only include submissions with valid userId
    .map(s => {
      const answers = [s.q1, s.q2, s.q3, s.q4, s.q5, s.q6, s.q7, s.q8, s.q9, s.q10];
      const questionsAnswered = answers.filter(a => a && a.trim().length > 0).length;
      const daysSinceCreated = Math.floor((now.getTime() - new Date(s.createdAt).getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        id: s.id,
        userId: s.userId as number,
        userName: s.userName,
        userEmail: s.userEmail,
        questionsAnswered,
        createdAt: s.createdAt,
        daysSinceCreated,
      };
    }).filter(s => s.questionsAnswered < 10); // Only include truly incomplete ones
}

export async function getUsersWhoHaventSubmitted(): Promise<{
  id: number;
  name: string | null;
  email: string | null;
  lastSignedIn: Date;
  daysSinceSignIn: number;
}[]> {
  const db = await getDb();
  if (!db) return [];
  
  // Get all users who have signed in but haven't submitted
  const usersWithSubmissions = db.select({ userId: storySubmissions.userId }).from(storySubmissions);
  
  const usersWithoutSubmissions = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    lastSignedIn: users.lastSignedIn,
  })
    .from(users)
    .where(sql`${users.id} NOT IN (${usersWithSubmissions})`);
  
  const now = new Date();
  
  return usersWithoutSubmissions.map(u => ({
    ...u,
    daysSinceSignIn: Math.floor((now.getTime() - new Date(u.lastSignedIn).getTime()) / (1000 * 60 * 60 * 24)),
  }));
}
