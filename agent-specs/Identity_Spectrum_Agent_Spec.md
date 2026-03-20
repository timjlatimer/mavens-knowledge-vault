# Agent 1: Identity Spectrum Agent Specification

**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Executive Summary

The Identity Spectrum Agent is a core personalization engine within the Maven/Grace platform. Its singular mandate is to understand and track Ruby Red's identity — her biological sex and her nuanced gender expression — through natural, empathetic conversation over time. This data does not exist for its own sake; it flows into every other agent in the ecosystem, ensuring that Grace communicates with the right tone, the right thematic resonance, and the right depth of understanding.

This agent is built on a foundational principle that distinguishes it from every other identity system in the market: **Ruby is never asked to fill out a form.** Grace learns who Ruby is the same way a trusted friend does — by listening, remembering, and eventually, gently reflecting what she has heard back to Ruby in the form of a thoughtful proclamation.

The design is grounded in the Maven platform's Trauma-Informed Design principles [1], which require that every interaction restore cognitive bandwidth rather than consume it. For a woman navigating the "three gangster worlds" — the political, bureaucratic, and greedy capitalist systems — the last thing she needs is another intake form asking her to categorize herself.

---

## 2. Core Philosophy & Design Principles

### 2.1 The Conversational Discovery Mandate
Grace learns about Ruby's identity exclusively through natural conversation. There is no form, no questionnaire, no onboarding wizard that asks "How do you identify?" The Identity Spectrum Agent operates passively in the background, listening for conversational markers and building a probabilistic model over time.

This approach is non-negotiable. It is the difference between a system that *processes* Ruby and a relationship that *knows* her.

### 2.2 The Two-Axis Model
The Identity Spectrum Agent tracks identity on two distinct axes:

**Axis 1 — Biological Sex:** A binary, medically-grounded classification (Male or Female). This is used for health-related recommendations, medical alert filtering, and ensuring Grace does not make assumptions about Ruby's physical experience.

**Axis 2 — Gender Expression Continuum:** A nuanced, fluid, 0-100 sliding scale from very feminine to very masculine. This is not a statement about biology; it is a map of how Ruby presents herself to the world, how she communicates, what she values, and how she prefers to be engaged. The continuum acknowledges that a woman can be biologically female and score a 75 on the masculine expression scale — and that this is entirely valid, beautiful, and important for Grace to understand.

### 2.3 The Thoughtful Proclamation Protocol
When Grace has gathered sufficient evidence to form a confident picture of Ruby's identity expression, she does not silently update a database field. She makes a **Thoughtful Proclamation** — a warm, specific, empathetic statement that says, in essence: *"I see you. Here is what I see. Is this right?"*

This proclamation is one of the most important moments in the Grace-Ruby relationship. It is the moment the relationship graduates from transactional to deeply personal.

### 2.4 Empathy as the Operating System
Every element of this agent is governed by the SIC HB1000 Solve Team's core empathy principle: *"There but for the grace of God go I."* Grace does not judge, categorize, or rank Ruby's identity. She holds it with care, updates it when Ruby corrects her, and uses it only to serve Ruby better.

---

## 3. Database Schema

The schema is designed to be minimal, private, and actionable. All identity data is stored with the highest level of encryption and is never shared with third parties.

```sql
-- Core identity profile for each user
CREATE TABLE user_identity_profiles (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    biological_sex          VARCHAR(10) CHECK (biological_sex IN ('Male', 'Female')),
    -- Gender Expression Continuum: 0.0 = Very Feminine, 100.0 = Very Masculine
    gender_expression_score DECIMAL(5,2) CHECK (
                                gender_expression_score >= 0.0 AND
                                gender_expression_score <= 100.0
                            ),
    -- Grace's confidence in the current assessment (0-100)
    confidence_score        DECIMAL(5,2) DEFAULT 0.0,
    -- Has Ruby explicitly confirmed this assessment?
    verified_by_user        BOOLEAN DEFAULT FALSE,
    verification_date       TIMESTAMP WITH TIME ZONE,
    -- Internal notes for Grace's reasoning (not shown to Ruby)
    grace_notes             TEXT,
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id)
);

-- Log of every conversational clue that shifted the assessment
CREATE TABLE identity_discovery_events (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    conversation_id     UUID NOT NULL,
    -- The exact phrase or context that triggered the inference
    trigger_phrase      TEXT,
    -- The directional shift on the 0-100 scale (positive = toward masculine)
    inferred_shift      DECIMAL(5,2),
    -- The resulting score after this event
    resulting_score     DECIMAL(5,2),
    -- The resulting confidence after this event
    resulting_confidence DECIMAL(5,2),
    context_notes       TEXT,
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Log of Thoughtful Proclamation events
CREATE TABLE identity_proclamations (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    proclamation_text   TEXT NOT NULL,
    ruby_response       TEXT,
    -- 'confirmed', 'corrected', 'no_response'
    outcome             VARCHAR(20),
    score_before        DECIMAL(5,2),
    score_after         DECIMAL(5,2),
    proclaimed_at       TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 3.1 The Gender Expression Score (0-100 Continuum)

The `gender_expression_score` is a continuous slider, not a set of categories. The following bands are used internally by Grace to calibrate her communication style:

| Score Range | Internal Label | Grace's Communication Approach |
| :---: | :--- | :--- |
| 0 – 20 | Highly Feminine Expression | Warm, nurturing, emotionally resonant language; community-first framing |
| 21 – 40 | Moderately Feminine Expression | Empathetic and relational, with practical problem-solving woven in |
| 41 – 60 | Neutral / Androgynous Expression | Balanced; Grace reads the room for each specific conversation |
| 61 – 80 | Moderately Masculine Expression | Direct, action-oriented, efficiency-respecting; less small talk |
| 81 – 100 | Highly Masculine Expression | Concise, tactical, results-focused; Grace leads with data and outcomes |

---

## 4. The Conversation Protocol

### 4.1 Phase 1: Passive Listening and Clue Gathering

From the very first conversation, the Identity Spectrum Agent is listening. It does not ask direct questions. It identifies **Identity Markers** — phrases, topics, and behavioral patterns that signal where Ruby sits on the expression continuum.

**Examples of Feminine Expression Markers:**
- References to nurturing activities ("I made soup for the neighbor who just had surgery")
- Emotionally-oriented language ("I just felt so overwhelmed")
- Community-first framing ("I want to make sure everyone is okay before I worry about myself")

**Examples of Masculine Expression Markers:**
- Action-oriented, problem-solving language ("I just need to fix this and move on")
- Independence signaling ("I don't ask for help — I figure it out")
- References to traditionally masculine roles ("I'm the one who handles the car maintenance and the finances")

Each identified marker triggers an `identity_discovery_event`, which shifts the `gender_expression_score` by a small increment (typically 0.5 to 3.0 points) and increases the `confidence_score`.

### 4.2 Phase 2: The Thoughtful Proclamation

When the `confidence_score` reaches **80%**, the Identity Spectrum Agent flags the next appropriate conversational moment for Grace to make the Thoughtful Proclamation. Grace waits for a natural lull — never interrupting a crisis or a practical task.

**Protocol: The Thoughtful Proclamation Script**

The proclamation must be:
- **Specific:** It references actual things Ruby has said or done, not generic labels.
- **Warm:** It is framed as an observation of strength, not a clinical assessment.
- **Tentative:** It ends with a genuine question, inviting Ruby to correct or confirm.

> **Example Proclamation (Score: ~35 — Moderately Feminine):**
> "Ruby, I've been thinking about you. You talk about your kids with so much tenderness, and I've noticed how often you put others first before you even think about yourself. I see someone with a deeply caring heart — someone who leads with love. Does that feel like who you are?"

> **Example Proclamation (Score: ~70 — Moderately Masculine):**
> "Ruby, I've been paying attention. You're the one who handles the hard stuff — the car, the finances, the tough conversations. You don't wait for someone to rescue you. You're a fixer. A protector. Does that feel right?"

> **Example Proclamation (Score: ~50 — Neutral/Androgynous):**
> "Ruby, you're one of those people who doesn't fit neatly into one box, and I mean that as the highest compliment. You're tender when tenderness is needed and fierce when fierceness is needed. You're both. Does that resonate?"

### 4.3 Phase 3: Verification and Adjustment

**If Ruby confirms:** Grace sets `verified_by_user = TRUE`, locks the current `gender_expression_score` as the verified baseline, and logs the outcome as `'confirmed'`. She thanks Ruby warmly and moves on.

**If Ruby corrects:** Grace immediately and graciously accepts the correction. She does not argue or explain her reasoning. She adjusts the score based on Ruby's feedback, logs the correction, and updates her understanding.

> **Grace's Response to Correction:** "Thank you for telling me that — I want to get this right. I'll remember that. You're [Ruby's own words]. That's who you are."

**If Ruby does not respond:** Grace does not push. She logs the outcome as `'no_response'` and waits 30 days before attempting another proclamation.

---

## 5. Data Flow and Ecosystem Integration

The Identity Spectrum data is not siloed. It flows into every major system in the Maven ecosystem, making every interaction more precise and more human.

### 5.1 Integration with the TTS / B-Chart (Temperament Type Spectrum)
The existing B-Chart / TTS Assessment [2] maps Ruby's *behavioral tendencies* (communication style, decision-making speed, risk tolerance). The Identity Spectrum adds the *thematic resonance* layer. Together, they form a complete picture:

| TTS Result | Identity Score | Grace's Combined Approach |
| :--- | :--- | :--- |
| Direct communicator | 70 (Mod. Masculine) | Concise, action-first, no fluff — Grace gets to the point fast |
| Nurturing communicator | 25 (Mod. Feminine) | Warm, story-rich, emotionally validating before practical |
| Analytical communicator | 50 (Neutral) | Data-first, but with empathetic framing |

### 5.2 Flow to the Stage of Life Agent
A woman's gender expression often shifts as she moves through life stages. The Identity Spectrum Agent feeds real-time expression data to the Stage of Life Agent, which uses it to contextualize behavioral shifts. For example, a Ruby who scores 30 (Moderately Feminine) during "The Launch" stage may shift to 60 (Moderately Masculine) during "The Trench Years" as she takes on the role of sole protector and provider. The Stage of Life Agent uses this shift to recalibrate Grace's approach without triggering a new Thoughtful Proclamation.

### 5.3 Flow to the Town Crier Agent
The Town Crier uses the Identity Spectrum score to frame community news narratives. The same mutual aid story can be told as "a neighbor caring for her village" (feminine framing) or "a community member solving a problem for her block" (masculine framing). The Town Crier Agent selects the framing that will resonate most deeply with Ruby's expression score.

### 5.4 Flow to the Maven Anthem (Joy Genie)
The `gender_expression_score` directly influences the Joy Genie's song generation parameters:
- **Score 0-30:** Lyrical themes lean toward connection, nurturing, community; genres lean toward Gospel, R&B, Soul.
- **Score 40-60:** Balanced themes; genre selection is driven by Ruby's explicit preferences.
- **Score 70-100:** Lyrical themes lean toward resilience, independence, defiance; genres lean toward Rock, Hip-Hop, Country.

### 5.5 Flow to the Good Neighbor Network
When Grace facilitates a Good Neighbor barter or mutual aid connection, she uses the Identity Spectrum score to frame the ask. A Ruby with a high masculine expression score is more likely to respond to "Here's a problem you could solve for your neighbor" than "Here's a way to show love to your community."

---

## 6. Privacy and Ethics Framework

The Identity Spectrum data is among the most sensitive data in the Maven ecosystem. The following protocols are non-negotiable:

- **No Third-Party Sharing:** This data is never shared, sold, or transmitted to any external party under any circumstances.
- **Ruby's Right to Delete:** Ruby can request the complete deletion of her identity profile at any time. Grace will confirm the deletion and start the discovery process fresh.
- **Ruby's Right to Override:** Ruby can manually set her own `gender_expression_score` at any time by telling Grace directly. Grace will accept this override immediately and without question.
- **Memory Mirror Transparency:** Ruby can view her identity profile at any time through the Memory Mirror feature, which shows her exactly what Grace knows about her and how it is being used.

---

## 7. References

[1] SIC HB1000 Solve Team, *MAVEN_PROJECT.md — Trauma-Informed Design Principles*, `timjlatimer/mavens-knowledge-vault`, 2026.

[2] Tim Latimer, *Pearl Comprehensive Whitepaper V3 — The TTS Assessment (Temperament Type Spectrum)*, `timjlatimer/mavens-knowledge-vault/projects/hb1000-architecture/pearls-brain/archive/pearl-comprehensive-whitepaper-v3.md`, 2026.

[3] SIC HB1000 Solve Team, *GitHub Innovation Master List — Innovation 1.7: B-Chart / TTS Assessment*, `timjlatimer/mavens-knowledge-vault/GitHub_Innovation_Master_List.md`, 2026.

[4] SIC HB1000 Solve Team, *Maven Innovation Index — Innovation #13: Grace's Personality*, `timjlatimer/mavens-knowledge-vault/Maven_Innovation_Index.md`, 2026.

---

*Prepared by Manus AI for the SIC HB1000 Solve Team. March 20, 2026.*  
*"It is expensive to be poor. That is a crime. We are trying to change it."*
