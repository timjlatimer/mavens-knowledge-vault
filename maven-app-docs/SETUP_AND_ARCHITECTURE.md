# Maven Application — Setup and Architecture Guide

**Prepared for:** SIC HB1000 Solve Team
**Application:** Maven — Support at Your Door
**Version:** 1.0.0
**Last Updated:** March 20, 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Environment Variables](#environment-variables)
5. [Local Development Setup](#local-development-setup)
6. [Database Architecture](#database-architecture)
7. [API Architecture (tRPC)](#api-architecture-trpc)
8. [Stripe Payment Integration](#stripe-payment-integration)
9. [Grace AI Chatbot](#grace-ai-chatbot)
10. [Email Integration (Mandrill)](#email-integration-mandrill)
11. [SMS Integration (Twilio)](#sms-integration-twilio)
12. [Admin Dashboard](#admin-dashboard)
13. [Member Portal](#member-portal)
14. [Authentication Flow](#authentication-flow)
15. [Cron Jobs and Background Tasks](#cron-jobs-and-background-tasks)
16. [Testing](#testing)
17. [Deployment](#deployment)
18. [Troubleshooting](#troubleshooting)

---

## Overview

Maven is a community support platform designed to serve the working poor — specifically targeting the "Ruby Red" persona: a 35–45 year old mother of two trying to make her finances stretch to the next payday. The platform provides a village-based support network that delivers essentials (toilet paper, cleaning supplies), emergency cash (Milk Money), crisis support (Chaos Support), daily grocery giveaways, and a real community that shows up.

The application consists of three main surfaces:

| Surface | Purpose | Access |
|---------|---------|--------|
| **Public Landing Page** | Marketing, pricing, Grace AI onboarding | Everyone |
| **Member Portal** | Dashboard, support requests, community, resources | Paid subscribers |
| **Admin Dashboard** | Leads pipeline, member management, analytics, marketing | Admin users only |

The live domain is **lifewithmaven.app** with email routed to **help@lifewithmaven.com**.

---

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | React | 19.x |
| **Routing** | Wouter | Latest |
| **Styling** | Tailwind CSS | 4.x |
| **UI Components** | shadcn/ui (Radix primitives) | Latest |
| **Fonts** | Poppins (primary), Brittany Signature (branding) | Google Fonts |
| **Backend Runtime** | Node.js + Express | 22.x / 4.x |
| **API Layer** | tRPC | 11.x |
| **Database** | TiDB Serverless (MySQL-compatible) | — |
| **ORM** | Drizzle ORM | 0.44.x |
| **Payments** | Stripe (subscriptions + webhooks) | Latest API |
| **Email** | Mandrill (Mailchimp Transactional) | HTTP API |
| **SMS** | Twilio | Node SDK |
| **AI/LLM** | OpenAI-compatible (via Manus Forge API) | — |
| **Build Tool** | Vite | 7.x |
| **Bundler (Server)** | esbuild | Latest |
| **Testing** | Vitest | Latest |
| **Language** | TypeScript | 5.9.x |
| **Package Manager** | pnpm | Latest |

---

## Project Structure

The application follows a monorepo-style layout with client, server, and shared code in one directory:

```
maven-app/
├── client/                    # Frontend React application
│   ├── index.html             # HTML entry point (Google Fonts loaded here)
│   ├── public/                # Static assets (favicon, images)
│   └── src/
│       ├── App.tsx            # Route definitions and layout wiring
│       ├── main.tsx           # React + tRPC + QueryClient providers
│       ├── index.css          # Global styles, Tailwind theme, CSS variables
│       ├── const.ts           # Frontend constants (OAuth URLs, login helpers)
│       ├── _core/hooks/       # Auth hook (useAuth)
│       ├── components/        # Reusable UI components
│       │   ├── GraceChatWidget.tsx    # Grace AI chat bubble (THE single Grace instance)
│       │   ├── AdminLayout.tsx        # Admin sidebar + header layout
│       │   ├── MemberLayout.tsx       # Member portal layout
│       │   ├── PortalLayout.tsx       # Portal wrapper with tour support
│       │   ├── HeroSection.tsx        # Landing page hero
│       │   ├── PricingSection.tsx     # Subscription pricing cards
│       │   └── ui/                    # shadcn/ui primitives
│       ├── contexts/          # React contexts (theme, text size)
│       ├── data/              # Static data (feeling engine, walk content)
│       ├── hooks/             # Custom hooks (tracking, Stripe events, mobile)
│       ├── pages/
│       │   ├── Home.tsx               # Landing page
│       │   ├── admin/                 # ~50 admin pages
│       │   │   ├── Dashboard.tsx      # Admin command center
│       │   │   ├── LeadsPipeline.tsx  # Two-lane leads pipeline
│       │   │   ├── GraceConversations.tsx
│       │   │   ├── MarketingHQ.tsx
│       │   │   └── ...
│       │   └── portal/                # ~20 member portal pages
│       │       ├── PortalHome.tsx
│       │       ├── MilkMoney.tsx
│       │       ├── Dashboard.tsx
│       │       └── ...
│       └── utils/             # Utility functions (CSV export)
│
├── server/                    # Backend Node.js/Express application
│   ├── _core/                 # Framework plumbing (DO NOT EDIT unless extending)
│   │   ├── index.ts           # Server entry point — starts Express, registers routes
│   │   ├── env.ts             # Environment variable configuration
│   │   ├── trpc.ts            # tRPC router/procedure definitions
│   │   ├── context.ts         # Request context builder (auth injection)
│   │   ├── oauth.ts           # Manus OAuth callback handler
│   │   ├── llm.ts             # LLM invocation helper (OpenAI-compatible)
│   │   ├── notification.ts    # Owner push notification helper
│   │   ├── sdk.ts             # Manus platform SDK
│   │   └── vite.ts            # Vite dev server integration
│   ├── routers.ts             # ALL tRPC procedures (~5,600 lines, 80+ routes)
│   ├── db.ts                  # Database query helpers (~4,000+ lines)
│   ├── adminRouter.ts         # Admin-specific tRPC procedures
│   ├── adminDb.ts             # Admin database queries
│   ├── grace-prompt.ts        # Grace AI system prompts
│   ├── graceChat.ts           # Grace chat backend (email detection, member recognition)
│   ├── graceBrainPrompt.ts    # Grace Brain enrichment prompts
│   ├── graceBrainRouter.ts    # Grace Brain management procedures
│   ├── stripe.ts              # Stripe helper re-exports
│   ├── stripe/
│   │   ├── checkout.ts        # Stripe Checkout + Webhook handler
│   │   ├── products.ts        # Maven tier definitions (pricing, features)
│   │   ├── migration.ts       # Stripe subscription migration tools
│   │   ├── reconciliation.ts  # Nightly Stripe reconciliation cron
│   │   └── adminMetrics.ts    # Stripe metrics for admin dashboard
│   ├── mandrill.ts            # Mandrill email sending
│   ├── twilio.ts              # Twilio SMS sending
│   ├── email.ts               # Email template builders
│   ├── emailAuth.ts           # Magic link email authentication
│   ├── sms.ts                 # SMS template helpers
│   ├── memory.ts              # Grace three-layer memory system
│   ├── analytics.ts           # Site analytics aggregation
│   ├── storage.ts             # S3 file storage helpers
│   └── *.test.ts              # 58 test files (~915 tests total)
│
├── drizzle/                   # Database schema and migrations
│   ├── schema.ts              # All table definitions (~120 tables)
│   ├── relations.ts           # Table relationships
│   └── migrations/            # Generated migration files
│
├── shared/                    # Code shared between client and server
│   ├── const.ts               # Shared constants
│   ├── types.ts               # Shared TypeScript types
│   ├── tiers.ts               # Subscription tier configuration
│   ├── provinces.ts           # Canadian province normalization
│   └── formatName.ts          # Name formatting (First + Last Initial)
│
├── WALKTHROUGH.md             # Team walkthrough of leads pipeline + Grace onboarding
├── OWNER-ACTION-ITEMS.md      # Pending owner tasks (Stripe claim, API keys)
├── todo.md                    # Feature tracking checklist
├── package.json               # Dependencies and scripts
├── vite.config.ts             # Vite build configuration
├── vitest.config.ts           # Test configuration
├── drizzle.config.ts          # Drizzle ORM configuration
└── tsconfig.json              # TypeScript configuration
```

---

## Environment Variables

The application requires the following environment variables. All secrets must be configured through the hosting platform's secrets management (not committed to source control).

### Core Platform Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MySQL/TiDB connection string | Yes |
| `JWT_SECRET` | Session cookie signing secret | Yes |
| `VITE_APP_ID` | Manus OAuth application ID | Yes |
| `OAUTH_SERVER_URL` | Manus OAuth backend base URL | Yes |
| `VITE_OAUTH_PORTAL_URL` | Manus login portal URL (frontend) | Yes |
| `OWNER_OPEN_ID` | Owner's Manus OpenID | Yes |
| `OWNER_NAME` | Owner's display name | Yes |
| `BUILT_IN_FORGE_API_URL` | Manus built-in API endpoint (LLM, storage) | Yes |
| `BUILT_IN_FORGE_API_KEY` | Bearer token for Manus built-in APIs (server) | Yes |
| `VITE_FRONTEND_FORGE_API_KEY` | Bearer token for frontend Manus APIs | Yes |
| `VITE_FRONTEND_FORGE_API_URL` | Manus built-in API URL for frontend | Yes |

### Stripe Payment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe test secret key | Yes (test) |
| `STRIPE_LIVE_SECRET_KEY` | Stripe live secret key | Yes (production) |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe test publishable key (frontend) | Yes (test) |
| `VITE_STRIPE_LIVE_PUBLISHABLE_KEY` | Stripe live publishable key (frontend) | Yes (production) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Yes |

### Communication Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MANDRILL_API_KEY` | Mandrill (Mailchimp Transactional) API key | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes |
| `TWILIO_PHONE_NUMBER` | Twilio phone number (sender) | Yes |

### Application Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ADMIN_ACCESS_KEY` | Admin dashboard access key (second-factor) | Yes |
| `VITE_APP_TITLE` | Application title displayed in browser | Yes |
| `VITE_APP_LOGO` | Application logo URL | No |
| `VITE_ANALYTICS_ENDPOINT` | Analytics tracking endpoint | No |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics website identifier | No |

---

## Local Development Setup

### Prerequisites

The following software must be installed on your development machine:

- **Node.js** 22.x or later
- **pnpm** (package manager) — install with `npm install -g pnpm`
- **MySQL client** (for database operations) — `mysql` CLI tool
- A MySQL-compatible database (TiDB Serverless, PlanetScale, or local MySQL 8.x)

### Step-by-Step Setup

**1. Clone the repository and install dependencies:**

```bash
cd maven-app
pnpm install
```

**2. Configure environment variables:**

Create a `.env` file in the project root with all required variables listed in the Environment Variables section above. Use the provided `.env.example` as a template.

**3. Push the database schema:**

```bash
pnpm db:push
```

This runs `drizzle-kit generate && drizzle-kit migrate` to create all 121 database tables.

**4. Start the development server:**

```bash
pnpm dev
```

The server starts on `http://localhost:3000/` with Vite HMR enabled for frontend hot-reloading.

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `pnpm dev` | Start development server with hot reload |
| `build` | `pnpm build` | Build for production (Vite + esbuild) |
| `start` | `pnpm start` | Run production build |
| `test` | `pnpm test` | Run all Vitest tests |
| `check` | `pnpm check` | TypeScript type checking |
| `format` | `pnpm format` | Format code with Prettier |
| `db:push` | `pnpm db:push` | Generate and run database migrations |

---

## Database Architecture

The application uses **TiDB Serverless** (MySQL-compatible) with **Drizzle ORM** for schema management and queries. The database contains **121 tables** organized into the following functional groups:

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | All user accounts (members + admins) | id, email, name, tier, role, stripeCustomerId |
| `prefill_submissions` | Pre-fill form submissions from landing page | firstName, lastName, email, phone, province |
| `village_leads` | Leads from Grace conversations | name, email, phone, source, stage, stripeStatus |
| `lead_events` | Lead lifecycle events (stage changes) | leadId, fromStage, toStage, note |

### Support Feature Tables

| Table | Purpose |
|-------|---------|
| `chaos_support` / `chaos_support_ledger` | Chaos Support requests and disbursement tracking |
| `crisis_support` / `crisis_support_ledger` | Crisis Support requests and disbursement tracking |
| `make_a_wish` | Monthly wish entries |
| `daily_hand_ups` / `handup_recipients` | Daily giveaway entries and winners |
| `maven_box` | Monthly essentials box shipment tracking |

### Grace AI Tables

| Table | Purpose |
|-------|---------|
| `signup_conversations` | Grace onboarding conversation logs |
| `conversation_history` | Grace chat message history |
| `grace_memory` | Semantic memory (facts about people) |
| `grace_episodic_memory` | Episodic memory (conversation summaries) |
| `grace_procedural_memory` | Procedural memory (learned patterns) |
| `grace_person_profiles` | People Grace has met |
| `grace_person_notes` / `grace_person_followups` | Notes and follow-ups per person |
| `grace_brain_*` (10 tables) | Grace Brain knowledge management system |

### Community Tables

| Table | Purpose |
|-------|---------|
| `community_posts` / `community_likes` / `community_comments` | Village community feed |
| `community_messages` | Village Chat messages |
| `stories` / `client_stories` | Member stories and testimonials |
| `songs` / `song_theme_weeks` | Song Studio (AI-generated songs) |

### Financial Tables

| Table | Purpose |
|-------|---------|
| `financial_profiles` | Member financial profiles |
| `bills` | Bill tracking |
| `savings_goals` | Savings goal tracking |
| `saved_budgets` | Budget builder data |
| `expenses` | Expense tracking |

### Analytics Tables

| Table | Purpose |
|-------|---------|
| `analytics_visitors` / `analytics_sessions` / `analytics_page_views` | Site analytics |
| `page_visits` / `click_events` | User behavior tracking |
| `interaction_logs` | Grace interaction logging |
| `stripe_events` | Stripe event log |

### Communication Tables

| Table | Purpose |
|-------|---------|
| `messages` / `support_messages` / `client_messages` | In-app messaging |
| `notifications` | Push notifications |
| `announcements` | Admin announcements |
| `magic_link_tokens` | Email magic link authentication tokens |

---

## API Architecture (tRPC)

All API communication uses **tRPC** (type-safe RPC), which means the frontend and backend share TypeScript types with zero code generation. The API is served at `/api/trpc`.

### Procedure Types

| Type | Description | Auth Required |
|------|-------------|---------------|
| `publicProcedure` | Open to all visitors | No |
| `protectedProcedure` | Requires authenticated user | Yes |
| `paidMemberProcedure` | Requires paid subscription (Essentials or Plus) | Yes + Paid |
| `adminProcedure` | Requires admin role | Yes + Admin |

### Top-Level Route Namespaces

The `appRouter` exposes **80+ route namespaces**. The major ones are:

| Namespace | Description | Procedure Count |
|-----------|-------------|-----------------|
| `auth` | Login, logout, admin key verification | 3 |
| `admin` | All admin operations (members, requests, leads, settings) | 50+ |
| `graceBrain` | Grace Brain knowledge management | 20+ |
| `grace` | Grace chat (main chat, member recognition) | 5 |
| `signupConversation` | Grace onboarding conversation handler | 5 |
| `chat` | General chat with memory, personality, language | 5 |
| `milkMoney` / `chaosSupport` | Support request management | 10 |
| `community` | Community feed (posts, likes, comments) | 10 |
| `subscription` | Stripe subscription management | 5 |
| `leads` / `villageLeads` | Leads pipeline management | 10 |
| `dashboard` | Member dashboard data | 3 |
| `account` | Member account management | 5 |
| `analytics` | Site analytics data | 5 |
| `commandCenter` | Admin command center aggregation | 5 |
| `marketing` | Marketing HQ (AI-generated content) | 5 |

### Non-tRPC Routes (Express)

Some routes are registered directly on Express (before tRPC middleware):

| Route | Method | Description |
|-------|--------|-------------|
| `/api/stripe/create-checkout` | POST | Create Stripe Checkout Session |
| `/api/stripe/webhook` | POST | Stripe webhook receiver (raw body) |
| `/api/oauth/callback` | GET | Manus OAuth callback |
| `/api/auth/magic-link` | POST | Send magic link email |
| `/api/auth/verify-magic-link` | GET | Verify magic link token |
| `/api/digest/unsubscribe` | GET | Unsubscribe from deals digest |
| `/api/stripe/migrate-*` | POST | Stripe migration endpoints |

---

## Stripe Payment Integration

### Subscription Tiers

Maven offers three membership levels with flexible billing intervals. All prices are in **Canadian Dollars (CAD)**.

| Tier | Weekly | Bi-Weekly | Monthly |
|------|--------|-----------|---------|
| **Observer** (Free) | $0 | $0 | $0 |
| **Essentials** | $5.99/wk | $11.99/2wk | $24.99/mo |
| **Plus** | $10.99/wk | $21.99/2wk | $44.99/mo |

### Feature Access by Tier

| Feature | Observer | Essentials | Plus |
|---------|----------|------------|------|
| Life Blindside Support | View-Only | Full Network | Priority Network |
| Chaos Support | — | Up to $250 | Up to $750 |
| Milk Money | — | Up to $100 | Up to $100 |
| Make a Wish | — | 1x Entry | 2x Entries |
| Daily Hand Ups | — | 1x Entry | 2x + Plus-Only |
| Maven Box | — | TP & Essentials | TP & Essentials |
| Community & Feed | Included | Included | Included |
| Grace AI | Included | Included | Included |

### Webhook Events Handled

The Stripe webhook handler at `/api/stripe/webhook` processes these events:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create user account, set tier, generate magic link, send welcome email + SMS |
| `customer.subscription.updated` | Update tier on upgrade/downgrade |
| `customer.subscription.deleted` | Downgrade to Observer |
| `invoice.payment_failed` | Flag account, notify admin |
| `invoice.paid` | Confirm payment, update status |

### Stripe Webhook URL

Configure in Stripe Dashboard: `https://lifewithmaven.app/api/stripe/webhook`

### Key Business Rules

- **Payment comes LAST** — the Maven team builds a relationship first, then handles the membership conversation.
- **Only active Stripe subscribers get full accounts** — Observer tier is free but limited.
- **Magic links** are sent via both email (Mandrill) and SMS (Twilio) after successful payment.
- **Nightly reconciliation** cron runs at 2 AM MT to sync Stripe subscription statuses with the database.
- **Real-time sync** on `auth.me` — every time a user loads the app, their tier is checked against Stripe.

---

## Grace AI Chatbot

Grace is Maven's AI-powered conversational onboarding system. She is simultaneously a **friend, assistant, resource finder, and soft-seller** for Maven.

### Architecture

Grace consists of several interconnected components:

| Component | File | Purpose |
|-----------|------|---------|
| **Chat Widget** | `GraceChatWidget.tsx` | Frontend UI — auto-opens on first visit |
| **Main Chat Handler** | `graceChat.ts` | Backend — processes messages, detects emails, member recognition |
| **System Prompt** | `grace-prompt.ts` | Grace's personality, rules, conversation flow |
| **Signup Handler** | `routers.ts` (signupConversation) | Handles the onboarding conversation flow |
| **Memory System** | `memory.ts` | Three-layer memory (semantic + episodic + procedural) |
| **Grace Brain** | `graceBrain*.ts` | Knowledge management, learning, insights |

### Conversation Flow

Grace follows a structured but natural conversation flow:

1. **Welcome** — Song of the Day + Joke + "I'm Grace, what's your name?"
2. **Get to Know Them** — First name, last name, where in Canada they are
3. **Offer to Explore** — Navigation buttons to show them around the site
4. **Email Collection** — Natural ask for email, then real-time member check
5. **Routing** — If existing member → Sign In button. If new → continue onboarding
6. **Toilet Paper Offer** — The emotional turning point ("We send toilet paper right away!")
7. **Team Handoff** — Connect with Maven team for personal relationship building

### Key Technical Features

- **Auto-opens** on first visit (not a tiny bubble — front and center)
- **Real-time email detection** — scans every message for email patterns, checks against database
- **Member recognition** — recognized paid members get a Sign In button, NOT added to leads
- **Navigation buttons** — `[NAVIGATE:/path]` syntax in Grace's responses creates clickable buttons
- **2-3 sentence MAX** responses — enforced as a hard rule in the system prompt
- **24/7 availability** messaging — Grace announces she's always here
- **Canadian provinces only** — Grace specifically asks for province, validates against known list

### Single Instance Rule

There is exactly **ONE** Grace widget on the site: `GraceChatWidget.tsx` in `App.tsx`. The duplicate `GraceConversationalSignup` component was removed to prevent two Grace instances appearing simultaneously.

---

## Email Integration (Mandrill)

All transactional emails are sent via **Mandrill** (Mailchimp Transactional). The sender identity is **"Samantha from Maven"** with the address `noreply@mail.lifewithmaven.app`.

### Email Types Sent

| Email Type | Trigger | Content |
|------------|---------|---------|
| **Magic Link** | After Stripe payment | Branded sign-in link (15-min expiry) |
| **New Lead Notification** | Grace collects info / form submission | Lead details + "Action This Lead" button |
| **Admin Alerts** | New support requests | Request details for admin team |
| **Deals Digest** | Weekly cron (Mondays 7 AM MT) | Grocery deals roundup |

### Configuration

The Mandrill API key is stored as `MANDRILL_API_KEY`. The integration uses the Mandrill HTTP API directly (no SDK dependency).

---

## SMS Integration (Twilio)

SMS messages are sent via **Twilio** for magic link delivery and admin-initiated outreach.

### SMS Types

| Type | Trigger | Content |
|------|---------|---------|
| **Magic Link SMS** | After Stripe payment | Sign-in link sent to payment phone number |
| **Admin Outreach** | Manual from Leads Pipeline | Pre-filled templates or custom messages |
| **Follow-up** | Manual from Grace Conversations | Pre-filled follow-up templates |

### Configuration

Three environment variables are required: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`.

### Important Rule

**No auto-texting** — all SMS from the admin dashboard is manually triggered. The team clicks a button and can customize the message before sending.

---

## Admin Dashboard

The admin dashboard is accessible at `/admin` and requires both admin role AND an access key (second-factor authentication via `ADMIN_ACCESS_KEY`).

### Major Admin Sections

| Section | Route | Description |
|---------|-------|-------------|
| **Command Center** | `/admin` | Overview dashboard with stats, recent activity, action items |
| **Leads Pipeline** | `/admin/leads-pipeline` | Two-lane Kanban: New Leads + Members Requesting Help |
| **Grace Conversations** | `/admin/grace-conversations` | Full conversation transcripts with inline actions |
| **Marketing HQ** | `/admin/marketing` | AI-generated social posts, email blasts, campaigns |
| **Members** | `/admin/members` | Member list with tier, status, Stripe details |
| **All Requests** | `/admin/requests` | Tabbed view: Milk Money, Chaos Support, Messages |
| **Grace Brain** | `/admin/grace-brain` | Grace's knowledge management system |
| **Analytics** | `/admin/analytics` | Site traffic, engagement, conversion metrics |
| **Growth Command Center** | `/admin/growth-command-center` | Growth plays, campaigns, milestones |

### Leads Pipeline (Two-Lane System)

The leads pipeline is the central operational tool for the Maven team:

**Lane 1 — New Leads** (Kanban board with 5 columns):
- Grace Chatting → Info Collected → Ready for Team → Contacted → Converting

**Lane 2 — Members Requesting Help** (Grid view):
- Shows paid members who came back requesting support
- Full Stripe profile on every card (plan, payment status, billing interval)
- Milk Money (Chaos Support) request status

Every card shows: name, email, phone, what they're requesting, Stripe status, and one-click email/SMS/call actions.

---

## Member Portal

The member portal is accessible at `/portal` and requires authentication. Features are gated by subscription tier.

### Portal Pages

| Page | Route | Tier Required |
|------|-------|---------------|
| **Home** | `/portal` | Any |
| **Dashboard** | `/portal/dashboard` | Any |
| **Milk Money** | `/portal/milk-money` | Essentials+ |
| **Chaos Support** | `/portal/chaos-support` | Essentials+ (from day 1) |
| **Recipients** | `/portal/recipients` | Essentials+ |
| **Community** | `/portal/community` | Any |
| **Referrals** | `/portal/referrals` | Any |
| **My Account** | `/portal/account` | Any |
| **Budget Builder** | `/portal/budget-builder` | Any |
| **Help Near You** | `/portal/help-near-you` | Any |
| **Village Chat** | `/portal/village-chat` | Essentials+ |
| **Maven Moments** | `/portal/maven-moments` | Any |
| **Winners Circle** | `/portal/winners-circle` | Any |
| **Wisdom Giants** | `/portal/wisdom-giants` | Essentials+ |
| **Songs** | `/portal/songs` | Essentials+ |
| **Stories** | `/portal/stories` | Any |
| **Walk in Her Shoes** | `/portal/walk-in-her-shoes` | Any |
| **Meet the Team** | `/portal/meet-the-team` | Any |
| **Manifesto** | `/portal/manifesto` | Any |

---

## Authentication Flow

Maven uses a dual authentication system:

### For Members (Magic Link)

1. Member completes Stripe payment
2. Webhook creates user account with correct tier
3. Magic link token generated (15-minute expiry)
4. Magic link sent via email (Mandrill) AND SMS (Twilio)
5. Member clicks link → token verified → session cookie set
6. Subsequent visits use session cookie (auto-refreshed)

### For Admin (OAuth + Access Key)

1. Admin logs in via Manus OAuth (`/api/oauth/callback`)
2. Session cookie set after OAuth callback
3. Admin navigates to `/admin` → prompted for Access Key
4. Access Key verified against `ADMIN_ACCESS_KEY` env var
5. Rate-limited: lockout after too many failed attempts

### Important Notes

- **No email verification step** — magic links go directly to sign-in
- **No separate account creation** — accounts are auto-created by Stripe webhooks
- **Session cookies** persist across browser sessions
- **Real-time tier sync** — `auth.me` checks Stripe on every load

---

## Cron Jobs and Background Tasks

The server starts several automated background tasks:

| Task | Schedule | File | Description |
|------|----------|------|-------------|
| **Stripe Reconciliation** | Daily at 2 AM MT | `stripe/reconciliation.ts` | Syncs all Stripe subscription statuses with database |
| **Deals Digest** | Mondays at 7 AM MT | `dealsDigest.ts` | Sends weekly grocery deals email to members |
| **Daily Post** | Daily at 8 AM MT | `dailyPost.ts` | Posts Maven team message in Village Chat |
| **Grace Heartbeat** | Daily at 9 AM MT | `graceBrainCron.ts` | Grace Brain learning and insight generation |
| **Grace Scanner** | Every 1 hour | `graceScheduler.ts` | Automated intelligence scanning |

---

## Testing

The application has **915 tests** across **58 test files**, all passing. Tests use **Vitest** and cover:

- tRPC procedure logic (input validation, business rules)
- Stripe integration (checkout, webhooks, migration)
- Grace AI (prompts, member recognition, email detection)
- Pipeline logic (lead stages, Stripe enrichment)
- Email validation and sending
- SMS integration
- Authentication flows
- Database query helpers

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test -- --watch   # Watch mode
pnpm test -- server/graceChat.test.ts  # Run specific test file
```

---

## Deployment

### Production Build

```bash
pnpm build    # Builds frontend (Vite) + backend (esbuild)
pnpm start    # Starts production server
```

The build outputs:
- Frontend: `dist/` directory (static assets)
- Backend: `dist/index.js` (bundled server)

### Hosting

The application is currently hosted on the **Manus platform** with built-in hosting, custom domain support, and SSL. The live domains are:

- `lifewithmaven.app` (primary)
- `www.lifewithmaven.app`
- `mavensupport-rkeuwu7t.manus.space` (platform default)

### Stripe Webhook Configuration

For any new deployment, update the Stripe webhook URL in the Stripe Dashboard to point to your new domain:

```
https://your-domain.com/api/stripe/webhook
```

Required webhook events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`, `invoice.paid`.

---

## Troubleshooting

### Common Issues

**Grace not appearing on the site:**
Check that `GraceChatWidget` is included in `App.tsx` and that there is no duplicate `GraceConversationalSignup` component.

**Stripe payments not creating accounts:**
Verify the webhook secret (`STRIPE_WEBHOOK_SECRET`) matches the one in Stripe Dashboard. Check server logs for webhook signature verification failures.

**Magic links not arriving:**
Check `MANDRILL_API_KEY` is valid. Check `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER` for SMS delivery.

**Admin dashboard access denied:**
Ensure the user has `role: 'admin'` in the database. The access key is a second factor — check `ADMIN_ACCESS_KEY` env var.

**Database migration failures:**
Run `pnpm db:push` which executes `drizzle-kit generate && drizzle-kit migrate`. If migrations fail, check `DATABASE_URL` connectivity and SSL settings.

**Port conflicts:**
The server auto-finds an available port starting from 3000. If port 3000 is busy, it will use 3001, 3002, etc.

---

*This document was prepared by the SIC HB1000 Solve Team for knowledge transfer purposes.*
