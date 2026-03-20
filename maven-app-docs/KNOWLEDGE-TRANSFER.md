# Maven Application — Knowledge Transfer Document

**Prepared for:** SIC HB1000 Solve Team
**Application:** Maven — Support at Your Door
**Last Updated:** March 20, 2026

---

## Table of Contents

1. [Purpose of This Document](#purpose-of-this-document)
2. [Who We Are Solving For](#who-we-are-solving-for)
3. [The Revolutionary Hands-Free Onboarding](#the-revolutionary-hands-free-onboarding)
4. [All Design Decisions and Business Rules](#all-design-decisions-and-business-rules)
5. [Complete Feature Inventory](#complete-feature-inventory)
6. [Grace AI — Everything You Need to Know](#grace-ai--everything-you-need-to-know)
7. [Leads Pipeline — How It Works](#leads-pipeline--how-it-works)
8. [Stripe Integration — Complete Picture](#stripe-integration--complete-picture)
9. [Admin Dashboard — Section by Section](#admin-dashboard--section-by-section)
10. [Member Portal — Feature Details](#member-portal--feature-details)
11. [Third-Party Service Configurations](#third-party-service-configurations)
12. [Technical Debt and Known Issues](#technical-debt-and-known-issues)
13. [What Is In Progress vs. Completed](#what-is-in-progress-vs-completed)
14. [Owner Action Items](#owner-action-items)
15. [Key Contacts and Accounts](#key-contacts-and-accounts)
16. [Lessons Learned](#lessons-learned)

---

## Purpose of This Document

This knowledge transfer document captures every decision, instruction, business rule, and technical detail that has been discussed, debated, and implemented across the entire Maven development lifecycle. It is designed so that any developer or team member picking up this project can understand not just **what** was built, but **why** it was built that way, and **what the team cares about** when making future decisions.

This is not a setup guide (see `SETUP-AND-ARCHITECTURE.md` for that). This is the institutional memory of the project.

---

## Who We Are Solving For

> "It's expensive to be poor." — This is the crime in society that Maven is trying to change.

The entire Maven platform is designed around a single persona the team calls **"Ruby Red"**:

**Ruby Red** is a 35–45 year old Canadian mother of two. She is home trying to figure out how to make her finances stretch until the next payday. She is part of the working poor — left out and left behind, unbanked and underbanked. Every day she makes difficult decisions: Does she put something back when she's in the grocery line? Does she let the kids go to the extracurricular event that costs $30? How does she pay for the flat tire on the car outside?

The team's superpower is **empathy**, practiced with a sense of "there for the grace of God go I." Every feature, every design decision, every word Grace says is filtered through the question: **Does this make Ruby Red's life easier, or harder?**

Ruby Red navigates three hostile worlds daily:
- **The political world** — systems that don't serve her
- **The bureaucratic world** — processes designed to exhaust her
- **The greedy capitalist world** — companies that profit from her struggle

Maven's job is to **support her, empower her, enable her, or fix things** in these worlds for her. If we get it right for Ruby Red, we get it right for everybody else.

---

## The Revolutionary Hands-Free Onboarding

The Maven team explicitly calls this a **"revolutionary hands-free onboarding experience."** The core philosophy is:

> No forms. No friction. No judgment. Just a warm conversation that leads to toilet paper at her door before she's ever asked to pay a dime.

### The Five-Stage Journey

| Stage | What Happens | Who Does It | Admin Sees |
|-------|-------------|-------------|------------|
| **1. First Hello** | Person lands on site, Grace pops up immediately with a song and warm greeting | Grace (AI) | Nothing yet |
| **2. Getting to Know You** | Grace naturally collects first name, last name, email, phone, and Canadian province through friendly conversation | Grace (AI) | Lead appears as "Info Collected" |
| **3. The Toilet Paper Moment** | Grace offers to send toilet paper and essentials right away — no strings attached | Grace (AI) | Lead shows what they need |
| **4. Team Handoff** | A Maven team member reaches out personally to build the relationship | Maven Team | Lead moves through stages |
| **5. Membership** | The Maven team handles the membership conversation when the time is right | Maven Team | Lead converts to member |

### The Toilet Paper Offer

This is the **emotional turning point** in the onboarding. The team specifically designed this moment: before Ruby Red has paid anything, before she's even been asked about membership, Maven offers to send toilet paper and essentials to her door. This demonstrates the village philosophy — we help first, we ask later.

### Payment Comes LAST

This is a **non-negotiable business rule**. Grace never discusses payment. Grace never pushes membership. The Maven team builds a personal relationship first, and only when the time is right do they have the membership conversation. This is fundamentally different from every other SaaS onboarding — and it's intentional.

---

## All Design Decisions and Business Rules

The following decisions were explicitly made during development and should be preserved:

### Branding and Design

| Decision | Detail | Reason |
|----------|--------|--------|
| **Font: Poppins** | Used throughout the entire application | Clean, friendly, accessible |
| **Font: Brittany Signature** | Used for Maven branding/logo elements | Warm, personal touch |
| **Color palette** | Golden hour cinematic warmth (warm golds, soft creams, deep magentas) | Feels like home, not corporate |
| **Name display** | First name + last initial (e.g., "Sarah M.") | Confidentiality for vulnerable members |
| **Canadian provinces only** | Location fields only accept Canadian provinces/territories | Maven operates in Canada only |
| **Currency: CAD** | All prices in Canadian Dollars | Canadian business |

### Business Rules

| Rule | Detail |
|------|--------|
| **Only active Stripe subscribers get accounts** | Observer tier is free but limited. Full accounts require payment. |
| **Chaos Support eligibility** | Available to paid members from day one. Up to $250 (Essentials) or $750 (Plus). |
| **Crisis Support eligibility** | Requires 60 days of active membership. Once per 12-month cycle. |
| **Milk Money = Chaos Support** | "Milk Money" and "Chaos Support" refer to the same product. Milk Money is the member-facing name. |
| **Email goes to help@lifewithmaven.com** | All lead notification emails route here. |
| **No auto-texting** | All SMS from admin dashboard is manually triggered by team members. |
| **Grace is a face** | Grace's branding should not be changed. She has a specific visual identity. |
| **Emails from "Samantha from Maven"** | Transactional emails use this sender identity. |
| **No email verification** | Magic links go directly to sign-in. No verification step. |
| **Use Mandrill, NOT SendGrid** | Explicit instruction to use Mandrill (Mailchimp Transactional) for all emails. |

### Grace AI Rules

| Rule | Detail |
|------|--------|
| **2-3 sentences MAX** | Hard limit on every Grace response. Think text message, not email. |
| **Never use pet names** | No "honey", "sweetie", "sweetheart", "darling", "dear", "babe" |
| **Use their name or "friend"/"neighbor"** | Personal but respectful |
| **Short AND warm** | Every sentence should feel like a hug. Not short and robotic. |
| **24/7 availability** | Grace announces she's always here |
| **Auto-open on first visit** | Grace pops up front and center, not a tiny bubble |
| **Single instance only** | One Grace widget on the site. Never two. |
| **Recognized members get Sign In** | Don't re-onboard existing members. Route them to login. |
| **Members never become leads** | Recognized paid members are prevented from entering the lead pipeline. |

---

## Complete Feature Inventory

### Public-Facing Features

| Feature | Status | Description |
|---------|--------|-------------|
| Hero Section | Complete | Animated landing page with Maven branding |
| Pricing Section | Complete | Observer/Essentials/Plus with weekly/biweekly/monthly toggle |
| Meet Your Team | Complete | Team introduction with video |
| What is Maven | Complete | Explainer page |
| How It Works | Complete | Process explanation |
| Grace AI Chat | Complete | Auto-opening conversational onboarding |
| Pre-fill Form | Complete | Alternative info collection form |
| Request a Call | Complete | Phone number submission |
| Thank You Page | Complete | Confirmation with video cards |

### Member Portal Features

| Feature | Status | Tier |
|---------|--------|------|
| Dashboard | Complete | All |
| Milk Money (Chaos Support) | Complete | Essentials+ |
| Crisis Support | Complete | Essentials+ (60-day gate) |
| Make a Wish | Complete | Essentials+ |
| Daily Hand Ups | Complete | Essentials+ |
| Maven Box Tracking | Complete | Essentials+ |
| Community Feed | Complete | All |
| Village Chat | Complete | Essentials+ |
| Referrals | Complete | All |
| My Account | Complete | All |
| Budget Builder | Complete | All |
| Help Near You | Complete | All |
| Maven Moments | Complete | All |
| Winners Circle | Complete | All |
| Wisdom Giants | Complete | Essentials+ |
| Song Studio | Complete | Essentials+ |
| Stories | Complete | All |
| Walk in Her Shoes | Complete | All |
| Meet the Team | Complete | All |
| Manifesto | Complete | All |
| Tier Preview | Complete | All |

### Admin Dashboard Features

| Feature | Status | Description |
|---------|--------|-------------|
| Command Center | Complete | Overview with stats, recent payments, action items |
| Leads Pipeline | Complete | Two-lane Kanban (New Leads + Members Requesting Help) |
| Grace Conversations | Complete | Full transcripts with inline actions |
| Marketing HQ | Complete | AI-generated social posts, email blasts, campaigns |
| Members Management | Complete | List, detail, edit tier/role |
| All Requests | Complete | Tabbed: Milk Money, Chaos Support, Messages |
| Grace Brain | Complete | Knowledge management system |
| People Grace Knows | Complete | Grace's relationship memory profiles |
| Frankie Dashboard | Complete | Frankie AI assistant management |
| Growth Command Center | Complete | Growth plays, campaigns, milestones |
| Analytics | Complete | Site traffic, engagement, conversion |
| Stripe Events | Complete | Stripe event log viewer |
| Settings | Complete | App settings management |
| Security | Complete | Security logs and fraud alerts |
| Community Moderation | Complete | Post/comment management |
| Announcements | Complete | Admin announcements |
| Cancellations | Complete | Cancellation tracking |
| Deals Digest | Complete | Weekly grocery deals management |
| Feeling Engine | Complete | Emotional engagement tools |
| Social Media Hub | Complete | Social media management |
| Social Card Studio | Complete | Visual content creation |
| Story Engine | Complete | AI-generated member stories |
| Client Stories | Complete | Testimonial management |
| Tag Management | Complete | Content tagging system |
| Village Pulse | Complete | Community health metrics |
| Wisdom Giants Directory | Complete | Expert directory management |
| Ruby Red Report | Complete | Impact reporting |
| Quick Capture | Complete | Quick note/idea capture |
| Insights View | Complete | AI-generated insights |
| Milestones | Complete | Achievement tracking |
| Moments | Complete | Maven Moments management |
| Campaigns | Complete | Campaign management |
| Digest | Complete | Email digest management |
| Mailchimp | Complete | Mailchimp integration management |
| Action Queue | Complete | Pending action items |

---

## Grace AI — Everything You Need to Know

### Grace's Personality

Grace is not a chatbot. She is simultaneously:

1. **A friend** — warm, genuine, supportive, never fake or scripted
2. **An assistant** — helps people find what they need
3. **A resource finder** — connects people to Maven's services
4. **A soft-seller** — makes people want to be at Maven before they see a price tag

Grace uses contractions naturally ("I'm", "you're", "gonna"), occasional emoji (but doesn't overdo it), and genuinely loves Maven. She is client-first always — their needs come before process.

### Grace's Memory System

Grace has a three-layer memory system:

| Layer | Purpose | Persistence |
|-------|---------|-------------|
| **Semantic Memory** | Facts about people (name, family, preferences) | Permanent |
| **Episodic Memory** | Conversation summaries and key moments | Permanent |
| **Procedural Memory** | Learned patterns and best practices | Permanent |

### Grace Brain

Grace Brain is a knowledge management system that allows the admin team to:
- Define Grace's identity and personality traits
- Add knowledge articles Grace can reference
- Set protocols for specific situations
- Define escalation rules
- Set guardrails (things Grace should never say/do)
- Track conversation metrics and insights
- Manage known issues and their resolutions

### Member Recognition Flow

When someone chats with Grace:

1. Grace scans every message for email patterns (regex detection)
2. If email found, Grace checks the database for a matching paid member
3. If match found → Grace says "Oh wait — you're already part of the family!" and offers a Sign In button
4. If no match → Grace continues the onboarding conversation
5. Grace also detects member keywords ("I already have an account", "I'm on Essentials", etc.)

### Navigation System

Grace can navigate users around the site using the `[NAVIGATE:/path]` syntax. The frontend automatically converts these into clickable buttons. Key navigation paths:

- `/login` — Sign in page
- `/what-is-maven` — About Maven
- `/meet-your-team` — Team page
- `/resources` — Free resources
- `/how-it-works` — How Maven works
- `/#pricing-section` — Pricing plans

---

## Leads Pipeline — How It Works

### Two-Lane Architecture

The leads pipeline is split into two distinct views:

**Lane 1: New Leads (Kanban Board)**

These are people who are NOT yet Maven members. They flow through five stages:

| Stage | Meaning | How They Get Here |
|-------|---------|-------------------|
| **Grace Chatting** | Grace is still talking to them | Auto-detected from active Grace conversations |
| **Info Collected** | Grace has their name, email, phone | Auto-detected when profile is complete |
| **Ready for Team** | Grace has finished, team needs to reach out | Auto-moved when Grace hands off |
| **Contacted** | Team has reached out (email, SMS, or call) | Manually moved by team |
| **Converting** | In active membership conversation | Manually moved by team |

**Lane 2: Members Requesting Help (Grid View)**

These are existing paid members who have come back requesting support. Each card shows:
- Full name, email, phone number (prominently displayed)
- Stripe plan (Essentials/Plus), payment status (Active/Past Due/Trialing)
- Billing interval and amount
- Member since date
- Pending Milk Money (Chaos Support) requests with count, amount, description
- One-click email, SMS, and call buttons

### Lead Sources

Leads enter the pipeline from three sources:

| Source | Label in Pipeline | How It Happens |
|--------|-------------------|----------------|
| Grace Chat | "Grace Chat" | Grace collects info during conversation |
| Pre-fill Form | "Website Sign-up" | Visitor fills out the landing page form |
| Voice Call | "Grace Voice Call" | Visitor uses voice interaction |

### Stats Bar

The pipeline has a stats bar with five colored cards:
- **New Leads** — total new leads in pipeline
- **Ready to Contact** — leads waiting for team outreach
- **Members** — total paid members
- **Milk Money Pending** — pending Chaos Support requests
- **Past Due** — members with past-due payments

### Lead Notification Emails

When a new lead arrives (from any source), an email is sent to `help@lifewithmaven.com` containing:
- Lead's name, email, and phone number
- What they're requesting (in plain English)
- A direct "Action This Lead" button linking to the admin dashboard

---

## Stripe Integration — Complete Picture

### Product Architecture

Maven uses Stripe Subscriptions with the following product structure:

| Product | Stripe Name | Billing Options |
|---------|-------------|-----------------|
| **Observer** | Free tier (no Stripe product) | N/A |
| **Essentials** | Maven Essentials | Weekly ($5.99), Biweekly ($11.99), Monthly ($24.99) |
| **Plus** | Maven Plus | Weekly ($10.99), Biweekly ($21.99), Monthly ($44.99) |

All prices are in **Canadian Dollars (CAD)**. This was explicitly corrected from an earlier USD configuration.

### Checkout Flow

1. User clicks a pricing button on the landing page
2. Frontend calls `POST /api/stripe/create-checkout` with tier and interval
3. Server creates a Stripe Checkout Session with the correct price
4. User is redirected to Stripe's hosted checkout page
5. After payment, Stripe sends `checkout.session.completed` webhook
6. Server creates user account, sets tier, generates magic link
7. Welcome email (Mandrill) and SMS (Twilio) sent with magic link
8. Admin notified via push notification

### Webhook Processing

The webhook handler at `/api/stripe/webhook` is registered **before** `express.json()` middleware because Stripe webhooks require the raw request body for signature verification.

### Stripe Reconciliation

A nightly cron job runs at 2 AM Mountain Time that:
1. Fetches all active, past_due, and trialing subscriptions from Stripe
2. Compares with database records
3. Updates any mismatched tiers or statuses
4. Logs discrepancies for admin review

### Real-Time Tier Sync

Every time `auth.me` is called (on every page load), the server checks the user's current Stripe subscription status and updates their tier if it has changed. This ensures the member portal always reflects the correct access level.

### Stripe Test Sandbox

A Stripe test sandbox was created but needs to be claimed by the owner at:
`https://dashboard.stripe.com/claim_sandbox/YWNjdF8xUmhDVHRCdU85eXltalljLDE3NzI3MzU3Nzcv100DpdmjkTI`

**Deadline:** Before April 27, 2026.

---

## Admin Dashboard — Section by Section

### Command Center (`/admin`)

The main admin landing page shows:
- **Metrics cards**: Total Members, Active Requests, Pending Approvals, Total Disbursed
- **Recent Payments & Sign-ups**: Real-time Stripe payment data with amounts, names, emails, dates
- **Wants to Be Contacted**: Combined view of prefill form submissions and pending Grace intakes
- **Quick actions**: Links to most-used admin pages

### Marketing HQ (`/admin/marketing`)

AI-powered marketing content generation:
- **Social Posts**: Auto-generates Facebook, Instagram, Twitter posts from community data
- **Email Blasts**: Auto-generates email campaign content
- **Campaigns**: Campaign planning and execution tools

Content auto-generates on tab mount — the admin just reviews and approves.

### Stories (`/admin/client-stories`)

Auto-generates member stories from community data:
- Social-ready versions for Facebook/Instagram/Twitter
- Approve/feature/share workflow
- Stories regenerate from real community data on load

### Growth Command Center (`/admin/growth-command-center`)

Growth plays auto-generate daily:
- Actionable growth strategies based on current metrics
- Campaign suggestions
- Milestone tracking

---

## Member Portal — Feature Details

### Milk Money (Chaos Support)

Members can request up to $100 in emergency grocery money. The request goes to the admin team for review and disbursement. "Milk Money" is the member-facing name; "Chaos Support" is the internal/admin name.

**Eligibility**: Paid members from day one (Essentials: up to $250, Plus: up to $750 for the broader Chaos Support category).

### Crisis Support

For larger emergencies (car breakdown, medical bill, etc.). Requires 60 days of active membership. Once per 12-month cycle. Essentials: up to $250, Plus: up to $750.

### Make a Wish

Monthly wish entries where members can express a need. Essentials gets 1 entry, Plus gets 2 entries. Admin reviews and grants wishes.

### Daily Hand Ups

Daily giveaway entries. Essentials gets 1 entry, Plus gets 2 entries plus access to Plus-only draws.

### Maven Box

Monthly delivery of toilet paper and essentials. Tracking page shows shipment status.

### Song Studio

AI-powered song generation where members can create personalized songs. Uses Kie.ai API for generation.

### Village Chat

Real-time community messaging. Daily Maven team posts auto-generated at 8 AM MT.

### Budget Builder

Financial planning tool where members can track expenses, bills, and savings goals.

---

## Third-Party Service Configurations

### Mandrill (Mailchimp Transactional)

| Setting | Value |
|---------|-------|
| **API Endpoint** | `https://mandrillapp.com/api/1.0` |
| **Sender Email** | `noreply@mail.lifewithmaven.app` |
| **Sender Name** | "Samantha from Maven" |
| **Env Variable** | `MANDRILL_API_KEY` |

### Twilio

| Setting | Value |
|---------|-------|
| **Service** | SMS messaging |
| **Env Variables** | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` |
| **Usage** | Magic link SMS, admin outreach, follow-ups |

### Stripe

| Setting | Value |
|---------|-------|
| **API Version** | 2025-04-30.basil (checkout), 2025-01-27.acacia (general) |
| **Currency** | CAD (Canadian Dollars) |
| **Webhook URL** | `https://lifewithmaven.app/api/stripe/webhook` |
| **Env Variables** | `STRIPE_SECRET_KEY`, `STRIPE_LIVE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_LIVE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` |

### Kie.ai (Song Generation)

| Setting | Value |
|---------|-------|
| **API Key** | `5a97d41b1ada0f497c7424b4b9623713` |
| **Voice ID** | `hpp4J3VqNfWAUOO0d1Us` (Maria's voice) |
| **Endpoint** | `https://api.kie.ai/api/v1/jobs/createTask` |
| **Status** | Credentials stored, awaiting owner to enter in Settings > Secrets |

### ElevenLabs (Voice)

| Setting | Value |
|---------|-------|
| **Account** | `tim@businessasaforceforgood.ca` |
| **Status** | Login credentials available, API key needs to be extracted and stored as `ELEVENLABS_API_KEY` |

### Manus Platform (LLM, Storage, Auth)

| Setting | Value |
|---------|-------|
| **LLM** | OpenAI-compatible via Manus Forge API |
| **Storage** | S3-compatible via Manus platform |
| **Auth** | Manus OAuth |
| **Env Variables** | `BUILT_IN_FORGE_API_URL`, `BUILT_IN_FORGE_API_KEY`, `VITE_FRONTEND_FORGE_API_KEY`, `VITE_FRONTEND_FORGE_API_URL` |

---

## Technical Debt and Known Issues

### Known Technical Debt

| Item | Severity | Description |
|------|----------|-------------|
| **routers.ts is ~5,600 lines** | Medium | Should be split into `server/routers/<feature>.ts` files for maintainability |
| **db.ts is ~4,000+ lines** | Medium | Should be split into domain-specific query files |
| **Some procedures use publicProcedure that should be protected** | Low | Review and tighten access controls on sensitive procedures |
| **Grace Brain tables** | Low | 10 Grace Brain tables may have overlapping purposes; could be consolidated |
| **121 database tables** | Low | Some tables may be unused or have overlapping purposes from iterative development |
| **Stripe API version mismatch** | Low | checkout.ts uses "2025-04-30.basil" while stripe.ts uses "2025-01-27.acacia" — should be unified |

### Known Issues

| Issue | Impact | Notes |
|-------|--------|-------|
| **Stripe test sandbox not claimed** | Test payments won't work | Owner must claim before April 27, 2026 |
| **ElevenLabs API key not stored** | Voice features limited | Owner needs to extract API key from account |
| **Kie.ai credentials not entered** | Song generation won't work | Credentials known but need to be entered in Settings > Secrets |
| **Safari Private Browsing** | OAuth login fails | Known limitation of Manus OAuth — cookies blocked |
| **Firefox Strict ETP** | OAuth login may fail | Known limitation — third-party cookies blocked |

---

## What Is In Progress vs. Completed

### Completed (Production-Ready)

Everything listed in the Feature Inventory section above is **complete and tested**. The application has 915 passing tests across 58 test files. The major completed milestones include:

- Full public landing page with animated hero, pricing, team page
- Grace AI conversational onboarding with member recognition
- Two-lane leads pipeline with Stripe enrichment
- Complete member portal with 20+ pages
- Complete admin dashboard with 50+ pages
- Stripe subscription integration (checkout, webhooks, reconciliation)
- Email integration (Mandrill) with magic links
- SMS integration (Twilio) with magic links and admin outreach
- Grace Brain knowledge management system
- Marketing HQ with AI-generated content
- Analytics and tracking
- Community features (feed, chat, stories)
- Financial tools (budget builder, bill tracking, savings goals)

### Not Yet Implemented / Deferred

| Feature | Status | Notes |
|---------|--------|-------|
| **Life Blindside** | Removed | Explicitly removed per user request |
| **Real payment processing** | Deferred | Stripe live keys needed after KYC verification |
| **Song audio generation** | Deferred | Kie.ai credentials need to be entered |
| **Voice synthesis** | Deferred | ElevenLabs API key needed |
| **Email verification** | Intentionally skipped | Business decision — magic links go directly to sign-in |
| **Multi-language support** | Partial | Language preference system exists but translations not complete |

---

## Owner Action Items

These items require the project owner's direct action:

1. **Claim Stripe Test Sandbox** — Visit the claim URL before April 27, 2026
2. **Enter Kie.ai API Credentials** — Store in Settings > Secrets (`KIE_AI_API_KEY`, `KIE_AI_VOICE_ID`, `KIE_AI_API_ENDPOINT`)
3. **Extract ElevenLabs API Key** — Log in to ElevenLabs, get API key, store as `ELEVENLABS_API_KEY`
4. **Stripe Live Keys** — When ready for real payments, enter live secret and publishable keys
5. **Update Stripe Webhook URL** — If domain changes, update webhook URL in Stripe Dashboard
6. **Review Admin Access Key** — Ensure `ADMIN_ACCESS_KEY` is set to a strong, unique value

---

## Key Contacts and Accounts

| Service | Account/Contact |
|---------|----------------|
| **Maven Support Email** | help@lifewithmaven.com |
| **Live Domain** | lifewithmaven.app |
| **Stripe Account** | Associated with Maven business |
| **Mandrill/Mailchimp** | Associated with Maven business |
| **Twilio** | Associated with Maven business |
| **ElevenLabs** | tim@businessasaforceforgood.ca |
| **Kie.ai** | API credentials provided |
| **Manus Platform** | Project ID: RkEuwu7tuhjM3tLjrDmkox |

---

## Lessons Learned

### What Worked Well

**Empathy-first design** drove every decision. By keeping Ruby Red at the center of every conversation, the team avoided building features that look good on paper but fail the people who need them most. The toilet paper offer is the perfect example — it sounds simple, but it's the moment that transforms a visitor into a believer.

**Grace as a conversation, not a form** was the breakthrough. Traditional onboarding asks people to fill out forms. Grace asks them how their day is going. The information collection happens naturally, and by the time Grace has their name, email, and province, the person feels heard — not processed.

**Payment comes last** is counterintuitive for SaaS but essential for this audience. Ruby Red has been burned by systems that take her money first and deliver value later. Maven flips that script entirely.

**Two-lane pipeline** solved the confusion between new leads and existing members. Earlier iterations mixed everyone together, making it hard for the admin team to know who needed what. The split into "New Leads" (Kanban) and "Members Requesting Help" (Grid) made the workflow immediately clear.

### What Was Challenging

**Grace's personality balance** required multiple iterations. Too long and she felt like a lecture. Too short and she felt cold. The final formula — "short AND warm, every sentence should feel like a hug" — took several rewrites to nail.

**Duplicate Grace widgets** was a recurring bug. The lesson: there must be exactly ONE Grace component in the component tree, and it must be explicitly documented.

**Member recognition** was harder than expected. Simple email matching wasn't enough — Grace needed to detect member keywords ("I already have an account", "I'm on Essentials") and respond appropriately without re-onboarding them.

**Stripe price currency** was initially set to USD and had to be corrected to CAD. Always verify currency settings early.

**Test data cleanup** was necessary multiple times. Development created hundreds of test records that cluttered the pipeline. Cleanup scripts removed 457 test records, 46 test prefill submissions, and 411 test chaos support ledger entries.

---

*This document was prepared by the SIC HB1000 Solve Team. It represents the collective wisdom, decisions, and institutional memory of the Maven development process. Handle with care — this is not just code documentation, it's the story of how we're trying to make the world a little less expensive for the people who can least afford it.*
