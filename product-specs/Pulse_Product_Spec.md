# Pulse Product Specification
**The Third Leg of the Stool: Credit Rebuilding and Financial Intelligence**

---

| Document Field | Detail |
| :--- | :--- |
| **Product Name** | Pulse |
| **Leg of the Stool** | Leg 3 of 3 |
| **Author** | Manus AI for the SIC HB1000 Solve Team |
| **Date** | March 20, 2026 |
| **Status** | Architecture Draft — V1.0 |
| **Vault Path** | `/product-specs/Pulse_Product_Spec.md` |
| **North Star Alignment** | Ruby Red — the 35-to-45-year-old CFO of the household |

---

## Section 1: What Pulse Is

### 1.1 The Three-Legged Stool

A three-legged stool cannot wobble. Two legs and it falls. The Maven ecosystem is built on three interdependent legs that together form the complete support structure Ruby Red needs to move from financial survival to generational prosperity.

| Leg | Product | Primary Function | Time Horizon |
| :---: | :--- | :--- | :--- |
| **Leg 1** | **Maven** | Community, hand-ups, daily supports, credit support, AI companionship via Grace | Immediate and ongoing |
| **Leg 2** | **Corner Banker / Money Up** | Micro-funding, cash-flow relief, instant-access liquidity tools, Need Milk Money (NMM) | Short-term (days to weeks) |
| **Leg 3** | **Pulse** | Credit rebuilding, bureau reporting, financial insights, Dignity Score, economic mobility | Long-term (months to 20 years) |

Pulse is the financial intelligence and credit rebuilding layer. It is the leg that ensures Ruby's daily struggle today translates into economic power tomorrow. While Corner Banker solves the flat tire crisis and Maven provides the village, Pulse is building the credit profile, financial history, and economic identity that will allow Ruby's children to inherit a different starting line.

### 1.2 The Problem Pulse Solves

The traditional credit system is designed by and for people who already have money. It is a closed loop: you need credit to build credit, but you cannot access credit without a credit history. For Ruby Red — the unbanked, the underbanked, the working poor — this loop is a trap.

> *"It's expensive to be poor."* — SIC HB1000 Solve Team

Ruby pays her rent every month. She pays her utilities. She repays her NMM loans. She participates in her community. None of this appears on her Equifax or TransUnion report. Meanwhile, a single missed payment on a $200 credit card from three years ago haunts her every time she tries to rent a better apartment or get a car loan at a non-predatory rate.

Pulse exists to correct this injustice. It captures the financial behavior that the traditional system ignores, translates it into a language that lenders and landlords understand, and systematically rebuilds Ruby's credit profile over time. It is not charity. It is a long-overdue correction to a broken system.

### 1.3 Who Pulse Serves

Pulse is designed for Ruby Red at every stage of her financial journey:

- **The newly unbanked** — recently lost access to traditional banking due to fees, NSF charges, or account closures.
- **The post-bankruptcy rebuilder** — discharged from bankruptcy or a consumer proposal and starting from scratch.
- **The credit invisible** — no credit file at all, often newcomers to Canada or those who have always operated in cash.
- **The thin-file borrower** — has a credit file but insufficient history to qualify for prime products.
- **The long-term rebuilder** — has a score in the 500s and needs a structured, multi-year pathway to 700+.

---

## Section 2: Core Services

### 2.1 Rent-to-Credit Reporting

**The Opportunity:** Rent is typically Ruby's largest monthly expense — often $1,200 to $2,000 per month in Canadian urban markets. She pays it reliably, month after month, because losing her housing is the worst possible outcome. Yet traditional credit bureaus have historically ignored this payment entirely. Pulse changes this by turning her biggest bill into her most powerful credit-building tool.

**How It Works:** Pulse automatically reports Ruby's verified rent payments to both **Equifax Canada** and **TransUnion Canada**. As of January 2026, TransUnion Canada officially accepts rental payment data as a dedicated category, separate from traditional credit obligations, meaning it improves her credit visibility without increasing her debt-to-income ratio [1] [2]. Equifax Canada has accepted rent payment history for credit score calculation since approximately 2020 [3].

**The Mechanism:** Pulse partners with established Canadian rent reporting infrastructure. The two primary Canadian platforms are **FrontLobby** (which reports to both Equifax and TransUnion Canada, and received Privacy Commissioner approval for its practices in 2025 [1]) and **Zenbase** (which also reports to both bureaus and offers retroactive reporting of up to 24 months of past payments [4]). Pulse will integrate with one or both of these platforms via API, or pursue direct data furnisher agreements with the bureaus as volume grows.

**The Consent Model:** Consistent with PIPEDA requirements, Ruby provides explicit opt-in consent during onboarding. The consent is plain-language, conversational (delivered by Grace), and fully revocable at any time. Pulse never reports without consent.

**The Impact:** Research confirms that including rent payments in credit scoring dramatically expands financial access. A VantageScore 4.0 study found that positive rental data helps millions of renters become mortgage-eligible [5]. TransUnion's own data shows that the percentage of consumers with rent payments on their credit file rose from 11% in 2024 to 13% in 2025 — a trend Pulse accelerates for its members [6].

**Ruby's Experience:** Grace says: *"Ruby, you've been paying your rent on time for 6 months straight. That's going on your credit file now. Every month you pay, your score gets a little stronger. You're already doing the work — we're just making sure you get credit for it."*

### 2.2 The Dignity Score (0-100)

**The Philosophy:** Traditional credit scores (300-900 in Canada) are backward-looking instruments that measure debt capacity, not human reliability. They punish poverty by design. The Dignity Score is Pulse's proprietary alternative — a forward-looking, holistic measure of Ruby's financial character that captures what the bureaus cannot.

**The Calculation:**

| Dimension | Weight | What It Measures |
| :--- | :---: | :--- |
| **Payment Reliability** | 40% | Consistency of NMM repayments, rent payments, and any other tracked obligations within the Maven ecosystem. No missed payments = maximum score in this dimension. Step-downs are not penalized — they are treated as "life happened." |
| **Budgeting Engagement** | 20% | Active participation with Grace in reviewing finances, setting goals, and planning ahead. Monthly Reality Check completion counts here. |
| **Community Participation** | 15% | Engagement in the Maven Village — Lifeline Link participation, Good Neighbor Barter, Savings Circle contributions, and Village Petition activity. |
| **Savings Circle Participation** | 15% | Consistent contributions to personal emergency funds or community savings circles within the Maven ecosystem. Even $5/week counts. |
| **Referrals and Mentorship** | 10% | Bringing others into the Village and actively supporting their onboarding. Mentorship is a form of reliability — it signals that Ruby has stabilized enough to help others. |

**Score Interpretation:**

| Score Range | Label | What It Means |
| :---: | :--- | :--- |
| 90-100 | **Dignity Elite** | Ruby is a pillar of the Village. Her Hidden Prime Letter carries maximum weight. |
| 75-89 | **Dignity Strong** | Ruby is stable, engaged, and on a clear upward trajectory. |
| 60-74 | **Dignity Building** | Ruby is making consistent progress. Life has gotten in the way, but she keeps showing up. |
| 40-59 | **Dignity Emerging** | Ruby is in an early or recovery phase. Grace is actively supporting her. |
| 0-39 | **Dignity Starting** | Ruby is new to the system or in active crisis. No judgment — this is the beginning of the journey. |

**Integration with Corner Banker:** The Dignity Score directly governs NMM allotment limits. A score of 75+ unlocks the full $100 NMM allotment. A score of 60-74 unlocks $50. A score below 60 starts at $25. This replaces the traditional credit check entirely for Corner Banker purposes.

**The Dignity Score is NOT a punishment instrument.** A step-down in NMM repayment does not crater the score. Missing a budgeting session does not crater the score. The score is designed to reflect effort and trajectory, not perfection. Grace communicates the score in a warm, encouraging way: *"Your Dignity Score is 68 this month — up 4 points from last month. The budgeting session we did together made a real difference."*

### 2.3 Credit Score Simulator ("What If" Tool)

**The Problem:** Financial decisions for Ruby are often made under cognitive overload, with incomplete information, and with consequences that only appear weeks later. She does not know whether to pay off the payday loan or the credit card first. She does not know whether opening a secured credit card will help or hurt her score. She is flying blind.

**The Solution:** The Credit Score Simulator is an interactive "What If" tool integrated into Grace's conversational interface. Ruby can ask Grace any financial scenario question and receive a modeled prediction of the impact on her traditional credit score.

**Example Scenarios:**

| Ruby's Question | What the Simulator Models |
| :--- | :--- |
| "What happens to my score if I pay off the $800 payday loan?" | Removes the high-utilization tradeline; models the score increase. |
| "Should I open a secured credit card or wait?" | Models the short-term dip from the hard inquiry vs. the long-term gain from the new tradeline. |
| "If I bring my credit card balance from $1,800 to $500, what happens?" | Models the utilization ratio improvement and projected score change. |
| "What if I dispute the old Rogers collection from 2021?" | Models the impact of removing the derogatory mark if the dispute succeeds. |

**Data Sources:** The simulator uses Ruby's actual credit bureau data (pulled with her consent via Equifax's consumer API or TransUnion's CreditView Dashboard integration) combined with Pulse's proprietary modeling engine. Equifax Canada's own **Optimal Path™** tool (launched September 2025) provides a benchmark for this type of AI-powered credit guidance [7].

**Grace's Delivery:** The simulator is not a dashboard Ruby has to navigate. Grace presents the insights conversationally: *"Ruby, I ran the numbers. If you put that $300 tax refund toward the credit card instead of the payday loan, your score goes up about 18 points. Want to talk through why?"*

### 2.4 Financial History Vault

**The Concept:** Ruby's financial history belongs to Ruby. Not to her bank. Not to a credit bureau. Not to a landlord. The Financial History Vault is a permanent, secure, and portable record of Ruby's financial behavior — independent of any single institution.

**What It Captures:**

- Maven membership history (start date, tier, payment consistency)
- NMM loan history (all draws, repayment records, step-down events)
- Rent payment history (reported and verified)
- Dignity Score trajectory over time
- Community participation records
- Grace conversation summaries (with Ruby's consent)
- Any Hidden Prime Letters generated

**Why It Matters — Open Banking Tailwind:** Canada's Consumer-Driven Banking Act (CDBA), advancing through Parliament in 2026, gives Canadians the statutory right to data portability and sovereignty over their financial information [8]. Pulse is designed to be fully compliant with and positioned to benefit from this framework. As open banking matures, the Financial History Vault becomes a portable financial passport that Ruby can share with any accredited institution.

**The "Thin File" Problem:** Many Ruby Reds are "credit invisible" — they have no credit file at all, or a file so thin that bureaus cannot generate a reliable score. The Financial History Vault solves this by building a parallel financial identity that can be presented to alternative lenders, landlords, and employers as evidence of reliability.

**Data Sovereignty:** Ruby can view, download, and delete her Vault data at any time. Consistent with the Maven principle that "Only Maven Can Turn Grace Off," the Vault is never deleted without Ruby's explicit instruction — not even if she cancels her membership. Her history is hers.

### 2.5 The Hidden Prime Letter

**The Problem:** Ruby is prime. She pays her rent. She repays her loans. She shows up for her community. But her traditional credit score says otherwise, because the traditional credit system does not see her. The Hidden Prime Letter makes her visible.

**What It Is:** The Hidden Prime Letter is a formalized, Pulse-generated reference document that synthesizes Ruby's Financial History Vault data, Dignity Score, and payment track record into a professional letter that she can present to landlords, employers, or alternative lenders.

**Format and Content:**

The letter is generated by Grace and signed (digitally) by the Maven platform. It includes:

- Ruby's Dignity Score and score trajectory over the past 12 months
- A verified summary of rent payment history (months on-time, total payments made)
- NMM repayment history (if applicable and consented to)
- Community participation summary
- A plain-language statement of Ruby's reliability and character

**Use Cases:**

| Situation | How the Hidden Prime Letter Helps |
| :--- | :--- |
| Applying for a rental unit | Landlord sees verified payment history even if credit score is low |
| Applying for a car loan from an alternative lender | Lender sees Dignity Score and repayment track record |
| Applying for a job that requires a financial background check | Employer sees a structured, professional financial character reference |
| Applying for a secured credit card | Bank sees evidence of reliability beyond the thin credit file |

**Eligibility:** The Hidden Prime Letter is available to any member with a Dignity Score of 60 or above and at least 6 months of continuous Maven membership. It is generated on demand by Grace and can be re-generated monthly as the data improves.

### 2.6 Monthly Reality Check (Solvency Review)

**The Philosophy:** Ruby deserves to know the truth about her financial situation, delivered with compassion and without judgment. The Monthly Reality Check is Pulse's monthly solvency review — a collaborative conversation between Grace and Ruby that assesses whether the current financial trajectory is sustainable.

**What It Reviews:**

- Total debt load versus monthly income
- Debt-to-income ratio trend (improving, stable, or deteriorating)
- Upcoming large expenses (seasonal, predictable)
- NMM balance and repayment trajectory
- Rent and utility payment status

**The Bankruptcy Candidacy Flag:** If the Monthly Reality Check identifies that Ruby's debt load is mathematically insurmountable — that even with optimal behavior, she cannot repay her debts within a reasonable timeframe — Pulse flags her as a **bankruptcy or consumer proposal candidate**. This is not a punishment. It is a strategic assessment.

In Canada, a consumer proposal stays on a credit file for three years after completion (TransUnion) [9]. A first bankruptcy stays for six to seven years after discharge [10]. These are not permanent sentences. They are temporary notations on the path to a clean slate.

**The Phoenix Protocol:** When Ruby enters bankruptcy or a consumer proposal, Pulse activates **Phoenix Mode**:

- Grace accompanies Ruby through the insolvency process, explaining each step in plain language.
- On **Day 4 post-discharge**, Pulse begins the credit reconstruction protocol: identifying the right secured credit card, setting up rent reporting, and establishing the new Dignity Score baseline.
- Phoenix Mode continues for 24 months post-discharge, providing monthly progress reports and celebrating every milestone.

**Grace's Language:** *"Ruby, I want to be honest with you about what I'm seeing in the numbers. The math is really hard right now. I want to talk about some options — including one that might feel scary but could actually be the fastest path to a clean start. Can we talk about it?"*

### 2.7 Credit Rebuilding Roadmap

**The Concept:** A personalized, step-by-step pathway from Ruby's current credit score to her target score. Not generic advice. Not a blog post about secured credit cards. A specific, sequenced, milestone-based plan built for Ruby's exact situation.

**How It Works:**

Grace pulls Ruby's current Equifax and TransUnion scores (with consent), analyzes her credit file for the highest-leverage improvement opportunities, and generates a prioritized roadmap. The roadmap is presented conversationally and updated monthly.

**Sample Roadmap (Score: 520 → Target: 680):**

| Month | Action | Projected Score Impact |
| :---: | :--- | :--- |
| Month 1 | Activate rent reporting (Equifax + TransUnion) | +15 to +25 points over 3 months |
| Month 2 | Open a secured credit card ($500 deposit, 10% utilization) | +10 to +20 points over 6 months |
| Month 3 | Dispute the 2021 Rogers collection (expired, disputable) | +20 to +40 points if successful |
| Month 6 | Bring credit card utilization from 85% to below 30% | +25 to +35 points |
| Month 12 | Request credit limit increase on secured card (no hard pull) | +5 to +10 points |
| Month 18 | Apply for a second secured card or credit builder loan | +10 to +15 points |
| Month 24 | Graduate to an unsecured credit card | Confirms prime status |

**Milestone Celebrations:** Every milestone on the roadmap is celebrated by Grace. Not with a generic "Congratulations!" but with a specific, human acknowledgment: *"Ruby, you just crossed 600. I know how hard you've worked for this. That's not just a number — that's a new door opening."*

---

## Section 3: The Long Game — Grace and Ruby Over 20 Years

Pulse is designed for a 15-to-20-year relationship. This is not a product that Ruby uses for six months and discards. It is a persistent financial companion that grows with her.

### 3.1 Year 1: Stabilization

**Ruby's Profile:** In crisis or recently stabilized. Credit score is typically 300-520. She may have a bankruptcy, consumer proposal, or multiple derogatory marks. She is living paycheck to paycheck and has no emergency fund.

**Pulse's Role:** Activate rent reporting immediately. Establish the Dignity Score baseline. Generate the first Hidden Prime Letter at month 6. Run the first Monthly Reality Check and determine whether a consumer proposal is the right path. Begin the Credit Rebuilding Roadmap.

**Milestones Celebrated:**
- First month of verified rent reporting on her credit file.
- Dignity Score reaching 60 for the first time.
- Completing the first Monthly Reality Check without a crisis.
- Surviving a financial emergency (flat tire, medical bill) without a payday loan.

### 3.2 Year 5: Reconstruction

**Ruby's Profile:** Credit score has crossed 600. Derogatory marks are aging off or have been successfully disputed. She has at least one secured credit card with a positive payment history. She is no longer using payday lenders. Her Dignity Score is in the 70-80 range.

**Pulse's Role:** Graduate Ruby from secured to unsecured credit products. Begin modeling homeownership scenarios in the Credit Score Simulator. Update the Credit Rebuilding Roadmap to target 680+. Generate an updated Hidden Prime Letter that reflects five years of consistent behavior.

**Milestones Celebrated:**
- First approval for an unsecured credit card.
- Crossing the 600 credit score threshold.
- Completing a consumer proposal (if applicable) — the R7 notation begins its countdown.
- Five years of continuous Maven membership.

### 3.3 Year 10: Leverage

**Ruby's Profile:** Credit score is 680+. She qualifies for prime lending rates on auto loans. She is actively using the Financial History Vault to negotiate better terms with landlords and lenders. Her Dignity Score is 85+. She may be mentoring newer Village members.

**Pulse's Role:** Model homeownership pathways. Identify the specific credit score threshold for mortgage pre-approval in her market. Begin the "Shade Tree" conversation — what financial legacy does Ruby want to leave for her children? Introduce the concept of a Registered Education Savings Plan (RESP) or Tax-Free Savings Account (TFSA).

**Milestones Celebrated:**
- Securing an auto loan at prime rates (not alternative lending rates).
- Moving into a preferred rental unit using the Hidden Prime Letter.
- Leading a Savings Circle in the Village.
- Achieving a Dignity Score of 90+.

### 3.4 Year 15-20: Generational Wealth

**Ruby's Profile:** Credit score is 720+. She is mortgage-eligible. The "poverty penalty" has been eradicated from her financial life. She is building generational wealth — not just surviving. Her children are growing up with a financially stable parent.

**Pulse's Role:** Support the mortgage application process. Celebrate the homeownership milestone. Begin the transition conversation — Ruby is now a Wisdom Giant in her own right, and her financial journey is a story worth sharing with the next generation of Ruby Reds entering the Village.

**Milestones Celebrated:**
- Mortgage pre-approval.
- Funding a child's first investment account.
- Achieving a Dignity Score of 95+.
- Becoming a Wisdom Giant — sharing her story with the Village.

---

## Section 4: Integration with the Three-Legged Stool

### 4.1 Pulse + Corner Banker

The Dignity Score is the primary input into Corner Banker's loan limit engine. This is the most direct and consequential integration in the ecosystem.

| Dignity Score | NMM Allotment | Corner Banker Relationship |
| :---: | :---: | :--- |
| 75-100 | $100 | Full access. Ruby has demonstrated sustained reliability. |
| 60-74 | $50 | Mid-tier access. Ruby is building. |
| 40-59 | $25 | Entry-level access. Ruby is starting or recovering. |
| 0-39 | $0 (pending review) | Big Mama has a conversation with Ruby before any draw is approved. |

When Ruby successfully repays a full $100 NMM draw with no step-downs, Pulse automatically generates a positive credit reporting event. This is a direct conversion of Corner Banker behavior into traditional credit history — the two legs working in concert.

### 4.2 Pulse + Maven Community

Community behavior in the Maven Village is not just social — it is financial. Pulse converts social capital into credit capital through the Dignity Score.

| Maven Community Behavior | Dignity Score Impact |
| :--- | :--- |
| Lifeline Link participation (paying it forward) | +2 points per event (Community Participation dimension) |
| Good Neighbor Barter completion | +1 point per completion |
| Savings Circle consistent contribution | +3 points per month (Savings Circle dimension) |
| Referring a new member | +2 points per verified referral (Referrals dimension) |
| Completing a Wisdom Giants session | +1 point (Community Participation dimension) |

This integration ensures that Ruby's investment in her community is recognized and rewarded in her financial profile. It also creates a virtuous cycle: a stronger Dignity Score unlocks better Corner Banker terms, which reduces financial stress, which increases community participation, which further strengthens the Dignity Score.

### 4.3 Grace as the Orchestrator

Grace is the connective tissue between all three legs. Pulse data flows into every Grace conversation, allowing Grace to be proactive rather than reactive.

**Proactive Pulse Scenarios:**

- If the Monthly Reality Check shows Ruby's debt-to-income ratio deteriorating, Grace surfaces a Corner Banker liquidity bridge *before* Ruby misses a payment.
- If Ruby's Dignity Score drops below 60, Grace initiates a check-in conversation and offers a budgeting session.
- If Ruby's rent reporting streak reaches 12 months, Grace celebrates the milestone and runs a Credit Score Simulator scenario showing what 24 months of reporting will achieve.
- If Ruby's traditional credit score crosses a key threshold (600, 660, 700), Grace delivers a personalized celebration and updates the Credit Rebuilding Roadmap.

---

## Section 5: Financial and Revenue Model

### 5.1 Pricing and Bundling

Pulse is not a standalone product. It is an integrated layer of the Maven ecosystem, delivered as part of the subscription tiers.

| Maven Tier | Pulse Access | Rationale |
| :--- | :--- | :--- |
| **Free ($0)** | Dignity Score (view only) | Ruby can see her score but cannot actively build it without a paid tier. |
| **Daily ($1.99/day)** | Dignity Score + basic rent reporting | Minimum viable Pulse for gig workers and daily-income earners. |
| **Weekly Lite ($5.99/week)** | Dignity Score + rent reporting | Standard Pulse access. |
| **Weekly Full ($11.99/week)** | Full Pulse suite | All 7 core services active. Hidden Prime Letter available at month 6. |
| **Monthly ($45.99/month)** | Full Pulse suite + priority | All 7 core services, monthly Credit Rebuilding Roadmap update, priority Hidden Prime Letter generation. |

### 5.2 Revenue Model

The primary revenue driver for Pulse is **membership retention**. By providing a long-term credit rebuilding pathway, Pulse transforms Maven from a short-term crisis tool into a permanent financial companion. A member who has been rebuilding her credit with Pulse for three years is not going to cancel her membership — her financial history is in the Vault, her Dignity Score is climbing, and Grace knows her story.

Secondary revenue opportunities include:

- **Referral partnerships with prime financial product providers:** When Ruby graduates to a prime credit card, auto loan, or mortgage, Pulse may generate a referral fee from vetted, dignity-aligned partners. This is strictly secondary and subject to rigorous vetting — no predatory lenders, no high-fee products.
- **B2B data insights (anonymized, aggregated):** Anonymized, aggregated Dignity Score and credit rebuilding data may be of value to community development financial institutions (CDFIs), credit unions, and policy researchers. This requires explicit member consent and strict data governance.

### 5.3 Zero-Penalty Data Philosophy

Consistent with the Maven pricing strategy, Pulse never holds Ruby's data hostage. If Ruby steps down to a lower tier due to cash flow issues, her Financial History Vault data is preserved in full. Active rent reporting may pause, but no historical data is deleted. When she steps back up, her Pulse journey resumes exactly where it left off.

---

## Section 6: Compliance and Regulatory Environment

### 6.1 Credit Bureau Partnerships

Pulse will interface with both major Canadian credit bureaus:

| Bureau | Score Range | Rent Reporting Status | Key Product |
| :--- | :---: | :--- | :--- |
| **Equifax Canada** | 300-900 | Accepted since ~2020; used in score calculation | Optimal Path™ (AI-powered credit guidance, Sept 2025) [7] |
| **TransUnion Canada** | 300-900 | Accepted as dedicated category since January 2026 [2] | CreditView Dashboard |

Both bureaus require data furnishers to use the **Metro 2 format** and submit a minimum of 1,000 records per month. Pulse will either partner with established pipelines (FrontLobby, Zenbase) or pursue direct data furnisher agreements as membership volume warrants.

### 6.2 Canadian Rent Reporting Ecosystem

| Platform | Bureaus | Key Feature | Relevance to Pulse |
| :--- | :--- | :--- | :--- |
| **FrontLobby** | Equifax + TransUnion (Jan 2026) | Privacy Commissioner approved; 1M+ rental units | Primary partnership candidate for rent reporting infrastructure |
| **Zenbase** | Equifax + TransUnion | Retroactive 24-month reporting; rent splitting | Secondary partnership; strong tenant-facing UX |
| **Esusu** | US bureaus only | VantageScore 4.0 integration; strong research base | US benchmark; not directly applicable in Canada |

### 6.3 PIPEDA Compliance

The Personal Information Protection and Electronic Documents Act (PIPEDA) governs the collection, use, and disclosure of personal information in Canada. Pulse operates on the following compliance principles:

**Consent:** All credit reporting, Dignity Score calculation, and Financial History Vault data collection requires explicit, plain-language opt-in consent from Ruby. Consent is obtained conversationally by Grace during onboarding and is fully revocable at any time.

**Transparency:** Ruby can view all data stored about her in the Financial History Vault at any time (the "Memory Mirror" principle from the Maven service registry). She can request deletion of any data that is not required for active service delivery.

**Purpose Limitation:** Data collected for Pulse is used only for the purposes disclosed to Ruby at the time of collection. It is not sold, shared with third parties, or used for advertising without explicit additional consent.

**Privacy Commissioner Precedent:** The Office of the Privacy Commissioner of Canada confirmed in 2025 that FrontLobby's rent reporting practices comply with PIPEDA, establishing a clear compliance pathway for Pulse's rent reporting operations [1].

### 6.4 Open Banking and the Consumer-Driven Banking Act

Canada's Consumer-Driven Banking Act (CDBA), advancing through Parliament in 2026, creates the legal framework for the Financial History Vault's data portability features [8]. Key provisions relevant to Pulse:

- Consumers have the right to share their financial data with accredited third parties.
- Accredited parties must meet security and privacy standards set by the Financial Consumer Agency of Canada (FCAC).
- Data portability applies to transaction history, account information, and payment history.

Pulse is designed to be fully compliant with the CDBA framework from launch, positioning it to benefit from the open banking ecosystem as it matures.

### 6.5 Provincial Credit Reporting Legislation

Credit reporting in Canada is governed by both federal (PIPEDA) and provincial legislation. Key provincial laws include:

| Province | Legislation | Key Requirement |
| :--- | :--- | :--- |
| Ontario | Consumer Reporting Act | Consent required for credit checks; consumers have right to access their file |
| British Columbia | Business Practices and Consumer Protection Act | Similar consent and access rights |
| Alberta | Consumer Protection Act | Governs credit reporting agencies operating in Alberta |
| Quebec | Act Respecting the Protection of Personal Information in the Private Sector (Law 25) | Stricter than PIPEDA; explicit consent for sensitive data |

Pulse will maintain province-specific consent flows to ensure compliance across all Canadian jurisdictions.

---

## Section 7: Vault Sweep — What Already Exists

The following table documents all relevant Pulse-related content found across the mavens-knowledge-vault during the initial sweep. This ensures the spec is grounded in existing institutional knowledge and does not duplicate or contradict prior work.

| Source File | Relevant Content | Integration into This Spec |
| :--- | :--- | :--- |
| `projects/tiger-21/Tiger21_Comprehensive_Background.md` | Dignity Score (0-100), Hidden Prime Letter, Friday Pulse dashboard rhythm, Day-4 Credit Reconstruction, Phoenix Mode, Clean Slate, Wallet Warrior persona | Sections 2.2, 2.5, 2.6, 3.x |
| `projects/maven/maven-cashco/MAVEN_PRICING_STRATEGY_V2.md` | NMM credit reporting letter on successful $100 repayment; step-down model | Sections 2.1, 4.1, 5.1 |
| `knowledge-base/maven_143_services_complete.md` | Rent Reporting (AI Score 100 — highest priority service) | Section 2.1 |
| `session-ledgers/Session_Ledger_March20_2026.md` | Three-Legged Stool (Leg 3 = PULSE confirmed); Innovation #19 | Section 1.1 |
| `GitHub_Innovation_Master_List.md` | Rent Reporting connects to Innovation #11 (Financial Stress Detection Engine) | Section 2.1, 4.3 |
| `innovation-libraries/Named_Innovation_Library.md` | The Phoenix (hero name ⭐); The Corner; Grace Fights Back | Section 2.6 |
| `projects/ruby-red/Ruby_Red_Alignment_Toolkit.md` | Design for Achiever + Explorer; never shame, always hope; Ruby Red Litmus Test | All sections |
| `vivid-vision/Maven_Vivid_Vision_Draft.md` | "Ending the poverty penalty";
 30-year vision | Section 3.x |
| `knowledge-base/ECOSYSTEM_MAP.md` | Big Mama's Genius Village; "Our Data. Our Power. Our Destiny." | Section 2.4 |
| `projects/hb1000-architecture/pearls-brain/Pearl_Comprehensive_Whitepaper_V3.md` | Poverty premium documentation; Ruby Red's daily reality | Section 1.2 |

---

## Section 8: The Ruby Red Litmus Test

Before any Pulse feature goes live, it must pass the Ruby Red Litmus Test from the Ruby Red Alignment Toolkit. This is a non-negotiable gate.

| Test | Question | Pulse Design Response |
| :---: | :--- | :--- |
| 1 | Does this feature **reduce** her cognitive load? | Yes. Grace delivers all Pulse insights conversationally. Ruby never has to navigate a complex dashboard. |
| 2 | Does it create **hope** rather than anxiety? | Yes. Every Pulse touchpoint is framed as progress, not deficiency. |
| 3 | Does it avoid all forms of **shame or guilt**? | Yes. Step-downs are not penalized. Bankruptcy is framed as a strategic reset. |
| 4 | Is all competition strictly **opt-in**? | Yes. Dignity Score is private. No leaderboards. No public comparisons. |
| 5 | Is it fully accessible and optimized for **mobile**? | Yes. All Pulse features are delivered through Grace's mobile-first interface. |
| 6 | Does it respect her **limited time** and attention? | Yes. Monthly Reality Check is conversational, not a form. Roadmap updates are delivered as brief summaries. |
| 7 | Does it celebrate **small, meaningful wins** along the way? | Yes. Every milestone on the Credit Rebuilding Roadmap is celebrated by Grace. |
| 8 | Would I genuinely recommend this feature to a **stressed working mother** I know? | Yes. This is the design standard. |
| 9 | Does it embody **"there but for the grace of God go I"**? | Yes. This is the North Star of the entire product. |

---

## Section 9: Build Priorities and Phasing

### Phase 1 — Foundation (Months 1-6)
The minimum viable Pulse that delivers immediate value to Ruby and validates the core hypothesis.

| Priority | Feature | Rationale |
| :---: | :--- | :--- |
| P1 | Rent-to-Credit Reporting (via FrontLobby or Zenbase API) | Highest-leverage, lowest-complexity credit building tool. Immediate value. |
| P1 | Dignity Score (calculation engine) | Required for Corner Banker integration. Enables NMM allotment decisions. |
| P2 | Monthly Reality Check (basic solvency review) | Prevents crises before they happen. |
| P2 | Credit Rebuilding Roadmap (basic version) | Gives Ruby a path forward. |

### Phase 2 — Intelligence (Months 7-12)
Adding the proprietary intelligence layer that differentiates Pulse from generic credit tools.

| Priority | Feature | Rationale |
| :---: | :--- | :--- |
| P1 | Credit Score Simulator ("What If" tool) | Empowers Ruby to make high-leverage decisions. |
| P1 | Hidden Prime Letter (generation engine) | Unlocks rental and lending opportunities for Ruby. |
| P2 | Financial History Vault (full implementation) | Data portability and sovereignty. CDBA alignment. |

### Phase 3 — Long Game (Months 13-24)
Building the 20-year relationship infrastructure.

| Priority | Feature | Rationale |
| :---: | :--- | :--- |
| P1 | Phoenix Mode (post-bankruptcy protocol) | Serves the most vulnerable Ruby Reds. |
| P1 | Milestone celebration engine | Retention and engagement. |
| P2 | Generational wealth modeling (Year 10+ scenarios) | Aspirational vision for long-term members. |

---

## Section 10: Open Questions for the SIC HB1000 Solve Team

The following questions require input from the Wisdom Giants on the team before the spec can be finalized.

1. **Bureau Partnership Strategy:** Should Pulse pursue a direct data furnisher agreement with Equifax and TransUnion, or partner with FrontLobby/Zenbase as intermediaries? The direct path offers more control but requires 1,000+ monthly records (minimum TransUnion threshold). The intermediary path is faster to launch but creates a dependency.

2. **Dignity Score Weighting:** The proposed weights (40/20/15/15/10) are a starting point. The Wisdom Giants on the team — particularly those with expertise in behavioral economics and credit risk — should validate these weights. Are there other dimensions that should be included (e.g., utility payment history, telco payment history)?

3. **Hidden Prime Letter Legal Review:** The Hidden Prime Letter is a reference document, not a credit report. However, its use in lending decisions may trigger regulatory scrutiny. Legal review is required before launch to confirm it does not constitute a "consumer report" under provincial credit reporting legislation.

4. **Phoenix Mode Integration with Licensed Insolvency Trustees:** The Monthly Reality Check's bankruptcy candidacy flag should ideally connect Ruby to a Licensed Insolvency Trustee (LIT) network. Does CashCo have existing relationships with LITs that Pulse can leverage?

5. **Retroactive Rent Reporting:** Zenbase offers retroactive reporting of up to 24 months of past payments. Should Pulse offer this as a premium feature? The cost is approximately $19.90 per member for the retroactive report. The credit score impact can be significant.

---

## References

[1] FrontLobby. (2026, January 28). "FrontLobby Now Reports Rent Payments to TransUnion Canada." Retrieved from https://frontlobby.com/2026/01/frontlobby-now-reports-rent-payments-to-transunion-canada/

[2] Yahoo Finance / TransUnion. (2026, January 28). "TransUnion and Zenbase Bring Rental Payment Reporting to Canada." Retrieved from https://finance.yahoo.com/news/transunion-zenbase-bring-rental-payment-110000472.html

[3] NerdWallet Canada. (2024). "Equifax Credit Score in Canada: Ranges and How to Access." Retrieved from https://www.nerdwallet.com/ca/p/article/finance/equifax-credit-score

[4] Zenbase. (2026). "Zenbase: Automated Rent Reporting and Split Rent Payments." Retrieved from https://myzenbase.com/

[5] VantageScore / Esusu. (2025, November 5). "Positive Rental Data Provided by Esusu Boosts VantageScore 4.0 Predictive Performance." Retrieved from https://vantagescore.com/resources/knowledge-center/positive-rental-data-provided-by-esusu-boosts-vantagescore-4-0-predictive-performance-identifying-11-more-defaults

[6] TransUnion. (2025, September 10). "TransUnion Report Finds More Consumers Likely Self-Reporting Rent Payments in 2025." Retrieved from https://newsroom.transunion.com/transunion-report-finds-more-consumers-likely-self-reporting-rent-payments-in-2025/

[7] Equifax Canada. (2025, September 25). "Equifax Canada Introduces Optimal Path, an Interactive Solution to Empower Financial Well-Being." Retrieved from https://www.globenewswire.com/news-release/2025/09/25/3156094/0/en/Equifax-Canada-Introduces-Optimal-Path-an-Interactive-Solution-to-Empower-Financial-Well-Being.html

[8] Department of Finance Canada. (2025). "Canada's Consumer-Driven Banking Framework." Retrieved from https://www.canada.ca/en/department-finance/programs/financial-sector-policy/open-banking-implementation/budget-2025-canadas-framework-for-consumer-driven-banking.html

[9] TransUnion Canada. (2025). "How Does a Consumer Proposal or Bankruptcy Affect Your Credit." Retrieved from https://cairp.ca/industry-views-news/blogs/How_Does_a_Consumer_Proposal_or_Bankruptcy_Affect_Your_Credit

[10] Moses Advisory Group. (2026, February 9). "How Long Does Bankruptcy Stay on Your Credit Report in Canada?" Retrieved from https://www.mosesadvisorygroup.ca/bankruptcy/how-long-does-bankruptcy-stay-on-credit-report/

---

*"It's expensive to be poor. We think that's a crime in society, and we're trying to change it."*  
— SIC HB1000 Solve Team

*Pulse is how we change it.*
