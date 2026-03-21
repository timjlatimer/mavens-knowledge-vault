# Race 5 Backlog: The Repayment Genie

**Priority:** P0 — Core Milk Money Infrastructure  
**Origin:** Tim's directive (Race 4 debrief, 2026-03-21)  
**Status:** Living document — open for improvement  
**Date:** 2026-03-21  

---

## What It Is

The Repayment Genie is the intelligent payment orchestration engine behind Milk Money. It replaces the current simple "borrow and repay" model with a fully automated, bank-harmonized repayment schedule that splits payments across Ruby Red's actual paydays, cascades into smaller amounts when payments are missed, and never requires a human collector to chase a debt. No collections. No calls. No shame. The Genie handles it all.

## Why It Matters

Ruby Red doesn't miss payments because she's irresponsible. She misses payments because she's juggling too many due dates with too little money. The Repayment Genie solves this by doing what no bank or payday lender bothers to do: it learns her actual cash flow rhythm and harmonizes repayment with it. When she misses a payment, the Genie doesn't punish her — it adapts, splitting the amount into smaller bites she can actually swallow. This is the opposite of how the "greedy capitalist world" works, and that's the point.

## The Payment Routine

### Step 1: Bank Harmonization (at borrow time)

When Ruby Red requests a Milk Money loan, the Repayment Genie activates. Before funds are released, Ruby is asked to connect her bank account so the Genie can pull her 90-day transaction history. From this history, the Genie identifies:

- **Payday frequency:** Weekly (every Friday), biweekly, semi-monthly, or monthly
- **Payday amounts:** Average deposit amounts to understand capacity
- **Recurring obligations:** Rent, bills, subscriptions that hit before she has discretionary cash
- **Cash flow pattern:** When money comes in, when it goes out, and the window where repayment is least painful

The Genie does not guess. It knows. And it harmonizes the repayment schedule with Ruby's actual banking reality.

### Step 2: Initial Payment Split

The borrowed amount is split into **two equal payments** plus an **administration fee** on each payment. The admin fee covers Maven's operational cost for the Milk Money program.

**Example: $40 borrow**

| Payment | Principal | Admin Fee | Total | Due Date |
|---|---|---|---|---|
| Payment 1 | $20.00 | $2.50 | $22.50 | Next payday (e.g., Friday Mar 28) |
| Payment 2 | $20.00 | $2.50 | $22.50 | Following payday (e.g., Friday Apr 4) |

The due dates are always aligned to Ruby's actual paydays as identified by the bank harmonization step. If she's paid weekly, payments land on consecutive Fridays. If biweekly, they land on consecutive pay periods.

### Step 3: The Cascade (Missed Payment Protocol)

This is where the Genie earns its name. When a payment is missed, the Genie does not escalate, threaten, or report. It **cascades** — splitting the missed amount into smaller, more manageable pieces.

**Cascade Level 1 — First miss:**
The missed $20 principal is split in half. Two new payments of $10 + $2.50 admin fee ($12.50 each) are scheduled on the next two paydays.

**Cascade Level 2 — Second miss:**
The missed $10 is split in half again. Two new payments of $5 + $2.50 admin fee ($7.50 each) are scheduled on the next two paydays.

**Cascade Level 3 — Third miss:**
The missed $5 is split in half again. Two new payments of $2.50 + $2.50 admin fee ($5.00 each) are scheduled on the next two paydays.

**Cascade Level 4 (floor):**
If the $2.50 principal is missed, the Genie evaluates whether one more split is viable or whether the minimum payment floor has been reached. At this level, the total payment ($2.50 + $2.50 = $5.00) is small enough that it should be recoverable within one or two pay cycles.

The full cascade for a $40 borrow looks like this:

| Cascade Level | Principal per Payment | Admin Fee | Total per Payment | Payments Remaining |
|---|---|---|---|---|
| **Original** | $20.00 | $2.50 | $22.50 | 2 |
| **Level 1** (miss) | $10.00 | $2.50 | $12.50 | 2 per missed payment |
| **Level 2** (miss) | $5.00 | $2.50 | $7.50 | 2 per missed payment |
| **Level 3** (miss) | $2.50 | $2.50 | $5.00 | 2 per missed payment |
| **Floor** | TBD by Genie | $2.50 | TBD | Until resolved |

### Step 4: Payday Nudge (Accelerated Repayment)

Every payday, the Repayment Genie checks in with Ruby through Grace:

> "Hey [name], it's payday! You've got $[remaining] left on your Milk Money. Want to pay a little extra today? Even $5 more gets you closer to having your full credit available again."

If Ruby pays more than the scheduled amount, the Genie applies the excess to principal and recalculates the remaining schedule. If she pays off the entire balance early, her full credit limit is immediately restored and her trust score gets a bonus.

### Step 5: Full Repayment → Credit Restored

The moment the loan balance hits zero — whether through scheduled payments, accelerated payments, or a lump sum — the Genie:

1. Restores Ruby's full credit limit for her current trust tier
2. Awards trust score points (on-time bonus if no cascades were triggered)
3. Triggers Grace to celebrate the payoff
4. Makes Ruby eligible to borrow again immediately

## Credit Reporting Stance

> "Your credit rating to third parties could be affected by this."

Maven does **not** report to credit bureaus. This is not credit reporting. However, the disclosure language acknowledges that third-party credit assessments could theoretically be affected. The Repayment Genie's trust score is internal to Maven only — it determines Ruby's Milk Money tier and credit limit within the Maven ecosystem, not her external credit score.

## Admin Fee Structure

The admin fee is a flat per-payment charge that covers Maven's operational costs for the Milk Money program. It is **not** interest. It does not compound. It is the same amount regardless of cascade level.

| Parameter | Value | Notes |
|---|---|---|
| Admin fee per payment | $2.50 (proposed) | Flat, non-compounding |
| Applied at every cascade level | Yes | Same fee whether paying $20 or $2.50 principal |
| Waived on accelerated payments | TBD | Genie could waive fee on voluntary extra payments as incentive |

The exact admin fee amount ($2.50 is the working number) should be validated against Maven's unit economics and Ruby Red's sensitivity. The fee must feel fair — not predatory. It should be clearly disclosed at borrow time.

## Activation Trigger

The Repayment Genie is **not** activated at subscription time. It only activates when Ruby Red actually requests a Milk Money loan. The workflow is:

1. Ruby subscribes to Maven (Observer, Essentials, or Plus)
2. Ruby uses Maven features (Grace, Vampire Slayer, Budget Builder, etc.)
3. Ruby needs emergency cash → requests Milk Money
4. **Repayment Genie activates:** bank connection, 90-day history pull, payday detection, payment schedule creation
5. Loan disbursed, Genie manages repayment from here

This is a separate workflow from the main subscription flow. It has its own onboarding (bank connection), its own UI (repayment schedule view), and its own Grace integration (payday nudges).

## Implementation Plan

### Database

New tables and columns needed:

**`milk_money_repayment_schedules`** — tracks the Genie's payment plan:
- `id`, `accountId`, `transactionId` (FK to the borrow transaction)
- `paymentNumber` (1, 2, 3...)
- `principalCents`, `adminFeeCents`, `totalCents`
- `dueDate` (aligned to detected payday)
- `cascadeLevel` (0 = original, 1 = first split, 2 = second split, etc.)
- `status` (enum: 'scheduled', 'paid', 'missed', 'cancelled')
- `paidAt` (timestamp, null until paid)

**`bank_connections`** — stores Ruby's bank link for harmonization:
- `id`, `profileId`
- `provider` (e.g., Plaid, manual)
- `paydayFrequency` (enum: 'weekly', 'biweekly', 'semimonthly', 'monthly')
- `paydayDayOfWeek` (0-6 for weekly/biweekly)
- `averagePayAmountCents`
- `connectedAt`, `lastSyncedAt`

### Backend

- `repaymentGenie.createSchedule(transactionId, bankConnection)` — generates the initial two-payment schedule aligned to paydays
- `repaymentGenie.handleMissedPayment(scheduleId)` — triggers cascade split
- `repaymentGenie.applyPayment(scheduleId, amountCents)` — processes a payment, handles overpayment
- `repaymentGenie.getSchedule(transactionId)` — returns current schedule state for UI
- `repaymentGenie.paydayCheck(profileId)` — daily job that checks if today is payday and sends nudge

### Frontend

- Repayment schedule view on Milk Money page showing upcoming payments, amounts, due dates
- Cascade visualization — show how missed payments split into smaller amounts
- "Pay Now" and "Pay Extra" buttons on each scheduled payment
- Bank connection flow (initially manual payday input, later Plaid integration)

### Grace Integration

- Grace knows the repayment schedule and weaves it into conversation naturally
- Payday nudge messages (see Grace Nudges spec)
- Celebration on each payment made, extra celebration on full payoff
- If cascade triggers, Grace is empathetic: "No worries — I've broken it into smaller pieces for you"

## Open Questions for Tim

1. **Admin fee amount:** Is $2.50 the right number? Should it scale with loan size?
2. **Cascade floor:** How many levels deep should the cascade go? Current spec goes to $2.50 principal — is there a minimum below which we write it off?
3. **Bank connection method:** Start with manual payday input (Ruby tells Grace when she gets paid) or go straight to Plaid/bank API integration?
4. **Write-off policy:** If Ruby reaches the cascade floor and still can't pay, what happens? Forgive the balance? Freeze the account? The spec currently has no collections — does that mean eventual write-off?
5. **Admin fee on accelerated payments:** Should we waive the fee when Ruby voluntarily pays extra as an incentive?

## Spirit Check

The Repayment Genie exists because "it's expensive to be poor" — and the traditional lending world makes it worse with late fees, compounding interest, and collections calls. The Genie does the opposite: when Ruby struggles, it makes the payments smaller, not the penalties bigger. No collectors. No shame. No credit bureau reporting. Just a system that adapts to her reality and helps her get back to zero. If the Genie ever feels like a bank, it's broken.
