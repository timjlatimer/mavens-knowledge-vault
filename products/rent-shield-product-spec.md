---
name: rent-shield-product-spec
description: "Rent Shield (also 'Guaranteed Rent') — Full product specification for a community-funded rent protection product targeting Ruby Red (working poor renters). Covers product mechanics, fund model, dual-brand structure, Maven/Grace integration, open regulatory and actuarial questions, and North Star alignment."
metadata:
  author: SIC HB1000 Solve Team
  version: "1.0"
  status: "DRAFT — Pending Tim Review"
  created: "2026-03-21"
  vault: "https://github.com/timjlatimer/mavens-knowledge-vault"
  north_star: "Ruby Red"
  product_family: "Maven Financial Protection Suite"
  open_questions: 6
---

# Rent Shield — Product Specification v1.0

```
╔══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║   RENT SHIELD  /  GUARANTEED RENT                                              ║
║   "You will always be able to budget your rent."                               ║
║                                                                                ║
║   STATUS: DRAFT v1.0 — 2026-03-21                                              ║
║   CLASSIFICATION: PRODUCT SPECIFICATION — SIC HB1000 SOLVE TEAM               ║
║                                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════╝
```

---

## 1. THE CORE INSIGHT

Salaries trail rent and cost-of-living increases by **18 to 24 months**. This is not a personal failure — it is a structural lag built into how wages respond to inflation. By the time a working household's income catches up to what rent already costs, the rent has moved again.

Rent Shield buys Ruby that time. It is a **24-month bridge** — a product that holds the line on her rent burden while her salary catches up to reality. It does not lower her rent. It does not negotiate with her landlord. It does something more powerful: it **removes the variable**. Ruby knows her number. She can plan.

> **The Promise:** "You will always be able to budget your rent. No surprise increases. No panic. You know your number."

This is the job to be done. Ruby Red is the household CFO. Her rent is her largest fixed expense — often 40-60% of her take-home pay. A surprise rent increase at lease renewal does not just affect her housing. It cascades into groceries, childcare, utilities, and the impossible choices she is already making every day in the grocery line. Rent Shield removes that cascade before it starts.

---

## 2. NORTH STAR ALIGNMENT

**Ruby Red** is the primary beneficiary and the product's design constraint. She is the 35-45 year old working poor mother of two who is the Chief Financial Officer of her household. She is a renter. She is navigating financial precarity in a system that was not designed for her.

The principle that governs this product: **"It's expensive to be poor — we're changing that."**

Rent Shield is Social Impact Capitalism. The fund model means Maven is not a charity — it is a sustainable business that happens to protect vulnerable renters. The yield from the community fund pays the claims. The principal grows. The community gets stronger. This is the model that makes the mission permanent rather than dependent on grants or goodwill.

---

## 3. PRODUCT MECHANICS

### 3.1 Premium Structure

| Parameter | Value |
| :--- | :--- |
| **Monthly premium** | $10/month |
| **Annual premium** | $120/year (prepay option available) |
| **Waiting period** | 12 months from enrollment before any claim can be made |
| **Coverage period** | 24 months from first claim date |
| **Ongoing requirement** | Member must maintain active $10/month payments throughout the entire coverage period |
| **Lapse consequence** | Coverage ends immediately upon payment lapse |

The 12-month waiting period is not an arbitrary barrier — it aligns with the standard lease cycle. Ruby is already in a lease when she enrolls. The risk event (a rent increase) only materializes at renewal. The waiting period ensures the product is used as protection against future increases, not as a retroactive claim on an increase that has already happened.

### 3.2 Coverage Trigger

Coverage activates when a landlord raises rent **above the annual cost-of-living index** (CPI or equivalent — see Open Question 1). The trigger is not any rent increase; it is the *excess* above what cost-of-living growth would justify. A landlord raising rent by 3% in a 3% CPI environment is not a covered event. A landlord raising rent by 8% in a 3% CPI environment triggers coverage on the 5% gap.

### 3.3 Coverage Structure — Two-Year Model

The coverage period spans two years from the first claim date. The structure is designed to be self-correcting: as the CPI baseline steps up each year, the gap Maven must cover narrows, reducing the cost to the fund while Ruby remains fully protected.

**Year 1 — Full Gap Coverage**

Maven covers 100% of the excess above the cost-of-living index for 12 months.

> **Example:** CPI = 3%. Landlord raises rent 8%. Maven covers the 5% gap for 12 months. If Ruby's rent was $1,400/month, the covered excess is $70/month ($840 for the year).

**Year 2 — Stepped Baseline Coverage**

The CPI baseline has now stepped up to reflect the prior year's inflation. Maven covers the difference between the landlord's increase and the new, higher CPI baseline. The gap is smaller because the baseline is higher. Ruby is still fully protected; Maven's cost is lower.

> **Example (continuing):** In Year 2, the new CPI baseline is 8% (the prior year's rent level is now the new floor). If the landlord raises rent another 5%, and CPI for Year 2 is 3%, Maven covers the 2% gap. Ruby's exposure is zero.

This two-year structure reflects the core insight: salaries trail by 18-24 months. By the end of the coverage period, Ruby's income should have caught up to the new rent reality. The product bridges the gap, then steps back.

---

## 4. THE FUND MODEL

Rent Shield operates as a **community fund** — not an insurance product in the traditional sense (see Open Question 4 on regulatory classification). All member premiums are pooled and invested. The goal is for the fund to be self-sustaining from yield alone, never breaking into principal.

| Fund Parameter | Target |
| :--- | :--- |
| **Premium pool source** | All $10/month member premiums |
| **Investment yield target** | 5-10% annual (conservative, diversified) |
| **Claims payment source** | Yield only — principal preserved |
| **Actuarial assumption** | Not all members will make claims (standard insurance pooling logic) |
| **Sustainability goal** | Fund pays all claims from yield indefinitely |
| **Principal role** | Reserve and growth — never the primary claims source |

The actuarial logic is straightforward: not every renter will face a rent increase above CPI in any given year. Not every member who faces such an increase will file a claim. The pool of premiums from non-claiming members funds the claims of those who do. This is the same logic that makes car insurance, home insurance, and health insurance financially viable — the many protect the few, and the fund grows.

The 5-10% yield target is conservative relative to historical market returns. A well-managed community investment fund, even in a risk-averse allocation, can sustain this yield. The goal is not to maximize returns — it is to ensure claims are always paid and the principal is never at risk.

The minimum fund size required before Maven can responsibly offer coverage is an open question that requires actuarial modeling (see Open Question 5).

---

## 5. DUAL PRODUCT STRUCTURE

Rent Shield is designed to operate as two distinct but connected products. This is a deliberate strategic choice: the Maven/Grace integration captures the Ruby Red market with high trust and low friction; the standalone brand captures the broader market through institutional partnerships.

### 5.1 Maven/Grace Integration — The Ruby Red Path

Ruby Red accesses Rent Shield through her Grace membership. This is a **premium Maven feature** — available to members at the Essentials or Plus tier (pricing TBD). Grace is the interface. Grace explains the coverage, tracks Ruby's protection status, notifies her when her waiting period is complete, files claims on her behalf, and integrates Rent Shield into her 90-day financial lift journey.

The integration is not just functional — it is relational. Grace knows Ruby's rent, her lease renewal date, her payday pattern, and her financial stress level. When a rent increase arrives, Grace is already there. She does not make Ruby navigate a claims portal. She says: "I saw your landlord raised your rent. You're covered. I filed the claim. Here's what happens next."

This is the Maven Soul Statement in action: **"We stand in there when life gets real."** A rent increase is one of the most stressful financial events in Ruby's life. Grace absorbs the complexity so Ruby does not have to.

### 5.2 Standalone Brand — "Rent Shield"

The standalone **Rent Shield** brand is available to anyone regardless of Maven membership. It is the same product — same $10/month, same mechanics, same fund — but accessed through a direct-to-consumer channel or through institutional partners.

**Target partner categories:**

| Partner Type | Strategic Rationale |
| :--- | :--- |
| **Housing organizations** | Direct access to renter populations; mission alignment |
| **Credit unions** | Trusted financial institutions serving working-class members; natural distribution |
| **Municipalities** | Housing affordability mandates; potential subsidy or co-funding arrangements |
| **Employers** | Benefits package differentiation; employers serving hourly/service workers |
| **Tenant advocacy groups** | Mission alignment; grassroots distribution; credibility with renters |

The standalone brand creates a larger market opportunity and reduces Maven's dependence on its own membership growth for fund scale. A larger fund means better actuarial stability and lower per-member risk. The two products are mutually reinforcing: Rent Shield members who discover Maven through the standalone product become Grace members; Grace members who discover Rent Shield through Maven become Rent Shield evangelists.

---

## 6. MAVEN SOUL ALIGNMENT

This product exists because rent increases are one of the primary mechanisms by which poverty is perpetuated. A working family that has stabilized its finances — paid down debt, built a small emergency fund, started saving — can be set back 12-18 months by a single lease renewal. The landlord does not need to be malicious. The market does not need to be predatory. The structural lag between wages and rents is sufficient to cause the harm.

Rent Shield is the answer to the question: **"What would it take to make it less expensive to be poor?"** Not charity. Not a one-time grant. A sustainable, self-funded product that holds the line for Ruby while the system catches up to her.

The fund model is the proof of concept for Social Impact Capitalism: a product that is financially sustainable, serves a vulnerable population, and grows stronger as more people join. The more members, the more stable the fund. The more stable the fund, the more confidently Maven can offer coverage. The more coverage Maven offers, the more Ruby Red trusts Maven with the rest of her financial life.

---

## 7. OPEN QUESTIONS — FLAGGED FOR TIM

The following questions require Tim's input, external expertise, or further research before Rent Shield can move from specification to build. They are not blockers for the spec — they are the next layer of work.

| # | Question | Why It Matters | Who Resolves |
| :--- | :--- | :--- | :--- |
| **OQ-1** | What index do we use for "cost of living"? CPI (national), regional housing index, or a custom Maven index? | The trigger definition determines what counts as a covered event. A national CPI may understate local rent inflation in high-growth cities. A custom index gives Maven more control but requires more infrastructure. | Tim + data team |
| **OQ-2** | What is the maximum claim amount per month? | A cap is required for fund actuarial modeling. Without a cap, a single high-rent claimant could disproportionately draw from the fund. The cap should be set relative to Ruby Red's rent range — not luxury rents. | Actuarial modeling |
| **OQ-3** | Is there a maximum rent level for eligibility? | Rent Shield is designed for Ruby Red, not luxury renters. An eligibility ceiling (e.g., rents below $2,500/month) keeps the product targeted and the fund actuarially sound. | Tim + product team |
| **OQ-4** | Regulatory: Is this classified as insurance in Canada/US? If so, what licensing is required? | If Rent Shield is classified as insurance, Maven needs a license to offer it. This is a significant compliance and capital requirement. Alternative structures (mutual aid fund, benefit plan, warranty product) may avoid insurance classification. Legal opinion required. | Legal counsel — Canada + US |
| **OQ-5** | What is the minimum fund size before Maven can responsibly offer coverage? | Actuarial modeling needed. The fund must be large enough that a bad year (high claim rate) does not break into principal. This determines the launch timeline and the minimum member count at launch. | Actuarial modeling |
| **OQ-6** | Partnership strategy: housing orgs, credit unions, or direct-to-consumer first? | The first channel shapes the product's identity, pricing, and distribution infrastructure. Housing orgs offer mission credibility; credit unions offer financial infrastructure; direct-to-consumer offers speed. | Tim — strategic decision |

---

## 8. PRODUCT SUMMARY TABLE

| Attribute | Value |
| :--- | :--- |
| **Product name** | Rent Shield / Guaranteed Rent |
| **Premium** | $10/month ($120/year prepay option) |
| **Waiting period** | 12 months |
| **Coverage period** | 24 months from first claim |
| **Coverage trigger** | Rent increase above annual CPI (or equivalent index) |
| **Year 1 coverage** | 100% of excess above CPI |
| **Year 2 coverage** | Excess above new (stepped) CPI baseline |
| **Fund model** | Community pool, 5-10% yield target, claims from yield only |
| **Lapse rule** | Coverage ends immediately on payment lapse |
| **Maven integration** | Premium feature; Grace files claims, tracks status, integrates with 90-day journey |
| **Standalone brand** | "Rent Shield" — direct-to-consumer + institutional partners |
| **Target customer** | Ruby Red — working poor renter, household CFO, $X–$2,500/month rent (cap TBD) |
| **North Star metric** | Ruby's rent burden as % of income — target: stable or declining over 24 months |
| **Open questions** | 6 (regulatory, actuarial, index, cap, eligibility, partnership) |
| **Status** | Draft v1.0 — pending Tim review |

---

## 9. VERSION HISTORY

| Version | Date | Author | Changes |
| :--- | :--- | :--- | :--- |
| **1.0** | 2026-03-21 | SIC HB1000 Solve Team | Initial specification. Full product mechanics, fund model, dual-brand structure, Maven/Grace integration, 6 open questions. |

---

*"It's expensive to be poor." — We think that's a crime in society, and we're trying to change it.*

*Rent Shield is how we change it for the person whose biggest fixed expense just became unpredictable.*
