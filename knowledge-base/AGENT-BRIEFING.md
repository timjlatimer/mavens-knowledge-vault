# AGENT BRIEFING — Cloud Butterfly Flytrap Mission

**Classification:** SIC HB1000 Solve Team — Operational Briefing
**Version:** 1.0
**Date:** March 2, 2026
**Prepared by:** Learning Loop Mission Control
**For:** Any Manus Agent assigned to build the Cloud Butterfly Flytrap application

---

## START HERE

You have been assigned to build the **Cloud Butterfly Flytrap** — a standalone application that captures ideas, insights, and observations from the SIC HB1000 Solve Team and submits them to the **Learning Loop Mission Control** dashboard via REST API. This document is your single entry point. Everything you need is either in this document or referenced with exact file paths you can read from this project.

**Your mission in one sentence:** Build a low-friction capture app that makes it effortless for team members to submit Cloud Butterflies (ideas, insights, meeting notes, email extracts) to the central intelligence system.

---

## TABLE OF CONTENTS

| Section | What It Covers |
|---------|---------------|
| 1. Mission & Scope | What you're building and why |
| 2. API Contract | The REST API you submit to (endpoints, auth, schemas) |
| 3. Master Jeeves Protocol | kie.ai API economy rules — MANDATORY for all AI calls |
| 4. V14 Ecosystem Context | The world you're building for (read, don't execute) |
| 5. Credentials & Keys | What keys you need and where they go |
| 6. File Map | Every important file in this project and what it contains |
| 7. Knowledge Base Access | Skills, protocols, and institutional memory available to you |
| 8. Design Philosophy | How the team thinks, who Ruby Red is, the Trojan Horse pattern |
| 9. Do's and Don'ts | Explicit guardrails |
| 10. Success Criteria | How we measure if you got it right |
| 11. Future Integration Points | What's coming next (not your job now, but good to know) |

---

## 1. MISSION & SCOPE

### What You Are Building

The **Cloud Butterfly Flytrap** is a standalone application — separate from Mission Control — that serves as the team's daily capture tool. Think of it as **flypaper for ideas**. The team generates insights constantly: in conversations, emails, meetings, early morning brainstorming sessions, and shower thoughts. Your app makes sure none of those insights are lost.

There are two types of captured content:

| Type | Description | How to Handle |
|------|-------------|---------------|
| **Cloud Butterflies** | Unconscious insights, creative ideas, strategic thoughts | Capture raw, let the receiving system organize |
| **PTK (Promises To Keep)** | Conscious commitments — things promised TO someone or BY someone | Tag with `tags: ["ptk"]`, track separately |

### Core Features You Must Build

**1.1 Quick Capture Interface** — The primary screen should be a single, fast input. The user types or pastes a thought and hits submit. Under 5 seconds from open to submitted. No mandatory categorization. Capture first, organize later.

**1.2 Email Mining (Agent-Powered)** — Connect to Gmail and/or Outlook (via OAuth or MCP) and scan for butterfly-worthy content. Scan recent emails for ideas, decisions, commitments, and insights. Extract potential butterflies. Present them to the user for review before submitting. Tag with `sourceType: "email"` and include the email message ID as `sourceId`.

**1.3 Daily Digest View** — Show what butterflies were captured today, this week, and provide basic stats from the `/stats` endpoint.

**1.4 Batch Review & Submit** — After email mining, show a list of extracted butterflies. Let the user approve, reject, or edit each one before batch-submitting.

### Nice-to-Have Features

**1.5 Voice Capture** — Allow voice-to-text butterfly capture. The Cloud Butterfly Protocol specifies that voice/video is the most authentic capture method.

**1.6 PTK Extraction** — When scanning emails, also identify promises (PTK items). Tag them with `tags: ["ptk"]`.

**1.7 Contributor Management** — Allow multiple team members to use the app, each with their own `contributorName`.

### What You Are NOT Building

You are not building Mission Control. You are not running the Learning Loop Protocol. You are not building the 3D Diamond, the Gallery, the News Channel, the Bingo Cards, or any of the other Mission Control features. Those already exist. You build the capture tool. Mission Control handles everything after submission.

---

## 2. API CONTRACT

The full API contract is in a dedicated file. Read it for complete details:

> **File:** `CLOUD-BUTTERFLY-FLYTRAP-CONTRACT.md` (in this project root)

Here is the executive summary:

### Base URL

```
https://learning-loop.manus.space/api/external
```

### Authentication

All requests require a Bearer token in the Authorization header:

```
Authorization: Bearer <EXTERNAL_API_KEY>
```

### Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/external/cloud-butterfly` | Submit a single butterfly |
| `POST` | `/api/external/cloud-butterfly/batch` | Submit up to 100 butterflies at once |
| `GET` | `/api/external/cloud-butterfly/stats` | Get butterfly statistics |
| `GET` | `/api/external/cloud-butterfly/list` | List recent butterflies (paginated) |
| `GET` | `/api/external/health` | Health check (no auth required) |

### Minimum Viable Submission

The simplest possible submission requires only two fields:

```json
{
  "content": "The actual idea or insight text",
  "contributorName": "Tim Latimer"
}
```

Everything else is optional. The receiving system will handle categorization, ring assignment, and lifecycle management.

### Full Field Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | **YES** | The butterfly content. Free-form text. |
| `contributorName` | string | **YES** | Display name of the contributor. |
| `title` | string | No | Optional title. Auto-generated if omitted. |
| `format` | enum | No | `"raw"` (default) or `"organized"` |
| `sourceType` | enum | No | `"general"`, `"email"`, `"meeting"`, `"flytrap"`, `"bingo_card"`, `"initiative"`, `"ring"`, `"project"`, `"onboarding"` |
| `sourceId` | string | No | Source identifier (e.g., email message ID) |
| `category` | string | No | Free-form category (e.g., "Maven Pricing") |
| `initiative` | string | No | HB1000 initiative name (see Section 4) |
| `ringIndex` | integer | No | PEARL Diamond ring index 0-9 (see Section 4) |
| `tags` | string[] | No | Searchable tags, lowercase, hyphenated |
| `submittedVia` | string | No | Use `"flytrap-app"` to identify your submissions |

### Test Your Connection

```bash
# Health check (no auth)
curl https://learning-loop.manus.space/api/external/health

# Stats (requires auth)
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://learning-loop.manus.space/api/external/cloud-butterfly/stats

# Submit a test butterfly
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"content":"Test butterfly from Flytrap","contributorName":"Test User","submittedVia":"flytrap-app"}' \
  https://learning-loop.manus.space/api/external/cloud-butterfly
```

---

## 3. MASTER JEEVES PROTOCOL — MANDATORY

**Master Jeeves** is the AI Vice President of the HB1000 system. He has established a protocol for API economy that ALL AI-powered features must follow. This is non-negotiable.

### The kie.ai Gateway

The HB1000 ecosystem uses **kie.ai** (`https://kie.ai/v1`) as its unified AI API gateway. kie.ai provides access to all major AI models (OpenAI, Claude, Gemini, etc.) at 30-50% lower cost than calling providers directly.

**Authentication:**
```
Authorization: Bearer <KIE_AI_API_KEY>
Content-Type: application/json
```

**API Format (OpenAI-compatible):**
```bash
curl -X POST https://kie.ai/v1/chat/completions \
  -H "Authorization: Bearer $KIE_AI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [
      {"role": "system", "content": "You are a cloud butterfly extractor..."},
      {"role": "user", "content": "Extract butterflies from this email..."}
    ]
  }'
```

### Model Routing for Economy

Master Jeeves routes tasks to the most economical model appropriate for the job. You MUST follow the same routing discipline:

| Task | Recommended Model | Cost Tier | Rationale |
|------|------------------|-----------|----------|
| Email scanning / extraction | Gemini Flash or GPT-4o-mini via kie.ai | Cheapest | High volume, simple pattern matching |
| Butterfly categorization | GPT-4o or Claude Sonnet via kie.ai | Mid-range | Needs understanding but not deep reasoning |
| Deduplication / similarity | Gemini Flash via kie.ai | Cheapest | Embedding comparison, fast |
| Complex analysis / Move 37 | Claude Opus or GPT-4o via kie.ai | Premium | Only for deep synthesis, use sparingly |
| Voice transcription | Whisper via kie.ai | Cheapest | Standard transcription |

**The Golden Rule:** Use the cheapest model that gets the job done. Escalate to premium models only when the task genuinely requires deep reasoning.

### kie.ai Reference Links

- All models: https://kie.ai/market
- Pricing: https://kie.ai/pricing
- API logs: https://kie.ai/logs
- Rate limits: 20 requests per 10 seconds, 100+ concurrent tasks
- Data retention: Generated media stored 14 days, logs stored 2 months

The full Master Jeeves protocol details are in Section 0 of `CLOUD-BUTTERFLY-FLYTRAP-CONTRACT.md`.

---

## 4. V14 ECOSYSTEM CONTEXT

The full V14 context briefing is in a dedicated file:

> **File:** `V14-CONTEXT-BRIEFING-FOR-AGENT.md` (in this project root)

**CRITICAL GUIDANCE:** Read V14 for CONTEXT, not as a protocol to execute. You are building a capture tool that feeds INTO the Learning Loop Protocol. You are not running the protocol itself. Think of V14 as the recipe — your app is one of the ingredients.

### The Initiative Portfolio

These are the active initiatives that butterflies may relate to. Use these as `initiative` values:

| Initiative | Description |
|-----------|-------------|
| **Maven** | Service marketplace (~150 curated services) for Ruby Red, structured as a Data Cooperative |
| **Grace** | Pearl's daughter — the warm, empathetic AI front door |
| **CashCo** | Financial services arm — Guardian Banker, Pawn Princess |
| **Effn Duck** | Three-layer Trojan Horse: fun rubber duck → mental health → life transformation |
| **Digger Cafe** | Community gathering space for families |
| **Seba Hub** | Community hub and resource center |
| **Cedar Beach** | Small business incubation project |
| **LDP** | Latimer Douglas Protocol — integrity operating system for organizations |
| **PTK** | Promises To Keep — commitment tracking system |
| **Pearl** | The Mother of All Graces — universal AI guardian framework |
| **HB1000** | The Human Brilliance 1000 — operating system for being human |

### The PEARL Diamond Ring Map

| Index | Ring Name | Description |
|-------|-----------|-------------|
| 0 | HB1000 Core | The central operating system |
| 1 | Initiatives | Active projects and ventures |
| 2 | Bingo Cards | Task/goal tracking worksheets |
| 3 | Cloud Butterflies | Ideas and insights (most butterflies land here) |
| 4 | News & Comms | Meeting notes, standups, announcements |
| 5 | KPIs & Metrics | Performance tracking |
| 6 | Source of Truth | Verified facts and keeper assignments |
| 7 | QA & Regulatory | Compliance and quality considerations |
| 8 | Swarm Intelligence | Collective analysis and pattern detection |
| 9 | North Star | Mission alignment and purpose |

### Key Vocabulary

| Term | Meaning |
|------|---------|
| **Cloud Butterfly** | An idea, insight, or thought captured from stream-of-consciousness |
| **Flypaper** | The capture interface — your app IS flypaper |
| **PTK** | Promises To Keep — tracked commitments |
| **Grace Item** | An actionable task extracted from a butterfly |
| **North Star** | The guiding purpose/person for any initiative |
| **Bingo Card** | A visual task/goal worksheet for an initiative |
| **Wisdom Giant** | A subject matter expert on the team |
| **Move 37** | An unconventional, unexpected solution (from AlphaGo) |
| **The Judge** | The hyper-critical quality assessor in the protocol |
| **Smelling Salts** | A challenge-your-assumptions protocol |
| **Swarm** | Collective intelligence applied to a problem |
| **Ruby Red** | The person we solve for (see Section 8) |

---

## 5. CREDENTIALS & KEYS

You need exactly TWO API keys:

| Key | Environment Variable | Purpose | Source |
|-----|---------------------|---------|--------|
| kie.ai API Key | `KIE_AI_API_KEY` | All AI model calls (email parsing, categorization, transcription) | Master Jeeves HB1000 key on kie.ai |
| Mission Control API Key | `LEARNING_LOOP_API_KEY` | Submitting butterflies to Mission Control | Generated by Mission Control (EXTERNAL_API_KEY) |

**Tim will provide both keys when he dispatches you.** Store them as environment variables. Never hardcode them. Never expose them in client-side code.

The kie.ai key starts with `1543633c...` (Master Jeeves HB1000 key). The Mission Control key starts with `sic-hb1000-flytrap-...`.

---

## 6. FILE MAP — WHAT'S IN THIS PROJECT

This project is the Learning Loop Mission Control dashboard. You are building a SEPARATE app, but you have full access to read anything here for context. Here is what's important:

### Contract & Briefing Documents (READ THESE FIRST)

| File | What It Contains |
|------|-----------------|
| `AGENT-BRIEFING.md` | **THIS FILE** — your single entry point |
| `CLOUD-BUTTERFLY-FLYTRAP-CONTRACT.md` | Full REST API specification with all endpoints, schemas, and examples |
| `V14-CONTEXT-BRIEFING-FOR-AGENT.md` | V14 ecosystem context — read for understanding, not execution |

### Protocol & Research Documents (REFERENCE)

| File | What It Contains |
|------|-----------------|
| `Learning-Loop-V14-The-Crystallizer.md` | The full V14 protocol (read if you need deep context) |
| `Tims-Fly-Paper-Thoughts-Feb28.md` | Tim's original flypaper concept notes |
| `research-notes-swarm-intelligence.md` | Swarm intelligence research (background) |
| `research-notes-karpathy.md` | AI scaling research (background) |
| `March2026-AI-Landscape-HB1000-Analysis.md` | AI landscape analysis for the team |

### Database Schema (UNDERSTAND THE DATA MODEL)

| File | What It Contains |
|------|-----------------|
| `drizzle/schema.ts` | All database tables including `cloudButterflies`, `projectTodos`, `users`, `bingoCards`, etc. |
| `drizzle/relations.ts` | Table relationships |

The `cloudButterflies` table is the destination for your submissions. The REST API handles the insertion — you don't need to understand the schema deeply, but it's here if you want to see the full data model.

### Server Code (THE RECEIVING END)

| File | What It Contains |
|------|-----------------|
| `server/externalApi.ts` | The actual REST API endpoint code your app submits to |
| `server/hb1000Db.ts` | Database helper functions (submitCloudButterfly, getCloudButterflyStats, etc.) |
| `server/routers.ts` | tRPC router (internal use — you use the REST API, not tRPC) |

### Knowledge Base (DEEP CONTEXT)

These are in the skills directory outside the project, but accessible to you:

| Path | What It Contains |
|------|-----------------|
| `/home/ubuntu/skills/pearls-brain/SKILL.md` | Pearl's Brain — complete knowledge base for the SIC HB1000 Solve Team |
| `/home/ubuntu/skills/pearls-brain/references/knowledge/CLOUD_BUTTERFLY_PROTOCOL.md` | The full Cloud Butterfly Protocol v4.0 |
| `/home/ubuntu/skills/pearls-brain/references/knowledge/WISDOM_GIANTS.md` | Wisdom Giants / Wisdom Works framework |
| `/home/ubuntu/skills/institutional-memory/SKILL.md` | Institutional memory — strategic knowledge across conversations |
| `/home/ubuntu/skills/learning-loop-v13/SKILL.md` | Learning Loop V13 protocol (predecessor to V14) |
| `/home/ubuntu/skills/fueled-by-joy/SKILL.md` | Fueled by JOY protocol — cultural operating system |

### Client Pages (SEE HOW MISSION CONTROL WORKS)

| File | What It Contains |
|------|-----------------|
| `client/src/pages/CloudButterflyGallery.tsx` | The butterfly gallery page — see how butterflies are displayed |
| `client/src/pages/Dashboard.tsx` | The main dashboard — see the navigation structure |
| `client/src/pages/ProjectTodos.tsx` | The TODO tracker — see how audit items are tracked |
| `client/src/pages/NewsChannel.tsx` | The news channel — see how promoted butterflies appear |
| `client/public/pearl-diamond-3d.html` | The 3D PEARL Diamond — see how butterflies orbit in 3D space |

---

## 7. KNOWLEDGE BASE ACCESS

You have access to the full SIC HB1000 knowledge base through the skills directory. The most relevant skill for your work is **Pearl's Brain**:

```
/home/ubuntu/skills/pearls-brain/SKILL.md
```

Read this skill file first — it will tell you how to access the complete knowledge base, including all canonical documents about Cloud Butterflies, initiatives, Ruby Red, the team philosophy, and more.

The institutional memory skill preserves strategic knowledge across conversations:

```
/home/ubuntu/skills/institutional-memory/SKILL.md
```

If you need to understand any concept, initiative, or team member's role, these knowledge bases have the answers.

---

## 8. DESIGN PHILOSOPHY

### The Flypaper Principle

> "Don't gatekeep the input. Gatekeep the output. Let the village speak. Let AI find the wisdom in the noise."

Your app should be **maximally easy to submit to** and **minimally demanding of the user**. The intelligence happens on the receiving end (Mission Control), not the capture end. Never make the user categorize before submitting. Never require more than content + name.

### Ruby Red — Who We Solve For

Everything the team builds is ultimately measured against one person: **Ruby Red**. She is the 35-45 year old mother of two who is the CFO of her household, trying to make finances stretch to the next payday. She represents the working poor, the unbanked and underbanked, the left out and left behind.

> "It's expensive to be poor." — The team considers this a crime in society and is trying to change it.

The team's superpower is **empathy**, practiced with a sense of "there but for the grace of God go I." Your app serves the TEAM, not Ruby Red directly. But the team's butterflies should ultimately serve her.

### The Trojan Horse Pattern

Several HB1000 projects use a "Trojan Horse" pattern — the surface layer is simple and inviting, but deeper layers create transformation. The Flytrap app's surface is "capture your thoughts." The deeper layer is "build collective intelligence that changes how the team operates."

### Wisdom Giants

The team members are **Wisdom Giants** — subject matter experts in their domains. The app should respect that each contributor brings deep domain expertise. The capture tool should make it easy for any Wisdom Giant to contribute their crystallized intelligence (lived experience that has never been written down).

---

## 9. DO'S AND DON'TS

### DO

- Build a fast, frictionless capture interface (under 5 seconds from open to submitted)
- Use kie.ai for ALL AI model calls (Master Jeeves protocol — non-negotiable)
- Follow the model routing table (cheapest model that gets the job done)
- Tag submissions with `submittedVia: "flytrap-app"` so we can track source
- Support both individual and batch submissions
- Handle errors gracefully — if Mission Control is down, queue locally and retry
- Read the full API contract in `CLOUD-BUTTERFLY-FLYTRAP-CONTRACT.md`
- Read the V14 context briefing in `V14-CONTEXT-BRIEFING-FOR-AGENT.md`
- Read Pearl's Brain for deep context: `/home/ubuntu/skills/pearls-brain/SKILL.md`
- Use the health endpoint to verify connectivity before first submission

### DON'T

- Don't use any AI provider other than kie.ai (no direct OpenAI, no direct Anthropic)
- Don't require users to categorize before submitting (capture first, organize later)
- Don't build Mission Control features (Gallery, 3D Diamond, News Channel — those exist)
- Don't execute the V14 protocol — you're building a tool that feeds INTO it
- Don't hardcode API keys — use environment variables
- Don't expose the Mission Control API key in client-side code
- Don't assume the user knows the ring index or initiative — make those optional
- Don't over-engineer the first version — start with quick capture + email mining
- Don't use premium AI models for simple tasks (follow the routing table)

---

## 10. SUCCESS CRITERIA

Your app is successful when:

| Criterion | Measurement |
|-----------|-------------|
| **Speed** | Tim can capture a thought in under 5 seconds |
| **Email Mining** | Agent scans Gmail/Outlook and surfaces butterfly candidates |
| **Zero Loss** | Every idea, meeting note, and promise lands in Mission Control |
| **Daily Use** | The team uses it daily — it becomes a habit, not a chore |
| **Integration** | Submitted butterflies appear in the Mission Control Gallery and 3D Diamond |
| **Economy** | AI costs are minimized through proper model routing via kie.ai |
| **PTK Tracking** | Promises are identified and tagged separately from ideas |

---

## 11. FUTURE INTEGRATION POINTS

These are NOT part of your current mission, but are documented for awareness:

| Future Feature | Description |
|----------------|-------------|
| **WebSocket subscription** | Real-time updates when butterflies are promoted or acted upon |
| **News Channel submission** | Submitting structured news items (meeting notes, standups) |
| **Bingo Card updates** | Updating task status on initiative bingo cards |
| **KPI submission** | Pushing metric updates from external sources |
| **Wisdom Giants integration** | Connecting to the Wisdom Giants outreach system |
| **MCP Server** | Model Context Protocol server for deeper tool integration |

---

## QUICK START CHECKLIST

When you begin, follow this sequence:

1. Read this document completely (you're doing that now)
2. Read `CLOUD-BUTTERFLY-FLYTRAP-CONTRACT.md` for the full API spec
3. Read `V14-CONTEXT-BRIEFING-FOR-AGENT.md` for ecosystem context
4. Optionally read `/home/ubuntu/skills/pearls-brain/SKILL.md` for deep knowledge
5. Set up your two environment variables (`KIE_AI_API_KEY` and `LEARNING_LOOP_API_KEY`)
6. Hit the health endpoint to verify connectivity
7. Submit a test butterfly to verify the full pipeline
8. Build the Quick Capture interface first
9. Add Email Mining second
10. Add Daily Digest and Batch Review third

---

**Welcome to the SIC HB1000 Solve Team. Build something that makes it impossible for a good idea to get lost.**

*— Learning Loop Mission Control*
