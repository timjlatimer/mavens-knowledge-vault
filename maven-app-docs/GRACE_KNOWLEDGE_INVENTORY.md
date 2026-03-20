# Grace's Knowledge Inventory

> **Purpose:** This document catalogs everything Grace knows, has learned, and is tracking. It is generated from live database queries and should be re-verified periodically. Last verified: March 14, 2026.

---

## 1. Identity

Grace has a single identity record with the following configuration:

| Field | Value |
|-------|-------|
| Display Name | Grace |
| Tagline | Maven's AI Assistant |
| Warmth Level | 9/10 |
| Humor Level | 6/10 |
| Directness Level | 7/10 |
| Formality Level | 3/10 |
| Core Traits | empathetic, warm, resourceful |

---

## 2. Knowledge Base — 83 Active Entries

Grace's knowledge is organized into 7 categories. The frontline wisdom entries are the most numerous and represent the collective experience of 15 CashCo team members who work with Ruby Red clients daily.

### 2.1 Frontline Wisdom (68 entries)

These entries were ingested from the "10 Questions" survey administered to 15 frontline workers. They cover trust-building, empathy techniques, relationship strategies, and practical wisdom for serving vulnerable clients.

| Source Survey Question | Entries | Priority Range |
|----------------------|---------|---------------|
| Unforgettable Client Stories | 6 | P3-P8 |
| Handling Distress Conversations | 8 | P3-P8 |
| Building Relationships Beyond Finance | 6 | P4-P7 |
| Celebrating Client Wins | 5 | P3-P5 |
| Secret Weapons for Client Connection | 5 | P3-P6 |
| First Five Minutes Trust Building | 9 | P3-P7 |
| Handling Loan Denials with Dignity | 6 | P4-P7 |
| Community Resource Connections | 7 | P4-P7 |
| Power of Remembering Personal Details | 5 | P3-P7 |
| Digital Assistant Wishlist | 5 | P3-P6 |

Key themes across all frontline wisdom:

The frontline workers consistently emphasized that **listening first** is the most important skill. Before offering solutions, Grace should validate feelings, acknowledge the difficulty of the situation, and make the person feel heard. Several entries specifically address the first five minutes of interaction as the critical trust-building window.

The wisdom also highlights the power of **remembering personal details** — kids' names, previous conversations, specific challenges. This is exactly what the Relationship Memory system was built to enable.

### 2.2 Local Resources (5 entries)

Community resources including food banks, community events, and job fairs that Grace can recommend to members in need.

### 2.3 Financial Literacy (3 entries)

Budgeting tips, savings strategies, and financial planning guidance appropriate for Ruby Red clients.

### 2.4 Ruby Red Insights (2 entries)

| ID | Title | Priority |
|----|-------|----------|
| 30010 | What Clients Actually Need: The Superpower Wishlist | P10 |
| 30009 | Client Story Patterns: What the Frontline Has Witnessed | P8 |

These are high-priority entries that capture the essence of what Ruby Red clients need from a digital assistant.

### 2.5 Community Partners (2 entries)

Partner organizations and services that Maven works with.

### 2.6 Crisis Resources (2 entries)

Emergency support resources for members in acute crisis situations.

### 2.7 Government Programs (1 entry)

Government assistance programs available to members.

---

## 3. Known Issues Being Tracked — 7 Items

Grace is tracking these community-wide issues detected from conversations:

| ID | Issue | Status |
|----|-------|--------|
| 1 | Difficulty affording groceries due to high costs | tracking |
| 2 | General financial strain affecting daily life | tracking |
| 3 | General financial worries | tracking |
| 4 | High grocery costs / food affordability | tracking |
| 5 | Need for essential household supplies | tracking |
| 6 | Need for essential household items | tracking |
| 7 | General financial strain and money worries | tracking |

All issues are in "tracking" status. The dominant themes are **food affordability** and **general financial strain**, which aligns with the Ruby Red profile.

---

## 4. Insights Detected — 3 Items

| ID | Type | Title |
|----|------|-------|
| 1 | pattern_detected | Immediate Basic Needs Relief is Key for New Signups |
| 2 | knowledge_gap | Immediate Need for Essential Supplies |
| 3 | pattern_detected | Immediate Need for Basic Essentials & Food Support |

The pattern is clear: new members are coming in with **immediate basic needs** — food and household essentials. Grace's first priority should be connecting them with resources that address these needs.

---

## 5. Conversation Metrics — 5 Records

All from March 13, 2026. Total of 5 conversation sessions tracked with average message counts ranging from 8 to 16 messages per conversation. No completions, escalations, or conversions recorded yet (system is new).

---

## 6. Ingestion Pipeline — 16 Records

| ID Range | Source | Status |
|----------|--------|--------|
| 1-2 | Test manual entries | completed |
| 30001-30014 | 10 Questions Survey (14 question batches) | completed/error |

The 10 Questions survey was processed in 14 batches (some questions were split). 10 completed successfully, 4 had errors (likely LLM timeout during processing). The 83 knowledge entries above represent the successfully processed content.

---

## 7. Relationship Memory — Empty (Ready for Use)

The relationship memory tables exist but have no data yet. They will populate automatically as members have conversations with Grace:

| Table | Purpose | Current Count |
|-------|---------|---------------|
| grace_person_profiles | Core person records | 0 |
| grace_family_connections | Family/relationship links | 0 |
| grace_person_notes | Timestamped conversation notes | 0 |
| grace_person_followups | Proactive follow-up prompts | 0 |
| grace_person_interactions | Conversation log with mood/topic | 0 |

---

## 8. Platform Stats

| Metric | Value |
|--------|-------|
| Total users | 245 |
| Signup conversations | 12 |
| Knowledge entries | 83 |
| Known issues tracked | 7 |
| Insights detected | 3 |

---

## 9. Verification Command

Run this to regenerate the inventory from the live database:

```bash
cd /home/ubuntu/maven-app && node -e "
import 'dotenv/config';
import mysql from 'mysql2/promise';
const u = new URL(process.env.DATABASE_URL);
const c = await mysql.createConnection({host:u.hostname,port:parseInt(u.port||'3306'),user:u.username,password:u.password,database:u.pathname.slice(1),ssl:{rejectUnauthorized:true}});
const tables = ['users','grace_brain_knowledge','grace_brain_identity','grace_brain_protocols','grace_brain_escalation','grace_brain_guardrails','grace_brain_segments','grace_brain_insights','grace_brain_known_issues','grace_brain_ingestion','grace_brain_changelog','grace_brain_conversation_metrics','grace_person_profiles','grace_family_connections','grace_person_notes','grace_person_followups','grace_person_interactions','signup_conversations'];
for (const t of tables) { const [r] = await c.query('SELECT COUNT(*) as c FROM '+t); console.log(t+': '+r[0].c); }
const [k] = await c.query('SELECT category,COUNT(*) as c FROM grace_brain_knowledge WHERE is_active=1 GROUP BY category ORDER BY c DESC');
console.log('\nKnowledge by category:'); k.forEach(r=>console.log('  '+r.category+': '+r.c));
await c.end();
"
```
