# Governance Decisions Log - 2026-03-16

**Project:** SIC HB1000 Ecosystem Governance
**North Star:** To establish a robust, transparent, and machine-enforceable governance framework for all AI operations.
**Document Type:** Decision Log
**Date:** 2026-03-16

---

This document logs the key governance decisions made during the Master Jeeves session on 2026-03-16.

## 1. Autonomy Score Framework

*   **Decision:** A standardized Autonomy Score framework is now mandatory for all significant autonomous decisions.
*   **Framework:** 4 dimensions, each worth 25 points, for a total of 100.
    *   Reversibility (25 pts)
    *   Spend Authority (25 pts)
    *   Relationship Risk (25 pts)
    *   Strategic Alignment Confidence (25 pts)
*   **Rationale:** To provide a clear, consistent, and auditable measure of the significance and risk of autonomous actions.

## 2. Human-in-the-Loop (HIL) Protocol

*   **Decision:** During the current MVP phase, all significant decisions must surface to Tim HB1000 for review.
*   **Rationale:** To ensure human oversight and strategic alignment during the critical early stages of the ecosystem's development.

## 3. Ruby Red North Star Clarification

*   **Decision:** The "Ruby Red" persona is a **LOCAL** North Star for specific initiatives only. It is not a universal North Star for the entire SIC HB1000 ecosystem.
*   **Rationale:** To prevent misapplication of a specific user persona to projects where it is not relevant, ensuring that each project is guided by its own specific, declared North Star.

## 4. Source of Truth Division Structure

*   **Decision:** The Source of Truth Division is formally established with a clear hierarchy and mandate.
*   **Structure:**
    1.  **The Harvester:** Retrieves raw knowledge from all sources.
    2.  **The Archivist:** Classifies, commits, and indexes all knowledge.
    3.  **Citation Officer:** Verifies the truth claims within all deliverables.
    4.  **The Watchman:** Audits the execution and compliance of all other agents and protocols.
*   **Rationale:** To create a complete, end-to-end system for knowledge integrity, from raw intake to final audit.

## 5. Archivist v2.1 Configuration Decisions

*   **Decision:** Five key configuration decisions for The Archivist v2.1 were confirmed by Tim HB1000.
*   **Details:**
    1.  **Vault Taxonomy:** To be built dynamically, not pre-seeded.
    2.  **Freshness Cadence:** Changed to DAILY/WEEKLY/MONTHLY tiers.
    3.  **PII Detection:** Rule-based regex only, flagging for review, not auto-blocking.
    4.  **Index Shard Refresh:** Confirmed as a DAILY cadence.
    5.  **Swarm Signal Cadence:** Changed to weekly (`PULSE_WEEKLY`).
*   **Rationale:** To fine-tune The Archivist's performance based on real-world operational needs and the rapid pace of AI development.
