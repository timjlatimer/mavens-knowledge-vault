# Maven Village Hub Merge Plan

**Date:** March 17, 2026
**Purpose:** Merge the Village Hub marketing/operations dashboard into the existing Maven admin dashboard without duplication or lost work.

---

## Executive Summary

The **Village Hub zip** is a separate Manus project focused on **marketing, Mailchimp audience management, AI-powered campaign engines (Grace Scanner + Frankie Growth), social media content, and storytelling**. The **current Maven app** is focused on **member-facing services, Grace conversational AI, Stripe billing, admin operations, and community features**.

These are **complementary systems**, not duplicates. The Village Hub adds marketing/growth capabilities that don't exist in the current app. However, there are a few areas of overlap that need careful handling to avoid conflicts.

---

## Overlap Analysis

### 1. GraceBrain — TWO COMPLETELY DIFFERENT THINGS (KEEP BOTH)

| Aspect | Current App (`admin/GraceBrain.tsx`) | Village Hub (`GraceBrain.tsx`) |
|--------|--------------------------------------|-------------------------------|
| **Purpose** | Grace's **knowledge management** — identity, protocols, escalation rules, guardrails, segments, known issues, ingestion | Grace's **Mailchimp audience scanner** — scans for ghost users, at-risk members, generates email campaigns |
| **tRPC Router** | `trpc.graceBrain.*` (identity, knowledge, protocols, escalation, guardrails, segments, insights, issues, ingestion, changelog) | `trpc.grace.*` (scan, getActions, executeAction, dismissAction, getSchedulerStatus, startScheduler, stopScheduler) |
| **Lines** | 1,437 | 833 |
| **Conflict?** | **No conflict** — completely different routers and functionality |

**Recommendation:** Keep the current `admin/GraceBrain.tsx` as **"Grace's Brain"** (knowledge/config management). Add the Village Hub version as **"Grace Scanner"** or **"Grace Marketing"** — a new admin page at `/admin/grace-scanner`. They serve entirely different purposes.

---

### 2. CommandCenter — DIFFERENT DASHBOARDS (KEEP BOTH)

| Aspect | Current App (`admin/CommandCenter.tsx`) | Village Hub (`CommandCenter.tsx`) |
|--------|----------------------------------------|----------------------------------|
| **Purpose** | Operational dashboard — support requests, member activity, Grace conversations, cancellations, revenue | Marketing dashboard — Mailchimp stats, Grace scan results, Frankie recommendations, social media, story pipeline |
| **tRPC Calls** | `trpc.admin.getCommandCenterData` | `trpc.dashboard.getStats`, `trpc.grace.*`, `trpc.frankie.*`, `trpc.mailchimp.*` |
| **Lines** | 660 | 1,032 |
| **Conflict?** | **No conflict** — different data sources and purpose |

**Recommendation:** Keep the current `admin/CommandCenter.tsx` as the operational command center. Add the Village Hub version as **"Marketing Hub"** or **"Village Pulse"** — a new admin page at `/admin/marketing`. This gives Frankie a home base.

---

### 3. Database Schema — OVERLAPPING TABLES

| Table | Current App | Village Hub | Conflict? |
|-------|------------|-------------|-----------|
| `users` | 30+ columns (tier, stripe, address, billing, memory, etc.) | 11 columns (basic auth only) | **Current app is superset — KEEP CURRENT** |
| `wisdom_giants` | Member-facing (userId, skillTitle, category, availability, rating) | Admin-curated (name, skill, bio, sourcePlatform, endorsements) | **Different schemas — KEEP CURRENT, adapt zip queries** |
| `maven_moments` | Member-submitted (content, bgColor, province, viewCount) | Admin-curated with source tracking (storyText, shareToken, sourcePlatform, sourceUrl) | **Different schemas — KEEP CURRENT, add missing columns** |

**Recommendation:**
- **users**: Keep current schema entirely. The zip's simpler schema is a subset.
- **wisdom_giants**: Keep current schema. Adapt the zip's db queries to use current column names.
- **maven_moments**: Keep current schema. Add `shareToken`, `sourcePlatform`, `sourceUrl`, `sourceAuthor`, `sourceDate`, `isFromCapture` columns from the zip if the Facebook capture feature is desired.

---

### 4. Server Files — OVERLAPPING FILES

| File | Current App | Village Hub | Resolution |
|------|------------|-------------|------------|
| `db.ts` | 983 lines — full member/admin queries | 753 lines — marketing/lead queries | **MERGE: Add new query helpers to current db.ts** |
| `routers.ts` | 4,500+ lines — massive router | 1,214 lines — marketing routers | **MERGE: Add new sub-routers to current routers.ts** |
| `storage.ts` | Identical S3 helpers | Identical S3 helpers | **NO ACTION — already exists** |

---

## What's NEW in the Village Hub (Does NOT Exist in Current App)

### New Server Modules (12 files — all net-new)

| Module | Lines | Purpose | Priority |
|--------|-------|---------|----------|
| `mailchimp.ts` | 707 | Mailchimp Marketing API — audience stats, campaigns, sending | **HIGH** |
| `mailchimpTags.ts` | 572 | 24-tag taxonomy, auto-tagging, segment resolution | **HIGH** |
| `frankie.ts` | 773 | Frankie growth engine — gap analysis, recommendations, campaign execution | **HIGH** |
| `graceBrain.ts` (scanner) | 516 | Grace Mailchimp scanner — ghost users, at-risk detection, action creation | **HIGH** |
| `graceScheduler.ts` | 338 | Automated Grace scan scheduler | **HIGH** |
| `socialMedia.ts` | 426 | Social media content generation (Facebook, Instagram, Twitter) | **MEDIUM** |
| `storyEngine.ts` | 299 | AI story refinement from raw captures | **MEDIUM** |
| `facebookCapture.ts` | 139 | Facebook post capture and parsing | **MEDIUM** |
| `digest.ts` | 361 | Weekly digest email generation | **MEDIUM** |
| `rubyRedReport.ts` | 536 | Monthly Ruby Red report generation | **MEDIUM** |
| `casl.ts` | 100 | CASL consent management | **LOW** |
| `stripeWebhook.ts` | 351 | Stripe webhook handler (simpler version) | **SKIP — current app has better version** |

### New Database Tables (13 tables — all net-new except overlaps above)

| Table | Purpose |
|-------|---------|
| `story_paths` | Admin-configurable story journeys |
| `leads` | Core lead capture with CASL compliance |
| `lead_events` | Funnel analytics events |
| `campaigns` | Admin campaign builder |
| `client_stories` | Grace-curated publishable stories |
| `wisdom_ideas` | Team idea capture and voting |
| `insights_log` | Business insights and action tracking |
| `stripe_events` | Real-time Stripe order notifications |
| `impact_milestones` | Community impact tracking |
| `social_cards` | AI-generated shareable brand assets |
| `ruby_red_reports` | Monthly auto-generated reports |
| `grace_actions` | AI-generated action queue |
| `grace_activity_log` | Grace's activity history |

### New Client Pages (20 pages — all net-new)

| Page | Route (proposed) | Purpose |
|------|-----------------|---------|
| **Marketing Hub** (was CommandCenter) | `/admin/marketing` | Marketing dashboard with Mailchimp/Grace/Frankie stats |
| **Village Pulse** | `/admin/village-pulse` | Real-time community health metrics |
| **Grace Scanner** (was GraceBrain) | `/admin/grace-scanner` | Grace Mailchimp audience scanner |
| **Frankie Dashboard** | `/admin/frankie` | Growth engine — gap analysis, recommendations |
| **Action Queue** | `/admin/action-queue` | Unified execute/edit/decline queue |
| **Social Media Hub** | `/admin/social-media` | Social content generator |
| **Tag Management** | `/admin/tags` | Mailchimp tag taxonomy manager |
| **Mailchimp View** | `/admin/mailchimp` | Mailchimp audience dashboard |
| **Client Stories** | `/admin/stories-marketing` | Manage curated client stories |
| **Maven Moments (Marketing)** | `/admin/moments` | Shareable story cards |
| **Quick Capture** | `/admin/quick-capture` | Facebook post capture tool |
| **Story Engine** | `/admin/story-engine` | AI story refinement |
| **Social Card Studio** | `/admin/social-cards` | AI-generated brand assets |
| **Milestones** | `/admin/milestones` | Impact milestone tracking |
| **Ruby Red Report** | `/admin/ruby-red-report` | Monthly auto-generated reports |
| **Leads & Pipeline** | `/admin/pipeline` | Lead management (different from current leads) |
| **Wisdom Ideas** | `/admin/wisdom-ideas` | Team idea capture |
| **Insights Log** | `/admin/insights` | Business insights |
| **Campaigns** | `/admin/campaigns` | Campaign management |
| **Weekly Digest** | `/admin/digest` | Weekly digest generator |
| **Stripe Events** | `/admin/stripe-events` | Stripe order notifications |

---

## Proposed Admin Sidebar Structure (After Merge)

```
OVERVIEW
├── Command Center (/admin)              ← EXISTING — operational dashboard
├── Revenue (/admin/revenue)             ← EXISTING

SUPPORT
├── Support Requests (/admin/support-requests)  ← EXISTING
├── Messages (/admin/messages)                  ← EXISTING

MEMBERS
├── Members (/admin/members)             ← EXISTING
├── Leads (/admin/leads)                 ← EXISTING
├── Engagement (/admin/engagement)       ← EXISTING
├── Cancellations (/admin/cancellations) ← EXISTING

COMMUNITY
├── Wisdom Giants (/admin/community)     ← EXISTING
├── Stories (/admin/give-back)           ← EXISTING
├── Recipients (/admin/recipients)       ← EXISTING

INTELLIGENCE
├── Grace's Brain (/admin/grace-brain)           ← EXISTING — knowledge/config
├── People Grace Knows (/admin/people-grace-knows) ← EXISTING
├── Feeling Engine (/admin/feeling-engine)       ← EXISTING
├── Growth Engine (/admin/growth)                ← EXISTING

MARKETING & GROWTH  ← NEW SECTION
├── Marketing Hub (/admin/marketing)             ← NEW — marketing command center
├── Village Pulse (/admin/village-pulse)          ← NEW — community health metrics
├── Grace Scanner (/admin/grace-scanner)          ← NEW — Mailchimp audience scanner
├── Frankie (/admin/frankie)                      ← NEW — growth engine
├── Action Queue (/admin/action-queue)            ← NEW — unified action queue
├── Social Media Hub (/admin/social-media)        ← NEW — content generator
├── Tag Management (/admin/tags)                  ← NEW — Mailchimp tags

CONTENT & STORIES  ← NEW SECTION
├── Quick Capture (/admin/quick-capture)          ← NEW — Facebook capture
├── Story Engine (/admin/story-engine)            ← NEW — AI story refinement
├── Client Stories (/admin/stories-marketing)     ← NEW — curated stories
├── Social Cards (/admin/social-cards)            ← NEW — brand assets
├── Ruby Red Report (/admin/ruby-red-report)      ← NEW — monthly reports

CHANNELS  ← NEW SECTION
├── Mailchimp (/admin/mailchimp)                  ← NEW — audience dashboard
├── Stripe Events (/admin/stripe-events)          ← NEW — order notifications
├── Weekly Digest (/admin/digest)                 ← NEW — digest generator

OPERATIONS
├── Announcements (/admin/announcements) ← EXISTING
├── Deals Digest (/admin/deals-digest)   ← EXISTING
├── Referrals (/admin/referrals)         ← EXISTING
├── Rewards (/admin/surprise-rewards)    ← EXISTING
├── Security (/admin/security)           ← EXISTING
├── Sync (/admin/sync)                   ← EXISTING
├── Settings (/admin/settings)           ← EXISTING
```

---

## What We Will NOT Import (To Avoid Duplication)

| Zip File | Reason to Skip |
|----------|---------------|
| `stripeWebhook.ts` | Current app has a more complete Stripe webhook handler with subscription management, tier sync, magic link sending |
| `storage.ts` | Already exists identically |
| Zip's `users` schema | Current app's schema is a superset with Stripe, address, memory fields |
| Zip's `DashboardLayout.tsx` | Current app has a customized version with more nav items |
| Zip's `App.tsx` | Current app has 80+ routes; zip has 24 |
| Zip's `index.css` | Current app has Maven branding; will selectively merge design tokens |
| Zip's `const.ts` | Already exists |
| `ComponentShowcase.tsx` | Already exists |
| `NotFound.tsx` | Already exists |

---

## Environment Variables Needed

| Variable | Purpose | Action |
|----------|---------|--------|
| `MAILCHIMP_API_KEY` | Mailchimp Marketing API key | **NEED FROM USER** |
| `MAILCHIMP_SERVER_PREFIX` | Mailchimp data center (e.g., "us21") | **NEED FROM USER** |
| `MAILCHIMP_LIST_ID` | Mailchimp audience/list ID | **NEED FROM USER** |

---

## Migration Order (If Approved)

1. **Schema first** — Add 13 new tables + missing columns to existing tables, run `pnpm db:push`
2. **Server modules** — Copy 11 new server files (skip stripeWebhook.ts and storage.ts)
3. **Merge db.ts** — Add new query helpers to existing db.ts
4. **Merge routers.ts** — Add new sub-routers to existing routers.ts
5. **Client pages** — Add 20 new pages under `/admin/` directory
6. **Update sidebar** — Add new sections to DashboardLayout
7. **Update App.tsx** — Add new routes
8. **Request Mailchimp secrets** — Get API key, server prefix, list ID
9. **Tests** — Adapt and add the 15 test files from the zip
10. **Verify** — Run all tests, check TypeScript, verify UI

---

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| Schema conflicts on overlapping tables | Keep current schema as source of truth; adapt zip queries |
| Router namespace collisions | Zip uses `grace.*`, current uses `graceBrain.*` — no collision |
| Mailchimp API not configured | Features gracefully degrade with "Mailchimp not configured" messages |
| 4,500+ line routers.ts gets even larger | Split into `server/routers/` directory with feature-based files |
| Test mocking differences | Adapt zip tests to mock current app's dependencies |

---

## Questions for You Before I Start

1. **Do you have the Mailchimp API credentials ready?** (API key, server prefix, list ID) — needed for Grace Scanner and Frankie to work.
2. **Is the proposed sidebar structure good?** Or would you prefer a different organization?
3. **Should I import ALL 20 new pages, or prioritize a subset first?** (e.g., start with Grace Scanner + Frankie + Mailchimp, add content/stories later)
