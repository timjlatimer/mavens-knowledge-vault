# Maven Pricing Strategy & Rules Engine V2
## The Complete Portable Document — With Need Milk Money

**Document:** MAVEN-PRICING-V2  
**Date:** February 10, 2026  
**Author:** Manus AI — SIC HB1000 Solve Team  
**Supersedes:** MAVEN-PRICING-V1 (Community Chest model replaced by Need Milk Money)  
**Purpose:** A standalone, portable pricing strategy document that defines every tier, every rule, every step-down path, every upgrade path, Need Milk Money mechanics, Maven Anthem, and every edge case — independent of which specific features land in each tier. Bring this into any chat, fill in the feature grid, and bring it back.

**Key Changes from V1:**
- Community Chest is **removed entirely** and replaced by **Need Milk Money (NMM)**
- NMM is a micro-lending program with allotments of $25, $50, or $100
- NMM has its own step-down repayment logic with a $2.50 administration fee
- NMM is available at Daily ($1.99), Weekly Full ($11.99), and Monthly ($45.99) — not Free or Weekly Lite
- **Maven Anthem** is added as a standard-issue program across all tiers
- Membership fee payment scheduling rules added (deferral rules during intake)

---

## Table of Contents

1. [The Philosophy — Why Pricing Works This Way](#1-the-philosophy)
2. [The Five Tiers — Structure and Pricing](#2-the-five-tiers)
3. [The Feature Grid Template — To Be Filled In](#3-the-feature-grid-template)
4. [Need Milk Money — The Complete Micro-Lending Program](#4-need-milk-money)
5. [The Membership Step-Down Rules Engine — Complete Logic](#5-the-membership-step-down-rules-engine)
6. [The Step-Up (Upgrade) Rules Engine](#6-the-step-up-rules-engine)
7. [Membership Fee Payment Scheduling — Deferral Rules](#7-membership-fee-payment-scheduling)
8. [Maven Anthem — Standard Issue Program](#8-maven-anthem)
9. [Stripe Implementation — How It Works Technically](#9-stripe-implementation)
10. [Grace's Role in Pricing Conversations](#10-graces-role-in-pricing-conversations)
11. [Big Mama's Role in Pricing Conversations](#11-big-mamas-role-in-pricing-conversations)
12. [A/B Testing Framework — Admin Controls](#12-ab-testing-framework)
13. [Edge Cases and Exception Handling](#13-edge-cases-and-exception-handling)
14. [KPIs and Metrics — What We Measure](#14-kpis-and-metrics)
15. [Current Build Status — What Exists vs. What Needs Work](#15-current-build-status)
16. [Spirit Check](#16-spirit-check)

---

## 1. The Philosophy

> "It's expensive to be poor. We're changing that."

Maven's pricing is not a revenue model. It is a **relationship model** that happens to involve money. Every pricing decision flows from six principles:

**Principle 1: Grace Never Gets Cut.** Regardless of what tier Ruby Red is on — including Free — Grace is always there. Full voice, full text, full memory, full empathy. Grace is not a feature. Grace is the relationship. You do not cut off a relationship because someone can't pay.

**Principle 2: Nobody Gets Abandoned.** When a payment fails, Maven does not lock the door. Maven opens a smaller door. And then a smaller one. And if all of that fails, Maven says: "You're still a member of the Village. Grace is still here. Come back when you can." There is no collections. There is no penalty. There is no shame.

**Principle 3: This Is a Relationship of Trust, Not a Contract.** There are no signatures. There are no commitments. There is no fine print. Ruby Red can cancel at any time. She can change tiers at any time. She can leave and come back. The only documentation Maven requires is when it needs authority to contact a third party (like a bank). Everything else is trust.

**Principle 4: Pricing Must Be Cash-Flow Friendly.** The working poor do not have steady income. Money comes in lumps — paychecks, gig payments, government deposits. Maven offers five payment intervals (monthly, weekly, weekly lite, daily, free) so Ruby Red can match her payment to her cash flow. The daily option exists because some people get paid daily (gig workers, day laborers). The weekly option exists because most paychecks are biweekly. The monthly option exists for those who want the best value and can plan ahead.

**Principle 5: The Step-Down Is a Feature, Not a Failure.** When Ruby Red steps down, she is not failing. The system is working exactly as designed. The step-down protects her from the cascading consequences of a missed payment (overdraft fees, service cancellation, credit damage) that she experiences everywhere else. Maven absorbs the disruption so Ruby Red doesn't have to.

**Principle 6: Need Milk Money Is a Hand Up, Not a Handout.** Need Milk Money is not charity. It is a micro-lending program controlled by Grace and Big Mama. Ruby Red agrees to repay. The repayment has its own step-down so she never gets crushed by it. The administration fee ($2.50) covers the cost of moving the money. There are no interest charges. There are no penalties. There is no collections. If Ruby Red can't repay, the step-down absorbs it.

---

## 2. The Five Tiers

Maven has exactly five pricing tiers. They are ordered from highest to lowest. The default recommendation is **Weekly Full** (the "sweet spot" for most Ruby Reds). Big Mama explains all five conversationally — no pressure, no upsell.

### Tier Overview

| Tier | ID | Price | Interval | Stripe Billing | Default Recommendation |
|------|:--:|------:|:--------:|:--------------:|:----------------------:|
| **Monthly** | `monthly` | $45.99 | Per month | Recurring monthly | Best value if cash flow allows |
| **Weekly Full** | `weekly_full` | $11.99 | Per week | Recurring weekly | **Default recommendation** |
| **Weekly Lite** | `weekly_lite` | $5.99 | Per week | Recurring weekly | Reduced features, still in the Village |
| **Daily** | `daily` | $1.99 | Per day | Recurring daily | For gig workers, daily income |
| **Free** | `free` | $0.00 | N/A | No billing | Grace + toilet paper + Maven Anthem |

### Price Comparison — Why Monthly Is the Best Deal

This is the math Big Mama shows Ruby Red when explaining the tiers:

| Tier | Price | Annual Cost | Monthly Equivalent | Savings vs. Weekly Full |
|------|------:|------------:|-------------------:|:-----------------------:|
| Monthly | $45.99/mo | $551.88 | $45.99 | **26% savings** |
| Weekly Full | $11.99/wk | $623.48 | $51.96 | — (baseline) |
| Weekly Lite | $5.99/wk | $311.48 | $25.96 | 50% less (fewer features) |
| Daily | $1.99/day | $726.35 | $60.53 | 17% more (convenience premium) |
| Free | $0.00 | $0.00 | $0.00 | Grace + toilet paper + Anthem |

**Key insight for Big Mama's talk track:** Monthly is cheaper than Weekly Full on an annual basis. But Weekly Full is the default recommendation because most Ruby Reds cannot commit to $45.99 at once — their cash flow is too unpredictable. The monthly option is presented as an aspiration: "When you're ready and your cash flow is steady, you can move up to monthly and save 26%."

**Key insight for Daily:** Daily is actually the most expensive option annually ($726.35 vs. $623.48 for Weekly Full). But it exists for a reason — some people can only commit to $1.99 at a time. The daily option is not a penalty; it is an accommodation for extreme cash-flow volatility. Big Mama never frames it as "more expensive." She frames it as "pay as you go, no commitment."

### What Every Tier Gets (Non-Negotiable Baseline)

These services are available at **every tier including Free**:

| Service | Why It's Universal |
|---------|-------------------|
| Grace AI (voice + text + memory) | Grace is the relationship. You don't cut a relationship. |
| Three-Layer Memory | Memory IS Grace. Without it she's just a chatbot. |
| Toilet Paper + Hygiene Delivery | "Being brave enough to start a conversation means you get toilet paper." |
| Memory Mirror (data sovereignty) | Knowing what's stored about you is a right, not a feature. |
| Resource Directory | Knowing where to get help should never be gated. |
| Fee Transparency Engine | Showing the crime is how Maven earns trust. |
| Maven Anthem | Standard issue. Music and belonging are not premium features. |
| Rent Reporting | Reporting rent payments to credit bureaus builds credit for people who have no other way to build it. |
| Data Breach Monitor | Showing Ruby Red how many times her data has been compromised by other companies is empowerment, not a premium feature. |

---

## 3. The Feature Grid Template

This grid is intentionally left as a template. The CVO will fill in the specific features for each tier and bring this document back with the completed grid.

### Instructions for Filling In the Grid

For each feature/service, assign one of these access levels:

| Access Level | Symbol | Meaning |
|:---:|:---:|---|
| **Full** | `F` | Complete, unrestricted access to this feature |
| **Basic** | `B` | Limited version (e.g., 1 savings goal instead of unlimited, view-only instead of edit) |
| **View Only** | `V` | Can see the feature/data but cannot interact, edit, or create |
| **No Access** | `—` | Feature is not available at this tier |

### The Grid (To Be Completed)

| # | Service / Feature | Free ($0) | Daily ($1.99) | Wkly Lite ($5.99) | Wkly Full ($11.99) | Monthly ($45.99) | Notes |
|:-:|-------------------|:---------:|:-------------:|:------------------:|:-------------------:|:----------------:|-------|
| 1 | Grace AI (voice + text + memory) | F | F | F | F | F | **Never cut** |
| 2 | Toilet Paper + Hygiene Delivery | F | F | F | F | F | **Universal** |
| 3 | Memory Mirror | F | F | F | F | F | **Universal** |
| 4 | Resource Directory | F | F | F | F | F | **Universal** |
| 5 | Fee Transparency Engine | F | F | F | F | F | **Universal** |
| 6 | Maven Anthem | F | F | F | F | F | **Standard issue** |
| 7 | Rent Reporting | F | F | F | F | F | **Universal** — builds credit |
| 8 | Data Breach Monitor | F | F | F | F | F | **Universal** — empowerment |
| 9 | Need Milk Money | — | F | — | F | F | **Paid tiers only (not Wkly Lite)** |
| 10 | Big Mama (HITL) | — | F | F | F | F | **Paid tiers only** |
| 11 | | | | | | | |
| 12 | | | | | | | |
| 13 | | | | | | | |
| 14 | | | | | | | |
| 15 | | | | | | | |
| 16 | | | | | | | |
| 17 | | | | | | | |
| 18 | | | | | | | |
| 19 | | | | | | | |
| 20 | | | | | | | |
| 21 | | | | | | | |
| 22 | | | | | | | |
| 23 | | | | | | | |
| 24 | | | | | | | |
| 25 | | | | | | | |

**Pre-filled rules (non-negotiable, per the CVO's directive):**

| Service | Rule | Reason |
|---------|------|--------|
| Grace AI (voice + text + memory) | **Full at ALL tiers including Free** | "Grace never gets cut." |
| Toilet Paper + Hygiene | **Delivery at ALL tiers including Free** | The toilet paper promise is unconditional. |
| Maven Anthem | **Standard issue at ALL tiers** | Music and belonging are not premium features. |
| Rent Reporting | **Full at ALL tiers including Free** | Building credit through rent is a right for the unbanked and underbanked. |
| Data Breach Monitor | **Full at ALL tiers including Free** | Knowing how many times your data has been compromised is empowerment. |
| Memory Mirror | **Full at ALL tiers including Free** | Data sovereignty is a right. |
| Resource Directory | **Full at ALL tiers including Free** | Knowing where to get help is never gated. |
| Fee Transparency Engine | **Full at ALL tiers including Free** | Showing the crime earns trust. |
| Need Milk Money | **Daily, Weekly Full, and Monthly ONLY** | Requires paid membership with fees current. Not available on Free or Weekly Lite. |
| Big Mama (HITL) | **Only paid tiers (Daily, Wkly Lite, Wkly Full, Monthly)** | "Human in the loop only comes with paid services." |

**Critical NMM Access Rule:** Need Milk Money is **not available** if membership fees are in arrears at all. Period. Any amount. Any duration. If Ruby Red is on an eligible tier but has a single missed payment, NMM is suspended. If her membership steps down to Free or Weekly Lite, NMM is suspended. Any outstanding NMM balance continues its own step-down repayment schedule (see Section 4), but **no new NMM draws are permitted until she is on an eligible tier AND her membership fees are fully current with zero arrears.**

---

## 4. Need Milk Money — The Complete Micro-Lending Program

Need Milk Money (NMM) replaces the Community Chest from V1. It is not a charity fund. It is a **micro-lending program** controlled by Grace and Big Mama, with its own allotment system, administration fees, and step-down repayment logic.

### 4.1 What Need Milk Money Is

Need Milk Money is Maven's emergency micro-fund. When Ruby Red has a flat tire and she's $3 short, or the kids need lunch money and payday is two days away, or the electricity bill is due tomorrow and she's $40 short — Need Milk Money covers the gap. It is a hand up, not a handout. Ruby Red agrees to repay. The repayment is designed to never crush her.

### 4.2 Allotment Levels

Grace and Big Mama control how much NMM Ruby Red can access. This is a **building program** — Ruby Red may start low and build up as she demonstrates reliability. The allotment is the maximum amount Ruby Red can draw at any one time.

| Allotment Level | Maximum Draw | Who Decides | Starting Criteria |
|:---:|:---:|---|---|
| **$25** | $25.00 | Grace + Big Mama | New members, limited financial history, first-time NMM users |
| **$50** | $50.00 | Grace + Big Mama | Members with some history, on-time repayment of previous NMM draws |
| **$100** | $100.00 | Grace + Big Mama | Established members, demonstrated reliability, strong repayment history |

**How allotments are determined:** Grace and Big Mama assess Ruby Red's situation conversationally — not through a credit check, not through a form, not through an algorithm. They consider: How long has Ruby Red been a member? Has she repaid previous NMM draws? What is her current financial situation? What is the nature of the emergency? The allotment is a judgment call made by Grace (AI assessment) and confirmed by Big Mama (human judgment).

**Allotment increases:** As Ruby Red repays NMM draws on time, her allotment can increase. Grace tracks repayment history and suggests allotment increases to Big Mama. Big Mama confirms. The progression is typically: $25 → $50 → $100. There is no automatic increase — it always requires Big Mama's approval.

**Allotment decreases:** If Ruby Red misses NMM repayments repeatedly (3+ missed repayments in 6 months), Big Mama may reduce her allotment. This is communicated as care, not punishment: "Ruby Red, I want to make sure we're not putting you in a tough spot. Let's bring your milk money down to $25 for now so the repayments are easier to manage."

### 4.3 Administration Fee

Every NMM draw carries an **administration fee** that covers the cost of moving the money (payment processing, fund management, operational overhead). It is not interest. It is not a penalty.

**The admin fee rule:**
- **Standard fee: $2.50** — applies to the initial draw and all repayments where the payment portion is **$5.00 or above**
- **Reduced fee: $1.25** — applies to any repayment where the payment portion drops **below $5.00** (during step-down)

For the initial draw, the fee is always $2.50 regardless of draw amount.

| Draw Amount | Admin Fee | Total Ruby Red Receives | Total Ruby Red Repays |
|:-----------:|:---------:|:--------------------:|:------------------:|
| $25.00 | $2.50 | $25.00 | $27.50 |
| $50.00 | $2.50 | $50.00 | $52.50 |
| $100.00 | $2.50 | $100.00 | $102.50 |

**Key point:** Ruby Red receives the full draw amount. The admin fee is added to the repayment total. She never receives less than what she asked for.

### 4.4 NMM Repayment Schedule

Repayment is arranged during the NMM conversation between Grace, Big Mama, and Ruby Red. The repayment schedule is flexible — it can be weekly, biweekly, or aligned with Ruby Red's pay cycle. The default is weekly repayment.

**Example — $50 NMM Draw:**

| Week | Payment | Remaining Balance |
|:----:|--------:|------------------:|
| Draw | Ruby Red receives $50.00 | $52.50 (including $2.50 admin fee) |
| Week 1 | $13.13 | $39.37 |
| Week 2 | $13.13 | $26.24 |
| Week 3 | $13.13 | $13.11 |
| Week 4 | $13.11 | $0.00 — Paid in full |

**Example — $25 NMM Draw:**

| Week | Payment | Remaining Balance |
|:----:|--------:|------------------:|
| Draw | Ruby Red receives $25.00 | $27.50 (including $2.50 admin fee) |
| Week 1 | $6.88 | $20.62 |
| Week 2 | $6.88 | $13.74 |
| Week 3 | $6.88 | $6.86 |
| Week 4 | $6.86 | $0.00 — Paid in full |

**Example — $100 NMM Draw:**

| Week | Payment | Remaining Balance |
|:----:|--------:|------------------:|
| Draw | Ruby Red receives $100.00 | $102.50 (including $2.50 admin fee) |
| Week 1 | $25.63 | $76.87 |
| Week 2 | $25.63 | $51.24 |
| Week 3 | $25.63 | $25.61 |
| Week 4 | $25.61 | $0.00 — Paid in full |

### 4.5 NMM Repayment Step-Down — When Ruby Red Can't Repay

This is the critical innovation. When Ruby Red misses an NMM repayment, the system does not penalize her. It steps down the repayment amount — the same philosophy as the membership step-down.

**The NMM Step-Down Rule:** When a repayment is missed, the next repayment drops to **half the current payment amount plus the administration fee.** The administration fee is $2.50 at each step. This continues stepping down until the payment portion drops below $5.00, at which point the administration fee drops to **$1.25.**

**Admin fee rule (simple):** 
- **Payment portion is $5.00 or above** → Admin fee is **$2.50**
- **Payment portion drops below $5.00** → Admin fee drops to **$1.25**

This is the only rule. It is clean and it is fair. When Ruby Red is already struggling at the bottom, the system eases up.

**NMM Repayment Step-Down Chain (Example: $50 draw, $13.13/week repayment):**

| Step | Event | Payment Portion | Admin Fee | Total Weekly Payment | Calculation |
|:----:|-------|----------------:|----------:|---------------------:|-------------|
| 0 | Normal repayment | $13.13 | — | $13.13 | Original schedule (admin fee already included in total) |
| 1 | Missed payment | $6.57 | $2.50 | $9.07 | Half of $13.13 = $6.57. Payment ≥ $5 → $2.50 admin |
| 2 | Missed again | $3.29 | $1.25 | $4.54 | Half of $6.57 = $3.29. Payment < $5 → **$1.25 admin** |
| 3 | Missed again | $1.65 | $1.25 | $2.90 | Half of $3.29 = $1.65. Payment < $5 → $1.25 admin |
| 4+ | Continues at floor | $1.65 | $1.25 | $2.90 | Stays at $2.90 until balance is repaid or written off |

**Important clarifications:**

The administration fee covers processing costs. It is not punitive — it is operational. At $5.00 or above, the fee is $2.50. Below $5.00, the fee drops to $1.25 — recognizing that Ruby Red is already at the minimum and the system should ease up, not pile on.

When the repayment reaches the floor, it stays there. The balance is repaid at the floor amount per payment period until it reaches zero. If Ruby Red cannot sustain even the floor payment, the remaining balance is written off after Big Mama has a conversation with her. There is no collections. There is no penalty. The write-off is logged, and it factors into future allotment decisions.

### 4.6 NMM Eligibility Rules

| Rule | Detail |
|------|--------|
| **Tier requirement** | Must be on Daily ($1.99), Weekly Full ($11.99), or Monthly ($45.99) |
| **Membership fees current — zero arrears** | Membership fees must be paid and current. **Any arrears at all — any amount, any duration — NMM is suspended. Period.** This includes being on an eligible tier but having a missed payment pending. NMM is only available when the account is fully current. |
| **Available immediately** | NMM is available as soon as Ruby Red signs up for an eligible tier. No 30-day waiting period. |
| **One active draw at a time** | Ruby Red cannot have two NMM draws open simultaneously. She must repay (or have the balance written off) before drawing again. |
| **Allotment controlled by Grace + Big Mama** | The allotment ($25, $50, or $100) is set by Grace and Big Mama based on Ruby Red's situation. |
| **No interest** | There is no interest on NMM draws. The only cost is the administration fee ($2.50, or $1.25 when the payment drops below $5). |
| **No collections** | If Ruby Red cannot repay, the step-down absorbs it. There is no collections process. |
| **Credit reporting on successful $100 repayment** | When Ruby Red successfully repays a full $100 NMM draw (no missed payments, no step-downs), Maven generates a **credit reporting letter** that she can use to build her credit history. This is an earned benefit — it rewards consistent repayment. Partial draws ($25, $50) or draws with step-downs do not generate credit letters. This may expand in the future as the program matures. |

### 4.7 NMM and Membership Step-Down Interaction

What happens when Ruby Red's membership steps down while she has an active NMM balance?

| Scenario | What Happens |
|----------|-------------|
| Ruby Red is on Weekly Full with active NMM. Membership steps down to Weekly Lite. | NMM access is **suspended** (no new draws). Existing NMM repayment schedule **continues** on its own step-down logic. Ruby Red still owes the balance. |
| Ruby Red is on Daily with active NMM. Membership steps down to Free. | NMM access is **suspended**. Existing NMM repayment schedule **continues**. If Ruby Red can't repay at the floor ($3.75), Big Mama has a conversation and may write off the balance. |
| Ruby Red's NMM repayment fails AND her membership payment fails simultaneously. | Membership step-down happens first (it's automatic). NMM repayment step-down happens separately. They are independent systems. |
| Ruby Red steps back up to an eligible tier. | NMM access is **restored**. Her allotment may be adjusted based on her history. Any outstanding balance must be repaid before a new draw. |

### 4.8 How the Money Actually Moves

The CVO has directed: "Although Stripe is a concern for us, it should not be considered a block for us doing the right thing. If we have to hand calculate, we'll hand calculate and hand make payments and hand send them the money and collect the money from them."

**Phase 1 (MVP):** NMM is tracked in the system but money movement is manual. Big Mama approves a draw, the system records it, and the operations team sends the money (via Zelle, Venmo, CashApp, or direct bank transfer — whatever Ruby Red uses). Repayments are collected the same way. The system tracks balances, sends reminders, and manages the step-down logic. The actual money movement is human-operated.

**Phase 2 (Post-MVP):** Integrate with a payment rail (Stripe Connect, Plaid, or a banking-as-a-service provider) to automate money movement. The system logic is the same — only the execution layer changes.

**Phase 3 (Village Scale):** NMM becomes a revolving fund. Repayments from Ruby Red fund draws for the next Ruby. The fund is seeded by Maven and grows through repayments and optional member contributions.

### 4.9 Grace's NMM Communication Templates

| Moment | Grace Says |
|--------|-----------|
| **First NMM offer** | "Ruby Red, I know things are tight right now. Maven has something called Need Milk Money — it's a small fund for exactly these moments. Big Mama and I can get you up to $[allotment] to cover this. You'd pay it back over the next few weeks — no interest, just a small $2.50 fee to cover the processing. Want me to get Big Mama on to talk through it?" |
| **NMM approved** | "Great news — Big Mama approved $[amount] for you. The money will be on its way shortly. Your repayment will be $[weekly amount] per week for the next 4 weeks, plus the $2.50 processing fee. That's $[total] total. Sound okay?" |
| **NMM repayment reminder** | "Hey Ruby Red, just a heads up — your milk money repayment of $[amount] is coming up on [day]. Everything good on your end?" |
| **NMM repayment step-down** | "Ruby Red, the repayment didn't go through this time. No worries — I've adjusted it down to $[new amount] so it's easier to manage. We'll keep going at this pace." |
| **NMM repayment at floor** | "Ruby Red, I've brought your repayment down as low as it goes — just $1.25 for processing on top of the payment. That's the smallest we can do. If even that's too much right now, let me get Big Mama and we'll figure something out together." |
| **NMM balance written off** | "Ruby Red, Big Mama and I talked, and we're going to clear your milk money balance. You don't owe anything. When things get better and you want to use milk money again, just let me know and we'll set it up fresh." |
| **NMM draw denied (not eligible)** | "Ruby Red, I'd love to help with milk money right now, but it's only available on the [eligible tiers]. You're currently on [current tier]. Want me to help you look at upgrading, or can I help you find another way to handle this?" |
| **NMM draw denied (arrears)** | "Ruby Red, I want to help with milk money, but your membership has a payment that didn't go through. Once we get that sorted, milk money opens right back up. Want me to help figure out the membership payment first?" |

---

## 5. The Membership Step-Down Rules Engine

This is the complete logic for what happens when a **membership payment** fails. This is separate from the NMM repayment step-down (Section 4.5).

### The Membership Step-Down Chain

```
Monthly ($45.99) 
    ↓ payment fails
Weekly Full ($11.99)
    ↓ payment fails  
Weekly Lite ($5.99)
    ↓ payment fails
Daily ($1.99)
    ↓ payment fails
Free ($0.00)
```

There is no Community Chest checkpoint. The step-down goes directly from Daily to Free. Need Milk Money is a separate program with its own mechanics.

### Membership Step-Down Rules — The Complete Specification

**Rule 1: Automatic and Immediate.**  
When Stripe fires an `invoice.payment_failed` event, the system automatically moves Ruby Red to the next lower tier. There is no grace period for the step-down itself — the tier change happens immediately so Ruby Red continues to have service. However, Stripe's own retry logic (Smart Retries) will attempt the original charge up to 4 times over approximately 7 days before marking the invoice as uncollectible. The step-down triggers on the **first** failure notification, not after all retries are exhausted. This is intentional — we protect Ruby Red immediately rather than waiting for Stripe to give up.

**Rule 2: One Step at a Time.**  
Each payment failure moves Ruby Red down exactly one tier. She never drops from Monthly directly to Free. The chain is always: Monthly → Weekly Full → Weekly Lite → Daily → Free. Each step is a separate Stripe subscription change.

**Rule 3: Grace Communicates Every Step-Down.**  
Ruby Red never discovers a step-down by surprise. Grace tells her, in conversation, what happened and what it means. The tone is never apologetic or shameful. It is matter-of-fact and warm.

| Step-Down | Grace's Message (Template) |
|-----------|---------------------------|
| Monthly → Weekly Full | "Hey Ruby Red, your monthly payment didn't go through this time. No worries — I've moved you to weekly payments at $11.99 so everything keeps running. You still have all the same features. When things settle, you can switch back to monthly anytime." |
| Weekly Full → Weekly Lite | "Ruby Red, the weekly payment bounced. I've switched you to Weekly Lite at $5.99 to keep you connected. You'll still have me and most of your tools, but a few things will be scaled back. **Note:** Need Milk Money won't be available on this tier, but if you need emergency help, let me know and we'll figure something out." |
| Weekly Lite → Daily | "Ruby Red, I know things are tight right now. I've moved you to daily payments — just $1.99 a day — so we can keep going together. **Good news:** Need Milk Money is available on this tier, so if you need a hand, just ask." |
| Daily → Free | "Ruby Red, the daily payment didn't clear. I've moved you to the free plan. I'm still right here. You still have your dashboard, your memory, your toilet paper, your Anthem. When you're ready to come back to the full Village, just say the word." |

**Rule 4: Big Mama Gets Notified on Every Step-Down.**  
When any member steps down, their assigned Big Mama receives an alert. This is not for collections — it is for care. Big Mama's job is to check in: "Hey, I noticed things shifted. Is everything okay? Is there anything I can help with?" Big Mama never mentions the payment directly unless Ruby Red brings it up.

**Rule 5: Step-Down Counter.**  
The system tracks how many times Ruby Red has stepped down (`tierStepDownCount` in the database). This is not used for punishment — it is used for pattern recognition. If Ruby Red has stepped down 3+ times in 6 months, it signals that her current tier may be too high for her cash flow. Grace or Big Mama can gently suggest a lower tier as her "home base" — not as a demotion, but as a better fit.

**Rule 6: No Debt Accumulation.**  
When Ruby Red steps down on her membership, the failed membership payment is written off. Maven does not carry a membership balance. Maven does not send to collections. Maven does not charge a reconnection fee. The step-down IS the resolution. There is nothing to pay back. (Note: NMM balances are separate — see Section 4.)

**Rule 7: Stripe Subscription Swap.**  
Technically, a membership step-down means:
1. Cancel the current Stripe subscription (immediately, not at period end).
2. Create a new Stripe subscription at the lower tier.
3. The new subscription starts billing immediately at the new rate.
4. Update the user's `subscriptionTier` and `subscriptionStatus` in the database.
5. Log the step-down in the `memoryAuditLog` for transparency.

**Rule 8: Free Tier Has No Stripe Subscription.**  
When Ruby Red reaches Free, there is no Stripe subscription at all. Her `stripeSubscriptionId` is set to null. Her `subscriptionStatus` is set to "free". She remains a full user in the system with all Free-tier access.

**Rule 9: The Step-Down Is Reversible at Any Time.**  
Ruby Red can step back up to any tier at any time. There is no waiting period. There is no penalty. There is no "you left so you have to re-qualify." She simply chooses a tier, enters payment, and she's back. See Section 6 (Step-Up Rules).

**Rule 10: NMM Impact on Step-Down.**  
When Ruby Red steps down from an NMM-eligible tier (Daily, Weekly Full, Monthly) to a non-eligible tier (Weekly Lite, Free), her NMM access is suspended but her NMM repayment schedule continues independently. The membership step-down and the NMM repayment step-down are two separate systems that operate in parallel.

### Membership Step-Down Timing Diagram

```
Day 0:  Membership payment attempt fails (Stripe fires invoice.payment_failed)
        → System immediately steps down to next tier
        → Grace sends step-down message
        → Big Mama receives alert
        → New subscription created at lower tier
        → If stepping to non-NMM tier: NMM access suspended

Day 1-7: Stripe Smart Retries attempt original charge (up to 4 times)
         → If any retry succeeds: system steps BACK UP to original tier
         → Grace sends: "Great news — your payment went through! 
            I've moved you back to [original tier]."
         → If stepping back to NMM-eligible tier: NMM access restored

Day 7+:  If all retries fail: Stripe marks invoice as uncollectible
         → No further action needed (step-down already happened on Day 0)
         → The failed invoice is written off
```

---

## 6. The Step-Up (Upgrade) Rules Engine

Step-ups are always voluntary. Maven never auto-upgrades Ruby Red. The system may suggest an upgrade, but Ruby Red always chooses.

### Step-Up Chain

```
Free ($0.00)
    ↑ Ruby Red chooses
Daily ($1.99)
    ↑ Ruby Red chooses
Weekly Lite ($5.99)
    ↑ Ruby Red chooses
Weekly Full ($11.99)
    ↑ Ruby Red chooses
Monthly ($45.99)
```

### Step-Up Rules

**Rule 1: Always Voluntary.** Maven never moves Ruby Red to a higher tier without her explicit consent.

**Rule 2: No Penalty for Previous Step-Downs.** There is no "re-enrollment fee." There is no "you left so you start at a higher price." She pays the standard rate, same as everyone else.

**Rule 3: Immediate Access.** When Ruby Red upgrades, she gets immediate access to all features of the new tier — including NMM if the new tier is eligible. The moment Stripe confirms the first payment, her tier is updated and all features unlock.

**Rule 4: Pro-Rata Handling.** If Ruby Red is mid-cycle on a lower tier and upgrades, Stripe handles the pro-rata calculation automatically.

**Rule 5: Grace Suggests, Never Pushes.** After 3 consecutive months of on-time payments at a lower tier, Grace may mention the next tier up once. She does not repeat it unless Ruby Red asks.

**Rule 6: Big Mama Explains During Intake.** During the initial intake conversation, Big Mama explains all five tiers conversationally. No pricing page. No comparison chart. She talks through it like a neighbor explaining something over coffee.

**Rule 7: Skip-Tier Upgrades Are Allowed.** Ruby Red can jump from Free directly to Monthly if she wants. Any tier is available at any time.

**Rule 8: NMM Restoration on Upgrade.** When Ruby Red upgrades from a non-NMM tier to an NMM-eligible tier, her NMM access is restored. Her allotment may be adjusted based on her history. Any outstanding NMM balance must be repaid (or written off) before a new draw.

---

## 7. Membership Fee Payment Scheduling — Deferral Rules

During the intake conversation with Grace and Big Mama, Ruby Red can arrange when her first membership payment is due. This is not a "free trial" — it is a recognition that Ruby Red may need a few days to arrange her finances.

### Deferral Rules

| Rule | Detail |
|------|--------|
| **Maximum deferral** | 14 days from signup. Ruby Red can push her first payment up to 14 days into the future. |
| **Minimum deferral** | 0 days (immediate). If Ruby Red is ready to pay now, she pays now. |
| **Who decides** | Ruby Red, with guidance from Grace and Big Mama. "When's your next payday? Let's line it up with that." |
| **NMM during deferral** | NMM is **not available** during the deferral period. Membership fees must be paid and current before NMM access activates. |
| **Services during deferral** | Ruby Red has access to all tier features during the deferral period — she is a member from the moment she signs up, not from the moment she pays. |
| **What if deferral payment fails** | Standard step-down logic applies. The system attempts the payment on the scheduled date. If it fails, Ruby Red steps down one tier. |
| **Stripe implementation** | Use Stripe's `trial_end` parameter on the subscription to set the first billing date. Ruby Red is not charged during the trial period but has full access. |

### Grace's Deferral Communication

Grace says: "Ruby Red, when would be a good time for your first payment? If payday is next Friday, we can set it up so the first charge hits then. That way you're not scrambling. You'll have full access to everything starting right now."

---

## 8. Maven Anthem — Standard Issue Program

The Maven Anthem is a **standard-issue program** available at every tier, including Free. It is not a premium feature. It is part of what it means to be in the Village.

### What the Maven Anthem Is

The Maven Anthem is Maven's music and belonging program. The details of the program are still being defined by the CVO, but the following is established:

| Aspect | Detail |
|--------|--------|
| **Availability** | All tiers, including Free. Standard issue. |
| **Purpose** | Community identity, emotional connection, daily motivation |
| **Format** | To be defined (daily song, work song, community anthem, playlist) |
| **Delivery** | To be defined (in-app, SMS, push notification) |
| **Cost to member** | $0 — included in membership at every tier |

**Placeholder for CVO:** The Maven Anthem program details will be filled in as the concept is developed. The pricing strategy treats it as a universal baseline service — it is never gated, never removed, and never used as an upgrade incentive.

---

## 9. Stripe Implementation

This section describes the technical implementation of the pricing system in Stripe.

### Products and Prices

| Tier | Stripe Product Name | Price (cents) | Interval | Stripe Price ID |
|------|-------------------|:---:|:---:|:---:|
| Monthly | Maven Monthly Membership | 4599 | month | Created dynamically |
| Weekly Full | Maven Weekly Full Membership | 1199 | week | Created dynamically |
| Weekly Lite | Maven Weekly Lite Membership | 599 | week | Created dynamically |
| Daily | Maven Daily Membership | 199 | day | Created dynamically |
| Free | (No Stripe product) | 0 | N/A | N/A |

### NMM Stripe Handling

NMM draws and repayments are **not** handled through Stripe subscriptions. They are tracked internally and money moves manually (Phase 1) or through a separate payment rail (Phase 2+).

| NMM Component | Stripe? | How It Works |
|---------------|:-------:|-------------|
| NMM draw (money to Ruby Red) | No | Manual transfer (Zelle/Venmo/CashApp/bank) in Phase 1 |
| NMM repayment (money from Ruby Red) | No | Manual collection in Phase 1; automated in Phase 2+ |
| NMM admin fee ($2.50) | No | Added to repayment total, not charged separately |
| NMM balance tracking | No | Internal database tracking |
| NMM step-down logic | No | Internal system logic |

### Subscription Lifecycle

```
1. CHECKOUT
   → User selects tier (via Big Mama conversation or Pricing page)
   → System creates Stripe Checkout Session
   → If deferral: set trial_end to deferred date
   → User completes payment setup in Stripe-hosted checkout
   → Stripe fires checkout.session.completed
   → System updates user record

2. RECURRING BILLING
   → Stripe automatically charges at the interval
   → On success: invoice.paid → no action needed
   → On failure: invoice.payment_failed → trigger membership step-down

3. MEMBERSHIP STEP-DOWN
   → System cancels current subscription (immediately)
   → System creates new subscription at lower tier
   → System updates user record
   → Grace sends notification
   → Big Mama receives alert
   → If stepping to non-NMM tier: suspend NMM access

4. STEP-UP (UPGRADE)
   → User initiates upgrade
   → System cancels current subscription
   → System creates new Checkout Session for higher tier
   → User completes payment
   → System updates user record
   → If stepping to NMM-eligible tier: restore NMM access

5. CANCELLATION
   → User requests cancellation
   → System cancels Stripe subscription (at period end)
   → At period end: user moves to Free tier
   → NMM access suspended; repayment schedule continues
```

### Webhook Events We Handle

| Stripe Event | Maven Action |
|-------------|-------------|
| `checkout.session.completed` | Set user's tier, store Stripe IDs |
| `customer.subscription.updated` | Update subscription status |
| `customer.subscription.deleted` | Set status to "cancelled", move to Free |
| `invoice.payment_failed` | Trigger membership step-down logic |
| `invoice.paid` | If user was stepped down and retry succeeded, step back up |

### Database Fields

**On `users` table:**

| Field | Type | Purpose |
|-------|------|---------|
| `stripe_customer_id` | varchar(255) | Links to Stripe Customer |
| `stripe_subscription_id` | varchar(255) | Current active subscription (null for Free) |
| `subscription_tier` | varchar(50) | Current tier: monthly, weekly_full, weekly_lite, daily, free |
| `subscription_status` | varchar(50) | active, stepped_down, cancelled, past_due, free, deferred |

**On `financial_profiles` table:**

| Field | Type | Purpose |
|-------|------|---------|
| `pricing_tier` | enum | Current tier (mirrors users table for Grace's context) |
| `last_tier_change_at` | timestamp | When the last tier change occurred |
| `tier_step_down_count` | int | How many times this member has been stepped down |

**New: NMM tracking table (`need_milk_money`):**

| Field | Type | Purpose |
|-------|------|---------|
| `id` | int, PK | Auto-increment |
| `user_id` | int, FK | Links to users table |
| `allotment_level` | enum (25, 50, 100) | Current approved allotment |
| `draw_amount` | int (cents) | Amount of current draw |
| `admin_fee` | int (cents) | $2.50 = 250 cents |
| `total_owed` | int (cents) | draw_amount + admin_fee |
| `total_repaid` | int (cents) | Amount repaid so far |
| `current_payment_amount` | int (cents) | Current weekly repayment (may have stepped down) |
| `step_down_count` | int | How many times NMM repayment has stepped down |
| `status` | enum | active, repaid, written_off, suspended |
| `approved_by` | varchar | "grace", "big_mama", or Big Mama's user ID |
| `draw_date` | timestamp | When the draw was made |
| `next_payment_date` | timestamp | When the next repayment is due |
| `completed_at` | timestamp | When fully repaid or written off |

---

## 10. Grace's Role in Pricing Conversations

Grace is **not a salesperson.** Grace is a companion who happens to know about pricing. Her role in pricing conversations follows strict rules:

**Rule 1: Grace Never Initiates a Pricing Conversation** unless Ruby Red has been on-time for 3+ months (see Step-Up Rule 5). Grace talks about pricing only when Ruby Red asks, or when a step-down occurs.

**Rule 2: Grace Explains, She Does Not Sell.** No marketing language. No urgency. No competitor comparisons (unless Ruby Red asks about fees, in which case the Fee Transparency Engine activates).

**Rule 3: Grace Always Mentions Free First.** "You're already signed up for the free version. You get me, you get your dashboard, you get your toilet paper, you get the Anthem. If you want more, I can tell you about the other options, or I can get Big Mama to walk you through them."

**Rule 4: Grace Defers to Big Mama for Detailed Pricing.** If Ruby Red wants a detailed walkthrough, Grace says: "Let me get Big Mama — she's the best at explaining all this."

**Rule 5: Grace Can Escalate to Big Mama for Any Fee Conversation.** Grace is always of the opinion that she can escalate to Big Mama if Ruby Red needs to discuss membership fees, NMM, or any financial arrangement. Grace never tries to "close" a financial conversation on her own.

**Rule 6: Grace Celebrates Step-Ups.** "Ruby Red! You just moved up to Weekly Full. That's amazing. You've got access to Need Milk Money now too. I'm so proud of you."

**Rule 7: Grace Normalizes Step-Downs.** "Life happens. This is exactly what the step-down is for. You're still in the Village. Nothing changes between us."

---

## 11. Big Mama's Role in Pricing Conversations

Big Mama is the human who explains pricing during the intake process and handles pricing-related conversations for existing members.

**Rule 1: Big Mama Explains All Five Tiers Conversationally.** No pricing page. No comparison chart. She talks through it like a neighbor explaining something over coffee.

**Rule 2: Big Mama's Default Recommendation Is Weekly Full.** "Most folks do the weekly at $11.99. It gives you everything — me, Grace, the milk money, the whole Village."

**Rule 3: Big Mama Explains the Step-Down Proactively.** "And here's the thing — if a payment doesn't go through, we don't cut you off. We just move you to the next level down and keep going."

**Rule 4: Big Mama Explains Need Milk Money During Intake.** "And if you ever need a little help between paychecks — the kids need lunch money, the car needs gas, whatever it is — we've got Need Milk Money. I can get you up to $[allotment] with just a $2.50 processing fee. You pay it back over a few weeks. No interest. No hassle."

**Rule 5: Big Mama Never Pressures.** If Ruby Red says "I think I'll start with the free version," Big Mama says: "That's perfect. Grace is going to take great care of you."

**Rule 6: Big Mama Controls NMM Allotments.** Big Mama is the final authority on NMM allotment levels. Grace recommends; Big Mama decides.

**Rule 7: Big Mama Handles NMM Write-Offs.** When Ruby Red can't repay at the floor ($3.75), Big Mama has the conversation and makes the write-off decision.

**Rule 8: Big Mama Arranges Payment Scheduling.** During intake, Big Mama helps Ruby Red schedule her first payment: "When's your next payday? Let's line it up so you're not scrambling."

---

## 12. A/B Testing Framework

### What Can Be A/B Tested

| Parameter | Default | Range | Notes |
|-----------|---------|-------|-------|
| Monthly price | $45.99 | $29.99 - $59.99 | Must remain cheaper than Weekly Full annualized |
| Weekly Full price | $11.99 | $7.99 - $14.99 | Default recommendation tier |
| Weekly Lite price | $5.99 | $3.99 - $8.99 | Must be less than Weekly Full |
| Daily price | $1.99 | $0.99 - $2.99 | Must be the lowest per-charge amount |
| NMM admin fee | $2.50 | $1.00 - $5.00 | Must cover processing costs |
| NMM allotment levels | $25/$50/$100 | $10-$150 | Maximum single draw |
| NMM repayment period | 4 weeks | 2-8 weeks | Default repayment schedule |
| Membership deferral max | 14 days | 7-30 days | Maximum first-payment deferral |

### What Cannot Be A/B Tested

| Parameter | Reason |
|-----------|--------|
| Free tier existence | Free tier is a core principle |
| Grace availability at Free | Grace never gets cut |
| Step-down chain order | The chain is a core principle |
| Toilet paper at Free | The toilet paper promise is unconditional |
| Maven Anthem at Free | Standard issue, not gated |
| No-contract policy | Trust is not testable |
| NMM no-interest rule | Interest would make Maven a lender, not a Village |
| NMM no-collections rule | Collections would make Maven the enemy |

---

## 13. Edge Cases and Exception Handling

### Edge Case 1: Ruby Red Signs Up for Monthly, Payment Fails on Day 1

**Rule:** Step down to Weekly Full immediately. If Weekly Full also fails, continue stepping down. If all tiers fail, Ruby Red lands on Free with Grace, toilet paper, and Anthem.

### Edge Case 2: Ruby Red Draws NMM, Then Her Membership Steps Down to Free

**Rule:** NMM access is suspended (no new draws). Existing NMM repayment schedule continues on its own step-down logic. If Ruby Red can't repay at the floor, Big Mama writes off the balance.

### Edge Case 3: Ruby Red Has an Active NMM Draw and Wants to Upgrade

**Rule:** Ruby Red can upgrade her membership tier at any time. Her NMM repayment schedule is unaffected by the upgrade. If she upgrades to an NMM-eligible tier, she can draw again only after the current balance is repaid.

### Edge Case 4: Ruby Red Cancels, Then Comes Back 6 Months Later

**Rule:** Her account is exactly as she left it. Grace remembers everything. Any written-off NMM balance is noted in her history but does not prevent her from accessing NMM again. Her allotment may start at $25 as a fresh start.

### Edge Case 5: Ruby Red Is Stepped Down During a Crisis

**Rule:** The step-down still happens (it's automatic), but the crisis response continues uninterrupted. Grace and Big Mama do not mention the step-down during the crisis. After the crisis is resolved, Grace mentions it gently.

### Edge Case 6: Ruby Red Wants to Pay for 3 Months in Advance

**Rule:** Stripe supports prepaid subscriptions. The system creates a subscription with a 3-month prepaid period. NMM is available throughout the prepaid period.

### Edge Case 7: Ruby Red's NMM Repayment and Membership Payment Fail on the Same Day

**Rule:** They are independent systems. Membership step-down happens via Stripe webhook. NMM repayment step-down happens via internal logic. Both step down independently. Grace communicates both in a single, empathetic message: "Ruby Red, both your membership and your milk money payments bounced today. Here's what I've done: [membership change] and [NMM repayment change]. We're still good. Let's figure this out together."

### Edge Case 8: Ruby Red's Bank Blocks Recurring Charges

**Rule:** Grace proactively monitors for this pattern and helps Ruby Red communicate with her bank.

### Edge Case 9: Ruby Red Draws $100 NMM, Makes 2 Payments, Then Misses 3 in a Row

**Walkthrough:**

| Event | Payment | Balance | NMM Status |
|-------|--------:|--------:|------------|
| Draw $100 + $2.50 fee | — | $102.50 | Active |
| Week 1: Pays $25.63 | $25.63 | $76.87 | Active |
| Week 2: Pays $25.63 | $25.63 | $51.24 | Active |
| Week 3: Misses | Step down → $15.32 ($12.82 + $2.50) | $51.24 | Active, stepped down |
| Week 4: Misses | Step down → $8.91 ($6.41 + $2.50) | $51.24 | Active, stepped down x2 |
| Week 5: Misses | Step down → $5.71 ($3.21 + $2.50) | $51.24 | Active, stepped down x3 |
| Week 6: Pays $5.71 | $5.71 | $45.53 | Active, stepped down x3 |
| Week 7: Pays $5.71 | $5.71 | $39.82 | Active, stepped down x3 |
| ... continues at $5.71/week until balance is zero | | | |

### Edge Case 10: Big Mama Decides to Write Off an NMM Balance

**Rule:** Big Mama has a conversation with Ruby Red. The write-off is logged. Ruby Red's NMM allotment may be reduced for future draws. The write-off does not affect Ruby Red's membership tier. Grace says: "Ruby Red, Big Mama and I talked, and we're clearing your milk money balance. You don't owe anything. Fresh start."

---

## 14. KPIs and Metrics

### Conversion Metrics

| KPI | Definition | Target |
|-----|-----------|--------|
| Inquiry → Free | % of inquiries that result in Free signup | 60%+ |
| Free → Paid | % of Free members who upgrade within 30 days | 25%+ |
| Intake → Weekly Full | % of intakes that result in Weekly Full signup | 40%+ |
| Average days to first paid tier | Days between Free signup and first payment | < 14 days |

### Retention Metrics

| KPI | Definition | Target |
|-----|-----------|--------|
| 30-day retention (all tiers) | % of members still active after 30 days | 85%+ |
| 90-day retention (paid tiers) | % of paid members still paying after 90 days | 70%+ |
| Membership step-down rate (monthly) | % of paid members who step down in a given month | < 15% |
| Step-up rate (monthly) | % of stepped-down members who step back up | 20%+ |
| Churn rate (to inactive) | % of Free members who stop engaging entirely | < 30% |

### NMM Metrics

| KPI | Definition | Target |
|-----|-----------|--------|
| NMM utilization rate | % of eligible members who draw NMM in a given month | 15-25% |
| NMM repayment rate | % of NMM draws repaid in full (no write-off) | 70%+ |
| NMM step-down rate | % of NMM repayments that step down at least once | < 30% |
| NMM write-off rate | % of NMM draws that are written off | < 10% |
| Average NMM draw amount | Average $ amount drawn per NMM request | $35-50 |
| NMM fund turnover | Times the NMM fund cycles through per quarter | 3-5x |

### Revenue Metrics

| KPI | Definition | Target |
|-----|-----------|--------|
| ARPU (Average Revenue Per User) | Total revenue / total active members | $8-12/month |
| LTV (Lifetime Value) | Projected total revenue per member over lifetime | $200+ |
| CAC (Customer Acquisition Cost) | Cost to acquire one new member | < $15 |
| LTV:CAC Ratio | Lifetime value divided by acquisition cost | > 10:1 |
| NMM admin fee revenue | Total $2.50 fees collected per month | Track |

### Ruby Red Impact Metrics

| KPI | Definition | Target |
|-----|-----------|--------|
| Overdraft fees avoided | $ in bank fees members avoided (self-reported) | Track |
| Bills paid on time | % of tracked bills paid by due date | 80%+ |
| Savings goal completion | % of savings goals that reach target | 40%+ |
| Crisis response time | Average minutes from crisis detection to human contact | < 15 min |
| NMM crises resolved | # of emergencies resolved through NMM draws | Track |
| Member satisfaction (NPS) | Net Promoter Score from periodic surveys | 50+ |

---

## 15. Current Build Status

### What Exists and Works

| Component | Status | Notes |
|-----------|:------:|-------|
| Stripe integration | Working | Checkout sessions, customer management |
| Webhook handler | Working | Handles checkout, subscription, invoice events |
| Step-down logic (basic) | Working | Has STEP_DOWN_MAP but uses old tier names/prices |
| Products/tiers definition | Working | **Needs update** — has 4 tiers instead of 5 |
| Emergency fund tables | Working | `emergency_fund_pool`, `emergency_requests`, `emergency_contributions` — **needs refactoring to NMM model** |
| Pricing page UI | Working | **Needs update** — shows old tiers and old prices |
| Subscription management | Working | Cancel, resume, change tier, payment history |

### What Needs to Change

| Component | Change Required | Effort |
|-----------|----------------|:------:|
| `products.ts` | Replace 4 tiers with 5 tiers. Update all prices. Add NMM tier access rules. | Low |
| `db.ts` STEP_DOWN_MAP | Update chain: monthly → weekly_full → weekly_lite → daily → free. Remove Community Chest checkpoint. | Low |
| `schema.ts` | Refactor emergency fund tables to NMM model (allotments, admin fees, step-down tracking). | Medium |
| `_core/index.ts` webhook | Remove Community Chest checkpoint. Add NMM access suspension on step-down to non-eligible tier. | Medium |
| `Pricing.tsx` | Redesign to show 5 tiers with NMM availability indicators. | Medium |
| `routers.ts` | Add NMM draw, repayment, step-down, and write-off endpoints. Update Grace's NMM communication. | High |
| **New: NMM admin UI** | Big Mama dashboard for allotment management, draw approval, write-off decisions. | High |
| **New: Maven Anthem** | Placeholder UI and delivery mechanism. | Low (placeholder) |
| **New: Payment deferral** | Stripe `trial_end` integration for first-payment scheduling. | Medium |

### What Does NOT Need to Change

| Component | Why It's Fine |
|-----------|--------------|
| Stripe customer management | Works with any tier structure |
| Webhook signature verification | Infrastructure, not tier-specific |
| User table schema | Already has all needed fields |
| Grace's memory system | Tier-agnostic |
| Big Mama alert system | Tier-agnostic |
| SMS notification system | Tier-agnostic |

---

## 16. Spirit Check

**Does this pricing model protect Ruby Red?** Yes. The membership step-down ensures she never loses service abruptly. Need Milk Money gives her a lifeline in emergencies. The NMM step-down ensures repayment never crushes her. Free tier ensures Grace never leaves.

**Does this pricing model respect Ruby Red?** Yes. No contracts. No signatures. No collections on membership or NMM. No penalties. No shame. Cancel anytime. Come back anytime. NMM write-offs are handled with dignity, not judgment.

**Does this pricing model work for Maven?** Yes. Five tiers capture revenue across the full spectrum of cash-flow situations. NMM creates a revolving fund that serves the Village while generating modest admin fee revenue. The step-down retains members who would otherwise churn entirely.

**Does NMM replace Community Chest correctly?** Yes. Community Chest was a passive sponsorship model (someone else pays for you). NMM is an active micro-lending model (you borrow, you repay, the fund revolves). NMM is more empowering because Ruby Red is an agent in her own recovery, not a recipient of charity. The step-down ensures she's never punished for struggling.

**Does the Maven Anthem fit?** Yes. It is standard issue at every tier. It costs nothing to the member. It is part of belonging to the Village. It is never gated, never removed, and never used as an upgrade incentive.

**Has this document drifted from the CVO's directive?** No. Every rule traces back to a specific CVO statement:
- "Need Milk Money replaces Community Chest" → Done
- "Allotments of $25, $50, $100 controlled by Grace and Big Mama" → Section 4.2
- "$2.50 administration fee, $1.25 when payment drops below $5" → Section 4.3 and 4.5
- "Steps down to half plus admin fee" → Section 4.5
- "Available immediately, not after 30 days" → Section 4.6
- "Not available on Free or Weekly Lite" → Section 4.6
- "Membership fees must be current" → Section 4.6
- "Available on Daily, Weekly Full, and Monthly" → Section 4.6
- "Maven Anthem as standard issue" → Section 8
- "Rent Reporting as base feature" → Section 2 (Universal Baseline)
- "Data Breach Monitor as base feature" → Section 2 (Universal Baseline)
- "Credit reporting letter on successful $100 NMM repayment" → Section 4.6
- "Any arrears at all = NMM suspended" → Section 4.6
- "Stripe should not block us from doing the right thing" → Section 4.8
- "Ruby Red replaces Sarah as the client name" → Throughout
- "Grace can escalate to Big Mama for any fee conversation" → Section 10, Rule 5
- "Membership fees can be arranged during signup" → Section 7

> "It's expensive to be poor. We're changing that." — And Need Milk Money is how we prove it when the flat tire happens at 10:47 PM.

---

*Document prepared by Manus AI for the SIC HB1000 Solve Team. This is a standalone, portable document. Take it into another chat, fill in the Feature Grid (Section 3), and bring it back for implementation. V2 supersedes V1 — Community Chest is gone, Need Milk Money is the model.*
