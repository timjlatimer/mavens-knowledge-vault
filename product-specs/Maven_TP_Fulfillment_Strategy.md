# Maven Toilet Paper Fulfillment: Urgent Action Plan & Logistics Strategy

**Prepared for:** SIC/HB1000 Solve Team (Tim, Trina, Michelle, Sam)
**Date:** March 20, 2026
**Objective:** Restore and optimize toilet paper fulfillment for 364 Maven families (Ruby Red) following the Amazon Business Prime suspension.

---

## 1. Executive Summary: The "Ruby Red" Imperative

For Ruby Red—the 35-45 year old CFO of her household—Maven's toilet paper delivery is not just a convenience; it is a tangible, dignity-preserving promise. Every day of delay is a broken promise that adds to her cognitive overload. With the Amazon Business Prime account suspended due to Terms of Use violations, Maven faces a critical operational bottleneck. 

This report outlines immediate stopgap measures to keep the 364 families supplied *this week*, a 30-day plan to transition away from Amazon dependency, and a 90-day ideal state for a fully automated, scalable fulfillment system.

---

## 2. Immediate Stopgap Options (Days 1-14)

Maven must immediately pivot to alternative retail delivery services to ensure no family misses a delivery while the Amazon issue is resolved or a 3PL is established.

### A. Walmart Canada Delivery Pass & Subscribe to Save
Walmart offers the most viable immediate alternative to Amazon Prime. Their "Delivery Pass" program provides unlimited free next-day delivery on groceries and essentials [1]. 
*   **Mechanism:** The operations team can manually process the daily "Roll Call" by placing individual orders through a Walmart account with Delivery Pass.
*   **Cost:** Delivery Pass is approximately $89/year (or less than $2/week) [2]. The cost of toilet paper (e.g., White Swan or Royale) is comparable to Amazon.
*   **Caveat:** Like Amazon, excessive shipping to hundreds of different addresses from a single consumer account may eventually trigger anti-fraud flags. This is strictly a 1-2 week stopgap.

### B. Instacart Business / Voila (Sobeys)
Instacart Business allows for multiple delivery addresses and offers a $0 delivery fee on the first three orders [3]. Voila by Sobeys offers reliable delivery but is geographically limited to Ontario, Quebec, and Alberta [4].
*   **Mechanism:** Manual ordering via the platform for each family on the Roll Call.
*   **Cost:** Higher unit cost per roll than Amazon or Walmart, plus service fees and driver tips.
*   **Verdict:** Use only if Walmart Delivery Pass fails or for emergency same-day deliveries.

### C. The "Amazon Adjacent" Bridge
While the *Business Prime* account is suspended, Maven can legally utilize a standard Amazon.ca account to send "Gift Orders" [5]. 
*   **Mechanism:** Items fulfilled by Amazon can be marked as gifts and sent to third-party addresses. 
*   **Caveat:** You cannot use standard Prime shipping benefits to purchase products for the purpose of resale or to ship to customers [6]. Doing so on a regular Prime account will likely result in a swift ban of that account as well. **Do not use regular Prime for this.** You must pay standard shipping rates if using Amazon.ca to fulfill to customers.

---

## 3. The Amazon Restoration Path

Tim is currently working to restore the Amazon Business Prime account. Understanding the violation is key to the appeal.

### The Violation
Amazon Business Acceptable Use Policy strictly prohibits using Business Prime shipping benefits to purchase products for the purpose of resale, rental, or to ship products directly to customers using Prime shipping [7]. Maven's model of using Subscribe & Save to drop-ship to 364 different residential addresses triggered an automated suspension.

### The Appeal Process (Plan of Action)
To reinstate the account, Tim must submit a Plan of Action (POA) that includes:
1.  **Root Cause:** Acknowledgment that Maven inadvertently violated the Business Prime terms by using the shipping benefits to fulfill orders directly to program members.
2.  **Corrective Action:** Confirmation that all Subscribe & Save orders to third-party addresses have been cancelled.
3.  **Preventive Measures:** A commitment that the Business Prime account will only be used for internal procurement (e.g., shipping to a central Maven facility) and *not* for direct-to-member fulfillment.

**Timeline:** Reinstatements for policy violations typically take 1 to 4 weeks [8]. 
**Strategic Note:** Even if reinstated, Maven *cannot* return to the old model of using Amazon Subscribe & Save for direct-to-door member fulfillment. Amazon will immediately re-suspend the account permanently.

---

## 4. Medium-Term Solution: 3PL & Subscription Fulfillment (Days 15-90)

To achieve scalability and comply with supplier terms, Maven must decouple the *purchasing* of toilet paper from the *fulfillment* of toilet paper. 

### Recommended Setup
1.  **Procurement:** Buy toilet paper in bulk (pallets) from a Canadian distributor (e.g., Costco Business Centre, Cascades PRO, or Kruger Products).
2.  **Warehousing & Fulfillment:** Store the pallets at a Canadian Third-Party Logistics (3PL) provider that specializes in subscription box fulfillment.
3.  **Automation:** Connect the Grace admin dashboard to the 3PL via API or automated daily CSV uploads.

### Top 3PL Candidates in Canada

| Provider | Specialization | Setup / Monthly Fees | Pick & Pack Cost | Shipping Cost (Est. 500g-1kg) |
| :--- | :--- | :--- | :--- | :--- |
| **SHIPHYPE** [9] | Subscription boxes, DTC | No setup fee. Small bin storage: $3/mo. | ~$1.83 USD (~$2.50 CAD) per poly mailer | ~$8.00 - $12.00 CAD |
| **ShipBob Canada** [10] | High-volume DTC | Implementation fees apply. | Bundled into total fulfillment cost | ~$9.00 - $14.00 CAD |
| **Stallion Express** [11] | Cheap domestic shipping | No monthly fees. Pay per parcel. | You pack, they ship. (Not a full 3PL) | ~$6.00 - $10.00 CAD |

**The SHIPHYPE Advantage:** SHIPHYPE is highly transparent with pricing and specifically caters to subscription box fulfillment in Canada [12]. They charge roughly $1.83 USD to pick and pack a poly mailer. If Maven procures bulk 2-roll packs, SHIPHYPE can store them in small bins ($3/month) and ship them out daily based on the Roll Call list.

### Procurement Economics (Costco Wholesale Benchmark)
*   **Kirkland Signature 2-Ply (30 rolls, 380 sheets):** ~$27.29 CAD per pack [13].
*   **Cost per roll:** ~$0.91 CAD.
*   **Cost per 2-roll one-off:** $1.82 CAD.
*   **Cost per 12-roll monthly sub:** $10.92 CAD.

---

## 5. Cost Comparison Table

This table models the estimated total cost to deliver a one-time 2-roll pack and a monthly subscription delivery (assuming 12 rolls/month) across different fulfillment models.

| Fulfillment Model | Setup Cost | Est. Cost: 2-Roll Delivery (Product + Ship) | Est. Cost: Monthly Sub (Product + Ship) | Admin Burden (1=Auto, 5=Manual) | Scalability (5000+ members) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Amazon Prime (Suspended)** | $0 | ~$5.00 | ~$15.00 | 4 (Manual S&S management) | Low (ToU violations) |
| **Walmart Delivery Pass (Stopgap)** | $89/year | ~$5.00 | ~$15.00 | 5 (Manual ordering) | Low (Account risk) |
| **SHIPHYPE 3PL + Bulk TP** | Low | ~$12.50 CAD* | ~$23.50 CAD* | 1 (API/CSV Automated) | High (Built for scale) |
| **In-House + Canada Post SMB** | $0 | ~$10.50 CAD | ~$20.00 CAD | 5 (Packing & driving to post office) | Very Low |

*\*Note: 3PL costs are higher per unit for micro-shipments (like 2 rolls) due to the fixed pick/pack and base carrier rates. However, it is the only legally compliant, scalable way to drop-ship physical products.*

---

## 6. Administrative Automation: Connecting "Roll Call"

To eliminate the manual burden on Trina, Michelle, and Sam, the Grace admin dashboard must be integrated with the chosen fulfillment solution.

### A. API Integration (The 90-Day Ideal State)
Most modern 3PLs (ShipBob, SHIPHYPE) integrate seamlessly with shipping software like **ShipStation**. 
*   Maven's developers can use the ShipStation REST API to programmatically create orders [14].
*   When a non-subscriber is approved, the Grace admin triggers a webhook to ShipStation to create a one-time order for SKU `TP-2ROLL`.
*   When a Stripe subscription is activated (`customer.subscription.created`), a webhook triggers the creation of a recurring order [15].

### B. CSV Automation (The 30-Day Plan)
If API integration requires too much developer time, a low-code solution can be implemented immediately:
1.  The Grace admin dashboard generates a daily "Roll Call" CSV export containing new one-off requests, new subscriptions, and cancellations.
2.  The operations team uploads this CSV directly into the 3PL's portal (e.g., SHIPHYPE or ShipStation) [16].
3.  The system maps the columns (Name, Address, SKU) and automatically generates the shipping labels and pick lists for the warehouse team.

---

## 7. Recommendations & Action Plan

### Immediate Action (Next 48 Hours)
1.  **Secure Walmart Delivery Pass:** Purchase a Walmart Delivery Pass to act as the immediate stopgap for the 364 families.
2.  **Process the Backlog:** Have the operations team manually process the Roll Call through Walmart to ensure Ruby Red receives her delivery this week.
3.  **Draft Amazon Appeal:** Submit the POA to Amazon acknowledging the Business Prime shipping violation, promising to cease drop-shipping to members.

### 30-Day Plan (Parallel Execution)
1.  **Engage a 3PL:** Contact SHIPHYPE and ShipBob Canada to secure a warehousing agreement.
2.  **Secure Bulk Supply:** Purchase 2-3 pallets of toilet paper from Costco Business Centre or a local distributor (e.g., Cascades) and freight them to the chosen 3PL.
3.  **Implement CSV Workflow:** Establish the daily CSV export from the Grace admin to upload to the 3PL, removing the need for manual order entry.

### 90-Day Ideal State
1.  **Direct Manufacturer Partnership:** Finalize a direct B2B supply agreement with Kruger PRO or Cascades for wholesale pricing, bypassing retail markup [17].
2.  **Full API Automation:** Connect the Grace admin and Stripe webhooks directly to ShipStation/3PL. 
3.  **Result:** When Ruby Red clicks "subscribe," a pallet in a Toronto warehouse is automatically decremented, a label is printed, and a box is shipped—with zero human intervention from the Maven operations team.

---

### References
[1] Walmart Canada, "Delivery Pass Membership," Walmart.ca.
[2] Walmart Canada, "Delivery Pass FAQs," Walmart.ca.
[3] Instacart, "Products Delivered Fast to Your Business," Instacart.ca.
[4] Sobeys Inc., "Voilà Online Grocery Shopping," Sobeys.com.
[5] Amazon Customer Service, "Send a Gift," Amazon.ca.
[6] Amazon Customer Service, "Business Prime Terms & Conditions," Amazon.com.
[7] Amazon Customer Service, "Amazon Business Acceptable Use Policy," Amazon.com.
[8] Seller Candy, "Amazon Account Reinstatement: Process, Appeals & Timelines," Sellercandy.com.
[9] SHIPHYPE, "Subscription Box Fulfillment Company Canada," Shiphype.com.
[10] GoBolt, "Best 3PL Companies in Canada: 2026 Comparison," Gobolt.com.
[11] Stallion Express, "Domestic Shipping: The Complete Guide To Savings," Stallion.ca.
[12] SHIPHYPE, "Pick and Pack Fulfillment Center Costs," Shiphype.com.
[13] Costco Business Centre, "Kirkland Signature bath tissue, 30 x 380 sheet," Costcobusinesscentre.ca.
[14] ShipStation, "Create/Update Order API Documentation," Shipstation.com.
[15] Stripe Documentation, "Using webhooks with subscriptions," Stripe.com.
[16] ShipStation Help, "Import Orders via CSV," Shipstation.com.
[17] Kruger PRO, "Get to Know Kruger PRO," Krugerpro.com.
