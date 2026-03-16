# Morning Anthem / Ruby Red's Anthem Generator

**Last Updated:** 2026-02-15
**Source:** Manus shared task — https://manus.im/share/g2oIOV25Q0xh7p0H7CW212
**Status:** ACTIVE — Full application built and deployed

---

## What It Is

Ruby Red's Anthem Generator is a full-stack web application that creates personalized AI-generated songs for Ruby Red (the 35-45 year old mom, the working poor). The core question it answers: **"How can song connect people to purpose and community?"**

This is the **Morning Anthem** referenced in HB1000 Architecture v3, Q2. It is not a document or audio file — it is a complete application.

## Core Features (All Built)

The application includes a conversational guide (Grace) that walks the user through creating a personalized anthem. The creation flow involves selecting a song theme (fight song, love song, healing anthem, etc.), choosing a genre (Gospel, Country, Hip Hop, R&B, Rock, Classical, Rap), setting a "misery dial" mood slider (1-99), personalizing with names (partner, other, user), and selecting a win/lose ending for the love story narrative.

The anthem engine generates lyrics themed around the selected song purpose, using country love song storytelling as the foundation with Ruby Red's journey woven in subtly. Maven and Grace appear as subtle touches, not the main theme.

## Technical Architecture

The application uses AI music generation via Kie AI API at $0.06/song. It includes full user authentication, a song history/personal anthem library, admin dashboard for monitoring, playlist feature with auto-grouping by theme, mood journal showing emotional journey over time, social proof counter ("X women have found their voice"), dedication feature (send an anthem to someone), and sharing with privacy controls.

## Monetization Model

The pricing structure provides 2 free songs per day, then $1/song for extras beyond the free limit. Charges accumulate on a tab system until reaching a $5 threshold, at which point a $5.50 batch charge is applied ($5 songs + $0.50 admin fee). A $2 premium music video feature is stubbed out as "Coming Soon." Failed generations are never charged. Stripe integration is built but awaiting API keys to activate.

## Key Design Decisions

The application follows a two-path UX: "Let us choose for you" (auto-select theme based on Grace sentiment analysis, time of day, and interaction history) versus "I'll pick my own" (manual override). The daily limit uses gentle Grace-style messaging when reached. Share pages are viral-friendly with OG meta tags for social media optimization. Only first names are ever shown publicly — never last names.

## Relationship to HB1000

This is the emotional entry point for the HB1000 ecosystem. It demonstrates the principle that the HB1000 starts with who you are — your feelings, your story, your music — not with what you need to do. The Mood Journal feature builds a daily emotional profile over time, which feeds into the broader HB1000 understanding of the user.

## Architecture Question Q2 — ANSWERED

The Morning Anthem is this application. It exists as a Manus-built web app. The link for integration is the shared task URL above, and the application itself would need to be either embedded in or linked from the Pearl dashboard.

---

## Maven Service Registry Confirmation

In the Maven Service Tier Voting Dashboard (https://maventier-mqsepzmg.manus.space/), the Maven Anthem is listed as one of the 10 **Non-Negotiable Universal Services** — included at ALL tiers including Free.

**Registry Description:** "Personalized daily anthem with music based on Ruby Red's love story. Ticker tape with three channels: My Life (personal updates), Rumor News (community gossip/celebrations), Chaos Challenge (daily motivation). Joy Genie integration controls conversation tone. Combines with PTK Dashboard for one integrated morning experience. 'Music and belonging are not premium features.'"

**Scoring:** Belonging: 95 | Financial: 10 | Black Swan: 20 | AI Score: 100

This confirms the Morning Anthem application (built) aligns with the Maven Anthem service definition (registry). The two are the same concept — the application IS the implementation of the Maven Anthem service.

---

*Part of Pearl's Brain knowledge base. Sources: Manus shared task replay + Maven Service Tier Voting Dashboard.*
