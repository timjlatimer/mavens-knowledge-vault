# Visual Intelligence Agent Specification
## Maven/Grace Admin Dashboard

### 1. Executive Summary
The Visual Intelligence Agent (VIA) is designed to transform the Maven/Grace administrative experience by shifting from traditional, data-heavy tabular reporting to a highly visual, story-driven dashboard. The core objective is to ensure that every Key Performance Indicator (KPI), Maven Moment, innovation score, demographic distribution, barter match, and Union Boss negotiation win is instantly comprehensible at a glance. 

This approach is inspired by successful visual tracking models (such as those used in complex sector project management) where 100+ concurrent tasks are displayed visually, allowing stakeholders to grasp the "spirit" and progress of the initiative immediately.

### 2. Core Philosophy & The "Ruby Red" Persona
The dashboard is built with empathy and clarity at its core, specifically designed to support the "Ruby Red" client—the Chief Financial Officer of the household. She is navigating the complexities of the political, bureaucratic, and greedy capitalist worlds. The Visual Intelligence Agent must synthesize complex data into clear, actionable, and empowering visual narratives that demonstrate how Maven/Grace is supporting her and the broader community. The design must be intuitive, avoiding cognitive overload, and highlighting the real-world impact of the platform.

### 3. Dashboard Framework & Modules

The dashboard will consist of six primary visual modules, utilizing the Maven design system: Teal (#2DD4BF), Mint (#6EE7B7), Rose (#FB7185), Cream (#FFF8F0), and the Poppins font.

#### 3.1. Innovation Index Visual
*   **Purpose:** Track the progress of 22 key innovations.
*   **Visual Format:** A grid or circular array of 22 individual progress rings (donut charts). Each ring represents a specific innovation, showing its build status as a percentage completed.
*   **Interaction:** Hovering over a ring reveals the innovation name, current status, and next immediate milestone.

#### 3.2. 14-Day Marketing Tracker
*   **Purpose:** Monitor progress toward the goal of acquiring 100 clients within a 14-day window.
*   **Visual Format:** A visual grid (10x10) or a stylized map where each node/cell represents a client. Nodes light up (e.g., transition from Cream to Teal or Mint) as clients are acquired.
*   **Metrics:** Current count vs. Goal (100), Days Remaining.

#### 3.3. Village Health Dashboard
*   **Purpose:** Provide a high-level overview of community engagement and activity.
*   **Visual Format:** Large, stylized KPI cards or gauges.
*   **Key Metrics Displayed:**
    *   Total number of Rubies (active members).
    *   Total Maven Moments generated.
    *   Total Barters successfully completed.

#### 3.4. Stage of Life Distribution
*   **Purpose:** Understand the demographic makeup of the village to better tailor services.
*   **Visual Format:** A visually engaging breakdown, such as a stylized stacked bar chart, a treemap, or a custom infographic representing different life stages (e.g., Young Families, Empty Nesters, Seniors).
*   **Design Note:** Use the Maven color palette to differentiate stages clearly without relying on complex legends.

#### 3.5. Union Boss Wins
*   **Purpose:** Highlight the tangible financial and service benefits negotiated on behalf of the community.
*   **Visual Format:** Impact numbers displayed prominently, potentially using a "ticker" or a series of achievement badges.
*   **Key Metrics:** Total Dollars Saved (aggregate), Number of Services Negotiated.

#### 3.6. Maven Moment Feed
*   **Purpose:** Provide a qualitative, real-time pulse of the community's positive interactions.
*   **Visual Format:** A live, scrolling stream or a masonry grid of "cards." Each card represents a Maven Moment, featuring a local anchor (e.g., neighborhood or specific community group), a brief description, and relevant tags.

### 4. Technical Implementation & Design System
*   **Typography:** Poppins (Primary font for all headings and body text).
*   **Color Palette:**
    *   Teal: `#2DD4BF` (Primary actions, progress indicators)
    *   Mint: `#6EE7B7` (Success states, secondary accents)
    *   Rose: `#FB7185` (Alerts, highlights, empathy-driven metrics)
    *   Cream: `#FFF8F0` (Backgrounds, negative space)
*   **Accessibility:** Ensure high contrast ratios and provide options for text size adjustment, keeping the "Ruby Red" persona's needs in mind.

### 5. Future Enhancements
*   Integration with real-time backend data streams.
*   Interactive filtering by specific geographic "villages" or timeframes.
*   Automated weekly "Spirit Check" reports generated from the dashboard visuals.
