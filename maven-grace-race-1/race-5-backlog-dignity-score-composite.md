# Race 5 Backlog: Dignity Score Composite Metric

**Priority:** P0 — Core to the 90-Day North Star  
**Origin:** Race 4 post-race suggestion, approved by Tim  
**Date:** 2026-03-21  

---

## What It Is

The Dignity Score is a single composite number (0–100) that aggregates every financial dimension Maven/Grace tracks into one "how am I doing?" metric for Ruby Red. It is the heartbeat of the 90-Day Journey — the number that proves "it's expensive to be poor" is a solvable problem, not a life sentence.

## Why It Matters

Ruby Red is cognitively overloaded. She doesn't need five dashboards — she needs one number that tells her she's winning. The Dignity Score gives her that. It also gives the SIC Solve Team the single KPI to optimize against: **100% financial lift in 90 days**.

## Dimensions and Weights

The score is calculated from five weighted dimensions, each scored 0–20:

| Dimension | Weight | Source Data | Scoring Logic |
|---|---|---|---|
| **Vampire Slayer** | 20 pts | Subscriptions cancelled, annual savings | 0 = no audits done; 20 = 3+ vampires slain, $500+/yr saved |
| **NSF Shield** | 20 pts | Bills tracked, NSF fees avoided, on-time payments | 0 = no bills tracked; 20 = all bills tracked, zero NSF risk flags |
| **Budget Mastery** | 20 pts | Budget entries, income vs. expense gap | 0 = no budget; 20 = budget balanced, surplus identified |
| **Milk Money Trust** | 20 pts | Trust score from Milk Money system | Direct map: trustScore / 5 (0–100 → 0–20) |
| **Engagement** | 20 pts | Grace conversations, journey milestones completed | 0 = inactive; 20 = daily engagement, 8+ milestones hit |

**Total: 0–100 points**

## Tier Labels

| Score Range | Label | Grace's Tone |
|---|---|---|
| 0–19 | Starting Out | "We're just getting started, and that's okay. I'm right here." |
| 20–39 | Building Momentum | "Look at you go. Every step counts." |
| 40–59 | Finding Your Stride | "You're doing the hard work. I see it." |
| 60–79 | Standing Tall | "Girl, you are crushing it. Don't you dare stop." |
| 80–100 | Dignity Achieved | "You did it. You proved them all wrong. I'm so proud of you." |

## Implementation Plan

### Database

Add a `dignity_scores` table to track daily snapshots:

- `id` (auto-increment)
- `profileId` (FK to grace_person_profiles)
- `score` (int, 0–100)
- `vampireSlayerScore` (int, 0–20)
- `nsfShieldScore` (int, 0–20)
- `budgetMasteryScore` (int, 0–20)
- `milkMoneyTrustScore` (int, 0–20)
- `engagementScore` (int, 0–20)
- `calculatedAt` (timestamp)

### Backend

- `calculateDignityScore(profileId)` — server-side function that queries all five dimensions and returns the composite
- `milkMoney.getAccount` already returns `trustScore` — reuse it
- `subscriptions.getAll` + filter cancelled — count vampires slain
- `bills.getAll` — count tracked, check NSF risk flags
- `budget.getEntries` — check if income > expenses
- `journey.getMilestones` + `conversation.getHistory` — engagement metrics

### Frontend

- New card on the Financial Impact Dashboard showing the Dignity Score as a radial progress ring
- Breakdown accordion showing each dimension's contribution
- Historical chart (line graph) showing score over time — the 90-day climb
- Grace commentary that changes based on score tier

### Grace Integration

- Grace references the Dignity Score in conversation: "Your Dignity Score went up 8 points this week!"
- Grace celebrates milestones: crossing 50, crossing 80, hitting 100
- Grace uses the score to prioritize advice: lowest-scoring dimension gets attention first

## Spirit Check

This feature exists to prove the North Star: **90-day 100% financial lift**. If the Dignity Score doesn't make Ruby Red feel like she's winning — if it feels like a report card instead of a celebration — it's wrong. The score must always be framed as progress, never as judgment.
