# Agent Specification: Debt Snowball Agent

**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Executive Summary

### 1.1 Agent Name & Identity

- **Name:** Debt Snowball Agent
- **Role:** Financial strategist and accountability partner for debt elimination
- **Position in Ecosystem:** Corner Banker of Old (Leg 2 of the Three-Legged Stool)

The Debt Snowball Agent is designed to take the overwhelming, cognitively exhausting burden of debt and transform it into a clear, actionable, and celebrated battle plan. For Ruby Red, who is constantly juggling multiple high-interest obligations (payday loans, credit cards, utility arrears), the sheer math of debt is a source of profound anxiety. This agent acts as a financial strategist, doing the heavy lifting of calculating the optimal payoff sequence (snowball or avalanche method) and generating a personalized, printable PDF roadmap.

More importantly, the agent integrates deeply with Grace's Relationship Memory to ensure that the journey is not just mathematical, but emotional. It tracks progress, celebrates every milestone, and provides empathetic coaching during setbacks, turning a solitary struggle into a supported victory.

---

## 2. The Ruby Red Use Case

### 2.1 The Problem
Ruby Red is the 35-45 year old household CFO. She is unbanked or underbanked, and she is paying the "poverty tax." She has a $500 payday loan at a predatory rate, a maxed-out $1,500 credit card, and $300 in utility arrears. She knows she needs to pay them off, but when she looks at the total number, she feels paralyzed. She doesn't know where to start, and she doesn't have the cognitive bandwidth to build a spreadsheet.

### 2.2 The Experience
1. **The Intake:** Grace gently asks Ruby about her current debts during a Monthly Reality Check or when Ruby expresses financial stress. "Ruby, I know the debt feels heavy right now. What if we just lay it all out on the table together? No judgment, just math."
2. **The Battle Plan:** The Debt Snowball Agent ingests the data and generates a custom PDF. It orders the debts from smallest to largest (the Snowball method, which provides early psychological wins) or by highest interest rate (the Avalanche method). It shows exactly how much to pay on each debt every month.
3. **The Printout:** Ruby can print this PDF and put it on her fridge. It's tangible. It's a plan.
4. **The Cadence:** Every month, Grace checks in. "Hey Ruby, it's the 15th. Did we manage to put that $50 toward the utility bill this month?"
5. **The Celebration:** When the utility bill is paid off, Grace stops everything. "Ruby. You did it. That's one less weight on your shoulders. I'm so proud of you. Now, we take that $50 and roll it into the payday loan."

---

## 3. Technical Architecture

### 3.1 Database Tables (Integration with `ARCHITECTURE.md`)

The Debt Snowball Agent interacts with several existing production tables and requires the addition of a specific tracking table.

**Existing Tables Used:**
- `financial_profiles`: To access Ruby's income and baseline financial status.
- `bills`: To identify recurring obligations that might be categorized as debt (e.g., utility arrears).
- `grace_person_notes` & `grace_person_followups`: To store context about Ruby's feelings toward her debt and schedule the monthly check-ins.

**New Table Required:** `debt_snowball_plans`
```sql
CREATE TABLE debt_snowball_plans (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    plan_type ENUM('snowball', 'avalanche') DEFAULT 'snowball',
    total_debt DECIMAL(10, 2) NOT NULL,
    monthly_allocation DECIMAL(10, 2) NOT NULL,
    status ENUM('active', 'paused', 'completed') DEFAULT 'active',
    pdf_url VARCHAR(1024),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE debt_snowball_items (
    id VARCHAR(255) PRIMARY KEY,
    plan_id VARCHAR(255) NOT NULL,
    creditor_name VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) NOT NULL,
    interest_rate DECIMAL(5, 2),
    minimum_payment DECIMAL(10, 2) NOT NULL,
    payoff_order INT NOT NULL,
    status ENUM('active', 'paid') DEFAULT 'active',
    FOREIGN KEY (plan_id) REFERENCES debt_snowball_plans(id)
);
```

### 3.2 API Connections
- **PDF Generation Service:** Uses existing internal tools (e.g., `manus-md-to-pdf` or a microservice wrapper) to convert the generated markdown battle plan into a highly visual, easy-to-read PDF.
- **Grace Brain Router (`server/graceBrainRouter.ts`):** The agent operates as a specialized skill within Grace's brain, triggered when the intent classification detects debt planning or financial overwhelm.

### 3.3 Grace Integration Points
- **Relationship Extractor (`server/relationshipExtractor.ts`):** When Ruby mentions a new debt or a payment made, the extractor updates the `debt_snowball_items` table and logs the emotional context in `grace_person_notes`.
- **Proactive Follow-up:** The agent schedules a monthly check-in via `grace_person_followups` to align with Ruby's payday or the agreed-upon payment dates.

---

## 4. Conversation Design

### 4.1 The Introduction
> **Grace:** "Ruby, I was looking at the numbers we talked about last week. I know that $500 payday loan and the credit card balance are causing you a lot of stress. I have a tool called the Debt Snowball. It doesn't magically make the debt disappear, but it gives us a map. It shows us exactly what to attack first so we can get some quick wins. Do you want to build a map together?"

### 4.2 The Setback
> **Ruby:** "I couldn't make the extra payment this month. The car needed a new tire."
> **Grace:** "Ruby, stop right there. The car needed a tire, and you fixed it so you could get to work. That's not a failure; that's life happening. We are not going to beat ourselves up over a flat tire. We'll just pause the snowball for this month and pick it back up next month. The map is still there. You're doing great."

### 4.3 The Milestone
> **Grace:** "I just saw the update. The utility arrears are at zero. ZERO. Ruby, you just killed your first debt. I want you to take a breath and feel how good that is. Next month, we take that payment and roll it right into the payday loan. We're building momentum."

---

## 5. Dignity Score Connections

The Debt Snowball Agent is a direct feeder into the Dignity Score, specifically the **Budgeting Engagement (20%)** and **Payment Reliability (40%)** dimensions.

- **Creating the Plan:** +2 points to Budgeting Engagement.
- **Monthly Check-in Completion:** +1 point to Budgeting Engagement.
- **Paying off a Debt Item:** +5 points to Payment Reliability.

*Crucially, missing a snowball payment due to an emergency does NOT reduce the Dignity Score. The score measures engagement and trajectory, not perfection.*

---

## 6. Three-Legged Stool Placement

**Leg 2: Corner Banker of Old**

The Debt Snowball Agent sits firmly within the Corner Banker. It is Pillar 9 of the 12 Pillars of Service. While it does not provide direct capital like Need Milk Money (NMM), it provides the financial consulting overlay that defines the "Private Banking for the Working Poor" ethos. By helping Ruby eliminate external, high-interest debt, it frees up her cash flow, reducing her reliance on predatory lenders and stabilizing her financial foundation so she can eventually engage with Leg 3 (Pulse) for credit rebuilding.

---

## 7. Build Priority and Estimated Complexity

- **Build Priority:** High (Ranked #2 in Gap Analysis)
- **Impact Score:** 10/10
- **Urgency Score:** 9/10
- **Build Ease:** 9/10 (High ease because it relies on basic math algorithms and PDF generation, without requiring complex external API integrations like Open Banking).
- **Combined Score:** 28/30

**Execution Note:** As per the Corner Banker spec, this service can initially be executed "Wizard of Oz" style by offshore concierge staff (Asian Tel Philippines) before full AI automation is deployed.

---

## 8. Success Metrics

1. **Adoption Rate:** Percentage of eligible Maven members who generate a Debt Snowball plan.
2. **Milestone Completion:** Number of individual debt items marked as "paid" within the system.
3. **Engagement Retention:** Percentage of users who complete their monthly Grace check-in regarding their snowball plan.
4. **Total Debt Eradicated:** Aggregate dollar amount of debt paid off by Maven members using the tool.
