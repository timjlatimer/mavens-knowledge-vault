# Maven Cashco Guardian Insights Hub — Complete Project Summary

**Project Name:** guardian-insights-hub  
**Created:** January 2026  
**Last Updated:** January 29, 2026  
**Version:** aac5794c  

---

## Executive Summary

The Maven Cashco Guardian Insights Hub is a full-stack web application designed to collect, organize, and surface frontline wisdom from financial services staff who work directly with underserved clients. The platform serves the SIC Solve Team's mission to build an empathetic AI assistant (the "Guardian") that helps people navigate financial challenges with dignity and hope.

### The North Star: Ruby Red

Every feature in this platform is designed with "Ruby Red" in mind—the 35-45 year old mother of two who is the Chief Financial Officer of her household. She represents the working poor, the left out and left behind, the unbanked and underbanked. Our mission is to provide her with **relief today and hope for tomorrow**.

### Core Philosophy

> **"There, for the grace of God, go I."**

This is not just a phrase—it is the lens through which every interaction must be viewed. Empathy is our superpower.

---

## Features Built

### 1. Wisdom Library
A comprehensive, searchable library of protocols, scripts, anti-patterns, and frontline insights organized into seven categories:
- **The North Star** — Core philosophy and guiding principles
- **Guardian Protocols** — Structured behavioral frameworks
- **Scripts & Phrases** — Exact words that work
- **Anti-Patterns** — What NOT to do
- **Guardian Superpowers** — Transformative features
- **The Four Horsemen** — External pressures we fight
- **Frontline Wisdom** — Direct insights from experts

### 2. Story Submission System
A 10-question survey system for collecting frontline wisdom:
1. Toughest conversation and how you handled it
2. Secret for building trust
3. First interaction advice
4. Handling "not approved" conversations
5. Community resources you recommend
6. Client win stories
7. Your "secret weapon"
8. Dream bot features
9. What you wish people understood about clients
10. Why this work matters to you

### 3. Judging Competition
A peer-review system where staff who have submitted their own stories can grade others' responses:
- 1-10 grading scale per answer
- Eligibility tracking (must submit to judge)
- Best answers compilation
- Progress tracking

### 4. Admin Panel
Full administrative capabilities:
- Review and approve/reject submissions
- Manage respondents and insights
- View submission statistics
- Send reminder notifications
- Export data

### 5. Progress Tracker
Visual component showing:
- User's submission status
- Questions answered (0-10)
- Judging eligibility
- Grades given

### 6. Best Answers Summary
Automated compilation of highest-graded answers per question with export to Markdown/JSON for bot integration.

### 7. Email Reminders
System for prompting incomplete submissions:
- Identify users who haven't submitted
- Identify incomplete submissions
- Trigger reminder notifications

---

## Technical Architecture

### Stack
- **Frontend:** React 19 + TypeScript + Tailwind CSS 4
- **Backend:** Express 4 + tRPC 11
- **Database:** MySQL/TiDB with Drizzle ORM
- **Authentication:** Manus OAuth
- **Hosting:** Manus Platform

### Key Files
```
client/
  src/
    pages/
      Home.tsx              — Landing page with progress tracker
      AdminPage.tsx         — Admin panel
      JudgingPage.tsx       — Judging competition
      WisdomLibrary.tsx     — Wisdom library browser
      BestAnswers.tsx       — Best answers summary
      SubmitStory.tsx       — Story submission form
      Dashboard.tsx         — User dashboard
      AdminReminders.tsx    — Email reminder management
    components/
      ProgressTracker.tsx   — Progress visualization
      DashboardLayout.tsx   — Dashboard layout wrapper
drizzle/
  schema.ts                 — Database schema
server/
  db.ts                     — Database queries
  routers.ts                — tRPC API endpoints
```

### Database Tables
- `users` — User accounts and preferences
- `respondents` — Frontline staff who submitted surveys
- `survey_responses` — Individual question answers
- `themes` — Categories for organizing insights
- `insights` — Extracted wisdom from responses
- `votes` — Community voting on insights
- `comments` — Discussion on insights
- `wisdom_categories` — Library category structure
- `wisdom_entries` — Library content entries
- `story_submissions` — Pending survey submissions
- `answer_grades` — Judging grades
- `judge_eligibility` — Who can judge

---

## Wisdom Content Collected

### Frontline Experts Interviewed
1. **Michelle Craig** — Frontline Expert
2. **Manpreet S.** — Frontline Expert
3. **Danielle K.** — Frontline Expert
4. **Harmandeep S.** — Frontline Expert

### Key Protocols Documented
1. **Empathy First Protocol** — Acknowledge, Validate, Normalize, Partner
2. **Pause and Listen Protocol** — Hold space in high distress
3. **Not Yet Protocol** — Depersonalize, Explain, Path, Timeline, Believe
4. **Process Narrator Protocol** — Explain what's happening
5. **Celebration Protocol** — Notice, Name, Celebrate, Connect

### Guardian Superpowers Identified
1. **Life Ledger** — Remember personal details
2. **Community Connector** — Local resource database
3. **Meal & Grocery Genius** — Pantry-based meal planning
4. **Weekly Spending Reviewer** — Budget check-ins
5. **Daily Positive Affirmations** — Encouragement messages
6. **On-Demand Payout Amount** — Real-time balance info

### Anti-Patterns Documented
1. The Interrogation
2. The Script Robot
3. The Blame Game
4. The False Promise
5. The Efficiency Trap

---

## Themes for Organizing Insights

| Theme | Description |
|-------|-------------|
| Empathy First Protocols | Techniques for leading with empathy |
| Building Trust Through Action | Actions that build lasting trust |
| The Power of Remembering | Using personal details for connection |
| Practical Superpowers | Tangible features for the Guardian |
| Community Connection | Local resources and opportunities |
| The Art of the "Not Yet" | Handling declines with dignity |
| First Impressions | Building trust in the first five minutes |
| Respecting Boundaries | Calibrating inquiry to comfort |
| Celebrating Success | Recognizing and amplifying wins |

---

## Key Decisions Made

### Design Philosophy
- **Dashboard layout** for internal tool (sidebar navigation)
- **Dark theme** with warm accent colors
- **Card-based UI** for wisdom entries
- **Progress visualization** for engagement

### Branding
- Name: **Maven Cashco Guardian**
- Mission: **Relief today. Hope for tomorrow.**
- Superpower: **Empathy**

### User Flow
1. Staff submit their 10-question survey
2. Admin reviews and approves submissions
3. Approved submitters become eligible judges
4. Judges grade others' answers (1-10 scale)
5. Best answers are compiled for bot training
6. Wisdom is organized into searchable library

---

## Files Included in This Archive

### Application Code
- `/guardian-insights-hub/` — Complete web application
  - `/client/` — React frontend
  - `/server/` — Express + tRPC backend
  - `/drizzle/` — Database schema
  - `/shared/` — Shared types and constants

### Documentation
- `PROJECT_SUMMARY.md` — This document
- `todo.md` — Feature tracking
- `README.md` — Template documentation

### Wisdom Content
- `wisdom-giants-dictionary-2026-01-29.md` — Portable wisdom reference
- `database-export.sql` — Database content export

---

## How to Continue This Work

### In a New Manus Project
1. Create a new Manus project
2. Upload this ZIP file
3. Extract and review the contents
4. The web application can be deployed directly
5. Use the Wisdom Giants Dictionary for AI training

### For Bot Development
1. Use `wisdom-giants-dictionary-2026-01-29.md` as character instructions
2. Reference the protocols and scripts for conversation design
3. Implement the Guardian Superpowers as features
4. Avoid the documented Anti-Patterns

### For Collecting More Wisdom
1. Share the platform URL with more frontline staff
2. Use the 10 survey questions to gather insights
3. Have staff judge each other's answers
4. Export best answers for bot training

---

## Contact

**Project Owner:** SIC Solve Team  
**Chief Visionary Officer:** HB1000  
**Mission:** Solving for Ruby Red

---

*"It's expensive to be poor." — We're trying to change that.*
