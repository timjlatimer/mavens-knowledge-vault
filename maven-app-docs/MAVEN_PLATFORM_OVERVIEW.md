# Maven — Complete Platform Overview

**Prepared for:** SIC/HB1000 Solve Team
**Date:** March 18, 2026
**Goal:** 100 new memberships per day

---

## 1. The Big Picture

Maven is a subscription-based mutual aid platform that serves Ruby Red — the 35-45-year-old mom of two who is trying to make her finances stretch until the next payday. The platform combines AI-powered concierge support (Grace), community-driven resources, and financial safety nets into a single mobile-first experience. All prices are in **Canadian Dollars (CAD)**.

The platform has three layers: a **public-facing marketing site** that converts visitors into members, a **member portal** where paid subscribers access services, and an **admin dashboard** where the Maven team manages operations, growth, and member support.

---

## 2. Client Journey — Step by Step

### Phase 1: Discovery (Visitor Lands on Maven)

The visitor arrives at the Maven homepage (`/`) and encounters three things:

1. **Hero Section** — The emotional hook. Maven's value proposition with a clear CTA to explore services.
2. **Brand Video** — A storyboard video that explains what Maven does in human terms.
3. **Pricing Section** — Two paid tiers displayed with billing frequency toggle (weekly, bi-weekly, monthly).

Grace, the AI concierge, appears as a floating chat widget in the bottom-right corner. She is **proactive** — after 8 seconds on the homepage, she shows a tooltip nudge. On high-conversion pages (pricing, meet-your-team), she auto-opens after 12 seconds with a context-specific greeting.

| Page | Grace Behavior | Purpose |
|------|---------------|---------|
| `/` (Homepage) | Tooltip nudge after 8s | Introduce herself, start conversation |
| `/meet-your-team` | Auto-opens after 12s | "I see you're checking out the team..." |
| `/pricing` | Auto-opens after 12s | "Questions about which plan fits?" |
| `/how-it-works` | Tooltip nudge after 8s | Explain the process |
| `/what-is-maven` | Tooltip nudge after 8s | Deeper value conversation |
| All other pages | Tooltip nudge after 8s | General engagement |

### Phase 2: Conversation with Grace (Lead Capture)

When a visitor opens Grace, she starts a warm, empathetic conversation. Grace is not a chatbot — she is a concierge powered by LLM with deep context about Maven's services, the visitor's situation, and the community.

During the conversation, Grace **extracts information** naturally:
- Name, email, phone number
- Province/location
- Number of kids, household situation
- Financial struggles and needs
- What brought them to Maven

This information is captured as a **prefill submission** and stored in the leads pipeline. The visitor does not fill out a form — Grace does it through conversation.

**Key conversion moments in Grace's flow:**
- When Grace detects financial struggle signals (mentions of bills, groceries, flat tire, etc.), she connects the visitor to specific Maven services that address those needs.
- Grace explains the tier benefits in relatable terms: "For less than a coffee and a muffin each week, you get emergency cash, groceries at your door, and a whole village behind you."
- Grace can guide the visitor directly to the pricing page or trigger a checkout flow.

### Phase 3: Choosing a Plan (Pricing Page)

The pricing page (`/pricing`) presents two paid tiers with three billing frequencies each:

| Tier | Weekly | Bi-Weekly | Monthly |
|------|--------|-----------|---------|
| **Essentials** | $5.99 CAD/week | $11.99 CAD/bi-weekly | $24.99 CAD/month |
| **Plus** | $10.99 CAD/week | $21.99 CAD/bi-weekly | $44.99 CAD/month |

There is also a free **Observer** tier that gives access to Grace, community features, and some free tools — but no financial safety nets.

**Essentials includes:** Milk Money (up to $100 emergency cash), Chaos Support (up to $250 after 60 days), 1 Make a Wish entry, 1 daily HandUp (grocery box), Maven Box.

**Plus includes:** Everything in Essentials plus Chaos Support up to $750, 2x Make a Wish entries, 2 daily HandUps, Plus-Only perks, and priority access.

### Phase 4: Stripe Checkout (Payment)

When the visitor clicks "Join," a **Stripe Checkout Session** is created server-side in CAD. The checkout opens in a new browser tab. The visitor enters their payment information on Stripe's hosted checkout page (secure, PCI-compliant).

**What happens during checkout:**
- The visitor's email is pre-filled if Grace captured it.
- Promotion codes are enabled (`allow_promotion_codes: true`).
- Metadata links the session to the visitor's lead record.

### Phase 5: Post-Payment Account Creation (Automatic)

When Stripe fires the `checkout.session.completed` webhook, the following happens automatically:

1. **User account is created** in the Maven database with the email, name, phone, and tier from the checkout session.
2. **A magic link token** is generated (secure random, 24-hour expiry).
3. **Magic link email** is sent via Mandrill to the payment email address.
4. **Magic link SMS** is sent via Twilio to the phone number (if provided during checkout).
5. **Admin notification** is sent via email to help2@lifewithmaven.com and appears in the admin dashboard.
6. The visitor is redirected to `/login?welcome=true&plan={tier}` which shows a welcome screen.

### Phase 6: First Login (Magic Link)

The new member clicks the magic link from their email or SMS. The link hits `/api/auth/verify-magic-link?token=...` which:

1. Validates the token (not expired, not used).
2. Creates a JWT session cookie.
3. Redirects to the member portal (`/portal`).

If the magic link expires, the member can request a new one from the login page (`/login`) by entering their email.

### Phase 7: Member Portal (Daily Use)

Once logged in, the member lands on the **Portal Home** (`/portal`) — a unified dashboard that adapts based on their tier.

**For Observers (Free):**
- Free tools grid (Budget Builder, Bill Tracker, Savings Goals, Fee Fighter)
- Grace chat access
- Community features (Village Chat, Community Feed, Scam Alerts)
- "Unlock More" upgrade prompts

**For Paid Members (Essentials/Plus):**
- Feature cards for Milk Money, Chaos Support, Make a Wish
- Messages from Maven team
- Daily HandUps status
- Community features
- Membership info and billing

**The Bottom Navigation** (mobile) provides quick access to the 5 most-used features:

| Button | Destination | Purpose |
|--------|------------|---------|
| Grace | `/` | AI concierge chat |
| Alerts | `/alerts` | Scam alerts and safety warnings |
| Local Help | `/resources` | Local resources and help near you |
| Money | `/money` | Financial tools hub |
| Village | `/village` | Community features |

A "More" menu expands to show all features organized by category: Emergency, Your Money, Fun and Creative, Community, and About Maven.

### Phase 8: Using Maven Services (Ongoing)

**Milk Money** (`/portal/milk-money` or `/emergency-fund`): Member submits a request for up to $100 emergency cash. The request goes to the admin dashboard for review. If approved, funds are disbursed. Available from day 1 for paid members.

**Chaos Support** (`/portal/chaos-support`): After 60 days of active membership, members can request up to $250 (Essentials) or $750 (Plus) for unexpected expenses. All requests are reviewed and approval is subject to conditions.

**Make a Wish** (`/portal/community` then Winners Circle): Members get entries into a daily draw. Plus members get 2x entries. Winners are selected daily by the automated draw system.

**HandUps** (Daily Grocery Boxes): Two members are selected each day to receive a grocery box delivered to their door.

**Village Hands** (`/help-board`): Community members can post requests for help (rides, babysitting, etc.) and other members can volunteer.

**Budget Builder** (`/snapshot`): Interactive budget planning tool that helps members track income vs. expenses.

**Bill Tracker** (`/bills`): Track and manage recurring bills.

**Savings Goals** (`/savings`): Set and track savings targets.

**Fee Fighter** (`/fees`): Identifies hidden fees and helps members fight unfair charges.

**Song Studio** (`/song-studio`): AI-powered song creation — members get 3 free songs, then $0.99 CAD each.

**Walk in Her Shoes** (`/walk-in-her-shoes`): Interactive simulation game that helps people understand what it is like to live on a tight budget.

**Choose Your Story** (`/choose-your-story`): Interactive story experience about financial decision-making.

**Village Chat** (`/village-chat`): Real-time community chat.

**Maven Moments** (`/moments`): Photo sharing and community celebrations.

**Scam Alerts** (`/alerts`): Province-specific fraud and scam warnings.

**Wisdom Giants** (`/wisdom-giants`): Directory of subject matter experts who provide guidance.

---

## 3. Admin Dashboard — Complete Operations Guide

The admin dashboard (`/admin`) is protected by role-based access (admin role required) and a session-level access key. It is organized into 10 sections in the sidebar.

### Section 1: Operations (What is Happening Right Now)

**Dashboard** (`/admin`) — Revenue dashboard with:
- Operations overview (total members in DB, pending approvals, total disbursed)
- Membership metrics from Stripe (active, past due, trialing)
- Revenue metrics (total revenue CAD, successful charges, MRR, active members)
- Grace engagement stats (calls, satisfaction, sentiment)
- Recent activity feed
- Subscription breakdown by tier and interval
- Recent payments

**Revenue** (`/admin/revenue`) — Detailed Stripe revenue analytics.

### Section 2: People (Who Grace Has Met)

**People Grace Knows** (`/admin/people-grace-knows`) — Every person Grace has had a conversation with, including their extracted info, conversation history, and engagement level.

**Leads** (`/admin/leads`) — Lead management with status tracking (new, contacted, qualified, converted, lost).

**Pipeline** (`/admin/leads-pipeline`) — Visual lead pipeline showing conversion funnel stages.

### Section 3: Requests (What People Need)

**Support Requests** (`/admin/support-requests`) — All member support requests (Milk Money, Chaos Support, Make a Wish) with status management (pending, under review, approved, denied, disbursed).

**Messages** (`/admin/messages`) — Direct messages between admin and members.

### Section 4: Conversations (What Grace Is Learning)

**Feeling Engine** (`/admin/feeling-engine`) — Grace's emotional intelligence dashboard showing sentiment analysis across conversations.

**Grace's Brain** (`/admin/grace-brain`) — What Grace has learned from conversations — patterns, common needs, frequently asked questions.

**Action Queue** (`/admin/action-queue`) — Grace's recommended actions based on conversation analysis (follow-ups, escalations, outreach).

**Insights** (`/admin/insights`) — AI-generated insights from conversation data.

### Section 5: Members (Active Paying Members)

**Members** (`/admin/members`) — Full member directory with tier, status, join date, and engagement metrics.

**Engagement** (`/admin/engagement`) — Member engagement tracking (login frequency, feature usage, community participation).

**Cancellations** (`/admin/cancellations`) — Cancelled and at-risk members with win-back opportunities.

**Referrals** (`/admin/referrals`) — Referral program management showing who referred whom and conversion tracking.

### Section 6: Analytics

**Site Analytics** (`/admin/analytics`) — Visitor tracking, page views, traffic sources.

**Village Pulse** (`/admin/village-pulse`) — Community health metrics.

### Section 7: Content (Marketing and Storytelling)

**Quick Capture** (`/admin/quick-capture`) — Fast content capture tool for stories, moments, and social posts.

**Client Stories** (`/admin/client-stories`) — Member success stories for marketing.

**Story Engine** (`/admin/story-engine`) — AI-powered story generation from member data.

**Social Cards** (`/admin/social-cards`) — Visual social media card generator.

**Social Media** (`/admin/social-media`) — Social media content calendar, post generation, and campaign management.

**Moments** (`/admin/moments`) — Maven Moments moderation and curation.

### Section 8: Growth (Campaigns and Outreach) — THE LAUNCH ENGINE

**Growth HQ** (`/admin/growth-command-center`) — **The unified growth command center.** This is the single page you use to hit 100 members/day. It contains:

| Section | What It Does | One-Click Action |
|---------|-------------|-----------------|
| **Scoreboard** | Live counter: today's signups vs. 100 target, leads, prefills, conversion rate | Auto-refreshes |
| **Quick Actions** | 6 instant buttons | Run Grace Scan, Process Nurture Queue, Generate Daily Plays, Launch Referral Blitz, Generate Social Content, Run Full Growth Cycle |
| **Daily Growth Plays** | AI-generated action recommendations based on yesterday's data | Execute or Skip each play |
| **Nurture Engine** | Automated email drip sequences for different audience segments | Create Sequence, Bulk Enroll, Process Queue |
| **Referral Blitz** | Campaign to activate existing members as referrers | Launch Blitz with custom name, duration, and reward |
| **Partnership Kits** | Community partner outreach packages | Create Kit for churches, food banks, schools, etc. |

**Frankie (AI Growth)** (`/admin/frankie`) — AI growth strategist that generates recommendations, gap reports, and blitz plans.

**Campaigns** (`/admin/campaigns`) — Campaign management and tracking.

**Mailchimp** (`/admin/mailchimp`) — Mailchimp integration dashboard with audience overview, campaign performance, and revenue tracking.

**Digest** (`/admin/digest`) — Content digest management.

**Ruby Red Report** (`/admin/ruby-red-report`) — Impact report focused on Ruby Red outcomes.

**Tags** (`/admin/tags`) — Tag management for segmentation.

### Section 9: Settings

**Announcements** (`/admin/announcements`) — Create and manage announcements shown to all members.

**Wisdom Giants** (`/admin/wisdom-giants`) — Manage the Wisdom Giants directory.

**Wisdom Ideas** (`/admin/wisdom-ideas`) — Track and manage wisdom giant contributions.

**Stripe Events** (`/admin/stripe-events`) — Raw Stripe event log with revenue metrics.

**Security** (`/admin/security`) — Security settings and access management.

**Sync** (`/admin/sync`) — Data synchronization tools (Stripe reconciliation, Mailchimp sync).

**Settings** (`/admin/settings`) — General platform settings.

---

## 4. The Growth Engine — How to Hit 100/Day

The Growth Command Center (`/admin/growth-command-center`) is the operational hub. Here is the daily playbook:

### Morning Routine (5 minutes)

1. Open Growth HQ — check the scoreboard (today's signups vs. target).
2. Click **"Generate Daily Plays"** — AI analyzes yesterday's data and creates 3 specific action items.
3. Execute each play with one click (or skip if not relevant).

### Ongoing Automation (Runs Itself)

4. **Grace Proactive Scanning** — Grace auto-engages visitors on high-conversion pages. No action needed.
5. **Nurture Sequences** — Click **"Process Nurture Queue"** once daily to send the next batch of drip emails to enrolled leads.
6. **Daily Draw** — Runs automatically, selecting winners and notifying them.

### Weekly Actions (15 minutes)

7. **Launch a Referral Blitz** — Go to Referral Blitz section, name the campaign, set duration (7 days), describe the reward (e.g., "Double draw entries for every friend who joins"). Click Launch.
8. **Create a Partnership Kit** — Add a new community partner (church, food bank, school). AI generates the outreach email and flyer content. Click Send.
9. **Review Nurture Sequences** — Check enrollment numbers and open rates. Create new sequences for segments that are not converting.

### The Math

| Channel | Daily Target | Mechanism |
|---------|-------------|-----------|
| Grace Direct Conversion | 25 | Proactive auto-open on pricing/team pages, empathetic conversation, direct checkout guidance |
| Email Nurture Sequences | 15 | Automated drip campaigns converting warm leads who chatted but did not sign up |
| Referral Program | 20 | Active blitz campaigns with rewards, member share links |
| Social Media / Content | 15 | Daily social posts via Social Media Hub driving traffic |
| Community Partnerships | 20 | Partner referral pages, church/food bank/school outreach |
| Organic / Direct | 5 | SEO, word of mouth, returning visitors |
| **TOTAL** | **100** | |

---

## 5. Complete Page Inventory

### Public Pages (No Login Required)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Hero + Video + Pricing — primary landing page |
| `/what-is-maven` | What Is Maven | Detailed explanation of Maven's mission and services |
| `/how-it-works` | How It Works | Step-by-step guide to joining and using Maven |
| `/meet-your-team` | Meet Your Team | The Maven team introduction |
| `/pricing` | Pricing | Tier comparison with checkout buttons |
| `/login` | Login | Magic link login + welcome screen for new members |
| `/thank-you` | Thank You | Post-signup thank you page |
| `/explore` | Explore | Feature discovery page |
| `/chat` | Chat | Grace chat (standalone page) |
| `/voice` | Voice | Voice interaction with Grace |
| `/choose-your-story` | Choose Your Story | Interactive financial story |
| `/community` | Community Feed | Public community content |
| `/join/:code` | Referral Join | Referral landing page with code |
| `/shared/song/:token` | Shared Song | Public song sharing page |
| `/facebook` | Facebook | Facebook group redirect |
| `/learning-loop` | Learning Loop | Internal learning documentation |

### Member Portal Pages (Login Required)

| Route | Page | Tier Access |
|-------|------|-------------|
| `/portal` | Portal Home | All tiers |
| `/portal/dashboard` | Dashboard | All tiers |
| `/portal/milk-money` | Milk Money | Essentials, Plus |
| `/portal/chaos-support` | Chaos Support | Essentials (after 60d), Plus (after 60d) |
| `/portal/recipients` | Recipients | Essentials, Plus |
| `/portal/community` | Community | All tiers |
| `/portal/announcements` | Announcements | All tiers |
| `/portal/messages` | Messages | All tiers |
| `/portal/referrals` | Referrals | All tiers |
| `/portal/account` | Account Settings | All tiers |
| `/portal/tier-preview` | Tier Preview | All tiers (upgrade prompts for Observer) |
| `/portal/budget-builder` | Budget Builder | All tiers |
| `/portal/help-near-you` | Help Near You | All tiers |
| `/portal/village-chat` | Village Chat | All tiers |
| `/portal/maven-moments` | Maven Moments | All tiers |
| `/portal/winners-circle` | Winners Circle | Essentials, Plus |
| `/portal/wisdom-giants` | Wisdom Giants | All tiers |
| `/portal/songs` | My Songs | All tiers |
| `/portal/stories` | Stories | All tiers |
| `/portal/manifesto` | Manifesto | All tiers |
| `/portal/meet-the-team` | Meet the Team | All tiers |
| `/portal/walk-in-her-shoes` | Walk in Her Shoes | All tiers |
| `/portal/grocery-deals` | Grocery Deals | All tiers |

### Shared Pages (Accessible With or Without Login)

| Route | Page | Purpose |
|-------|------|---------|
| `/money` | Money Hub | Financial tools overview |
| `/snapshot` | Budget Builder | Budget planning tool |
| `/bills` | Bill Tracker | Bill management |
| `/savings` | Savings Goals | Savings tracking |
| `/fees` | Fee Fighter | Fee identification |
| `/deals` | Village Deals | Collective buying deals |
| `/resources` | Local Help | Local resources by location |
| `/alerts` | Scam Alerts | Fraud warnings |
| `/sos` | Maven 911 | Emergency support |
| `/emergency-fund` | Emergency Fund | Milk Money request |
| `/song-studio` | Song Studio | AI song creation |
| `/help-board` | Village Hands | Community help board |
| `/village` | Village | Community hub |
| `/moments` | Moments | Photo sharing |
| `/winners` | Winners Circle | Daily draw winners |
| `/stories` | Stories | Member stories |
| `/manifesto` | Manifesto | Maven manifesto |
| `/referrals` | Referrals | Referral program |
| `/team` | Team | Meet the team |
| `/my-story` | My Story | Personal story sharing |
| `/memory-mirror` | Memory Mirror | Reflection tool |
| `/walk-in-her-shoes` | Walk in Her Shoes | Budget simulation game |
| `/wisdom-giants` | Wisdom Giants | Expert directory |
| `/village-chat` | Village Chat | Community chat |
| `/settings` | Settings | User settings |
| `/flypaper` | Flypaper | Content capture |

### Admin Pages (Admin Role + Access Key Required)

| Route | Page | Section |
|-------|------|---------|
| `/admin` | Dashboard | Operations |
| `/admin/revenue` | Revenue | Operations |
| `/admin/people-grace-knows` | People Grace Knows | People |
| `/admin/leads` | Leads | People |
| `/admin/leads-pipeline` | Pipeline | People |
| `/admin/support-requests` | Support Requests | Requests |
| `/admin/messages` | Messages | Requests |
| `/admin/feeling-engine` | Feeling Engine | Conversations |
| `/admin/grace-brain` | Grace's Brain | Conversations |
| `/admin/action-queue` | Action Queue | Conversations |
| `/admin/insights` | Insights | Conversations |
| `/admin/members` | Members | Members |
| `/admin/engagement` | Engagement | Members |
| `/admin/cancellations` | Cancellations | Members |
| `/admin/referrals` | Referrals | Members |
| `/admin/analytics` | Site Analytics | Analytics |
| `/admin/village-pulse` | Village Pulse | Analytics |
| `/admin/quick-capture` | Quick Capture | Content |
| `/admin/client-stories` | Client Stories | Content |
| `/admin/story-engine` | Story Engine | Content |
| `/admin/social-cards` | Social Cards | Content |
| `/admin/social-media` | Social Media | Content |
| `/admin/moments` | Moments | Content |
| `/admin/growth-command-center` | Growth HQ | Growth |
| `/admin/frankie` | Frankie (AI Growth) | Growth |
| `/admin/campaigns` | Campaigns | Growth |
| `/admin/mailchimp` | Mailchimp | Growth |
| `/admin/digest` | Digest | Growth |
| `/admin/ruby-red-report` | Ruby Red Report | Growth |
| `/admin/tags` | Tags | Growth |
| `/admin/announcements` | Announcements | Settings |
| `/admin/wisdom-giants` | Wisdom Giants | Settings |
| `/admin/wisdom-ideas` | Wisdom Ideas | Settings |
| `/admin/stripe-events` | Stripe Events | Settings |
| `/admin/security` | Security | Settings |
| `/admin/sync` | Sync | Settings |
| `/admin/settings` | Settings | Settings |

---

## 6. Backend Systems Summary

| System | File(s) | Purpose |
|--------|---------|---------|
| Grace Chat | `graceChat.ts`, `graceConcierge.ts` | AI concierge with context-aware conversation |
| Grace Scanner | `graceScanner.ts` | Automated scanning for follow-up actions |
| Grace Scheduler | `graceScheduler.ts` | Scheduled Grace tasks |
| Frankie AI | `frankie.ts` | AI growth strategist |
| Growth Engine | `growthEngine.ts` | Nurture sequences, referral blitz, daily plays, partnerships |
| Stripe Checkout | `stripe/checkout.ts` | Payment processing, webhooks, account creation |
| Stripe Admin | `stripe/adminMetrics.ts` | Revenue and membership metrics |
| Mandrill | `mandrill.ts` | Transactional email (magic links, notifications) |
| Admin Email Notify | `adminEmailNotify.ts` | Admin alerts to help2@lifewithmaven.com |
| Mailchimp | `mailchimp.ts` | Marketing email campaigns |
| Twilio | `twilio.ts` | SMS for magic links and phone verification |
| Phone Verification | `phoneVerification.ts` | User phone number verification |
| Daily Draw | `dailyDraw.ts` | Automated daily prize draw |
| Social Media | `socialMedia.ts` | AI social content generation |
| Follow-up | `followup.ts` | Lead follow-up automation |
| Banker Alerts | `bankerAlerts.ts` | Admin alert system (email + dashboard) |

---

## 7. What is Working Today

Everything listed above is built and functional. The platform is ready for the 100 members/day push. The key systems that need daily attention are:

1. **Growth HQ** — Check the scoreboard, execute daily plays, process nurture queue.
2. **Support Requests** — Review and approve Milk Money and Chaos Support requests.
3. **Messages** — Respond to member messages.
4. **Action Queue** — Review and execute Grace's recommended actions.

The automated systems (Grace proactive engagement, daily draw, nurture email processing, webhook-based account creation) run without intervention.

---

*Document generated by Manus AI for the SIC HB1000 Solve Team.*
