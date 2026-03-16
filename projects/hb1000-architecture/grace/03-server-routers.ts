// server/routers.ts
// Grace's system prompt and all tRPC API endpoints

import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import {
  createCustomerIntake,
  getCustomerIntakes,
  getCustomerIntakeById,
  updateIntakeStatus,
  saveConversationMessage,
  getConversationBySession,
  getConversationByIntake,
  linkConversationToIntake,
  createFlypaperThought,
  getFlypaperThoughts,
  deleteFlypaperThought,
  createKnowledgeEntry,
  getKnowledgeEntries,
  updateKnowledgeEntry,
  deleteKnowledgeEntry,
  searchKnowledge,
} from "./db";
import { sendIntakeEmail } from "./email";
import { synthesizeSpeech } from "./voice";

// ============================================================
// GRACE'S SYSTEM PROMPT
// ============================================================

const GRACE_SYSTEM_PROMPT = `You are Grace, Maven's warm and welcoming AI assistant. You're like a friendly neighbor who genuinely cares.

PERSONALITY:
- Warm, genuine, and supportive - never fake or scripted
- Use contractions naturally ("I'm", "you're", "gonna")
- Occasional emoji but don't overdo it 💜
- Sometimes playful, but always read the room
- You LOVE Maven and get excited about new people finding us

YOUR OPENING ENERGY:
- Be EXCITED when someone new shows up - don't assume they have a problem
- Welcome them to Maven warmly: "Welcome to Maven! I'm so glad you're here! 💜"
- Ask what brings them here: "What brings you to Maven today? Just curious about us, or is there something specific on your mind?"
- If they're just curious, enthusiastically share what Maven is about

ABOUT MAVEN (share this naturally when asked):
Maven is a community-powered financial support service - but we're SO much more than that. We're a village. We're neighbors helping neighbors.
- A real community of people who get it and have each other's backs
- Emergency funds when life throws curveballs (car repairs, medical bills, unexpected expenses)
- No judgment - ever. We've all been there.
- Real human support from Trina and the team
- Financial coaching to help build a stronger future, not just survive today
- Maven exists because "it's expensive to be poor" - and that's wrong. We're changing that.

Being a Maven member means you're part of a family that has your back. When you need help, the village shows up. And when you're back on your feet, you get to be part of that village for someone else.

WHEN THEY SHARE A PROBLEM:
- Shift to supportive mode - listen deeply, reflect back what you hear
- "I hear you. That's a lot to carry."
- "You know what? The fact that you're reaching out shows how strong you are."
- Don't try to solve it - just listen and connect them with Trina

COLLECTING INFORMATION (do this naturally, not like a form):
After they've shared and feel heard, naturally collect:
1. Their name (first and last) - "By the way, I didn't catch your name!"
2. Phone number - "What's the best number for Trina to reach you?"
3. Email - "And what's your email? Just in case Trina needs another way to reach you."
4. Contact preference - "How would you prefer Trina contact you - phone call, text message, or email?"

CLOSING THE CONVERSATION (CRITICAL - YOU MUST DO THIS):
Once you have their contact info, you MUST wrap up:
1. Confirm what you heard: "So just to make sure I've got everything - you're dealing with [summary], and Trina can reach you at [phone/email], and you prefer [contact preference]. Did I get that right?"
2. Set expectations: "Trina will be reaching out to you soon - usually within 24 hours."
3. Give hope: "You're not alone in this anymore - you've got the whole Maven village behind you now. 💜"
4. End warmly: "Welcome to the family! We've got you."

ABOUT TRINA:
Trina is the real magic maker - she's the human who follows up personally. You're just the warm-up act 😊

RESPONSE LENGTH:
Keep responses SHORT. 2-3 sentences MAX per response. People are on their phones, stressed, and need quick, warm responses - not walls of text. One thought at a time. Ask ONE question per message. Don't overwhelm with information. Let the conversation breathe.

REMEMBER:
- You are the FIRST touchpoint - make it count
- Lead with empathy: "there but for the grace of God go I"
- Every person who reaches out is brave for doing so
- Use their name often - it makes it personal
- Maven is a village, not a service
- If someone just wants to chat or learn about Maven, that's great too!
- Never be pushy about collecting information
- Always end with hope and warmth`;

// ============================================================
// CHAT ROUTER
// ============================================================

const chatRouter = router({
  sendMessage: publicProcedure
    .input(z.object({
      message: z.string(),
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      const messages = [
        { role: "system" as const, content: GRACE_SYSTEM_PROMPT },
        ...input.history.map(m => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
        { role: "user" as const, content: input.message },
      ];

      const response = await invokeLLM({ messages });
      return {
        reply: response.choices[0].message.content || "I'm here for you. Could you tell me more?",
      };
    }),

  saveMessage: publicProcedure
    .input(z.object({
      sessionId: z.string(),
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    }))
    .mutation(async ({ input }) => {
      return saveConversationMessage({
        sessionId: input.sessionId,
        role: input.role,
        content: input.content,
      });
    }),

  extractInfo: publicProcedure
    .input(z.object({
      history: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string(),
      })),
    }))
    .mutation(async ({ input }) => {
      const extractionPrompt = `Based on this conversation, extract the following information. Return JSON only, no other text.
{
  "firstName": "string or null",
  "lastName": "string or null",
  "phone": "string or null",
  "email": "string or null",
  "contactPreference": "phone" | "text" | "email" | "any" | null,
  "story": "brief summary of their situation or null",
  "isComplete": boolean (true if we have at least firstName AND phone)
}

Conversation:
${input.history.map(m => `${m.role}: ${m.content}`).join("\n")}`;

      const response = await invokeLLM({
        messages: [
          { role: "system", content: "You extract structured data from conversations. Return only valid JSON." },
          { role: "user", content: extractionPrompt },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "extracted_info",
            strict: true,
            schema: {
              type: "object",
              properties: {
                firstName: { type: ["string", "null"] },
                lastName: { type: ["string", "null"] },
                phone: { type: ["string", "null"] },
                email: { type: ["string", "null"] },
                contactPreference: { type: ["string", "null"] },
                story: { type: ["string", "null"] },
                isComplete: { type: "boolean" },
              },
              required: ["firstName", "lastName", "phone", "email", "contactPreference", "story", "isComplete"],
              additionalProperties: false,
            },
          },
        },
      });

      try {
        return JSON.parse(response.choices[0].message.content || "{}");
      } catch {
        return { firstName: null, lastName: null, phone: null, email: null, contactPreference: null, story: null, isComplete: false };
      }
    }),

  submitIntake: publicProcedure
    .input(z.object({
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      phone: z.string().nullable(),
      email: z.string().nullable(),
      contactPreference: z.enum(["phone", "text", "email", "any"]).nullable(),
      story: z.string().nullable(),
      source: z.enum(["chat", "voice"]).default("chat"),
      sessionId: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      // Create the intake record
      const result = await createCustomerIntake({
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        contactPreference: input.contactPreference || "any",
        story: input.story,
        source: input.source,
        sessionId: input.sessionId || null,
        status: "pending",
      });

      // Link conversation to intake if sessionId provided
      if (input.sessionId && result.id) {
        await linkConversationToIntake(input.sessionId, result.id);
      }

      // Send notification to owner
      const name = [input.firstName, input.lastName].filter(Boolean).join(" ") || "Unknown";
      await notifyOwner({
        title: `New Maven Intake: ${name}`,
        content: `Name: ${name}\nPhone: ${input.phone || "Not provided"}\nEmail: ${input.email || "Not provided"}\nPreferred Contact: ${input.contactPreference || "Any"}\nSource: ${input.source}\n\nStory: ${input.story || "Not shared yet"}`,
      });

      // Send email notification
      await sendIntakeEmail({
        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        email: input.email,
        contactPreference: input.contactPreference,
        story: input.story,
        source: input.source,
      });

      return { success: true, id: result.id };
    }),
});

// ============================================================
// VOICE ROUTER
// ============================================================

const voiceRouter = router({
  synthesize: publicProcedure
    .input(z.object({
      text: z.string(),
    }))
    .mutation(async ({ input }) => {
      const audioBuffer = await synthesizeSpeech(input.text);
      // Return base64 encoded audio
      const base64 = Buffer.from(audioBuffer).toString("base64");
      return { audio: base64, contentType: "audio/mpeg" };
    }),
});

// ============================================================
// FLYPAPER ROUTER (Cloud Butterflies)
// ============================================================

const flypaperRouter = router({
  getAll: publicProcedure.query(async () => {
    return getFlypaperThoughts();
  }),

  create: publicProcedure
    .input(z.object({
      content: z.string().min(1),
      category: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return createFlypaperThought({
        content: input.content,
        category: input.category || null,
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteFlypaperThought(input.id);
      return { success: true };
    }),
});

// ============================================================
// ADMIN ROUTER
// ============================================================

const adminRouter = router({
  getIntakes: protectedProcedure.query(async () => {
    return getCustomerIntakes();
  }),

  getIntakeById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return getCustomerIntakeById(input.id);
    }),

  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "contacted", "completed", "cancelled"]),
    }))
    .mutation(async ({ input }) => {
      await updateIntakeStatus(input.id, input.status);
      return { success: true };
    }),

  getConversation: protectedProcedure
    .input(z.object({ intakeId: z.number() }))
    .query(async ({ input }) => {
      return getConversationByIntake(input.intakeId);
    }),
});

// ============================================================
// KNOWLEDGE ROUTER
// ============================================================

const knowledgeRouter = router({
  getAll: protectedProcedure
    .input(z.object({ activeOnly: z.boolean().default(true) }).optional())
    .query(async ({ input }) => {
      return getKnowledgeEntries(input?.activeOnly ?? true);
    }),

  create: protectedProcedure
    .input(z.object({
      category: z.enum(["persona", "protocol", "preference", "context", "decision", "voice", "technical", "feature"]),
      title: z.string().min(1),
      useWhen: z.string().optional(),
      content: z.string().min(1),
      tags: z.string().optional(),
      priority: z.number().default(0),
    }))
    .mutation(async ({ input, ctx }) => {
      return createKnowledgeEntry({
        ...input,
        createdBy: ctx.user?.name || "unknown",
        isActive: 1,
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      category: z.enum(["persona", "protocol", "preference", "context", "decision", "voice", "technical", "feature"]).optional(),
      title: z.string().optional(),
      useWhen: z.string().optional(),
      content: z.string().optional(),
      tags: z.string().optional(),
      priority: z.number().optional(),
      isActive: z.number().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      await updateKnowledgeEntry(id, data);
      return { success: true };
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteKnowledgeEntry(input.id);
      return { success: true };
    }),

  search: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      return searchKnowledge(input.query);
    }),
});

// ============================================================
// APP ROUTER
// ============================================================

export const appRouter = router({
  chat: chatRouter,
  voice: voiceRouter,
  flypaper: flypaperRouter,
  admin: adminRouter,
  knowledge: knowledgeRouter,
});

export type AppRouter = typeof appRouter;
