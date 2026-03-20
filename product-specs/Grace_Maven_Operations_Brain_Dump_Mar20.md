# Grace / Maven Operations Brain Dump — March 20, 2026

## Operational Header Notes
- **Production URL:** https://graceai-mkzhdr3r.manus.space
- **Latest Checkpoint:** 1a7f6b95
- **Manus Project ID:** eGKfSsygWM9tu5aDEfLmoz
- **CRITICAL DEADLINE:** Stripe sandbox must be claimed before April 26, 2026 at https://dashboard.stripe.com/claim_sandbox/YWNjdF8xVDRsdVhSTDJHcDN2cGZ0LDE3NzI2NDkwMzMv1001JpyhDJU
- **Current Live Stats (as of March 20, 2026):**
  - **Families:** 364
  - **Stripe Subscribers:** 96
  - **All-Time Revenue:** $34,763
  - **HUNHO Deployed:** $4,546
  - **Milk Money Out:** $3,100

---

# Grace / Maven Operations — Full Brain Dump

**Transfer Document for Manus Agent Continuity**
**Date:** March 20, 2026
**Project:** grace-assistant (Grace - Maven's AI Assistant)
**Latest Checkpoint:** `1a7f6b95`
**Manus Project ID:** `eGKfSsygWM9tu5aDEfLmoz`

---

## 1. Published URLs and Access Points

| Resource | URL |
|----------|-----|
| **Published Website (Production)** | `https://graceai-mkzhdr3r.manus.space` |
| **Dev Server** | `https://3000-ifpknzqzfv1qm34wdldej-6479341f.us1.manus.computer` |
| **Maven Storybook Workbook (XLSX)** | `https://d2xsxph8kpxj0f.cloudfront.net/310519663303496813/mkzhdR3RhQ6NU4WMhXeno3/MAVEN_Member_Story_Mar20_Unified_4574cb39_c55bef0a.xlsx` |
| **Maven Operations Journal (MD)** | `https://d2xsxph8kpxj0f.cloudfront.net/310519663303496813/mkzhdR3RhQ6NU4WMhXeno3/MAVEN_Operations_Journal_Mar20_4fec7af9_1bdd0367.md` |

The workbook and journal URLs are hardcoded in `server/routers.ts` under the `documents.getLatest` procedure and must be updated each time new versions are generated via `manus-upload-file`.

---

## 2. Tech Stack and Architecture

The application is a **React 19 + Tailwind 4 + Express 4 + tRPC 11** stack with Manus OAuth, backed by a MySQL/TiDB database via Drizzle ORM. Stripe is integrated for payment processing, and Twilio is wired for SMS outreach.

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Tailwind CSS 4, shadcn/ui, wouter (routing) |
| Backend | Express 4, tRPC 11, Drizzle ORM |
| Database | MySQL / TiDB (hosted, connection via `DATABASE_URL`) |
| Auth | Manus OAuth (session cookie, `protectedProcedure`) |
| Payments | Stripe (test sandbox — must be claimed before 2026-04-26) |
| SMS | Twilio (for Grace Recovery Protocol outreach) |
| LLM | Built-in Manus Forge API (`invokeLLM`) |
| File Storage | S3 via `storagePut` / `storageGet` helpers |
| Hosting | Manus built-in hosting at `graceai-mkzhdr3r.manus.space` |

---

## 3. Project File Structure

```
grace-assistant/
├── client/src/
│   ├── App.tsx              ← Routes: /, /actions, /hunho, /milk-money, /admin
│   ├── pages/
│   │   ├── Dashboard.tsx    ← Maven Operations Dashboard (KPI cards, Last 7 Days table, Chaos overview)
│   │   ├── ActionCenter.tsx ← Daily Actions (Roll Call, Retain, Embrace, HUNHO, Grace Recovery, Leads)
│   │   ├── HunhoReport.tsx  ← HUNHO Report page (selection history, basket options)
│   │   ├── MilkMoney.tsx    ← Milk Money management (loans, payments, recovery)
│   │   ├── Admin.tsx        ← Admin panel
│   │   └── NotFound.tsx
│   ├── components/          ← shadcn/ui components + DashboardLayout, AIChatBox, Map
│   ├── contexts/            ← ThemeContext
│   └── lib/trpc.ts          ← tRPC client binding
├── server/
│   ├── routers.ts           ← All tRPC procedures (auth, dashboard, actions, hunho, milk money, documents, etc.)
│   ├── db.ts                ← Database query helpers
│   ├── storage.ts           ← S3 helpers
│   └── _core/               ← Framework plumbing (OAuth, context, LLM, notification, etc.)
├── drizzle/
│   └── schema.ts            ← All 22 database tables
└── shared/                  ← Shared constants & types
```

---

## 4. Application Routes and Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Dashboard | Maven Operations Dashboard — KPI cards (TP Count, Revenue MTD, HUNHO Deployed, Chaos Support), Yesterday cards, Last 7 Days table, Chaos overview, document downloads |
| `/actions` | ActionCenter | Daily Actions Center — 6 workflow tabs: Roll Call (Set Up/Ship + Cancel), Retain (failed renewal recovery), Embrace (failed new signups), HUNHO (daily picks), Grace Recovery Protocol, Lead Generation |
| `/hunho` | HunhoReport | HUNHO Report — selection history, basket options (Essential, Plus, Gift Card), email templates |
| `/milk-money` | MilkMoney | Milk Money management — loan tracking, repayment monitoring, recovery cards |
| `/admin` | Admin | Admin panel |

---

## 5. Database Schema (22 Tables)

### Core Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | Auth/user accounts | openId, name, email, role (admin/user) |
| `customer_intakes` | Grace chatbot intake forms | firstName, lastName, phoneNumber, email, story, contactMethod, status |
| `flypaper_thoughts` | Random thoughts captured | content, phoneNumber, sessionId |
| `conversation_history` | Full chat transcripts | intakeId, sessionId, role, content, contactMethod |
| `village_activity` | Activity feed/ticker | message, activityType, showInTicker |

### User Profiling & Persona System

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `user_profiles` | Personalization data per member | userId, preferredPersonalityId, communicationStyle, keyFacts, interactionCount |
| `personality_modes` | Grace's configurable personalities | name, systemPrompt, emojiLevel, greetingStyle |
| `user_persona_types` | Categories of people Grace talks to | name, traits, respondsWellTo, detectionSignals |
| `persona_matching_rules` | Which Grace persona matches which user type | userPersonaTypeId, personalityModeId, matchScore |
| `user_persona_assessments` | Grace's assessment of each user | confidence, communicationStyle, urgencyLevel, emotionalState |

### Operations & Metrics

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `daily_metrics` | One row per day for KPI dashboard | date, newSuccessful, newFailed, renewalsSuccessful, renewalsFailed, cancellations, revenueCents, hunhoCents, totalSubscribers, totalTPCount |
| `member_roster` | Deduplicated member list from Stripe | stripeCustomerId, name, email, tier, billingCycle, status, totalPaidCents |
| `payment_events` | Individual Stripe payment records | eventDate, stripeCustomerId, amountCents, paymentStatus, paymentType |
| `chaos_metrics` | Milk Money daily scorecard | date, disbursedCents, principalRecoveredCents, feesCollectedCents |

### Workflow Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `tp_shipments` | TP enrollment/cancellation tracking | memberEmail, actionType (ship/cancel), status (pending/completed/skipped/needs_info/removed) |
| `renewal_recovery` | Failed renewal recovery tracking | memberEmail, failedDate, status, retentionOutcome, gracePeriodEndDate |
| `embrace_pipeline` | Failed NEW signup tracking (7-day timer) | leadEmail, firstFailureDate, status, embracePeriodEndDate |
| `hand_up_selections` | HUNHO daily picks | selectionDate, memberEmail, amountTier (25/50), status, essentialSelection, graceStep |
| `active_members_pool` | Combined Maven + Village Legacy pool for HUNHO | memberEmail, source (maven_stripe/village_legacy), eligibleForHandUp |
| `milk_money_loans` | Chaos Support loan tracking | memberName, loanAmountCents, outstandingCents, loanStatus |
| `milk_money_payments` | Loan repayment transactions | loanId, paymentDate, principalCents, stripeFeeCents, paymentStatus |
| `milk_money_recovery` | Failed Milk Money repayment recovery | memberEmail, failureCount, escalationLevel, status, recoveryOutcome |
| `follow_up_tracking` | Grace Recovery Protocol email tracking | memberEmail, sequenceStep (1-3), trackingToken, linkClickedAt, channel |
| `follow_up_summary` | Aggregated per-member follow-up status | memberEmail, currentStep, overallStatus, hasEngaged, priorityScore |
| `daily_action_items` | Daily action items for TP/Milk Money | actionDate, actionType, memberName, completed |
| `lead_tracking` | Lead generation tracking | leadEmail, contactMethod, leadSource, status, converted |

---

## 6. Current Operational Snapshot (March 20, 2026)

| Metric | Value |
|--------|-------|
| **Toilet Paper Count** | 364 families (96 Stripe + 243 Village Legacy + 25 other) |
| **Total Active Stripe Subscribers** | 96 |
| **Revenue (MTD March)** | $9,426.29 (includes $6,500 Village Legacy lump sum) |
| **Revenue (All Time)** | $34,763.32 |
| **HUNHO Deployed (MTD)** | $2,063.71 |
| **HUNHO Deployed (All Time)** | $4,546.29 |
| **Chaos Support (Milk Money) Out** | $3,100.00 (75 loans) |
| **Milk Money Outstanding** | $2,502.15 |
| **TP Shipments Pending** | 38 members awaiting setup |
| **TP Shipments Completed** | 52 members set up |
| **Renewal Recovery Cases** | 300 tracked |
| **Embrace Pipeline** | 243 failed new signups tracked |
| **Follow-Up Summary** | 621 members in Grace Recovery Protocol |
| **HUNHO Selections** | 222 total picks to date |

---

## 7. Key Business Logic and Workflows

### 7.1 Daily Action Center (6 Tabs)

The ActionCenter page (`/actions`) is Trina's daily operational hub with six workflow tabs:

**Tab 1 — Roll Call (Set Up / Ship):** New paid Maven members who need their first Amazon Subscribe & Save toilet paper shipment set up. Features include Select All / Bulk Ship, sorting (Days Waiting, Alphabetical, Newest), individual Remove button with confirmation, and Needs Info flagging. Data source: `tp_shipments` table where `actionType='ship'` and `status='pending'`.

**Tab 2 — Roll Call (Cancel):** Members who cancelled their Maven subscription and need their Amazon S&S cancelled. Same tile format as Ship tab.

**Tab 3 — Retain:** Failed renewal recovery. Members whose recurring payments failed get a card with escalation tracking: first contact, 7-day grace period, final contact, and retention outcome (self_save, manual_save, or lost). Data source: `renewal_recovery` table.

**Tab 4 — Embrace:** Failed NEW signups. People who tried to join but their first payment failed. 7-day embrace period with auto-close to "Lost Lead." Data source: `embrace_pipeline` table.

**Tab 5 — HUNHO:** Hand Up Not Hand Out daily picks. Selects members from the `active_members_pool` for $25 or $50 grocery assistance. Three Grace Protocol email templates (Day 1 Welcome, Day 15 Gentle Reminder, Day 25 Final Check-In). Basket options: Essential, Plus, and Gift Card. Data source: `hand_up_selections` table.

**Tab 6 — Grace Recovery Protocol:** Automated 3-step email sequence for members with failed payments. Tracks email sends, link clicks, SMS delivery, and resolution. Data source: `follow_up_tracking` and `follow_up_summary` tables.

### 7.2 HUNHO Basket Options

The HUNHO product selection dropdown (in both ActionCenter and HunhoReport) includes these options:

- **Essential ($25):** Toilet Paper (12 rolls), Paper Towel (6 rolls), Dish Soap, Laundry Detergent, All-Purpose Cleaner
- **Plus ($50):** Everything in Essential PLUS Garbage Bags, Dryer Sheets, Hand Soap, Sponges, Fabric Softener
- **Gift Card:** Gift card option (amount based on tier)

### 7.3 Grace Recovery Protocol Email Templates

Three email templates are defined in `server/routers.ts` under the `hunho.sendGraceEmail` procedure:

1. **Day 1 — Welcome Email:** Congratulates the member on being selected, asks them to reply with their Essential/Plus/Gift Card choice
2. **Day 15 — Gentle Reminder:** Friendly follow-up if no response, reiterates the offer
3. **Day 25 — Final Check-In:** Last chance before the selection expires and gets paid forward

### 7.4 Milk Money (Chaos Support)

Tracks micro-loans disbursed to members via Züm Wallet (Interac e-Transfer). Loans are typically $25-$50 CAD. Repayment is tracked via Stripe subscriptions. Recovery escalation: 1st failure = email, 3rd = follow-up, 4th = phone call flag. Data lives in `milk_money_loans`, `milk_money_payments`, and `milk_money_recovery` tables.

### 7.5 Dashboard KPI Computation

The Dashboard page computes KPIs client-side from `daily_metrics` rows:

- **MTD Revenue** = SUM of `revenueCents` for all rows where `date >= month start`
- **All Time Revenue** = SUM of `revenueCents` for ALL rows
- **MTD HUNHO** = SUM of `hunhoCents` for current month
- **TP Count** = `totalTPCount` from the latest date's row
- **Total Subscribers** = `totalSubscribers` from the latest date's row
- **Churn Rate** = MTD cancellations / totalTPCount

The Village Legacy $6,500 lump sum was added directly to the March 20 `revenueCents` field (660053 cents = $100.53 Stripe + $6,500 Village Legacy).

---

## 8. Environment Variables

These are automatically injected by the Manus platform — do not hardcode:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | MySQL/TiDB connection string |
| `JWT_SECRET` | Session cookie signing |
| `VITE_APP_ID` | Manus OAuth app ID |
| `OAUTH_SERVER_URL` | Manus OAuth backend |
| `VITE_OAUTH_PORTAL_URL` | Manus login portal (frontend) |
| `OWNER_OPEN_ID` / `OWNER_NAME` | Owner info |
| `VITE_FRONTEND_FORGE_API_KEY` / `VITE_FRONTEND_FORGE_API_URL` | Frontend Forge API access |
| `STRIPE_SECRET_KEY` / `VITE_STRIPE_PUBLISHABLE_KEY` / `STRIPE_WEBHOOK_SECRET` | Stripe integration |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_NUMBER` | Twilio SMS |

---

## 9. Storybook Workbook Structure

The Maven Storybook Workbook (XLSX) is regenerated with each daily update and contains these sheets:

1. **Daily Scorecard** — Date, Active Subs, New OK, New Fail, Renew OK, Renew Fail, Cancels, Revenue, HUNHO, TP Count
2. **Active Members** — All active Maven + Chaos subscribers with name, email, product, status, amount, created date
3. **Overdue Members** — All past_due/unpaid members with same fields
4. **Revenue Ledger** — Daily revenue breakdown
5. **HUNHO Log** — All HUNHO selections with dates, amounts, and status

---

## 10. Operations Journal

The Operations Journal is a Markdown file that tracks daily operational decisions, fixes, milestones, and notes. Each entry includes a date header, scorecard snapshot, and bullet points of key actions taken. It is regenerated with each daily update and uploaded to CloudFront.

---

## 11. Recent Changes Log (Last 5 Phases)

| Phase | Date | Changes |
|-------|------|---------|
| **Phase 49** | Mar 19 | Added Bulk Ship (Select All / Ship Selected) and Sorting (Days Waiting, Alphabetical, Newest) to Roll Call Set Up/Ship tab |
| **Phase 50** | Mar 19 | Added Remove button to each tile in Set Up/Ship tab with "removed" status in schema |
| **Phase 51** | Mar 19 | Resized action buttons to fit all 4 (Shipped, Needs Info, Skip, Remove) in each tile card |
| **Phase 52** | Mar 20 | Roll Call data cleanup — removed 30 cancelled/past_due members, completed 19 already-on-S&S, added 31 new active Maven members |
| **Phase 53** | Mar 20 | Dashboard update with fresh CSV data, Gift Card added to HUNHO dropdown, Workbook + Journal regenerated |
| **Phase 54** | Mar 20 | Fixed Toilet Paper Count card (was showing 0, corrected to 364) |
| **Phase 55** | Mar 20 | Updated Chaos Support (Milk Money) Out to $3,100 — added 4 Züm Wallet disbursements from Mar 19 |
| **Phase 56** | Mar 20 | Added $6,500 Village Legacy Members lump sum to revenue |

---

## 12. Stripe Integration Status

The Stripe test sandbox has been created but **must be claimed** before **April 26, 2026** at:
`https://dashboard.stripe.com/claim_sandbox/YWNjdF8xVDRsdVhSTDJHcDN2cGZ0LDE3NzI2NDkwMzMv1001JpyhDJU`

Test card number: `4242 4242 4242 4242`. Once live keys are available after Stripe KYC verification, they must be entered in Settings → Payment.

---

## 13. Key CDN Assets

All static assets are uploaded via `manus-upload-file --webdev` and served from CloudFront. The dashboard uses custom icon images for the KPI cards:

- Revenue icon: `https://d2xsxph8kpxj0f.cloudfront.net/.../revenue-dollar-icon_903531ce.png`
- HUNHO icon: `https://d2xsxph8kpxj0f.cloudfront.net/.../hunho-groceries-icon_a5748156.png`
- Milk Money icon: referenced in Dashboard.tsx
- TP icon: referenced in Dashboard.tsx

---

## 14. Spirit Check

This document captures the full state of the Grace/Maven Operations ecosystem as of March 20, 2026. The **North Star** remains unchanged: we are solving for **Ruby Red** — the 35-45 year old mom of two who is the CFO of her household, trying to make her finances stretch until the next payday. Every feature in this system — from the TP Roll Call to the Grace Recovery Protocol to the HUNHO grocery assistance — exists to support, empower, and enable her. The superpower is **empathy**, practiced with a sense of "there for the grace of God go I." It is expensive to be poor, and we are trying to change that.

---

*Generated by Manus AI — March 20, 2026*
