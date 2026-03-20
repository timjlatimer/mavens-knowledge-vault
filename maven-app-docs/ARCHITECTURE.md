# Maven Architecture Manifest

> **Purpose:** This document is the single source of truth for the Maven application architecture. It must be consulted at the start of every development task. It is not a summary — it is a structured index that points to the actual code, database tables, and business rules. When in doubt, go to the source file listed here.

**Last verified:** March 14, 2026
**Test suite:** 646 tests across 45 test files, all passing
**Database:** 99 tables in production (MySQL/TiDB), 98 schema definitions in `drizzle/schema.ts`
**Server modules:** 53 files (excluding `_core` and tests)
**Client pages:** 101 page components
**TypeScript:** Zero errors

---

## 1. System Overview

Maven ("Support at Your Door") is a community support platform serving Ruby Red clients — the working poor, left out and left behind, unbanked and underbanked. The platform has three main surfaces: a public-facing marketing site, a members portal, and an admin portal. Grace is the AI assistant who serves as the front door to the entire experience.

The application is built on React 19 + Tailwind 4 + Express 4 + tRPC 11 with Manus OAuth, Stripe subscriptions, Twilio SMS/voice, Mandrill email, and an LLM-powered AI layer.

---

## 2. Module Registry

Each module is listed with its server file, database tables, router namespace, client page(s), and test file. This is the authoritative map of where code lives.

### 2.1 Core Infrastructure

| Module | Server File | Key Tables | Router Namespace | Test File |
|--------|-------------|------------|------------------|-----------|
| Authentication | `server/_core/oauth.ts`, `server/_core/context.ts` | `users` | `auth.*` | `auth.logout.test.ts` |
| Email Auth | `server/emailAuth.ts` | `users`, `magic_link_tokens` | (inline in routers.ts) | `emailAuth.test.ts` |
| Magic Links | `server/emailAuth.ts` | `magic_link_tokens` | (inline in routers.ts) | `magicLink.test.ts`, `observer-magic-link.test.ts` |
| OAuth Merge | `server/routers.ts` (inline) | `users`, `linked_accounts` | (inline) | `oauthMerge.test.ts` |
| Settings | `server/settingsDb.ts` | `app_settings` | (inline in routers.ts) | `settings.test.ts` |
| Cookies | `server/_core/cookies.ts` | — | — | `cookies.test.ts` |
| Storage (S3) | `server/storage.ts` | — | — | — |
| LLM | `server/_core/llm.ts` | — | — | — |
| Voice | `server/voice.ts` | `voice_calls` | — | — |
| Notifications | `server/_core/notification.ts` | `notifications` | `system.*` | `notifications.test.ts`, `admin-notify.test.ts` |
| Twilio SMS | `server/twilio.ts`, `server/sms.ts` | `phone_verifications` | — | `twilio.test.ts` |
| Mandrill Email | `server/mandrill.ts`, `server/email.ts` | — | — | `mandrill.integration.test.ts` |
| WebSocket | `server/websocket.ts` | — | — | — |
| Analytics | `server/analytics.ts` | `page_visits`, `click_events` | — | — |

### 2.2 Stripe & Payments

| Module | Server File | Key Tables | Router Namespace | Test File |
|--------|-------------|------------|------------------|-----------|
| Checkout | `server/stripe/checkout.ts` | — | (inline in routers.ts) | `stripe/checkout.test.ts` |
| Products | `server/products.ts` | — | — | — |
| Admin Metrics | `server/stripe/adminMetrics.ts`, `server/stripe-admin.ts` | — | `admin.dashboard.*` | `stripe/liveKey.test.ts` |
| Reconciliation | `server/stripe/reconciliation.ts` | — | — | `stripe/reconciliation.test.ts` |
| Migration | `server/stripe/migration.ts` | — | — | `stripe/migration.test.ts` |

### 2.3 Members Portal Features

| Module | Server File | DB Tables | Client Page | Test File |
|--------|-------------|-----------|-------------|-----------|
| Dashboard | `server/db.ts` | multiple | `portal/Dashboard.tsx` | `portal.test.ts` |
| Milk Money | `server/routers.ts` (emergencyFundRouter) | `emergency_fund_pool`, `emergency_requests`, `emergency_contributions` | `portal/MilkMoney.tsx` | — |
| Chaos Support | `server/db.ts` | `chaos_support`, `chaos_support_ledger` | `portal/ChaosSupport.tsx` | `chaosSupport.test.ts` |
| Crisis Support | `server/db.ts` | `crisis_support`, `crisis_support_ledger` | — | — |
| Make a Wish | `server/db.ts` | `make_a_wish` | — | — |
| Daily Hand Ups | `server/db.ts` | `daily_hand_ups`, `handup_recipients` | `portal/DailyHandUps.tsx` | — |
| Maven Box | `server/db.ts` | `maven_box` | — | — |
| Community Feed | `server/db.ts` | `community_posts`, `community_comments`, `community_likes` | `portal/Community.tsx` | — |
| Messaging | `server/db.ts` | `conversations`, `messages`, `community_messages` | `portal/Messages.tsx` | `messaging.test.ts` |
| Announcements | `server/db.ts` | `announcements` | `portal/Announcements.tsx` | — |
| Referrals | `server/db.ts` | `referrals`, `referral_signups` | `portal/Referrals.tsx` | — |
| My Account | `server/db.ts` | `users`, `prefill_submissions` | `portal/Account.tsx` | `account.test.ts` |
| Budget Builder | `server/db.ts` | `saved_budgets`, `financial_profiles`, `bills`, `savings_goals` | `portal/BudgetBuilder.tsx` | `budget.test.ts` |
| Help Near You | `server/db.ts` | `resource_directory` | `portal/HelpNearYou.tsx` | — |
| Village Chat | `server/db.ts` | `community_messages` | `portal/VillageChat.tsx` | — |
| Maven Moments | `server/db.ts` | `maven_moments` | `portal/MavenMoments.tsx` | — |
| Winners Circle | `server/db.ts` | `grocery_box_winners` | `portal/WinnersCircle.tsx` | — |
| Wisdom Giants | `server/db.ts` | `wisdom_giants`, `wisdom_giant_requests` | `portal/WisdomGiants.tsx` | — |
| Song Studio | `server/song-studio.ts` | `songs`, `song_theme_weeks` | `portal/Songs.tsx` | — |
| Stories | `server/db.ts` | `stories` | `portal/Stories.tsx` | — |
| Walk in Her Shoes | `server/db.ts` | `walk_choices` | `portal/WalkInHerShoes.tsx` | `walk-in-her-shoes.test.ts` |
| Tier Preview | — | — | `portal/TierPreview.tsx` | — |
| Manifesto | — | — | `portal/Manifesto.tsx` | — |
| Meet the Team | — | — | `portal/MeetTheTeam.tsx` | — |

### 2.4 Admin Portal

| Module | Server File | Client Page | Test File |
|--------|-------------|-------------|-----------|
| Admin Dashboard | `server/adminRouter.ts`, `server/adminDb.ts` | `admin/AdminDashboard.tsx` | `admin.test.ts`, `admin-new.test.ts` |
| Revenue | `server/stripe-admin.ts` | `admin/Revenue.tsx` | — |
| Give Back (Expenses) | `server/adminRouter.ts` | `admin/GiveBack.tsx` | — |
| Members | `server/adminRouter.ts` | `admin/Members.tsx` | — |
| Recipients | `server/adminRouter.ts` | `admin/Recipients.tsx` | — |
| Messages | `server/adminRouter.ts` | `admin/Messages.tsx` | — |
| Milk Money Admin | `server/adminRouter.ts` | `admin/MilkMoney.tsx` | — |
| Chaos Support Admin | `server/adminRouter.ts` | `admin/ChaosSupport.tsx` | — |
| Cancellations | `server/adminRouter.ts` | `admin/Cancellations.tsx` | — |
| Announcements Admin | `server/adminRouter.ts` | `admin/Announcements.tsx` | — |
| SKU Management | `server/adminRouter.ts` | `admin/SKUs.tsx` | — |
| Order Queue | `server/adminRouter.ts` | `admin/Orders.tsx` | — |
| Referrals Admin | `server/adminRouter.ts` | `admin/Referrals.tsx` | — |
| Surprise Rewards | `server/adminRouter.ts` | `admin/SurpriseRewards.tsx` | — |
| Security | `server/adminRouter.ts` | `admin/Security.tsx` | — |
| Leads | `server/adminRouter.ts` | `admin/Leads.tsx` | `leads.test.ts` |
| Community Moderation | `server/adminRouter.ts` | `admin/Community.tsx` | — |
| Admin Settings | `server/adminRouter.ts` | `admin/Settings.tsx` | — |
| Stripe Sync | — | `admin/StripeSync.tsx` | — |
| Member Engagement | `server/memberEngagement.ts` | `admin/Engagement.tsx` | `memberEngagement.test.ts` |
| Deals Digest | `server/dealsDigest.ts` | `admin/DealsDigest.tsx` | `dealsDigest.test.ts` |
| Support Requests | — | `admin/SupportRequests.tsx` | — |
| Feeling Engine | — | `admin/FeelingEngine.tsx` | — |
| Growth | `server/routers.ts` | `admin/Growth.tsx` | — |
| Command Center | `server/commandCenterDb.ts` | — | — | `commandCenter.test.ts` |

### 2.5 Grace AI System

| Module | Server File | DB Tables | Test File |
|--------|-------------|-----------|-----------|
| Grace Chat | `server/graceChat.ts` | `conversation_history` | `graceChat.test.ts` |
| Grace System Prompt | `server/grace-prompt.ts` | — | — |
| Grace Brain — Identity | `server/graceBrainDb.ts` | `grace_brain_identity` | `graceBrain.test.ts` |
| Grace Brain — Knowledge | `server/graceBrainDb.ts` | `grace_brain_knowledge` | `graceBrain.test.ts` |
| Grace Brain — Protocols | `server/graceBrainDb.ts` | `grace_brain_protocols` | `graceBrain.test.ts` |
| Grace Brain — Escalation | `server/graceBrainDb.ts` | `grace_brain_escalation` | `graceBrain.test.ts` |
| Grace Brain — Guardrails | `server/graceBrainDb.ts` | `grace_brain_guardrails` | `graceBrain.test.ts` |
| Grace Brain — Segments | `server/graceBrainDb.ts` | `grace_brain_segments` | `graceBrain.test.ts` |
| Grace Brain — Insights | `server/graceBrainDb.ts` | `grace_brain_insights` | `graceBrain.test.ts` |
| Grace Brain — Known Issues | `server/graceBrainDb.ts` | `grace_brain_known_issues` | `graceBrain.test.ts` |
| Grace Brain — Ingestion | `server/graceBrainDb.ts` | `grace_brain_ingestion` | `graceBrain.test.ts` |
| Grace Brain — Changelog | `server/graceBrainDb.ts` | `grace_brain_changelog` | `graceBrain.test.ts` |
| Grace Brain — Metrics | `server/graceBrainDb.ts` | `grace_brain_conversation_metrics` | `graceBrain.test.ts` |
| Grace Brain — Prompt Assembly | `server/graceBrainPrompt.ts` | (reads from all brain tables) | — |
| Grace Brain — Learning Loop | `server/graceBrainLearning.ts` | (writes to knowledge, insights, issues) | — |
| Grace Brain — Router | `server/graceBrainRouter.ts` | (all grace_brain_* tables) | `graceBrain.test.ts` |
| Relationship Memory — DB | `server/relationshipMemoryDb.ts` | `grace_person_profiles`, `grace_family_connections`, `grace_person_notes`, `grace_person_followups`, `grace_person_interactions` | `relationshipMemory.test.ts` |
| Relationship Memory — Extractor | `server/relationshipExtractor.ts` | (writes to all person tables) | `relationshipMemory.test.ts` |
| Relationship Memory — Router | `server/relationshipMemoryRouter.ts` | (all grace_person_* tables) | `relationshipMemory.test.ts` |
| Grace Memory (Semantic/Episodic) | `server/memory.ts` | `grace_memory`, `grace_episodic_memory`, `grace_procedural_memory`, `memory_audit_log` | — |
| Conversational Signup | `server/routers.ts` (inline) | `signup_conversations` | `conversationalSignup.test.ts` |
| Grace Welcome | `server/routers.ts` (inline) | — | `graceWelcome.test.ts`, `graceWelcomeData.test.ts` |
| Grace Pages | `server/routers.ts` (inline) | — | `grace-pages.test.ts` |
| Grace Chat Widget | — | — | — |

### 2.6 Other Systems

| Module | Server File | DB Tables | Test File |
|--------|-------------|-----------|-----------|
| Call Survey | `server/routers.ts` | `call_surveys` | `callSurvey.test.ts` |
| CSV Export | `server/routers.ts` | — | `csvExport.test.ts` |
| Daily Post | `server/dailyPost.ts` | — | `dailyPost.test.ts` |
| Daily Draw | `server/dailyDraw.ts` | `grocery_box_winners` | — |
| Grocery Deals | `server/groceryDeals.ts` | `collective_deals` | `groceryDeals.test.ts` |
| Client Auth | `server/clientAuth.ts` | `clients` | — |
| Customer Intakes | `server/db.ts` | `customer_intakes` | — |
| Banker Assignment | `server/assignment.ts` | `bankers`, `customer_intakes` | — |
| Linked Accounts | `server/db.ts` | `linked_accounts` | `linkedAccounts.test.ts` |
| Fraud Alerts | `server/db.ts` | `fraud_alerts` | — |
| Scam Reports | `server/db.ts` | `scam_reports` | — |
| Help Board | `server/db.ts` | `help_board_posts`, `help_board_responses` | — |
| SOS Events | `server/db.ts` | `sos_events` | — |
| Growth Campaigns | `server/db.ts` | `growth_campaigns`, `growth_milestones` | — |
| Membership Engine | `server/routers.ts` | — | `membership-engine.test.ts` |
| Connectivity | — | — | `connectivity.test.ts` |

---

## 3. Business Rules Registry

These are the rules that govern eligibility, limits, and access. Each rule includes the file and line where it is enforced.

### 3.1 Tier System

The tier system is defined in `shared/tiers.ts` and enforced across the application.

| Rule | Observer | Essentials | Plus | Enforcement Location |
|------|----------|------------|------|---------------------|
| Milk Money max | $0 | $100 | $100 | `shared/tiers.ts` → `milkMoneyMax` |
| Chaos Support max | $0 | $250 | $750 | `shared/tiers.ts` → `chaosMax` |
| Chaos eligibility | N/A | 60 days | 60 days | `shared/tiers.ts` → `chaosEligibilityDays` |
| Wishes per period | 0 | 1 | 2 | `shared/tiers.ts` → `wishesPerPeriod` |
| Hand Ups per day | 0 | 1 | 2 | `shared/tiers.ts` → `handUpsPerDay` |
| Plus-only Hand Ups | No | No | Yes | `shared/tiers.ts` → `hasPlusOnlyHandUps` |
| Maven Box | No | Yes | Yes | `shared/tiers.ts` → `hasMavenBox` |

### 3.2 Pricing

Pricing is defined in `server/products.ts` → `MAVEN_TIERS`.

| Plan | Weekly | Bi-Weekly | Monthly |
|------|--------|-----------|---------|
| Essentials | $5.99 | $11.99 | $24.99 |
| Plus | $10.99 | $21.99 | $44.99 |
| Observer | Free | Free | Free |

### 3.3 Support Eligibility Rules

| Rule | Description | Enforcement |
|------|-------------|-------------|
| Milk Money | Available from day 1 for paid members only | `shared/tiers.ts` → `milkMoneyMax > 0` |
| Chaos Support | Requires 60 days of paid membership | `shared/tiers.ts` → `chaosEligibilityDays`, server checks in `routers.ts` |
| Crisis Support | Once per 12-month cycle | Server-side check in `routers.ts` |
| Free tier restrictions | Observer cannot access Crisis, Messages, Chaos, Milk Money | Client-side in `Dashboard.tsx`, server-side via `paidMemberProcedure` |

### 3.4 Name Display

All member names are displayed as first name + last initial (e.g., "Sarah M.") for confidentiality. This is enforced by `shared/formatName.ts` and applied across all portal pages.

### 3.5 Admin Access

Admin access requires `role: "admin"` on the user record. Admin routes are protected by `adminProcedure` in routers. The admin portal requires an additional access key (`ENV.adminAccessKey`) verified via `auth.verifyAdminKey`. Failed attempts are rate-limited (5 attempts, 15-minute lockout).

---

## 4. Grace AI Architecture

Grace is the AI front door to Maven. Her architecture has multiple layers.

### 4.1 Conversation Flow

1. User sends message → `routers.ts` → `chatWithGraceEnhanced()` in `graceChat.ts`
2. System prompt assembled from: `grace-prompt.ts` (base) + `graceBrainPrompt.ts` (enrichment from Brain tables) + relationship context
3. LLM called via `_core/llm.ts`
4. Response returned to user
5. **Post-conversation (async):** Learning loop (`graceBrainLearning.ts`) + Relationship extraction (`relationshipExtractor.ts`)

### 4.2 Grace's Brain (11 tables)

| Table | Purpose | Row Count |
|-------|---------|-----------|
| `grace_brain_identity` | Grace's personality (warmth, humor, traits) | 1 |
| `grace_brain_knowledge` | What Grace knows (categorized knowledge entries) | 83 |
| `grace_brain_protocols` | How Grace should respond in specific situations | 0 |
| `grace_brain_escalation` | When/how to escalate to humans | 0 |
| `grace_brain_guardrails` | Topics/behaviors Grace must avoid | 0 |
| `grace_brain_segments` | User segment definitions for personalization | 0 |
| `grace_brain_insights` | Patterns detected from conversations | 3 |
| `grace_brain_known_issues` | Community issues Grace is tracking | 7 |
| `grace_brain_ingestion` | Pipeline for ingesting external knowledge | 16 |
| `grace_brain_changelog` | Audit trail of all brain changes | 79 |
| `grace_brain_conversation_metrics` | Conversation quality metrics | 5 |

### 4.3 Relationship Memory (5 tables)

| Table | Purpose | Row Count |
|-------|---------|-----------|
| `grace_person_profiles` | Core person record (name, contact, mood, challenges, goals) | 0 |
| `grace_family_connections` | People connected to this person (kids, partner, pets) | 0 |
| `grace_person_notes` | Timestamped notes from conversations | 0 |
| `grace_person_followups` | Proactive follow-up prompts | 0 |
| `grace_person_interactions` | Log of every conversation with mood + topic tracking | 0 |

### 4.4 Knowledge Inventory (from database)

| Category | Count | Description |
|----------|-------|-------------|
| `frontline_wisdom` | 68 | Trust-bu
(Content truncated due to size limit. Use line ranges to read remaining content)