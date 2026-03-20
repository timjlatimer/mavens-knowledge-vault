Source: Tim HB1000 research session, March 2026. This document informs Maven's TP fulfillment strategy and the operational setup for the Roll Call workflow.

# Toilet Paper Supplier Research (Canada)

## 1. Overview
Maven is implementing a direct-to-door toilet paper delivery model to ensure members always have access to this essential item. The model is structured to serve every customer who reaches out:
*   **Non-subscribers:** Receive a one-time delivery of 2 rolls.
*   **Subscribers:** Receive an ongoing monthly delivery until cancellation.

To execute this, Maven requires a Canadian-based supplier and/or fulfillment partner capable of warehousing the product, managing daily CSV order files, and seamlessly handling both one-off shipments and recurring subscriptions.

## 2. Canadian TP Manufacturers
These manufacturers represent the source of the product. They are best suited for a model where Maven sources directly and either manages fulfillment internally or pairs the manufacturer with a separate 3PL.

*   **Cascades Tissue Group (Canada):** A large Canadian tissue manufacturer offering private-label programs and strong national distribution. They are worth exploring for fulfillment or hybrid models.
*   **Kruger Products:** A major Canadian tissue manufacturer handling both private-label and branded production. They frequently partner with third-party logistics providers.
*   **Irving Consumer Products:** A Canadian manufacturer (known for Royale and private label) offering strong supply stability and domestic production.
*   **Atlas Paper / Atlas Graham Canada:** Provides commercial and consumer tissue products with flexible B2B programs. They are often easier to negotiate fulfillment workflows with compared to larger conglomerates.

## 3. Canadian 3PL Fulfillment Partners
These partners specialize in the logistics of storage and shipping, particularly for subscription models. Maven would source the toilet paper separately and store it with these partners.

*   **ShipBob Canada:** Offers warehousing in Canada and expertly handles both one-off and subscription orders. They support daily order files/APIs and feature strong integrations with Shopify and subscription platforms.
*   **Fulfillment Plus (Canada):** A Canadian-based 3PL with experience handling consumables. They can manage manual or automated order ingestion.
*   **Deliverr (Canada locations):** A subscription-capable fulfillment service known for strong last-mile coverage.
*   **Stallion Express (Canada):** Provides Canadian warehousing with competitive shipping rates, making them a good option for lightweight subscription boxes.

## 4. Wholesale/Distribution Suppliers
These suppliers offer bulk toilet paper and may provide dropshipping or connect Maven with fulfillment partners.

*   **Toronto Paper Distributors:** A distributor of paper products and supplies. A good initial contact for bulk sourcing and potential packaging/fulfillment support.
*   **Canada Papers:** A Canadian paper distributor that may offer wholesale tissue products and assist with custom packaging or fulfillment strategies.
*   **MPI Paper Mills:** A paper mill/producer that could serve as an upstream partner for bespoke branding or bulk sourcing.
*   **R3 Redistribution:** Offers wholesale towels and toilet paper with customizable programs; worth contacting regarding subscription models for direct delivery.
*   **Planetize Packaging:** Provides bulk toilet paper supply with delivery across Canada.

## 5. Supplier Outreach Email Template
This template is designed to quickly qualify whether a supplier can support Maven's specific operational model.

**Subject:** Fulfillment & Subscription Partnership Inquiry – Maven (Canada)

Hello,

My name is Michelle Craig, and I’m reaching out on behalf of Maven.

Maven is a direct-to-consumer toilet paper service in Canada. We deliver toilet paper straight to customers’ doors, either as a one-time delivery or as an ongoing monthly subscription.

We are currently looking for a Canadian-based supplier and fulfillment partner that can support the following operational model:

* Source and warehouse toilet paper inventory
* Pack and ship orders directly to customers across Canada
* Fulfill one-off orders (2 rolls per customer)
* Fulfill monthly subscription orders (recurring shipments until cancellation)
* Accept a daily order file (CSV or similar) with new shipments, subscription enrollments, and cancellations
* Handle subscription start, pause, and cancellation instructions provided by us

From a customer perspective:
* Non-subscribers receive a one-time delivery of 2 rolls
* Subscribers receive a monthly delivery, billed and managed by Maven, until they cancel

We are exploring partners who can either:
* Manage both warehousing and fulfillment directly, or
* Warehouse product and integrate smoothly with our subscription workflow

If this is within your capabilities, we would love to learn more about:
* Minimum order quantities and storage requirements
* Per-unit and fulfillment pricing
* Subscription handling process
* Geographic shipping coverage across Canada
* Any system or file format requirements on your end

Thank you for your time. We’re excited to find a partner who can help us make toilet paper delivery effortless for every customer who reaches out to Maven.

Warm regards,
Michelle Craig
Maven

## 6. Recommended Setup
For the fastest and cleanest launch, the recommended operational setup is **Option 1: Source + 3PL + CSV**.

1.  **Source:** Purchase toilet paper from a Canadian manufacturer (e.g., Cascades, Kruger, or Atlas).
2.  **Store & Ship:** House the inventory with a subscription-friendly 3PL (e.g., ShipBob or Fulfillment Plus).
3.  **Automate:** Send daily CSV files to the 3PL covering new one-off shipments, new subscriptions, and subscription cancellations.

This setup provides Maven with full flexibility, easy cancellation handling, and the ability to serve every customer regardless of their subscription status.

## 7. Operational Requirements
To execute this strategy, the chosen partner must be able to support:
*   **Daily CSV Ingestion:** The ability to process a daily file detailing new orders, subscription starts, and cancellations.
*   **Subscription Management:** Seamless handling of enrollment and cancellation workflows without disrupting the customer experience.
*   **National Coverage:** Reliable geographic shipping coverage across Canada.

## 8. Next Steps
To move forward with supplier selection and onboarding, the following assets need to be developed:
1.  **One-Page Supplier Brief:** A concise document outlining Maven's requirements to attach to outreach emails.
2.  **CSV Schema:** A standardized format for the daily order and subscription files.
3.  **Cost Model:** A detailed breakdown of per-customer economics for both the 2-roll one-off delivery and the monthly subscription.
