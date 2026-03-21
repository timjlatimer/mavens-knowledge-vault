# Race 5 Backlog: The Promises to Keep (PTK) Genie

**Priority:** P0 — Foundational Service (Non-Negotiable Universal, AI Score 100)  
**Origin:** Tim's directive (Race 4 debrief, 2026-03-21) + PTK Two-Version Architecture + Maven Service Registry  
**Status:** Living document — open for improvement  
**Date:** 2026-03-21  

---

## What It Is

The Promises to Keep Genie is Grace's hyper-accountability engine. It tracks promises in **both directions** — promises Ruby Red has made to others, and promises others have made to her — and nudges her toward keeping them. Payments are just one category of promise. The Genie also tracks commitments to her kids, goals she sets with Grace, deadlines she mentions in conversation, and obligations others owe her that she's too tired or too polite to follow up on.

This is the Trojan Horse PTK [1] adapted for Ruby Red's world inside Maven Grace. It is listed as service #3 in the Maven 143 registry with an AI Score of 100 and is classified as **NON-NEGOTIABLE UNIVERSAL** — included at every tier, including free [2].

## Why It Matters

Ruby Red is drowning in cognitive load. She has a dozen promises swirling in her head at any given moment — the $20 she owes her sister, the school form she said she'd sign, the dentist appointment she promised the kids, the friend who said she'd pay her back last Friday and never did. She doesn't need another to-do app. She needs a friend who remembers everything and gently keeps her on track — and who also remembers what the world owes *her*.

The bidirectional nature is critical. Ruby Red is used to being the one who gives, who accommodates, who lets things slide when others break their word. The PTK Genie doesn't just hold Ruby accountable — it holds the world accountable to Ruby. When her landlord promised to fix the faucet and didn't, the Genie remembers. When her ex said he'd pick up the kids on Saturday and ghosted, the Genie remembers. This is empowerment through memory.

## The Two Directions

### Direction 1: Promises Ruby Has Made

These are commitments Ruby has expressed — to Grace, to her kids, to her employer, to herself. They fall into categories:

| Category | Examples | Detection Source |
|---|---|---|
| **Financial** | Milk Money repayment, bill due dates, money owed to family | Milk Money system, Bill Tracker, Grace conversation |
| **Parenting** | School events, doctor appointments, extracurricular commitments | Grace conversation |
| **Personal Goals** | "I'm going to start walking every morning," "I want to save $50 this month" | Grace conversation |
| **Household** | "I need to call the landlord about the leak," "I said I'd bring cookies to the potluck" | Grace conversation |
| **Work** | "I told my boss I'd cover the Saturday shift" | Grace conversation |

### Direction 2: Promises Made to Ruby

These are commitments others have made to Ruby that she deserves to have honored:

| Category | Examples | Detection Source |
|---|---|---|
| **Financial** | Friend who owes her money, employer who promised a raise, tax refund expected | Grace conversation |
| **Services** | Landlord repair promises, utility company commitments, government benefit timelines | Grace conversation, Bill Tracker |
| **Relationships** | Co-parent custody commitments, family promises, friend commitments | Grace conversation |
| **Institutional** | Benefits office callbacks, school follow-ups, medical appointment confirmations | Grace conversation |

## Promise Detection: Casual Comment vs. Real Commitment

Not everything Ruby says is a promise. The Genie must distinguish between casual remarks and genuine commitments. This is where the grading system comes in.

### The Commitment Confidence Score

When Grace detects language that sounds like a commitment, the Genie assigns a **Commitment Confidence Score** (0–100) based on several signals:

| Signal | Weight | Examples |
|---|---|---|
| **Explicit commitment language** | High (30 pts) | "I promise," "I will," "I'm going to," "I committed to," "I told them I would" |
| **Specificity** | High (25 pts) | Named person, specific date/time, concrete action vs. vague aspiration |
| **Repetition** | Medium (20 pts) | Mentioned more than once across conversations — indicates it's real, not passing |
| **Emotional weight** | Medium (15 pts) | Tone of obligation, guilt, anxiety, or determination detected in context |
| **External accountability** | Low (10 pts) | Someone else is expecting this — a boss, a child, a friend |

**Scoring thresholds:**

| Score | Classification | Genie Action |
|---|---|---|
| 80–100 | **Hard Commitment** | Tracked immediately, due date assigned, nudge schedule activated |
| 50–79 | **Soft Commitment** | Noted in memory, Grace may casually reference it later to test if it's real |
| 20–49 | **Aspiration** | Stored as a goal seed, not tracked as a promise — may feed into Destiny Discovery |
| 0–19 | **Casual Remark** | Ignored by the Genie, stored only in conversation history |

The key insight: Grace doesn't ask Ruby "is this a promise?" That would feel like a bureaucratic form. Instead, Grace uses the confidence score internally and adjusts her behavior accordingly. A hard commitment gets a nudge. A soft commitment gets a gentle callback. An aspiration gets woven into the Destiny Discovery journey.

## The Adaptive Nudge Psychology

This is the heart of Tim's directive: **the Genie mirrors Ruby's energy level.** If she nudges up, the Genie nudges up. If she nudges away, the Genie backs off until it finds grip. The goal is to turn promise-keeping into routine without overwhelming her.

### The Willingness Meter

The Genie maintains an internal **Willingness Meter** (0–100) for each user, updated continuously based on Ruby's behavior:

| Behavior | Willingness Impact |
|---|---|
| Ruby completes a promise on time | +10 |
| Ruby responds positively to a nudge ("thanks for reminding me") | +5 |
| Ruby asks Grace to remind her about something | +8 |
| Ruby ignores a nudge (no response) | -3 |
| Ruby explicitly pushes back ("not now," "stop reminding me") | -10 |
| Ruby dismisses a tracked promise ("forget about that") | -5 |
| Ruby completes a promise she wasn't nudged about | +15 (self-motivated = high willingness) |

### Nudge Intensity Levels

The Willingness Meter determines how aggressively the Genie nudges:

| Willingness Range | Nudge Level | Grace's Behavior |
|---|---|---|
| **80–100: Fully Engaged** | Full nudge | Daily briefing of promises, proactive reminders, celebration on completion, "what else can we tackle?" energy |
| **60–79: Warming Up** | Active nudge | Reminders for hard commitments only, gentle callbacks on soft ones, no pressure on aspirations |
| **40–59: Neutral** | Light touch | Only remind on hard commitments with approaching due dates, weave others into conversation naturally |
| **20–39: Pulling Back** | Minimal | Only critical reminders (Milk Money payments, bills about to cause NSF), everything else goes quiet |
| **0–19: Disengaged** | Dormant | No nudges at all. Grace waits. When Ruby re-engages on any topic, the Genie slowly reactivates with one small, easy win |

The critical principle: **the Genie never gives up, but it knows when to be quiet.** When Ruby is at 0–19, the Genie is dormant — not dead. It's watching for any signal of re-engagement. The moment Ruby comes back to Grace for anything — even just to chat — the Genie looks for one small, achievable promise to reactivate the loop. Maybe it's "you mentioned wanting to call your mom last week — did you get to do that?" Something small. Something that feels like caring, not nagging.

### The Grip Mechanism

Tim's phrase was "until it can get some grip and get going." The grip mechanism works like this:

1. **First grip:** Ruby completes one small promise after a period of disengagement. The Genie celebrates quietly ("Hey, you did that thing you said you'd do. That's awesome.")
2. **Second grip:** Ruby responds positively to a follow-up. The Genie adds one more tracked item — still small.
3. **Third grip:** Ruby is now completing 2–3 promises per week. The Genie gradually increases to active nudge level.
4. **Routine established:** After 2–3 weeks of consistent engagement, the Genie is at full nudge. Promise-keeping has become routine.

If Ruby slips again, the cycle resets gracefully. No judgment. No "you fell off the wagon." Just quiet patience and a small, easy win when she's ready.

## The Repayment Genie as a Subsystem

The Repayment Genie (specced separately in `race-5-backlog-repayment-genie.md`) is a **subsystem** of the PTK Genie. Financial promises — specifically Milk Money repayments — are one category of promise that the PTK Genie tracks. The Repayment Genie handles the specialized logic of payment splitting, cascading, and bank harmonization, while the PTK Genie provides the nudge psychology and willingness tracking that governs how aggressively those payment reminders are delivered.

The relationship:

> PTK Genie (parent) → tracks all promises, manages willingness, controls nudge intensity  
> Repayment Genie (child) → handles Milk Money payment mechanics, cascade splits, bank harmonization  
> Grace Nudges (sibling) → delivers the actual messages based on PTK Genie's willingness assessment

## Implementation Plan

### Database

**`promises`** — the core promise tracking table:

| Column | Type | Description |
|---|---|---|
| `id` | auto-increment | Primary key |
| `profileId` | FK | Ruby's profile |
| `direction` | enum | 'made_by_ruby' or 'made_to_ruby' |
| `category` | enum | 'financial', 'parenting', 'personal_goal', 'household', 'work', 'relationship', 'institutional' |
| `description` | text | What the promise is |
| `toWhom` | text | Who the promise is to/from (nullable) |
| `confidenceScore` | int (0–100) | Commitment confidence at detection time |
| `classification` | enum | 'hard', 'soft', 'aspiration', 'casual' |
| `dueDate` | timestamp | When it's due (nullable for open-ended) |
| `status` | enum | 'active', 'completed', 'missed', 'cancelled', 'expired' |
| `completedAt` | timestamp | When completed (nullable) |
| `sourceConversationId` | FK | The conversation where it was detected |
| `createdAt` | timestamp | When the Genie detected it |

**`willingness_scores`** — tracks Ruby's engagement level over time:

| Column | Type | Description |
|---|---|---|
| `id` | auto-increment | Primary key |
| `profileId` | FK | Ruby's profile |
| `score` | int (0–100) | Current willingness level |
| `lastUpdated` | timestamp | When the score last changed |

**`nudge_log`** — tracks what nudges were sent to prevent duplicates and measure effectiveness:

| Column | Type | Description |
|---|---|---|
| `id` | auto-increment | Primary key |
| `promiseId` | FK | Which promise this nudge is about |
| `profileId` | FK | Ruby's profile |
| `nudgeType` | enum | 'reminder', 'celebration', 'callback', 'reactivation' |
| `message` | text | What Grace said |
| `response` | enum | 'positive', 'neutral', 'negative', 'ignored' (nullable) |
| `sentAt` | timestamp | When the nudge was delivered |

### Backend

The PTK Genie operates as a background intelligence layer within Grace's conversation system:

**Promise Detection (in Grace's LLM pipeline):** After every Grace conversation turn, the response is analyzed for commitment-like language. Detected promises are scored and stored. This runs as a post-processing step — it does not slow down Grace's response.

**Willingness Engine:** A service that maintains the willingness score based on Ruby's interactions with the Genie. Updated after every nudge response (or non-response).

**Nudge Scheduler:** A daily job that evaluates all active promises against their due dates and the user's willingness level, then generates appropriate ambient messages or conversation context for Grace.

**Promise Briefing:** A tRPC endpoint that returns Ruby's current promise landscape — what she owes, what's owed to her, what's coming due, what she's completed recently. This feeds the UI and Grace's conversation context.

### Frontend

The PTK Genie does not need a dedicated page initially. Its primary interface is Grace herself. However, a "My Promises" view could be added later showing:

- Active promises (both directions) with due dates and status
- Completed promises (celebration history)
- Willingness score (shown as "Your momentum" or similar non-clinical language)
- "Promises others owe you" section — empowering Ruby to track what she's owed

### Grace Integration

Grace is the PTK Genie's voice. The Genie never speaks directly — everything comes through Grace's personality:

**Promise detection in conversation:**
> Ruby: "I told my sister I'd help her move on Saturday."  
> Grace (internally): Commitment confidence 85 — hard commitment. Person: sister. Date: Saturday. Category: relationship.  
> Grace (aloud): "That's sweet of you. Saturday — got it. I'll make sure you remember."

**Nudge delivery:**
> Grace: "Hey, quick thing — you mentioned helping your sister move tomorrow. Still on? I can remind you in the morning too if you want."

**Bidirectional tracking:**
> Ruby: "My landlord said he'd fix the sink two weeks ago and nothing."  
> Grace (internally): Promise made TO Ruby. Person: landlord. Category: institutional. Status: overdue.  
> Grace (aloud): "Two weeks? That's not okay. Want me to help you draft a follow-up message? Sometimes putting it in writing gets things moving."

**Celebration:**
> Grace: "You did it! You helped your sister move AND you paid your Milk Money on time this week. Two promises kept. You're on a roll, girl."

## Relationship to Destiny Discovery

Aspirations that score below the commitment threshold (20–49) are not tracked as promises — they are seeds. These seeds feed into the Destiny Discovery system (specced separately). When Ruby says "I've always wanted to go back to school" or "I wish I could start my own business," the PTK Genie doesn't nag her about it. Instead, it passes the insight to the Destiny Discovery engine, where Grace weaves it into the larger journey of helping Ruby find her North Star.

The two systems are complementary: PTK handles the **tactical** (keep your promises today), while Destiny Discovery handles the **strategic** (discover your purpose for tomorrow).

## Spirit Check

The PTK Genie is not a task manager. It is not a nagging app. It is the friend who remembers what you said you'd do — and also remembers what the world said it would do for you. It mirrors Ruby's energy because real friends don't push when you're drowning. They wait. They watch. And when you're ready, they hand you the next small thing you can succeed at. That's how trust is built. That's how routine is formed. That's how Ruby Red goes from overwhelmed to empowered.

> "The two most important days in your life are the day you are born and the day you find out why." — Mark Twain

The PTK Genie handles the days in between.

---

## Vault References

[1] `knowledge-base/ptk_two_versions.md` — PTK Two-Version Architecture  
[2] `knowledge-base/maven_143_services_complete.md` — Maven Service Registry (PTK = Service #3, AI Score 100)  
[3] `knowledge-base/maven_service_registry.md` — PTK classified as NON-NEGOTIABLE UNIVERSAL  
[4] `race-5-backlog-repayment-genie.md` — Repayment Genie (PTK subsystem for Milk Money payments)  
[5] `race-5-backlog-grace-milkmoney-nudges.md` — Grace Nudges (PTK sibling for message delivery)  
