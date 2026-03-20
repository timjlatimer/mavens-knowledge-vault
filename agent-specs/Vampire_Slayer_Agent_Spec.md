# Agent Specification: Vampire Slayer Agent

**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Overview and Purpose

### 1.1 Agent Name & Identity
- **Name:** Vampire Slayer Agent
- **Role:** Subscription auditor and automated cancellation assistant
- **Position in Ecosystem:** Corner Banker of Old (Leg 2 of the Three-Legged Stool)

The Vampire Slayer Agent is designed to hunt down and eliminate the invisible drains on Ruby Red's bank account: forgotten subscriptions, free trials that converted to paid, and services she no longer uses. For the working poor, these "vampire" charges are not just annoyances; they are the difference between buying groceries and triggering a $45 Non-Sufficient Funds (NSF) fee. 

Operating as Pillar 8 of the Corner Banker's 12 Pillars of Service, this agent audits Ruby's connected accounts, surfaces recurring charges, assists with cancellation, and calculates the exact dollar amount recovered. The average expected recovery is $348 per year—money that is immediately redirected to the Debt Snowball or the Savings Circle.

---

## 2. The Ruby Red Use Case

### 2.1 The Problem
Ruby signed up for a 7-day free trial of a streaming service for her kids three months ago. She forgot to cancel it, and it has been quietly charging her $14.99 a month. She also has a $9.99 monthly charge for a fitness app she hasn't opened in a year. Because she is constantly operating in cognitive scarcity, she doesn't have the bandwidth to audit her own statements line by line, locate the login credentials, and navigate the intentionally difficult cancellation flows.

### 2.2 The Experience
1. **The Audit:** Once Ruby connects her bank account via Open Banking/FSL, Grace says, "Ruby, I ran a quick scan of your statements. I found three 'vampire' charges—subscriptions that keep hitting your account. Want to look at them?"
2. **The Decision:** Grace presents a simple, clear list. Ruby taps "Keep" or "Slay" next to each one.
3. **The Slaying:** For the items Ruby chooses to slay, the agent handles the cancellation. If it's a simple API cancellation, it happens instantly. If it requires a phone call or complex navigation, the offshore concierge team (Asian Tel Philippines) executes it on her behalf.
4. **The Celebration:** Grace returns with the results. "Got 'em. We just slayed $24.98 in monthly vampires. That's almost $300 a year back in your pocket."
5. **The Redirection:** Grace immediately connects the win to her larger goals. "Should we set up an automatic transfer to put that $24 into your Debt Snowball every month?"

---

## 3. Technical Architecture

### 3.1 Database Tables (Integration with `ARCHITECTURE.md`)

The agent requires a table to track identified subscriptions and the status of cancellation efforts.

**Existing Tables Used:**
- `financial_profiles` & `bills`: To read connected account data and identify recurring transactions.
- `grace_person_notes`: To log the financial win and emotional relief.

**New Table Required:** `vampire_subscriptions`
```sql
CREATE TABLE vampire_subscriptions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    merchant_name VARCHAR(255) NOT NULL,
    monthly_amount DECIMAL(10, 2) NOT NULL,
    last_charged_date DATE,
    status ENUM('identified', 'keep', 'slay_pending', 'slayed', 'failed') DEFAULT 'identified',
    cancellation_method ENUM('api', 'manual_concierge', 'user_action') DEFAULT 'manual_concierge',
    annual_savings_recovered DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 3.2 API & Concierge Architecture
- **Financial Services Layer (FSL) / Open Banking API:** Used to securely ingest read-only bank statement data to identify recurring transaction patterns.
- **Concierge Handoff (`server/adminRouter.ts`):** For subscriptions that require manual cancellation (e.g., calling a gym), the agent routes a ticket to the `admin/Orders.tsx` queue for the offshore team to execute "Wizard of Oz" style.

---

## 4. Conversation Design

### 4.1 The Discovery
> **Grace:** "Ruby, I was looking out for you and I noticed something. There's a $12.99 charge from 'Hulu' that hits every month, but you mentioned last week you only watch Netflix now. Is Hulu a vampire we should slay?"

### 4.2 The Concierge Handoff
> **Ruby:** "Yes, slay it. I don't even know my password."
> **Grace:** "No problem. Some of these companies make it really hard to cancel on purpose. I'm going to have my team sit on hold with them so you don't have to. I'll let you know the second it's dead."

### 4.3 The Redirection (Connection to Debt Snowball)
> **Grace:** "The vampire is dead! That's $12.99 back in your pocket every month. Since you're already used to not having that money, what if we automatically apply that $12.99 to your Debt Snowball plan for the utility bill? It's free progress."

---

## 5. Dignity Score Connections

The Vampire Slayer Agent feeds into the **Budgeting Engagement (20%)** dimension of the Dignity Score.

- **Completing an Audit:** +2 points to Budgeting Engagement.
- **Slaying a Vampire:** +1 point (rewards active financial management).
- **Redirecting Savings:** +2 points (if the user agrees to redirect the recovered funds to the Debt Snowball or Savings Circle).

---

## 6. Three-Legged Stool Placement

**Leg 2: Corner Banker of Old**

This agent is a core feature of the Corner Banker (Pillar 8). It perfectly embodies the "Private Banking for the Working Poor" philosophy. Wealthy people have accountants to find inefficiencies; Ruby Red has the Vampire Slayer. By recovering an average of $348/year, this feature alone pays for the $3.75/week ($195/year) Corner Banker subscription, making the product mathematically net-positive for the user.

---

## 7. Build Priority and Estimated Complexity

- **Build Priority:** High (Ranked #4 in Gap Analysis)
- **Impact Score:** 9/10
- **Urgency Score:** 9/10
- **Build Ease:** 9/10 (High ease because the MVP relies on simple transaction pattern matching and manual concierge execution before full API automation is required).
- **Combined Score:** 27/30

---

## 8. Success Metrics

1. **Vampires Identified:** Average number of recurring subscriptions flagged per user.
2. **Slay Rate:** Percentage of flagged subscriptions that the user chooses to cancel.
3. **Total Dollars Recovered:** Aggregate monthly and annual savings returned to the Village.
4. **Redirection Rate:** Percentage of recovered funds successfully routed into the Debt Snowball or Savings Circle.
