# Agent Specification: Dignity Score Agent

**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Overview and Purpose

### 1.1 Agent Name & Identity
- **Name:** Dignity Score Agent
- **Role:** Proprietary behavioral scoring engine and alternative credit evaluator
- **Position in Ecosystem:** Bridge between Pulse (Leg 3) and Corner Banker (Leg 2)

The Dignity Score Agent is the competitive moat of the Maven ecosystem. Traditional credit scores (Equifax, TransUnion) are backward-looking instruments that measure debt capacity, not human reliability. They punish poverty by design. The Dignity Score is a forward-looking, holistic measure of financial character that captures what the bureaus ignore.

Operating on a 0-100 scale, this agent constantly ingests data from across the Maven Village—payment history, community participation, budgeting engagement—to calculate a real-time score. This score directly governs loan limits in the Corner Banker and forms the foundation of the Hidden Prime Letter in Pulse. It proves that Ruby Red is reliable, even if the traditional system says she is invisible.

---

## 2. The Ruby Red Use Case

### 2.1 The Problem
Ruby Red has a traditional credit score of 520 due to a missed payment on a $200 credit card three years ago. Because of this, she cannot access a $50 loan from a bank to fix a flat tire; she must go to a payday lender and pay 400% interest. The traditional system defines her entirely by her worst financial moment.

### 2.2 The Experience
1. **The Introduction:** Grace introduces the concept early in onboarding. "Ruby, the banks use a score that punishes you for being poor. We use a Dignity Score. It measures how you show up—for yourself and for the Village. You start at 20, and you build it by doing the things you already do."
2. **The Real-Time Feedback:** Ruby completes a Monthly Reality Check with Grace. Grace responds, "Great job on the budget review, Ruby. Your Dignity Score just bumped up 2 points to 65!"
3. **The Tangible Reward:** When Ruby hits a score of 75, she receives a notification: "You've reached Dignity Strong! You now have full access to the $100 Need Milk Money (NMM) tier."
4. **The Graceful Setback:** Ruby misses an NMM payment and drops into the Safety Net Protocol (paying $6/week instead of $50). Her traditional credit score would plummet. Her Dignity Score remains stable because she is still engaged and communicating. "Life happens, Ruby," Grace says. "You're still in the Village."

---

## 3. Scoring Dimensions and Bands

### 3.1 The Calculation Engine (0-100)

| Dimension | Weight | What It Measures | Data Source |
| :--- | :---: | :--- | :--- |
| **Payment Reliability** | 40% | Consistency of NMM repayments, rent payments, and other tracked obligations. | `nmm_ledgers`, `rent_reporting_history` |
| **Budgeting Engagement** | 20% | Active participation in Monthly Reality Checks, Debt Snowball planning, and goal setting. | `grace_person_interactions`, `saved_budgets` |
| **Community Participation** | 15% | Lifeline Link step-clearing, Good Neighbor Barter completions, Village Petition signing. | `community_posts`, `lifeline_contributions` |
| **Savings Circle** | 15% | Consistent contributions to emergency funds or ROSCA groups (even $5/week). | `savings_goals`, `rosca_contributions` |
| **Referrals** | 10% | Bringing others into the Village and acting as a mentor/Wisdom Giant. | `referrals`, `wisdom_giants` |

### 3.2 The Five Bands

| Score Range | Label | Meaning & Corner Banker NMM Access |
| :---: | :--- | :--- |
| **81-100** | **Dignity Elite** | Pillar of the Village. Unlocks $150 NMM limit (after 12 consecutive on-time payments). Hidden Prime Letter carries maximum weight. |
| **61-80** | **Dignity Strong** | Stable and engaged. Unlocks full $100 NMM limit. |
| **41-60** | **Dignity Growing** | Making consistent progress. Unlocks $50 NMM limit. |
| **21-40** | **Dignity Building** | Early phase or recovering from crisis. Unlocks $20-$40 NMM limit. |
| **0-20** | **Dignity Starting** | New to the system. Big Mama intervention required before NMM draws. |

---

## 4. Technical Architecture

### 4.1 Database Tables (Integration with `ARCHITECTURE.md`)

The agent acts as a continuous aggregation engine across multiple existing tables, storing the calculated score and its history.

**Existing Tables Ingested:**
- `users`, `referrals`, `wisdom_giants`
- `bills`, `savings_goals`
- `community_posts`, `community_likes`
- `grace_person_interactions`

**New Tables Required:** `dignity_scores` & `dignity_score_history`
```sql
CREATE TABLE dignity_scores (
    user_id VARCHAR(255) PRIMARY KEY,
    current_score INT NOT NULL DEFAULT 20,
    band_label ENUM('Starting', 'Building', 'Growing', 'Strong', 'Elite') DEFAULT 'Starting',
    payment_subscore DECIMAL(5, 2) DEFAULT 0,
    budgeting_subscore DECIMAL(5, 2) DEFAULT 0,
    community_subscore DECIMAL(5, 2) DEFAULT 0,
    savings_subscore DECIMAL(5, 2) DEFAULT 0,
    referral_subscore DECIMAL(5, 2) DEFAULT 0,
    last_calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE dignity_score_history (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    score_value INT NOT NULL,
    change_amount INT NOT NULL,
    reason_code VARCHAR(100) NOT NULL, -- e.g., 'NMM_REPAYMENT', 'LIFELINE_CONTRIBUTION'
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 4.2 API & Server Architecture
- **Scoring Engine (`server/dignityScoreEngine.ts`):** A CRON-driven or event-driven service that recalculates the score when key events occur (e.g., a payment clears, a referral signs up).
- **Grace Brain Insights (`server/graceBrainDb.ts`):** The score is injected into Grace's context window for every interaction, allowing her to reference it naturally.

---

## 5. Conversation Design

### 5.1 Plain Language Explanation
The Dignity Score must never feel like a black box algorithm. Grace explains it transparently.
> **Grace:** "Your Dignity Score is 68 right now. That's made up of a few things: 40% is your payment history with us, 20% is the budgeting work we do together, and the rest is how you show up in the Village, like when you cleared Sarah's step last week. You're doing great."

### 5.2 The "Autopsy Without Blame"
When a score drops (which only happens through prolonged disengagement, not just lack of funds):
> **Grace:** "Hey Ruby, I noticed we haven't connected on our budget in a while, and your score dipped a couple of points. No stress at all—the Trench Years are hard. Whenever you have 5 minutes, let's just do a quick check-in to bump it back up."

---

## 6. Three-Legged Stool Placement

**Cross-Leg Integration: Corner Banker (Leg 2) & Pulse (Leg 3)**

The Dignity Score is the connective tissue of the entire ecosystem.
- **For Corner Banker:** It is the risk-assessment engine. It replaces the Equifax pull for NMM micro-loans, determining exactly how much capital Ruby can access safely.
- **For Pulse:** It is the core metric of the Financial History Vault and the primary data point in the Hidden Prime Letter, proving Ruby's reliability to the outside world.

---

## 7. Build Priority and Estimated Complexity

- **Build Priority:** Highest (Ranked #1 in Gap Analysis)
- **Impact Score:** 10/10
- **Urgency Score:** 10/10
- **Build Ease:** 7/10 (Requires careful weighting logic and continuous event-listening across the database, but relies entirely on internal data).
- **Combined Score:** 27/30

---

## 8. Success Metrics

1. **Predictive Validity:** The correlation between a high Dignity Score and successful NMM repayment rates (should exceed traditional credit score correlation).
2. **Score Mobility:** The average time it takes a user to move from "Dignity Building" to "Dignity Strong."
3. **Engagement Lift:** Increase in community actions (Lifeline Link, Barter) directly attributed to members trying to boost their score.
4. **NMM Default Rate:** Maintaining a default rate below the 1% modeled in the Corner Banker baseline scenario, relying purely on the Dignity Score for underwriting.
