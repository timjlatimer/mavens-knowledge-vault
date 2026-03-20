# Grace's Relationship Intelligence: The "Big Mama" Memory Architecture

## Learning Loop v13 — Synthesis Report

**Author:** Manus AI | **Date:** March 13, 2026 | **For:** SIC HB1000 Solve Team

---

## The Naming Question

The industry uses terms like "user memory," "context personalization," and "agent memory layer." None of those capture what Grace needs to be. The frontline workers in the 10 Questions survey didn't describe a memory system — they described a **relationship**. They described knowing someone's dog's name, remembering their surgery date, following up on their kid's birthday party, being the shoulder to cry on.

The best name for this system is **"Grace's Relationship Memory"** — because it's not about storing data, it's about maintaining relationships. In the admin UI, the page should be called **"People Grace Knows"** — because that's what it is. Not a CRM. Not a case file. A living, breathing understanding of every person Grace has ever talked to.

---

## What the Frontline Workers Taught Us

Fifteen people with up to 20 years of experience serving Ruby Red answered 10 questions. The patterns that emerged are the blueprint for Grace's relationship intelligence.

### The Things They Remember

Every single respondent described the same core practice: **remembering the human details and bringing them back up naturally in the next conversation**. The table below captures the specific categories of personal details these frontline workers track.

| Category | What They Remember | How They Use It |
|---|---|---|
| **Names** | Client's name, spouse, children, pets, grandchildren | "Knowing who they are when they walk in" — using their name immediately builds trust |
| **Health events** | Surgeries, hospital stays, chronic conditions, mental health | "How was your surgery?" or "Is your dog okay now?" — following up shows genuine care |
| **Life milestones** | Birthdays, babies born, graduations, job changes | "Babies and Grandbabies being born — always ask what they had or when they are due" |
| **Hobbies and interests** | Sports teams, favorite seasons, travel plans, activities | "If they went to a baseball game, follow up on that story" |
| **Emotional state** | Stress levels, anxiety, grief, celebration | "Understanding if they're stressed or anxious, slowing down for them" |
| **Communication preferences** | How they like to be contacted — email, text, call | "How they like to be communicated with when not in branch" |
| **Previous conversations** | What was discussed last time, unresolved issues | "Remembering THEM — the past conversations, follow up" |

### The "Secret Weapons"

When asked what single thing has the biggest impact, the answers converged on five practices that Grace must embody.

**Listening without judgment.** Respondent 1 said it best: "Understanding without judgement, leading with a servant heart." Respondent 6 shared her own stories of growing up "poor as a church rat" to create connection. Grace must never judge — she must listen, acknowledge, and meet people where they are.

**Remembering and following up.** Respondent 5 captured the essence: "First and foremost is knowing who they are when they come in and after that is how was your surgery, or is your dog okay now? Whatever it is that you were told last time they were in." This is the core of relationship memory — not just storing facts, but actively bringing them back into conversation.

**Making the uncomfortable comfortable.** Respondent 2 described how clients come in "very tentative about borrowing from us (loan sharks)" and by the end "they always say thank you so much, I was so scared to come in here and borrow but you made it feel okay." Grace must normalize the experience of needing help.

**The "not today but not never" reframe.** Every single respondent described the same technique for handling rejection: reframing "no" as "not yet." Respondent 5: "I never say you have been declined; I always say your application has been declined." Grace must always leave the door open.

**Being the connector.** Multiple respondents described connecting clients to food banks, job fairs, community resources, women's shelters, and even finding someone a job because they "knew someone who was hiring in the same town." Grace must be a bridge to resources, not just a conversation partner.

### The Superpower Wishes

When asked what a perfect digital assistant would do, the frontline workers described Grace's future capabilities.

| Wish | Respondent | Grace Implementation |
|---|---|---|
| "Someone who can listen" | R1 | Grace already does this — but must get better at active listening cues |
| "Check in every couple of weeks" | R2 | Proactive outreach based on relationship memory — "It's been 2 weeks, how are you?" |
| "Small bouquet of flowers or grocery card on birthdays" | R2 | Birthday tracking + automated gift/gesture system |
| "Wake up call daily, reminder to take medication" | R2 | Daily care reminders based on known health needs |
| "Delivery of food" | R6 | Connect to food delivery resources, food banks, hamper programs |
| "Remind them of appointments" | R6 | Appointment tracking and reminders for elderly clients |
| "Toilet paper and weekly food package" | R12 | The literal "toilet paper moment" — essentials delivery |
| "Budgeting, emotional/mental health/crisis support" | R14 | Financial literacy tools + crisis resource connections |
| "Give hope and encouragement, set a plan, act and follow-through" | R15 | Proactive goal-setting and accountability partnership |

---

## Architecture: Grace's Relationship Memory

Drawing from the research (Decagon's user memory, OpenAI's context engineering, Mem0's graph memory, social work genograms) and the frontline wisdom above, Grace's Relationship Memory is built on three layers.

### Layer 1: The Structured Profile (The Genogram)

Inspired by social work genograms, this is the factual foundation — the things Grace knows for certain about a person. These are extracted automatically from conversations and confirmed over time.

**Person Profile Fields:**

| Field | Type | Source | Example |
|---|---|---|---|
| Display name | Text | Extracted from conversation | "Maria" |
| Full name | Text | Confirmed over time | "Maria Elena Rodriguez" |
| Preferred name | Text | How they introduce themselves | "Mari" |
| Date of birth | Date | Mentioned in conversation | "March 15, 1989" |
| City/area | Text | Geo-detection + conversation | "Saskatoon, SK" |
| Communication preference | Enum | Asked or inferred | "Prefers text over calls" |
| Emotional baseline | Text | Observed over time | "Generally optimistic but stressed about finances" |
| Primary language | Text | Detected | "English" |
| Household size | Number | Mentioned | 4 |
| Employment status | Text | Mentioned | "Part-time at Walmart" |
| First contact date | Timestamp | System | "2026-01-15" |
| Last contact date | Timestamp | System | "2026-03-10" |
| Total conversations | Number | System | 12 |
| Mood trend | Text | Analyzed over time | "Improving — less stressed than 3 months ago" |

### Layer 2: The Family Graph (The Ecomap)

Inspired by social work ecomaps, this maps the person's world — who they're connected to, what resources they use, what organizations matter to them.

**Relationship Types:**

| Relationship | What Grace Tracks | Example |
|---|---|---|
| Child | Name, age, school, activities, health | "Jayden, age 8, plays soccer, had a science fair last month" |
| Partner/Spouse | Name, employment, relationship quality | "Marcus, works construction, supportive" |
| Parent | Name, age, health, living situation | "Mom Rosa, 67, lives alone, has diabetes" |
| Pet | Name, type, health | "Buddy, golden retriever, had surgery in January" |
| Employer | Company, role, stability | "Walmart, cashier, part-time, been there 6 months" |
| Community resource | Organization, what they provide | "Uses Saskatoon Food Bank, goes monthly" |
| Healthcare provider | Doctor, clinic, ongoing treatment | "Dr. Patel at City Clinic, managing blood pressure" |

### Layer 3: The Unstructured Notes (The Conversation Memory)

Inspired by OpenAI's context engineering pattern, these are free-form observations that Grace captures during conversations and consolidates into the person's profile.

**Note Categories:**

| Category | Example | How Grace Uses It |
|---|---|---|
| Life event | "Car broke down, needs $800 for repair" | Follows up: "Did you get the car fixed?" |
| Emotional moment | "Cried when talking about rent — very stressed" | Approaches next conversation gently |
| Stated preference | "Doesn't like being called in the morning" | Respects communication preferences |
| Goal | "Wants to save enough for kids' school supplies by September" | Tracks progress: "How's the school supply fund going?" |
| Resource connection | "Referred to food bank on 22nd St" | Follows up: "Did the food bank work out?" |
| Celebration | "Paid off her loan — first time in 3 years" | Celebrates: "I remember when you paid off that loan — that was huge!" |
| Concern | "Mentioned son is struggling in school" | Gently asks: "How's Jayden doing in school?" |
| Proactive idea | "Back-to-school season coming — last year she struggled with supplies" | Reaches out: "It's almost back-to-school time — want me to look into what's available?" |

---

## Memory Lifecycle

The memory lifecycle follows the pattern established by OpenAI's context engineering cookbook, adapted for Grace's relationship-first approach.

**Before each conversation**, Grace loads the person's complete profile into her working memory. This includes their structured profile, family graph, recent notes, mood trend, and any pending follow-ups. This is injected into the system prompt as structured context.

**During the conversation**, Grace actively listens for new facts, emotional shifts, life events, and relationship updates. She captures these as candidate notes in real-time using LLM extraction after each message exchange.

**After the conversation**, a consolidation job runs that merges new facts into the person's profile, resolves conflicts (if someone's employment changed, update it), deduplicates notes, and updates the mood trend. If Grace detected a new family member, resource need, or life event, it gets added to the appropriate layer.

**Between conversations**, Grace's proactive engine scans for follow-up opportunities: birthdays coming up, unresolved concerns from last conversation, seasonal needs (back-to-school, winter heating), and check-in intervals based on the person's emotional state.

---

## The "Big Mama" Differentiator

What makes Grace different from a CRM, a case management system, or a standard AI chatbot is captured in five behaviors that the frontline workers demonstrated naturally.

**She doesn't just store — she uses.** A CRM stores "client has 2 children." Grace says "How did Jayden's science fair project go? And is little Sofia still loving her dance class?" The information is woven naturally into conversation, not displayed in a dashboard.

**She connects dots across conversations.** When Maria mentions her car broke down in January and then mentions she's been late to work in February, Grace connects those dots: "Is the car situation still causing problems with getting to work? I know that was stressing you out."

**She's proactive, not reactive.** Grace doesn't wait to be asked. She reaches out: "Hey Maria, it's almost back-to-school time. Last year you mentioned school supplies were tough. Want me to look into what programs are available in your area this year?"

**She tracks emotional arcs, not just facts.** Grace knows that Maria was very stressed in January (car broke down, behind on rent), started feeling better in February (got a small raise), and was cautiously optimistic in March. This emotional trajectory informs how Grace approaches each conversation.

**She remembers what matters to the person, not what matters to the system.** The frontline workers didn't remember account numbers or loan balances. They remembered dog names, surgery dates, kids' activities, and favorite sports teams. Grace prioritizes the same things.

---

## Database Design

The database design uses five core tables that map to the three layers described above, plus supporting tables for the memory lifecycle.

### Core Tables

**`grace_person_profiles`** — The structured profile (Layer 1). One row per person Grace knows. Links to the user table if they have an account, but also tracks people Grace has met through signup conversations who haven't created accounts yet.

**`grace_family_connections`** — The family graph (Layer 2). Each row represents a relationship between a person and someone/something in their world. Supports the genogram/ecomap model.

**`grace_person_notes`** — The unstructured notes (Layer 3). Free-form observations captured during conversations, categorized and timestamped. Includes a "consolidated" flag for the memory lifecycle.

**`grace_person_followups`** — Pending follow-up items. When Grace detects something she should ask about next time, it goes here. Includes a due date and priority.

**`grace_person_interactions`** — A lightweight log of every conversation Grace has with a person. Links to the conversation transcript but stores summary, mood detected, and key topics for quick reference.

### How It Connects

The person profile links to the existing `users` table via an optional `userId` field. This means Grace can track people she's met through the signup conversation (who don't have accounts yet) and people who are registered members. When a signup conversation person later creates an account, the profile merges automatically.

---

## Phased Implementation

**Phase 1 (This Build):** Database schema, auto-extraction from conversations, profile injection into system prompt, admin "People Grace Knows" view.

**Phase 2 (Next Sprint):** Proactive follow-up engine, birthday/milestone tracking, seasonal need detection, check-in scheduling.

**Phase 3 (Future):** Family graph visualization (genogram-style), emotional arc charting, cross-person pattern detection ("12 families in Saskatoon mentioned heating costs this month").

---

## References

[1] Decagon, "User Memory: Persistent context that makes every interaction feel personal," https://decagon.ai/blog/user-memory, 2026.

[2] OpenAI, "Context Engineering for Personalization," OpenAI Cookbook, https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization/, 2026.

[3] Mem0, "Graph Memory for AI Agents," https://mem0.ai/blog/graph-memory-solutions-ai-agents, January 2026.

[4] Social Work Portal, "Best Social Work Genogram Guide," https://www.socialworkportal.com/genogram-social-work/, 2024.

[5] Machine Learning Mastery, "The 6 Best AI Agent Memory Frameworks," https://machinelearningmastery.com/the-6-best-ai-agent-memory-frameworks-you-should-try-in-2026/, March 2026.
