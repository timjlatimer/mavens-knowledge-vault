# Maven AI Team Brief

**Date:** March 14, 2026
**To:** SIC/HB1000 - Hive Mind Solving
**From:** Manus AI
**Subject:** Comprehensive Brief for the Maven V2 Rebuild

## 1. Introduction

This document provides a comprehensive strategic brief for the rebuild of the Maven application, designated "Maven V2." It synthesizes findings from a full analysis of the provided codebase (`maven-app-full-backup.zip`), a review of the live application, and an examination of key architectural and protocol documents, including `ARCHITECTURE.md`, `GRACE_KNOWLEDGE_INVENTORY.md`, and the `SKILL.md` anti-drift protocol. The full codebase has been successfully backed up and pushed to a new private GitHub repository: [timjlatimer/maven-app-v2][1].

This brief is intended to serve as the foundational document for the newly assembled AI team, outlining the current state of the application, defining the core team personas, and recommending a strategic roadmap for the build.

## 2. Current Application Summary

The Maven application, also referred to as "Support at Your Door," is a sophisticated, multi-faceted community support platform designed to serve the **Ruby Red** persona: the working poor and underbanked. It is a live, feature-rich system built on a modern, full-stack architecture.

### 2.1. Core Functionality

The platform is structured around three primary user experiences: a public-facing marketing site, a members-only portal, and a comprehensive administrative back-end. The central goal is to provide a holistic support ecosystem that addresses financial hardship, community connection, and emotional well-being.

Key features identified from the codebase and live application include:

| Feature Category | Specific Modules |
| :--- | :--- |
| **Direct Financial Support** | **Milk Money** (small, immediate cash grants), **Chaos Support** (larger emergency funds), **Make a Wish** (community-funded goals), **Daily Hand-Ups** (small daily giveaways). |
| **Community & Connection** | **Community Feed**, **Messaging**, **Village Chat**, **Wisdom Giants** (connecting with experienced members), **Community Moderation**. |
| **Financial Wellness** | **Budget Builder**, **Subscription Auditor** (implied), **Help Near You** (resource directory), **Deals Digest** (weekly grocery deals). |
| **Goods & Services** | **Maven Box** (monthly delivery of household essentials like toilet paper), **Winners Circle** (grocery box giveaways). |
| **Emotional & Narrative** | **Maven Moments**, **Stories**, **Walk in Her Shoes** (empathy-building exercises), **Song Studio** (AI-generated music). |
| **AI Assistant ("Grace")** | A deeply integrated AI assistant who serves as the primary user interface for onboarding, support, and relationship building. |

### 2.2. The "Grace" AI System

Grace is not a simple chatbot; she is a complex, multi-layered AI system designed for empathy and long-term relationship building. Her architecture includes:

*   **Grace's Brain:** An 11-table database schema that defines her identity, knowledge base, protocols, guardrails, and a learning loop for continuous improvement.
*   **Relationship Memory:** A 5-table system designed to remember personal details about each member, their family, their challenges, and their goals, enabling highly personalized and empathetic interactions.
*   **Knowledge Inventory:** Pre-loaded with 68 entries of "frontline wisdom" from team members who work directly with Ruby Red clients, focusing on trust-building and trauma-informed communication.

### 2.3. Live Application Observations

A review of the live application at `https://mavensupport-rkeuwu7t.manus.space/` confirms the public-facing marketing site is active. The design is professional, warm, and community-focused, successfully avoiding the sterile feel of traditional financial or government services. The Grace AI chat widget is prominent, reinforcing her role as the central point of contact. The pricing and feature tiers (Observer, Essentials, Plus) are clearly articulated, providing a low-friction entry point for new users.

## 3. The AI Team Personas

To successfully execute the Maven V2 rebuild, a specialized AI team is required. Each member embodies a critical perspective, ensuring the final product is technically robust, emotionally resonant, innovative, and ethically sound.

| Persona | Core Responsibilities |
| :--- | :--- |
| **1. The Architect** | Oversees the entire technical stack, ensuring the code is clean, scalable, and maintainable. Focuses on system integrity, database design, API structure, and performance. |
| **2. The Psychologist** | Champions the emotional and psychological well-being of the Ruby Red user. Ensures every feature is designed through a trauma-informed lens, fostering trust, safety, and empowerment. |
| **3. The Best Practice Junkie** | Scans the horizon for "Move 37" innovations—unexpected, game-changing ideas from other industries. Prevents insular thinking by bringing in best practices from outside the financial inclusion space. |
| **4. The UX Researcher** | Is the voice of the user, grounded in data. Focuses on data-driven design, A/B testing, user onboarding, and building trust through a seamless and intuitive user experience. |
| **5. The Compliance & Ethics Guardian** | Ensures the project operates within legal and ethical boundaries. Guards against recreating the broken systems of the "three gangster worlds" (political, bureaucratic, greedy capitalist). |
| **6. The Storyteller** | Crafts the "Hope Architecture." Articulates the narrative of "when this works," creating compelling stories and visions that inspire the team and resonate with the community. |

## 4. Current State of the Codebase

The provided codebase is a mature, well-documented, and comprehensive full-stack application. It appears to be the complete source code for the live Maven / Bingo City platform.

*   **What Exists:** A complete React 19 / Vite / TypeScript frontend, a Node.js / Express / tRPC backend, a Drizzle ORM layer, and a comprehensive database schema with 99 tables. The `ARCHITECTURE.md` document provides an excellent, up-to-date map of the entire system.
*   **What Works:** The core application logic, authentication, Stripe integration, and the foundational structure for the Grace AI are all in place. The project has an extensive test suite with 646 tests, which are all passing.
*   **What Needs to Change:** The primary need is not a rewrite, but a **rebuild and enhancement** guided by the new AI team personas. The existing codebase is a powerful foundation. The next step is to layer in the specialized perspectives of the Architect, Psychologist, UX Researcher, etc., to refine and expand upon what already exists.

## 5. Recommended Build Roadmap

Given the mature state of the codebase, the following roadmap is recommended to structure the V2 build.

**Phase 1: Persona-Driven Audits (1-2 Weeks)**
*   Each of the six AI personas performs a comprehensive audit of the existing codebase and live app from their unique perspective.
*   **Deliverable:** Each persona produces a report outlining strengths, weaknesses, and opportunities for improvement.
    *   *The Architect* reviews for scalability and code quality.
    *   *The Psychologist* reviews for trauma-informed design principles.
    *   *The UX Researcher* audits the onboarding flow and user funnels.
    *   And so on for each persona.

**Phase 2: Synthesize & Prioritize (1 Week)**
*   The full team convenes to synthesize the findings from the six audit reports.
*   **Deliverable:** A single, prioritized V2 feature backlog and a detailed technical specification for the first build sprint. This will define the specific changes and enhancements to be made.

**Phase 3: Iterative Build Sprints (Ongoing)**
*   The team begins executing the build, working in iterative sprints.
*   Each sprint should be guided by the V2 backlog and the principles of the `SKILL.md` anti-drift protocol to ensure alignment.
*   **Deliverable:** A continuous cycle of deployed improvements to the Maven application.

## 6. The SKILL.md Anti-Drift Protocol

The `SKILL.md` document, recovered from the `v14-sic-deployment-protocol` repository, represents a significant asset for this project. It is a state-of-the-art framework for ensuring long-term AI alignment and preventing strategic drift. It should be adopted as the operating system for the Maven V2 build.

### Key Principles of the Protocol:

*   **Constitutional Memory:** A version-controlled repository on GitHub serves as the single source of truth for all project directives, decisions, and knowledge. This prevents knowledge loss and ensures all agents operate from the same set of principles.
*   **Multi-Layered Defense:** The protocol includes a `HEARTBEAT` audit trail, a `SHADOW COPY` email backup system, a `SELF-HEALING INDEX` to detect file corruption, and a `DEAD MAN'S SWITCH` to alert on inactivity. This creates a robust, resilient system for knowledge preservation.
*   **Rigid Retrieval Rules:** The AI is required to exhaust all known information sources (the constitution, institutional memory, email archives) *before* asking a human for information. This respects the team's time and forces the AI to be resourceful.
*   **Bilateral Accountability:** The protocol is a "marriage," not a master-servant relationship. It defines commitments for both the human team (e.g., follow the protocol, bring domain expertise) and the AI team (e.g., stay current on best practices, work agnostically across platforms).

Adopting this protocol will provide the structure and discipline necessary to ensure the Maven V2 project stays true to its mission and effectively serves the Ruby Red community.

---

[1]: https://github.com/timjlatimer/maven-app-v2
