# Maven Canada: Top 5 Fulfillment Options — Decision-Ready Comparison

**Prepared for:** SIC/HB1000 Solve Team (Tim, Trina, Michelle, Sam)
**Date:** March 20, 2026
**North Star:** Ruby Red — the 35-45 year old CFO of her household. Every delivery is a dignity-preserving promise. Every day of delay is a broken one.

---

## The Mission in One Sentence

Maven needs a fulfillment partner that can pick, pack, and ship both a standalone 2-roll toilet paper delivery **and** a curated monthly box (from five themed SKU lists: Kids Lunches, Pantry Staples, Breakfast, Household Items, Personal Care) to any address in Canada — all within the tight margin of a ~$25 CAD/month membership.

---

## Master Scoring Table

Each option is scored across five dimensions, each worth 20 points, for a total out of 100.

| Option | Service Level | Product Availability | Cost | Ease of Use | Automation Potential | **Total** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **1. SHIPHYPE Canada** | 18 | 19 | 15 | 17 | 19 | **88** |
| **2. Stallion Express** | 15 | 16 | 19 | 14 | 14 | **78** |
| **3. Canada Post SMB** | 17 | 20 | 16 | 5 | 14 | **72** |
| **4. ShipBob Canada** | 18 | 18 | 10 | 12 | 10 | **68** |
| **5. Instacart Business** | 10 | 15 | 5 | 5 | 10 | **45** |

---

## Cost Comparison Table

All costs are estimated in CAD and represent the total per-delivery cost (product + pick/pack + shipping). Product costs assume bulk wholesale procurement.

| Option | Setup Cost | 2-Roll TP Delivery | Themed Box Delivery | Admin Burden (1=Auto, 5=Manual) | Canada-Wide Coverage | Time to Launch | Scalable to 5,000+ |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| **SHIPHYPE Canada** | $0 | ~$12.50 | ~$22.00 | 1 | Yes (via Canada Post/couriers) | 2-4 weeks | Yes |
| **Stallion Express** | $0 | ~$9.00 | ~$16.00 | 2 | Yes (via Canada Post) | 1-2 weeks | Partial |
| **Canada Post SMB** | $0 | ~$11.00 | ~$19.00 | 5 | Yes (every address) | Immediate | No |
| **ShipBob Canada** | ~$975 USD | ~$16.00+ | ~$26.00+ | 1 | Yes | 4-6 weeks | Yes |
| **Instacart Business** | $0 | N/A | ~$45.00+ | 5 | Major cities only | Immediate | No |

---

## Option 1: SHIPHYPE Canada — Score: 88/100

SHIPHYPE is a Canadian 3PL that was built specifically for subscription box companies and crowdfunding campaigns. Their core service is kitting and pick-and-pack from a curated SKU list — which is precisely Maven's model. They operate warehouses in Toronto and Vancouver, providing strong national reach through their carrier partnerships. [1]

**Scoring Rationale:** SHIPHYPE earns its top position because it is the only option that natively solves for all five dimensions simultaneously. The 18/20 on Service Level reflects their excellent customer support and national carrier network, with a minor deduction for the fact that their own physical warehouses are limited to two cities. The 19/20 on Product Availability reflects that all five of Maven's current box themes (dry goods, personal care, household) are well within their capabilities — the one-point deduction acknowledges that cold-chain items remain outside their scope. The 15/20 on Cost reflects genuinely competitive pricing (~$2.50 CAD pick/pack + carrier rates) but acknowledges that the total per-delivery cost of ~$22 CAD for a themed box is meaningful against a $25 member fee, requiring careful margin management. The 17/20 on Ease of Use reflects that once inventory is at their warehouse, the Maven ops team is largely hands-off. The 19/20 on Automation Potential reflects their robust API and CSV integration options, which can connect directly to the Grace admin Roll Call workflow.

| Dimension | Score | Rationale |
| :--- | :---: | :--- |
| Service Level | 18/20 | Toronto + Vancouver warehouses, national carrier reach, strong account management |
| Product Availability | 19/20 | Handles all 5 box themes (dry/ambient); no cold chain capability |
| Cost | 15/20 | ~$2.50 CAD pick/pack + carrier; transparent pricing, no setup fees |
| Ease of Use | 17/20 | Ops team monitors dashboard; inventory management is simple |
| Automation Potential | 19/20 | Full API + CSV integration; can automate the Grace admin Roll Call |

**Strengths:** SHIPHYPE was purpose-built for subscription box kitting, which means Maven is not asking them to do something outside their core competency. Their pricing is transparent with no hidden fees, and their onboarding is designed for small-to-mid-sized businesses — not enterprise clients. Their API documentation is accessible enough for Maven's developers to connect the Grace admin dashboard without a massive engineering investment.

**Weaknesses:** Maven must purchase inventory upfront in bulk and freight it to SHIPHYPE's warehouse before a single box ships. This requires working capital and a 2-4 week lead time. Additionally, if Maven ever expands into perishable grocery items, a separate cold-chain 3PL would be required.

**Best for:** The 30-day and 90-day scalable solution. This is the primary recommendation.

**Estimated cost per delivery:** ~$12.50 CAD (2-roll TP) | ~$22.00 CAD (themed box)

---

## Option 2: Stallion Express — Score: 78/100

Stallion Express is Canada's leading discounted shipping platform, trusted by over 40,000 Canadian eCommerce sellers. [2] They offer deeply discounted Canada Post and courier rates (up to 75% off) with no monthly fees. While they do offer a 3PL/fulfillment service, their primary strength is as a shipping discount layer — they inject parcels directly into the Canada Post network at rates unavailable to individual shippers.

**Scoring Rationale:** Stallion earns its second-place position primarily on Cost (19/20) — they offer the lowest per-parcel rates of any option in this comparison. Their Service Level (15/20) is solid but limited by warehouse locations in Ontario, BC, and Quebec only. Product Availability (16/20) is adequate for dry goods but their kitting and subscription box assembly services are less sophisticated than SHIPHYPE's. Ease of Use (14/20) is moderate — if Maven uses them purely for shipping, the ops team still has to pack boxes in-house. Automation Potential (14/20) reflects a functional API but one that requires custom development to integrate with the Grace admin, as their platform is geared toward Shopify and Amazon sellers.

| Dimension | Score | Rationale |
| :--- | :---: | :--- |
| Service Level | 15/20 | Reliable via Canada Post, but own warehouses limited to ON/BC/QC |
| Product Availability | 16/20 | Can store dry goods; kitting services less robust than dedicated subscription 3PLs |
| Cost | 19/20 | Lowest shipping rates in Canada; no monthly fees |
| Ease of Use | 14/20 | Shipping-focused; Maven must pack in-house if not using their 3PL service |
| Automation Potential | 14/20 | API available but requires custom dev work for Grace admin integration |

**Strengths:** The cost advantage is real and significant. For a program where every dollar of margin matters, Stallion's rates can save $3-6 per parcel compared to standard Canada Post retail pricing. There are no setup fees, no monthly minimums, and no contracts.

**Weaknesses:** Stallion is fundamentally a shipping company that offers fulfillment as a secondary service. Their subscription box kitting capabilities are not their core product. If Maven needs complex multi-SKU assembly (e.g., picking 6 specific items for a Kids Lunches Box), SHIPHYPE is the better operational fit.

**Best for:** A cost-conscious 30-day solution, or as a shipping layer on top of in-house packing. Also excellent as a backup carrier for SHIPHYPE when rates need to be optimized.

**Estimated cost per delivery:** ~$9.00 CAD (2-roll TP) | ~$16.00 CAD (themed box)

---

## Option 3: Canada Post Solutions for Small Business — Score: 72/100

Canada Post's Solutions for Small Business program is a free membership that provides tiered shipping discounts based on annual spend. [3] At Level 1 (under $2,499/year in shipping), Maven receives up to 31% off Expedited Parcel rates. The program requires no setup, no contracts, and no minimum orders. Labels are generated via the Snap Ship web tool and parcels are dropped at any of Canada Post's 5,800 post office locations.

**Scoring Rationale:** Canada Post earns its third-place position almost entirely on Service Level (17/20) and Product Availability (20/20). It reaches every single Canadian address — including remote First Nations communities, rural Manitoba, and the Maritimes — where couriers like Purolator or Stallion may not deliver. This universal coverage is critical for Ruby Red, who may live anywhere. However, the Ease of Use score (5/20) is a frank assessment of the reality: this model requires Trina, Michelle, and Sam to physically pack every box, print every label, and drive to the post office. It is a human-powered operation that cannot scale.

| Dimension | Score | Rationale |
| :--- | :---: | :--- |
| Service Level | 17/20 | Reaches 100% of Canadian addresses, including rural and remote |
| Product Availability | 20/20 | Maven controls inventory in-house; 100% availability by definition |
| Cost | 16/20 | Up to 31% off Expedited Parcel; competitive but not the cheapest |
| Ease of Use | 5/20 | Fully manual: pack, label, drive, drop. Unsustainable at scale. |
| Automation Potential | 14/20 | Canada Post API can automate label generation; physical packing remains manual |

**Strengths:** Zero setup time. The account is free and can be created in minutes. There are no minimums, no contracts, and no waiting for a 3PL agreement to be signed. This is the only option that can be operational *today*.

**Weaknesses:** The administrative burden on the Maven Solve Team is severe. At 364 families, this is a part-time job for at least one team member. At 1,000+ members, it becomes physically impossible. This model has a hard ceiling.

**Best for:** The immediate stopgap (Days 1-14). Use this today to keep Ruby Red's delivery promise while SHIPHYPE is being onboarded.

**Estimated cost per delivery:** ~$11.00 CAD (2-roll TP) | ~$19.00 CAD (themed box)

---

## Option 4: ShipBob Canada — Score: 68/100

ShipBob is one of the world's largest technology-driven 3PL providers, with fulfillment centers in Toronto, Vancouver, Montreal, and Ottawa. [4] They are the industry standard for fast-growing direct-to-consumer brands and offer 2-day shipping capabilities across most of Canada. Their technology platform is exceptional, with deep integrations across Shopify, WooCommerce, and all major eCommerce platforms.

**Scoring Rationale:** ShipBob scores well on Service Level (18/20) and Product Availability (18/20) because their infrastructure is genuinely excellent. The critical drag is Cost (10/20): their onboarding fee of approximately $975 USD, combined with a complex fee structure that includes receiving fees ($35/hour for the first two hours), storage fees ($5/bin, $10/shelf, $40/pallet), and per-pick charges, makes them economically prohibitive for a 96-subscriber program operating on a $25/month membership fee. [5] The Ease of Use (12/20) and Automation Potential (10/20) scores reflect that while their technology is powerful, it is designed for enterprise-scale operations and requires significant onboarding investment.

| Dimension | Score | Rationale |
| :--- | :---: | :--- |
| Service Level | 18/20 | 2-day shipping, 4 Canadian warehouses, enterprise-grade reliability |
| Product Availability | 18/20 | Handles all dry goods SKUs; no cold chain |
| Cost | 10/20 | ~$975 USD onboarding fee; complex pricing; total cost ~$26+ CAD/box |
| Ease of Use | 12/20 | Powerful software but heavy onboarding; designed for enterprise catalogs |
| Automation Potential | 10/20 | Excellent API, but overkill for Maven's current scale |

**Strengths:** ShipBob's technology platform is the best in class. When Maven reaches 5,000+ active subscribers, the investment in ShipBob's onboarding will pay for itself through operational efficiency and 2-day shipping capabilities.

**Weaknesses:** At Maven's current scale of 96 active Stripe subscribers, ShipBob is simply too expensive. The onboarding fee alone represents the equivalent of nearly 40 monthly memberships. The per-delivery cost of ~$26 CAD for a themed box exceeds the entire monthly membership fee.

**Best for:** The 2-year horizon. Revisit ShipBob when Maven has 2,000+ active subscribers and the economics justify the investment.

**Estimated cost per delivery:** ~$16.00+ CAD (2-roll TP) | ~$26.00+ CAD (themed box)

---

## Option 5: Instacart Business — Score: 45/100

Instacart Business is a B2B version of the consumer Instacart platform, designed to allow businesses to order office supplies and essentials for delivery to a single business location. [6] It is included in this comparison to provide a definitive answer to the question of whether consumer grocery delivery platforms can serve as a fulfillment layer for Maven.

**Scoring Rationale:** Instacart Business scores poorly across nearly every dimension because it is fundamentally the wrong tool for this job. Its Service Level (10/20) is limited to major Canadian cities, leaving rural and remote Maven members unserved. Its Product Availability (15/20) depends entirely on what local grocery stores have in stock — meaning the specific SKUs in a Kids Lunches Box or Personal Care Box cannot be guaranteed. Its Cost (5/20) is the most damaging dimension: retail markup on products, plus service fees, plus driver tips, means a themed box delivery would cost $45+ CAD — nearly double the entire membership fee. Its Ease of Use (5/20) requires the ops team to manually place hundreds of individual orders. Its Automation Potential (10/20) is constrained by Terms of Use that prohibit using a single account to drop-ship to hundreds of residential addresses.

| Dimension | Score | Rationale |
| :--- | :---: | :--- |
| Service Level | 10/20 | Major cities only; rural Canada is unserved |
| Product Availability | 15/20 | Dependent on local store stock; no SKU guarantee |
| Cost | 5/20 | Retail markup + fees + tips = ~$45+ CAD per box; economically unviable |
| Ease of Use | 5/20 | Requires 364 manual orders placed by the ops team |
| Automation Potential | 10/20 | ToU prohibits multi-address drop-shipping; no automation path |

**Strengths:** Same-day delivery is available in major cities for emergency situations.

**Weaknesses:** Instacart Business is designed for a company ordering coffee and paper clips for its own office. It is not a fulfillment platform. Using it for Maven's model violates the spirit (and likely the letter) of their Terms of Use, destroys the cost margin, and cannot serve rural members.

**Best for:** A genuine emergency — one specific family in a major city who needs an urgent delivery and where no other option is available. Not for programmatic fulfillment.

**Estimated cost per delivery:** N/A for TP (minimum order thresholds) | ~$45.00+ CAD (themed box)

---

## Strategic Recommendations

### Immediate Action: This Week

**Use Canada Post Solutions for Small Business as the emergency bridge.** Sign up for a free account at canadapost-postescanada.ca/cpc/en/small-business today. The ops team packs the TP and any pending box orders in-house, generates discounted labels via the Snap Ship tool, and drops them at the nearest post office. This is manual, it is painful, and it is not scalable — but it keeps the promise to Ruby Red while a proper solution is built.

### 30-Day Plan: Set Up Properly

**Sign a fulfillment agreement with SHIPHYPE Canada.** While the Canada Post stopgap is running, Tim must immediately initiate the SHIPHYPE onboarding process. The parallel workstreams are: (1) purchase bulk inventory of TP and the core SKUs for all five box themes from a Canadian wholesaler (Costco Business Centre is the fastest path); (2) freight the inventory to SHIPHYPE's Toronto warehouse; and (3) implement a daily CSV export from the Grace admin Roll Call to upload to SHIPHYPE, triggering the pick, pack, and ship workflow. At this point, Trina, Michelle, and Sam's daily job shifts from manual packing to reviewing a dashboard.

### 90-Day Ideal State: Fully Automated

**Connect the Grace admin directly to SHIPHYPE via API.** Once the physical logistics are proven through the CSV workflow, allocate developer time to build a direct API connection between the Grace admin dashboard and SHIPHYPE (or via ShipStation as an intermediary). When a member selects their box theme and their Stripe payment clears, a webhook fires automatically. SHIPHYPE receives the order, picks the specific SKUs for that box theme, packs it, and ships it — with zero human intervention from the Maven Solve Team. The Roll Call becomes a monitoring tool rather than a task list.

### Combined Model Recommendation

Maven should run a **two-partner model** for the foreseeable future:

**SHIPHYPE** handles all themed box fulfillment (the five curated SKU lists). This is their core competency and the model they are built for.

**Stallion Express** (or Canada Post SMB) handles the standalone 2-roll TP delivery, which is a simpler, lighter-weight shipment that benefits most from the lowest possible per-parcel rate rather than complex kitting capabilities.

This split keeps costs optimized: the TP delivery is a small, simple parcel that should cost as little as possible, while the themed box requires the kitting expertise that justifies SHIPHYPE's slightly higher pick/pack fee.

---

## References

[1] SHIPHYPE, "Subscription Box Fulfillment Company Canada," shiphype.com/subscription-box-fulfillment-canada/

[2] Stallion Express, "Canada's #1 eCommerce Shipping Service," stallion.ca

[3] Canada Post, "Shipping discounts and solutions | Small Business," canadapost-postescanada.ca/cpc/en/small-business/shipping-discounts.page

[4] Speed Commerce, "11 Best 3PLs in Canada 2026, Ranked," speedcommerce.com/3rd-party-logistics/11-best-3pls-in-canada/

[5] Speed Commerce, "ShipBob vs. Shiphype — A Detailed Comparison," speedcommerce.com/vs/shipbob-vs-shiphype-detailed-comparison/

[6] Instacart, "Instacart Business," instacart.com/business
