# Race 5 Backlog: Grace Proactive Milk Money Repayment Nudges

**Priority:** P1 — High Value (trust-building loop accelerator)  
**Origin:** Race 4 post-race suggestion, approved by Tim  
**Date:** 2026-03-21  

---

## What It Is

Grace proactively reaches out to Ruby Red when a Milk Money repayment is approaching, due, or overdue — not as a collections agent, but as the friend who says "hey, just a heads up." When Ruby pays on time, Grace celebrates immediately, reinforcing the trust-building loop that graduates her through Rookie → Regular → Trusted → Elite.

## Why It Matters

The Milk Money trust progression only works if Ruby actually repays on time. But Ruby is cognitively overloaded — she's not going to remember a 14-day due date while juggling groceries, kids, and a flat tire. Grace remembers for her. This is the "Big Mama effect" applied to financial behavior: someone who cares enough to remind you, and celebrates when you do the right thing.

The trust score system already rewards on-time repayment (+10) and penalizes late repayment (-15). The asymmetry is intentional — it's harder to rebuild trust than to build it. Grace's nudges exist to keep Ruby on the +10 side of that equation.

## Nudge Schedule

| Trigger | Timing | Grace's Message Tone | Channel |
|---|---|---|---|
| **3-Day Warning** | 3 days before due date | Gentle reminder, warm | Ambient message + chat |
| **Due Day** | Day of due date | Encouraging, "today's the day" | Ambient message + chat |
| **1-Day Overdue** | 1 day after due date | Concerned friend, no judgment | Ambient message |
| **3-Day Overdue** | 3 days after due date | Empathetic but direct | Ambient message |
| **On-Time Repayment** | Immediately on repay (before due) | Full celebration, pride | Chat + toast + confetti |
| **Late Repayment** | Immediately on repay (after due) | Relief + encouragement | Chat + toast |
| **Tier Upgrade** | When trust score crosses threshold | Major celebration | Chat + toast + animation |

## Message Examples

**3-Day Warning:**
> "Hey [name], just a friendly heads up — you've got a Milk Money repayment of $[amount] coming up in 3 days. No stress, just didn't want it to sneak up on you. You've got this."

**Due Day:**
> "Today's the day, [name]! Your $[amount] Milk Money repayment is due. Paying on time bumps your trust score up — you're [X] points away from [next tier]. Let's do this!"

**1-Day Overdue (empathetic, never punitive):**
> "Hey [name], your $[amount] repayment was due yesterday. Life happens — I get it. If you can get to it today, your trust score stays strong. If things are tight, talk to me. We'll figure it out."

**On-Time Celebration:**
> "YES! [name], you paid on time! Your trust score just went up to [score]. You're [X] points away from becoming a [next tier] member — that means your credit limit goes up to $[limit]. I'm so proud of you."

**Tier Upgrade:**
> "[name]!! You just leveled up to [tier]! Your new credit limit is $[limit]. You earned this. Every on-time payment got you here. The village believes in you."

## Implementation Plan

### Backend: Scheduled Nudge Job

Create a server-side cron job (or tRPC procedure triggered by a scheduler) that runs daily:

1. Query all `milkMoneyTransactions` where `type = 'borrow'` and `repaidAt IS NULL`
2. For each outstanding borrow, calculate days until/since `dueDate`
3. Generate appropriate ambient message based on the nudge schedule
4. Insert via `addAmbientMessage(profileId, message, category: 'milk_money_nudge')`
5. Deduplicate: don't send the same nudge type for the same transaction twice (track in a `nudges_sent` column or separate table)

### Backend: Immediate Celebration on Repay

The existing `milkMoney.repay` endpoint already calculates trust score changes. Extend it to:

1. After successful repay, generate a celebration ambient message
2. If tier upgraded, generate the tier upgrade message
3. Return `celebrationMessage` in the response so the frontend can show it immediately

### Frontend: Ambient Message Display

The ambient message system already exists. Extend it to:

1. Show Milk Money nudges with a distinct icon (piggy bank or coin)
2. Include a "Repay Now" quick-action button on reminder nudges
3. Show celebration messages with confetti animation on the on-time and tier-upgrade nudges

### Grace Chat Integration

When Ruby opens a conversation with Grace and has an upcoming or overdue repayment, Grace should naturally weave it into conversation:

- Add repayment context to Grace's system prompt when building conversation context
- Grace mentions it conversationally, not as a script — "Oh, by the way, you've got that $15 coming up on Thursday. Just wanted to make sure it's on your radar."

### Database Changes

Add a `milk_money_nudges` table to track sent nudges and prevent duplicates:

- `id` (auto-increment)
- `transactionId` (FK to milkMoneyTransactions)
- `profileId` (FK to grace_person_profiles)
- `nudgeType` (enum: '3day_warning', 'due_day', '1day_overdue', '3day_overdue', 'on_time_celebration', 'late_repay', 'tier_upgrade')
- `sentAt` (timestamp)

## Spirit Check

Grace is not a collections agent. She is not a bank. She is the friend who cares enough to remind you, and celebrates when you do the right thing. Every nudge must pass the "would Big Mama say this?" test. If it sounds like a bank letter, it's wrong. If it sounds like your best friend texting you, it's right.

The asymmetry in the trust score (+10 on-time, -15 late) is already built to motivate on-time behavior. Grace's nudges are the empathetic layer on top of that mechanism — they exist to help Ruby stay on the winning side of the equation, not to punish her when she doesn't.
