import { eq, and, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  respondents, 
  responses, 
  listResponses, 
  multipleChoiceResponses, 
  beliefSystemResponses, 
  successFactors, 
  tags, 
  responseTags,
  questionnaireReminders
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
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

// ============================================================================
// Respondent Operations
// ============================================================================

export async function getOrCreateRespondent(userId: number, fullName: string, email?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if respondent exists
  const existing = await db.select().from(respondents).where(eq(respondents.userId, userId)).limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }

  // Create new respondent
  await db.insert(respondents).values({
    userId,
    fullName,
    email: email || null,
    isComplete: false
  });

  // Retrieve the newly created respondent by userId
  const newRespondent = await db.select().from(respondents).where(eq(respondents.userId, userId)).limit(1);
  return newRespondent[0];
}

export async function getRespondentByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(respondents).where(eq(respondents.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getRespondentById(respondentId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(respondents).where(eq(respondents.id, respondentId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getAllRespondents() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(respondents).orderBy(desc(respondents.dateSubmitted));
}

export async function updateRespondentCompletion(respondentId: number, isComplete: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(respondents)
    .set({ isComplete, updatedAt: new Date() })
    .where(eq(respondents.id, respondentId));
}

// ============================================================================
// Response Operations
// ============================================================================

export async function saveTextResponse(
  respondentId: number,
  questionNumber: number,
  questionCategory: string,
  responseText: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if response exists
  const existing = await db.select().from(responses)
    .where(and(
      eq(responses.respondentId, respondentId),
      eq(responses.questionNumber, questionNumber)
    ))
    .limit(1);

  if (existing.length > 0) {
    // Update existing
    await db.update(responses)
      .set({ responseText, updatedAt: new Date() })
      .where(eq(responses.id, existing[0].id));
    return existing[0].id;
  } else {
    // Insert new
    await db.insert(responses).values({
      respondentId,
      questionNumber,
      questionCategory,
      responseType: "text",
      responseText
    });
    // Retrieve the newly created response
    const newResponse = await db.select().from(responses)
      .where(and(
        eq(responses.respondentId, respondentId),
        eq(responses.questionNumber, questionNumber)
      ))
      .limit(1);
    return newResponse[0].id;
  }
}

export async function saveListResponse(
  respondentId: number,
  questionNumber: number,
  questionCategory: string,
  items: string[]
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if response exists
  const existing = await db.select().from(responses)
    .where(and(
      eq(responses.respondentId, respondentId),
      eq(responses.questionNumber, questionNumber)
    ))
    .limit(1);

  let responseId: number;

  if (existing.length > 0) {
    responseId = existing[0].id;
    // Delete old list items
    await db.delete(listResponses).where(eq(listResponses.responseId, responseId));
    // Update timestamp
    await db.update(responses)
      .set({ updatedAt: new Date() })
      .where(eq(responses.id, responseId));
  } else {
    // Insert new response
    await db.insert(responses).values({
      respondentId,
      questionNumber,
      questionCategory,
      responseType: "list"
    });
    // Retrieve the newly created response
    const newResponse = await db.select().from(responses)
      .where(and(
        eq(responses.respondentId, respondentId),
        eq(responses.questionNumber, questionNumber)
      ))
      .limit(1);
    responseId = newResponse[0].id;
  }

  // Insert list items
  for (let i = 0; i < items.length; i++) {
    await db.insert(listResponses).values({
      responseId,
      itemNumber: i + 1,
      itemText: items[i]
    });
  }

  return responseId;
}

export async function saveMultipleChoiceResponse(
  respondentId: number,
  questionNumber: number,
  questionCategory: string,
  selectedOption: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if response exists
  const existing = await db.select().from(responses)
    .where(and(
      eq(responses.respondentId, respondentId),
      eq(responses.questionNumber, questionNumber)
    ))
    .limit(1);

  let responseId: number;

  if (existing.length > 0) {
    responseId = existing[0].id;
    // Delete old selections
    await db.delete(multipleChoiceResponses).where(eq(multipleChoiceResponses.responseId, responseId));
    // Update timestamp
    await db.update(responses)
      .set({ updatedAt: new Date() })
      .where(eq(responses.id, responseId));
  } else {
    // Insert new response
    await db.insert(responses).values({
      respondentId,
      questionNumber,
      questionCategory,
      responseType: "multiple_choice"
    });
    // Retrieve the newly created response
    const newResponse = await db.select().from(responses)
      .where(and(
        eq(responses.respondentId, respondentId),
        eq(responses.questionNumber, questionNumber)
      ))
      .limit(1);
    responseId = newResponse[0].id;
  }

  // Insert selection
  await db.insert(multipleChoiceResponses).values({
    responseId,
    optionSelected: selectedOption,
    isSelected: true
  });

  return responseId;
}

export async function saveBeliefResponse(
  respondentId: number,
  believesInGod: boolean,
  whyText: string,
  advantagesText: string,
  disadvantagesText: string,
  evidenceText: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if exists
  const existing = await db.select().from(beliefSystemResponses)
    .where(eq(beliefSystemResponses.respondentId, respondentId))
    .limit(1);

  if (existing.length > 0) {
    // Update
    await db.update(beliefSystemResponses)
      .set({
        believesInGod,
        whyText,
        advantagesText,
        disadvantagesText,
        evidenceText,
        updatedAt: new Date()
      })
      .where(eq(beliefSystemResponses.id, existing[0].id));
    return existing[0].id;
  } else {
    // Insert
    await db.insert(beliefSystemResponses).values({
      respondentId,
      believesInGod,
      whyText,
      advantagesText,
      disadvantagesText,
      evidenceText
    });
    // Retrieve the newly created belief response
    const newBelief = await db.select().from(beliefSystemResponses)
      .where(eq(beliefSystemResponses.respondentId, respondentId))
      .limit(1);
    return newBelief[0].id;
  }
}

export async function saveSuccessFactors(
  respondentId: number,
  personalInfluencePct: number,
  othersInfluencePct: number,
  economicSocialPct: number,
  uncontrollablePct: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if exists
  const existing = await db.select().from(successFactors)
    .where(eq(successFactors.respondentId, respondentId))
    .limit(1);

  if (existing.length > 0) {
    // Update
    await db.update(successFactors)
      .set({
        personalInfluencePct: personalInfluencePct.toString(),
        othersInfluencePct: othersInfluencePct.toString(),
        economicSocialPct: economicSocialPct.toString(),
        uncontrollablePct: uncontrollablePct.toString(),
        updatedAt: new Date()
      })
      .where(eq(successFactors.id, existing[0].id));
    return existing[0].id;
  } else {
    // Insert
    await db.insert(successFactors).values({
      respondentId,
      personalInfluencePct: personalInfluencePct.toString(),
      othersInfluencePct: othersInfluencePct.toString(),
      economicSocialPct: economicSocialPct.toString(),
      uncontrollablePct: uncontrollablePct.toString()
    });
    // Retrieve the newly created success factors
    const newFactors = await db.select().from(successFactors)
      .where(eq(successFactors.respondentId, respondentId))
      .limit(1);
    return newFactors[0].id;
  }
}

export async function getResponsesByRespondent(respondentId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(responses)
    .where(eq(responses.respondentId, respondentId))
    .orderBy(responses.questionNumber);
}

export async function getListResponsesByResponseId(responseId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(listResponses)
    .where(eq(listResponses.responseId, responseId))
    .orderBy(listResponses.itemNumber);
}

export async function getMultipleChoiceByResponseId(responseId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(multipleChoiceResponses)
    .where(eq(multipleChoiceResponses.responseId, responseId));
}

export async function getBeliefResponseByRespondent(respondentId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(beliefSystemResponses)
    .where(eq(beliefSystemResponses.respondentId, respondentId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function getSuccessFactorsByRespondent(respondentId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(successFactors)
    .where(eq(successFactors.respondentId, respondentId))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

// ============================================================================
// Tag Operations
// ============================================================================

export async function initializeTags(tagDefinitions: Array<{ name: string; category: string; description: string }>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  for (const tagDef of tagDefinitions) {
    // Check if tag exists
    const existing = await db.select().from(tags).where(eq(tags.tagName, tagDef.name)).limit(1);
    
    if (existing.length === 0) {
      await db.insert(tags).values({
        tagName: tagDef.name,
        tagCategory: tagDef.category as any,
        description: tagDef.description
      });
    }
  }
}

export async function getAllTags() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(tags);
}

export async function getTagByName(tagName: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(tags).where(eq(tags.tagName, tagName)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function applyTagToResponse(
  responseId: number, 
  tagId: number, 
  confidence: "high" | "medium" | "low", 
  isAutomatic: boolean
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Check if tag already applied
  const existing = await db.select().from(responseTags)
    .where(and(
      eq(responseTags.responseId, responseId),
      eq(responseTags.tagId, tagId)
    ))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(responseTags).values({
      responseId,
      tagId,
      confidence,
      isAutomatic
    });
  }
}

export async function getTagsByResponse(responseId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(responseTags)
    .where(eq(responseTags.responseId, responseId));
}

// ============================================================================
// Analytics Operations
// ============================================================================

export async function getTagFrequency() {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select({
      tagName: tags.tagName,
      tagCategory: tags.tagCategory,
      count: sql<number>`COUNT(*)`
    })
    .from(responseTags)
    .innerJoin(tags, eq(responseTags.tagId, tags.id))
    .groupBy(tags.id, tags.tagName, tags.tagCategory)
    .orderBy(desc(sql`COUNT(*)`));

  return result;
}

export async function getSuccessFactorAverages() {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select({
      avgPersonal: sql<number>`AVG(CAST(${successFactors.personalInfluencePct} AS DECIMAL))`,
      avgOthers: sql<number>`AVG(CAST(${successFactors.othersInfluencePct} AS DECIMAL))`,
      avgEconomic: sql<number>`AVG(CAST(${successFactors.economicSocialPct} AS DECIMAL))`,
      avgUncontrollable: sql<number>`AVG(CAST(${successFactors.uncontrollablePct} AS DECIMAL))`
    })
    .from(successFactors);

  return result.length > 0 ? result[0] : null;
}

export async function getBeliefDistribution() {
  const db = await getDb();
  if (!db) return { believers: 0, nonBelievers: 0 };

  const result = await db
    .select({
      believesInGod: beliefSystemResponses.believesInGod,
      count: sql<number>`COUNT(*)`
    })
    .from(beliefSystemResponses)
    .groupBy(beliefSystemResponses.believesInGod);

  const believers = result.find(r => r.believesInGod)?.count || 0;
  const nonBelievers = result.find(r => !r.believesInGod)?.count || 0;

  return { believers, nonBelievers };
}

export async function getCommonValues(limit: number = 20) {
  const db = await getDb();
  if (!db) return [];

  // Get list responses for question 20 (absolutes)
  const result = await db
    .select({
      itemText: sql<string>`LOWER(${listResponses.itemText})`,
      count: sql<number>`COUNT(*)`
    })
    .from(listResponses)
    .innerJoin(responses, eq(listResponses.responseId, responses.id))
    .where(eq(responses.questionNumber, 20))
    .groupBy(sql`LOWER(${listResponses.itemText})`)
    .orderBy(desc(sql`COUNT(*)`))
    .limit(limit);

  return result;
}

// ============================================================================
// Questionnaire Reminder Operations
// ============================================================================

export async function scheduleReminder(
  respondentId: number,
  scheduledFor: Date,
  lastQuestionNumber: number,
  reminderNote?: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(questionnaireReminders).values({
    respondentId,
    scheduledFor,
    lastQuestionNumber,
    reminderNote: reminderNote || null,
    isSent: false
  });

  // Retrieve the newly created reminder by respondentId and scheduled time
  const newReminder = await db.select().from(questionnaireReminders)
    .where(eq(questionnaireReminders.respondentId, respondentId))
    .orderBy(desc(questionnaireReminders.id))
    .limit(1);
  
  return newReminder.length > 0 ? newReminder[0] : undefined;
}

export async function getPendingReminders() {
  const db = await getDb();
  if (!db) return [];

  const now = new Date();
  return db.select().from(questionnaireReminders)
    .where(and(
      eq(questionnaireReminders.isSent, false),
      sql`${questionnaireReminders.scheduledFor} <= ${now}`
    ))
    .orderBy(questionnaireReminders.scheduledFor);
}

export async function markReminderSent(reminderId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(questionnaireReminders)
    .set({ isSent: true, sentAt: new Date() })
    .where(eq(questionnaireReminders.id, reminderId));
}

export async function getUpcomingReminders(respondentId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(questionnaireReminders)
    .where(and(
      eq(questionnaireReminders.respondentId, respondentId),
      eq(questionnaireReminders.isSent, false)
    ))
    .orderBy(questionnaireReminders.scheduledFor);
}

/**
 * Get weekly digest history
 */
export async function getDigestHistory(limit: number = 50) {
  const db = await getDb();
  if (!db) return [];

  const { weeklyDigests } = await import("../drizzle/schema");
  
  return db.select({
    id: weeklyDigests.id,
    userId: weeklyDigests.userId,
    userName: users.name,
    userEmail: users.email,
    sentAt: weeklyDigests.sentAt,
    questionsAnswered: weeklyDigests.questionsAnswered,
    progressPercentage: weeklyDigests.progressPercentage
  })
  .from(weeklyDigests)
  .innerJoin(users, eq(weeklyDigests.userId, users.id))
  .orderBy(desc(weeklyDigests.sentAt))
  .limit(limit);
}

// TODO: add feature queries here as your schema grows.
