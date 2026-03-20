# Agent Specification: Rent Reporting Agent

**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Overview and Purpose

### 1.1 Agent Name & Identity
- **Name:** Rent Reporting Agent
- **Role:** Automated credit-building facilitator
- **Position in Ecosystem:** Pulse (Leg 3 of the Three-Legged Stool)

The Rent Reporting Agent is the fastest path from "credit invisible" to "prime." For Ruby Red, rent is her largest, most non-negotiable monthly expense. She pays it reliably because the alternative is losing her housing. Yet, the traditional credit system ignores this massive display of financial responsibility. 

This agent changes that. By integrating with a third-party fintech partner (Zenbase recommended), it turns Ruby's existing rent payments into a powerful credit-building asset, reporting them to both Equifax and TransUnion. It transforms a sunk cost into a financial advantage, directly attacking the "expensive to be poor" dynamic.

---

## 2. The Ruby Red Use Case

### 2.1 The Problem
Ruby pays $1,500 a month in rent, on time, every month. She has done this for three years. However, she has no active credit cards and a 5-year-old derogatory mark from a cell phone bill. Her credit score is 540. When she tries to get a car loan, the lender only sees the old cell phone bill, completely blind to her flawless $54,000 track record of housing payments.

### 2.2 The Experience
1. **The Positioning:** Grace introduces the feature not as a chore, but as a superpower. "Ruby, you're already doing the hardest part—paying rent every month. Let's make sure the banks actually give you credit for it."
2. **The Onboarding (Zenbase Model):** Ruby signs up directly through the Maven portal. She does *not* need her landlord's permission or involvement (a critical friction-reducer). She connects her bank account so the system can verify the monthly rent withdrawal.
3. **The Reporting:** Every month, the agent detects the rent payment leaving her account and automatically pushes a positive tradeline to Equifax and TransUnion.
4. **The Celebration:** Grace checks in. "Ruby, your rent payment just hit your credit file. You're building your score without taking on a single dollar of new debt. That's a huge win."

---

## 3. Technical Architecture

### 3.1 Vendor Selection: Zenbase vs. FrontLobby
Based on the `Rent_Reporting_FrontLobby_Zenbase_Research.md` spec, **Zenbase** is the chosen integration path.
- **Why not FrontLobby?** FrontLobby requires landlord participation and consent, acting primarily as a compliance/collections tool. This creates massive friction for Ruby.
- **Why Zenbase?** Zenbase is a tenant-first, automated fintech product. It verifies the lease via bank connection, requires zero landlord involvement, and reports to both Equifax and TransUnion automatically.

### 3.2 Database Tables (Integration with `ARCHITECTURE.md`)

**Existing Tables Used:**
- `users`: For identity verification.
- `financial_profiles`: To store the verified rent amount.
- `grace_person_notes`: To log the emotional win of credit building.

**New Table Required:** `rent_reporting_history`
```sql
CREATE TABLE rent_reporting_history (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    vendor ENUM('zenbase', 'frontlobby') DEFAULT 'zenbase',
    vendor_account_id VARCHAR(255),
    monthly_rent_amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    status ENUM('verified', 'reported_equifax', 'reported_transunion', 'failed') DEFAULT 'verified',
    is_retroactive BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 3.3 API Connections
- **Zenbase API:** The agent handles the OAuth handshake to provision a Zenbase account for the user, passing the necessary KYC data (with explicit PIPEDA-compliant consent).
- **Webhook Listener:** The agent listens for webhooks from Zenbase confirming that a monthly payment has been successfully reported to the bureaus, updating the `rent_reporting_history` table.

---

## 4. Conversation Design

### 4.1 The Pitch (High Perceived Value)
> **Grace:** "Ruby, I have a 'credit hack' for you. You pay $1,500 a month in rent, right? Right now, that does nothing for your credit score. But we have a partnership that turns that rent payment into a credit-building tool. It reports your on-time rent to Equifax and TransUnion, just like a mortgage. It's included in your Maven membership. Want to turn it on?"

### 4.2 The Consent Flow (PIPEDA Compliant)
> **Grace:** "Okay, to make this work, I need your permission to share your basic info with our partner, Zenbase, and to let them look at your bank account just to verify the rent payment goes out. They don't touch your money, they just watch for the payment. Is that okay?"

### 4.3 The Milestone
> **Grace:** "Huge news, Ruby. TransUnion just accepted your first rent payment record. You now have an active, positive tradeline on your credit file. You're literally building your future just by living in your house."

---

## 5. Dignity Score Connections

The Rent Reporting Agent is a massive driver for the **Payment Reliability (40%)** dimension of the Dignity Score.

- **Activating Rent Reporting:** +3 points to Budgeting Engagement.
- **Every Verified Rent Payment:** +5 points to Payment Reliability. 
- *Note: Because Zenbase does not aggressively report negative data (unlike FrontLobby), a missed rent payment does not automatically crater the Dignity Score, though Grace will intervene to offer Chaos Support or Need Milk Money.*

---

## 6. Three-Legged Stool Placement

**Leg 3: Pulse (Credit Rebuilding)**

This agent is the cornerstone of Pulse. While Corner Banker (Leg 2) handles immediate cash-flow crises, Pulse is about the long game. By establishing a permanent, positive tradeline on the major credit bureaus, the Rent Reporting Agent ensures that Ruby's daily struggle translates into long-term economic mobility, eventually allowing her to access prime lending rates for cars and mortgages.

---

## 7. Build Priority and Estimated Complexity

- **Build Priority:** High (Ranked #7 in Gap Analysis)
- **Impact Score:** 10/10 (Transformative for the unbanked)
- **Urgency Score:** 9/10
- **Build Ease:** 7/10 (Requires formal API integration with Zenbase and careful handling of PIPEDA consent flows, but the core logic is outsourced to the vendor).
- **Combined Score:** 26/30

---

## 8. Success Metrics

1. **Adoption Rate:** Percentage of Maven members who activate the rent reporting feature.
2. **Tradelines Established:** Total number of positive rent tradelines successfully reported to Equifax/TransUnion across the Village.
3. **Credit Score Lift:** Average traditional credit score increase for members after 6 months and 12 months of active rent reporting.
4. **Dignity Score Impact:** Correlation between active rent reporting and movement into the "Dignity Strong" tier.
