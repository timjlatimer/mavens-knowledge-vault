> **Source:** Tim HB1000 research session, March 2026. This document informs the Rent Reporting Agent spec and the Pulse product roadmap.

# FrontLobby vs Zenbase: Rent Reporting Research

## 1. Overview
Rent reporting is the process of turning a tenant's regular rent payments into a "tradeline" on their credit file. In Canada, rent is not automatically reported to credit bureaus. A third-party service is required to bridge this gap, reporting payments to Equifax and/or TransUnion so that rent behaves like a loan or payment history.

For Ruby Red—the Chief Financial Officer of the household who is often part of the unbanked, underbanked, or working poor—this is a transformative benefit. She is already making difficult decisions to pay her largest monthly expense. Rent reporting empowers her by turning that existing obligation into a credit-building asset, helping her navigate the financial systems that typically leave her behind. It provides a pathway to better credit scores without requiring her to take on new debt, ultimately reducing the "expensive to be poor" tax.

## 2. FrontLobby
FrontLobby operates as a credit reporting engine controlled primarily by landlords. It is designed as a compliance and enforcement tool to influence tenant behavior and reduce delinquency.

**How it works:**
The landlord signs up and creates a lease record containing tenant information, rent amount, and payment status. The tenant is then invited to the platform, where they must verify their identity and provide consent for positive payments to be reported. Each month, the landlord manually updates the rent status (paid, late, or unpaid), and the platform sends this data to credit bureaus (typically Equifax and the Landlord Credit Bureau). Positive reporting requires tenant consent, but negative reporting (debt) can be reported without consent after approximately 30 days overdue.

**Costs:**
For platform operators, FrontLobby costs approximately $239/year per account (which includes 20 active leases), plus roughly $1/month per additional lease. Tenants may pay around $4/month (or $48/year) for access via the Landlord Credit Bureau.

**Pros for Maven:**
- Strong for collections and payment discipline if Maven is tied to housing or property management.
- Built-in compliance and legal frameworks for debt reporting.

**Cons for Maven:**
- Requires landlord participation and manual monthly updates.
- Late payments can hurt the tenant's credit quickly.
- The tenant cannot fully self-serve without their landlord's involvement.

## 3. Zenbase
Zenbase functions as a tenant-first, automated fintech product that wraps rent into a credit-building subscription. It acts as an intermediary and verifier, completely independent of the landlord.

**How it works:**
The tenant signs up directly for the CreditBuilder product. Zenbase verifies the lease and payment history, automatically tracks rent payments regardless of the payment method, and reports them to both Equifax and TransUnion. Zenbase also offers an optional "CustomRent" feature where Zenbase pays the landlord in full, and the tenant repays Zenbase in installments, creating a credit tradeline that acts like a loan.

**Costs:**
For the user (or subsidized by Maven), Zenbase costs approximately $2.90/month (around $24/year). There is an optional fee of ~$19.90 to add past rent history. The split rent feature costs ~$9.90/month plus a ~0.75% fee if utilized.

**Pros for Maven:**
- No landlord involvement is required; it is entirely tenant-driven.
- Fully automated reporting with no manual updates needed.
- Reports to both Equifax and TransUnion.
- Feels like a "credit hack" or financial advantage product for the user.

**Cons for Maven:**
- Less focus on collections or enforcement (though this aligns better with Maven's empathetic approach).

## 4. Comparison Table

| Feature | FrontLobby | Zenbase |
| :--- | :--- | :--- |
| **Who drives it** | Landlord | Tenant |
| **Landlord required** | Yes (for positive reporting) | No |
| **Reporting method** | Manual monthly updates | Automated tracking |
| **Credit bureaus** | Typically Equifax / LCB / others | Equifax + TransUnion |
| **Negative reporting** | Yes (debt collection focus) | Not core focus |
| **Consent model** | Required for positive reporting | Built into signup |
| **Extra features** | Tenant screening, collections | Split rent (acts like credit line) |
| **Core Philosophy** | Compliance and enforcement tool | Fintech credit product |

## 5. Integration Options for Maven
There are three distinct packaging models for integrating this service into the Maven membership program:

1.  **Included Benefit (Strongest Positioning):** Maven covers the cost of the service. This adds massive perceived value. The positioning is: "Build your credit just by paying rent — included with Maven."
2.  **Discounted Perk:** Maven negotiates a partner rate, resulting in a low cost to Maven while maintaining high perceived value. The positioning is: "Members get exclusive access to rent reporting (save 50%)."
3.  **Add-on Upsell:** This model monetizes the feature directly and works well if Maven has tiered memberships. The positioning is: "Upgrade to Maven+ to build credit with rent."

## 6. Implementation Roadmap
1.  **Choose the Model:** Decide between the included benefit, discounted perk, or add-on upsell models based on Maven's financial strategy.
2.  **Partner Outreach:** Contact Zenbase to request a partnership, affiliate, or embedded offering.
3.  **Determine Integration Depth:**
    *   *Light Integration (1-2 weeks):* Provide a signup link or co-branded landing page with no technical work required.
    *   *Medium Integration (2-6 weeks):* Embed the offering into Maven's onboarding process and pass user information via referral or API.
    *   *Deep Integration (1-3 months):* Create a fully embedded, white-labeled experience inside the Maven dashboard with automated enrollment.
4.  **Handle Compliance:** Ensure users explicitly consent to credit reporting and provide clear disclosures regarding the potential impact of late payments, adhering to PIPEDA regulations.
5.  **Positioning:** Frame the benefit correctly in all marketing materials.

## 7. Strategic Recommendation
**Zenbase is the recommended path for Maven.**

Given that Maven is a consumer membership program focused on financial wellness and lifestyle benefits for individuals like Ruby Red, Zenbase aligns perfectly. It offers a lower cost per user, requires no landlord dependency, provides easier onboarding, and functions as a true fintech perk rather than an enforcement tool. It empowers the user directly.

## 8. Maven Positioning
The messaging must shift away from calling this a "rent reporting feature." Instead, the positioning should be:

**"Turn your biggest monthly expense into a credit-building asset."**

This framing significantly increases the perceived value. Psychologically, it makes the user feel like they are finally getting credit for something they already pay, transforming a basic subscription into a financial advantage product.

## 9. Cost Model
The base cost for Zenbase is approximately **$2.90/month per user**. Maven can approach this cost through three subsidy models:

1.  **Member Pays:** The user pays the ~$2.90/month directly to Zenbase. Maven does zero operational work and carries no cost, but has less control over the experience.
2.  **Maven Subsidizes:** Maven negotiates a bulk partner rate (e.g., $2-$3/user/month) and covers the cost, bundling it into the membership. This provides the highest perceived value and acts as a strong retention lever, though Maven carries the cost.
3.  **Hybrid Model:** Maven partially subsidizes the cost. For example, the member pays $1-$2/month, and Maven covers the remainder. This feels like a premium but affordable perk and reduces Maven's financial burden.

## 10. Next Steps
1.  **Partner Outreach:** Draft and send a partner outreach email to Zenbase to initiate discussions on bulk pricing and integration options.
2.  **Compliance Review:** Establish the necessary PIPEDA consent flows and clear disclosures required for Canadian users.
3.  **Finalize Pricing Strategy:** Select the specific subsidy model and integration depth to map out exact pricing tiers for Maven.
