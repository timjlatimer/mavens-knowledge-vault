# Agent 3: Town Crier Agent Specification

**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Executive Summary

The Town Crier Agent is the broadcasting and community intelligence engine of the Maven/Grace platform. It is the mechanism by which Ruby Red stays informed about what matters most to her — without being overwhelmed, manipulated, or buried in the noise of the "three gangster worlds."

The Town Crier is not a news aggregator. It is a trusted village herald. Its job is to filter the overwhelming flood of global, national, provincial, and local information down to the handful of things that are genuinely relevant to Ruby's life, right now, in her neighborhood, at her stage of life. It then delivers that information in the right format, at the right time, through the right channel.

This specification synthesizes multiple architectural concepts from the `mavens-knowledge-vault` and related repositories. The Town Crier has been conceptualized in the vault as a future "7th Building" in Bingo City [1], as the News Ingestion System in the HB1000 Framework [2], as the Ticker Tape interface in the Maven Anthem architecture [3], and as the News Channel directive (DIR-022) in the Master Jeeves constitutional memory [4]. This specification unifies all of these concepts into a single, coherent agent design.

---

## 2. Vault Citations and Research Foundations

| Citation | Source File | Relevance |
| :--- | :--- | :--- |
| [1] | `sic-bingo-city-architecture/contributions/bingo-city-frontend-build/research/marketing-placement-research.md` | Defines the Town Crier as the 7th building in Bingo City; establishes the "Herald" avatar role on the Rooftop Society |
| [2] | `knowledge-base/HB1000_FRAMEWORK.md` | Details the 3-level News Ingestion System (Village, Local, World) filtered by Grace, with negative news KPI |
| [3] | `briefs/Song_Strategy_Brief.md` | Full specification of the Ticker Tape UI (My Life, Rumor News, Chaos Challenge), including scroll speed, color coding, and sentiment aggregation |
| [4] | `master-jeeves-transfer/directives/dir-022_news_channel_cross-bingo_card_visibility.md` | DIR-022: Establishes the requirement for transparent, cross-ecosystem news visibility across all Bingo Cards |
| [5] | `innovation-libraries/Maven_Moment_System.md` | Defines the Maven Moment Trojan Horse mechanic, hashtag strategy, and local anchor system |
| [6] | `innovation-libraries/Good_Neighbor_Barter_Architecture.md` | Defines the Good Neighbor network, concentric circles, and the Flare System |
| [7] | `sic-bingo-city-architecture/contributions/marketing-synthesis/MARKETING_SYNTHESIS_REPORT.md` | Defines the Herald/Town Crier avatar role, the Peacock animal, and the F6 Marketing Coordination layer |
| [8] | `knowledge-base/GitHub_Innovation_Master_List.md` | Innovation 5.6: News Channel as cross-Bingo Card visibility; Innovation 1.1: Persistent Ambient Presence |

---

## 3. The Town Crier's Role in the Ecosystem

The Town Crier occupies a unique position in the Maven architecture. It is simultaneously:

- **A filter:** It protects Ruby from information overload by suppressing irrelevant, harmful, or cognitively expensive content.
- **A broadcaster:** It ensures that genuinely important information — a new childcare subsidy, a local emergency, a neighbor's win — reaches Ruby at the right moment.
- **A community builder:** It weaves individual stories into a collective village narrative, creating the social proof and belonging that are essential to Ruby's wellbeing.
- **A marketing engine:** Through the Maven Moment system, it turns every community win into a silent invitation for new Rubies to join the village.

The Town Crier does not replace Grace's conversational intelligence. It is the *infrastructure* through which Grace delivers community and civic information. Grace remains the voice; the Town Crier is the editorial system that decides what Grace says.

---

## 4. The Three-Tiered News Ingestion System

The Town Crier ingests information from three distinct altitudes. The filtering is aggressive and intentional — the default is to suppress, not to broadcast.

### 4.1 Tier 1: Village News (Hyper-Local / Mutual Aid)

Village News is the heartbeat of Big Mama's Genius Village. It is the most important tier, and it receives the highest priority in all delivery decisions.

**Content Sources:**
- Maven Moment publications (community wins, anonymized with permission)
- Good Neighbor barter offers and need requests
- Flare activations (emergency broadcasts from within the network)
- PTK (Promises To Keep) streak celebrations
- Need Milk Money requests and fulfillments
- Village Angels availability and service offers
- Big Mama's Genius Village event announcements

**Delivery Mechanism:** The "Rumor News" channel on the Ticker Tape [3], direct Grace conversational nudges, and the Maven Moment social sharing system [5].

**Priority:** Highest. This content is always delivered, regardless of cognitive load index.

---

### 4.2 Tier 2: Local and Provincial News (Civic / Bureaucratic)

Local News is the Town Crier's most complex filtering challenge. There is an enormous volume of civic and provincial information that *could* be relevant to Ruby, but most of it is not relevant to her *right now*. The Stage of Life Agent's filter is essential at this tier.

**Content Sources:**
- Provincial government benefit and subsidy announcements
- Local transit route changes and service disruptions
- School board decisions and education policy changes
- Local utility rate changes and assistance programs
- Municipal bylaw changes affecting renters
- Blue Seal business openings and closures in Ruby's neighborhood
- Local health alerts (food recalls, disease outbreaks, clinic closures)

**Delivery Mechanism:** Daily morning briefing (one actionable item per day), the "Chaos Challenge" channel on the Ticker Tape for disruptive news [3], and proactive Grace conversations when a specific item matches Ruby's known circumstances.

**Priority:** Medium. Filtered aggressively by the Stage of Life Agent and the neighborhood anchor system.

---

### 4.3 Tier 3: Global and National News (Macro Context)

Global and National News is the tier the Town Crier is most aggressive about suppressing. The "three gangster worlds" — the political, bureaucratic, and greedy capitalist systems — generate an enormous volume of news that is designed to provoke anxiety, outrage, and helplessness. The Town Crier's job is to protect Ruby from this noise.

**Content Sources:**
- Federal policy changes with direct financial impact (interest rate decisions, benefit eligibility changes)
- Major economic events that affect Ruby's immediate financial reality
- National health emergencies

**Delivery Mechanism:** Only delivered if it directly and immediately impacts Ruby's financial situation. Grace frames the news in terms of its specific impact on Ruby: not "The Bank of Canada raised interest rates" but "Your variable loan payment is going up by $23 next month — I've flagged it in your budget."

**Priority:** Lowest. The default is to suppress. The Town Crier only escalates Global News when the Stage of Life Agent confirms it is immediately actionable for Ruby.

---

## 5. The Negative News KPI

The HB1000 Framework explicitly establishes a **Negative News KPI** [2] — a measurable target for reducing the amount of negative, anxiety-inducing content that reaches Ruby through the Maven platform. This is not censorship; it is cognitive protection.

The Town Crier tracks the following metrics:
- **Negative News Ratio:** The percentage of delivered news items that are negative or disruptive vs. positive or empowering. Target: below 30%.
- **Cognitive Load Impact Score:** The average change in Ruby's `cognitive_load_index` following news delivery. Target: neutral or positive.
- **Action Rate:** The percentage of delivered news items that Ruby takes action on. Target: above 50% (indicating high relevance).

---

## 6. The Filtering Engine: Stage of Life and Neighborhood

The Town Crier does not broadcast the same news to everyone. It uses a dual-filter matrix that combines the Stage of Life Agent's data with a neighborhood anchor system.

### 6.1 The Neighborhood Anchor System

Every piece of news is tagged with a geographic relevance score. The Town Crier uses Ruby's registered neighborhood (e.g., `#MillWoods`, `#97thStreet`) to filter news to a hyper-local radius [5].

The default radius is 3 miles for Village News and 25 miles for Local/Provincial News. Ruby can adjust this radius in her settings. National and Global News has no geographic filter — it is filtered exclusively by relevance and cognitive load.

### 6.2 The Stage of Life Filter

Before any news item is delivered, the Town Crier queries the Stage of Life Agent:
1. Is this item relevant to Ruby's current stage?
2. Is Ruby's current `cognitive_load_index` below the suppression threshold?
3. Is this item actionable within the next 7 days?

If the answer to any of these questions is "no," the item is suppressed or deferred to the weekly digest.

**Example — The Filtering Decision Tree:**

> A news item arrives: "Province announces new tutoring grant for high school students."
>
> **Step 1 — Stage Filter:** Ruby is in "The Trench Years" (toddlers). The Stage of Life Agent returns: "Low relevance — Ruby's children are under 5." → **Suppress.**
>
> **Alternative:** Ruby is in "The Pivot" (teenagers). The Stage of Life Agent returns: "High relevance — Ruby has a 14-year-old." → **Proceed to Step 2.**
>
> **Step 2 — Cognitive Load Filter:** Ruby's `cognitive_load_index` is 82 (high). → **Defer to weekly digest, do not interrupt.**
>
> **Alternative:** Ruby's `cognitive_load_index` is 55 (moderate). → **Proceed to Step 3.**
>
> **Step 3 — Actionability Filter:** The grant application deadline is in 14 days. → **Deliver as a proactive Grace conversation: "Hey Ruby, I saw the province just opened a tutoring grant for high schoolers. Marcus might qualify. Want me to look into it?"**

---

## 7. The Delivery Cadence

The Town Crier respects the cognitive scarcity of the working poor. It operates on a carefully designed, multi-channel cadence that ensures Ruby is informed without being overwhelmed.

### 7.1 The Daily Anthem Integration (Morning)

Every morning, the Maven Anthem includes a single, positive, actionable piece of local news curated by the Town Crier. This is not a news briefing — it is a single, empowering fact woven into the morning experience. The Town Crier selects this item based on the highest-priority, most actionable, most positive item available for Ruby's stage and neighborhood.

### 7.2 The Ticker Tape (Ambient / Continuous)

The three-channel Ticker Tape [3] is the Town Crier's primary ambient delivery mechanism. It runs continuously at the bottom of the app interface, scrolling at 45px/second, and is always-on but never demanding.

| Channel | Icon | Color | Content | Source |
| :--- | :---: | :--- | :--- | :--- |
| **My Life** | 🌱 | Blue/Teal | Ruby's personal KPIs, PTK streaks, savings milestones | Internal data |
| **Rumor News** | 📰 | White/Neutral | Community intelligence, mutual aid, Maven Moments | Village News Tier |
| **Chaos Challenge** | ⚡ | Orange/Red | Disruptive local news, battle cries, urgent alerts | Local/Provincial Tier |

The aggregate sentiment of the Rumor News and Chaos Challenge channels feeds directly into the Work Song Director's daily template selection, ensuring the village's collective anthem reflects the village's collective mood.

### 7.3 The Weekly Digest (Sunday Evening)

Every Sunday evening, the Town Crier compiles a brief, curated digest of the week's most important deferred news items. This digest is delivered as a conversational Grace message, not a formatted newsletter. It covers:
- One Local/Provincial news item that was deferred due to high cognitive load.
- One Global/National item that is relevant to Ruby's financial situation.
- A summary of the week's Maven Moments from Ruby's neighborhood.

### 7.4 The Flare (As-It-Happens)

The Flare is the Town Crier's emergency broadcast system [6]. It bypasses all filters and delivers an immediate push notification for:
- A direct connection in Ruby's network has activated the "I'm Not Okay" beacon.
- A hyper-local emergency (active safety situation, severe weather, infrastructure failure).
- A time-critical financial alert (an NSF fee about to post, a benefit application deadline in 24 hours).

The Flare is used sparingly. Overuse destroys trust. The Town Crier tracks the Flare frequency and alerts the Big Mama (human-in-the-loop) if Flares are being triggered more than twice per week for any single user.

---

## 8. Connection to the Maven Moment System

The Town Crier is the primary distribution engine for Maven Moments [5]. The Maven Moment system is the Trojan Horse marketing mechanic — every shared community win is a silent invitation for new Rubies to join the village.

### 8.1 The Publication Flow

1. Grace detects a qualifying Maven Moment (financial threshold exceeded, crisis resolved, Wisdom Giant referral completed).
2. Grace prompts Ruby within 24 hours: "Something good happened for you this week. Would you be okay if I shared it with the neighborhood? I'll keep it anonymous."
3. If Ruby grants permission, the Town Crier anonymizes the story, attaches the local anchor tag (`#97thStreet`, `#MillWoods`), and publishes it to the "Rumor News" Ticker Tape channel.
4. The Town Crier also formats the story for social sharing (Facebook, WhatsApp, SMS) using the three-layer Trojan Horse structure: The Story, The Proof, The Silent Invitation.

### 8.2 The Hashtag Strategy

Every Maven Moment published by the Town Crier includes:
- **Core Movement Tags:** `#MavenMoment` `#MavenMovement` `#GraceIsHere`
- **Local Anchor Tags:** Specific to Ruby's neighborhood (e.g., `#97thStreet` `#MillWoods` `#YEG`)

The local anchor is not optional. It is the mechanism by which a story becomes a community asset. When a mom scrolling Facebook at midnight sees a win tagged `#97thStreet`, it is no longer an abstract technology company — it is her neighbor [5].

---

## 9. Connection to the Good Neighbor Network

The Town Crier monitors the Good Neighbor Barter Architecture [6] and acts as the matchmaker for mutual aid exchanges.

When a "Need" is posted within the network, the Town Crier:
1. Searches for a matching "Have" within a 3-mile radius.
2. If a match is found, sends a private, quiet notification to both parties.
3. Facilitates the introduction through Grace, without broadcasting the need publicly.
4. Logs the successful exchange as a potential Maven Moment (with permission).

The Town Crier never broadcasts a Ruby's need publicly without her explicit permission. Privacy and dignity are non-negotiable.

---

## 10. The Town Crier as the 7th Building in Bingo City

The vault research confirms that the Town Crier has been architecturally conceived as a future 7th building in Bingo City [1]. The research recommendation states:

> "This is the right architecture: Marketing as its own building (initiative), not as a floor within the Maven building. The Maven building is for serving Ruby Red. The Town Crier building is for finding Ruby Red."

The Town Crier building's North Star is: **"Every Ruby Red knows she has a team."**

As the Maven ecosystem matures and the Town Crier Agent becomes more sophisticated, the recommendation is to formalize it as a dedicated Bingo Card building with its own 25 squares, its own Pope, and its own floor structure. The current specification is the architectural foundation for that future building.

---

## 11. The Herald Avatar on the Rooftop Society

The Town Crier Agent is represented on the Bingo City Rooftop Society as the **Herald** avatar [7]:
- **Animal:** Peacock (visibility, pride in the work, beauty of the message)
- **Color:** Crimson/Magenta
- **Position:** Outer Ring of the Rooftop Society (not the inner core team, but prominent and visible)
- **Function:** Reports daily marketing metrics, brings growth opportunities and brand insights to governance, ensures Ruby Red's voice is heard in daily decisions, and coordinates messaging across initiatives.

---

## 12. Database Schema

```sql
-- News items ingested by the Town Crier
CREATE TABLE town_crier_news_items (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    -- 'village', 'local', 'global'
    tier                VARCHAR(20) NOT NULL,
    headline            TEXT NOT NULL,
    full_content        TEXT,
    source_url          TEXT,
    geographic_tag      VARCHAR(100), -- e.g., 'MillWoods', 'Edmonton', 'Alberta'
    -- Stage of life relevance tags
    relevant_stages     TEXT[], -- e.g., ARRAY['The Trench Years', 'The Pivot']
    -- Sentiment: 'positive', 'neutral', 'negative', 'urgent'
    sentiment           VARCHAR(20),
    -- Is this a Flare-level emergency?
    is_flare            BOOLEAN DEFAULT FALSE,
    ingested_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at          TIMESTAMP WITH TIME ZONE
);

-- Delivery log for each user
CREATE TABLE town_crier_delivery_log (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    news_item_id        UUID NOT NULL REFERENCES town_crier_news_items(id),
    -- 'ticker_tape', 'morning_anthem', 'weekly_digest', 'flare', 'grace_conversation'
    delivery_channel    VARCHAR(50),
    -- 'delivered', 'suppressed', 'deferred'
    delivery_status     VARCHAR(20),
    suppression_reason  TEXT,
    cognitive_load_at_delivery DECIMAL(5,2),
    delivered_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Maven Moment publication log
CREATE TABLE maven_moment_publications (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    -- 'anonymous', 'named'
    permission_level    VARCHAR(20) NOT NULL,
    story_text          TEXT NOT NULL,
    neighborhood_tag    VARCHAR(100),
    -- 'ticker_tape', 'social_share', 'both'
    distribution_channel VARCHAR(50),
    published_at        TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 13. References

[1] Manus AI, *Marketing Placement Research — The Town Crier Building*, `timjlatimer/sic-bingo-city-architecture/contributions/bingo-city-frontend-build/research/marketing-placement-research.md`, March 2026.

[2] SIC HB1000 Solve Team, *HB1000 Framework — News Ingestion System*, `timjlatimer/mavens-knowledge-vault/knowledge-base/HB1000_FRAMEWORK.md`, 2026.

[3] SIC HB1000 Solve Team, *Song Strategy Brief — The Ticker Tape / KPI Display*, `timjlatimer/mavens-knowledge-vault/briefs/Song_Strategy_Brief.md`, 2026.

[4] Tim Latimer, *DIR-022: News Channel — Cross-Bingo Card Visibility*, `timjlatimer/master-jeeves-transfer/directives/dir-022_news_channel_cross-bingo_card_visibility.md`, March 4, 2026.

[5] Manus AI, *Maven Moment System — The Hashtag Strategy and Local Anchor System*, `timjlatimer/mavens-knowledge-vault/innovation-libraries/Maven_Moment_System.md`, March 20, 2026.

[6] Manus AI, *Good Neighbor Barter Architecture — The Flare System*, `timjlatimer/mavens-knowledge-vault/innovation-libraries/Good_Neighbor_Barter_Architecture.md`, 2026.

[7] Manus AI, *Marketing Synthesis Report — Herald / Town Crier Avatar*, `timjlatimer/sic-bingo-city-architecture/contributions/marketing-synthesis/MARKETING_SYNTHESIS_REPORT.md`, March 2026.

[8] SIC HB1000 Solve Team, *GitHub Innovation Master List — Innovation 5.6: News Channel*, `timjlatimer/mavens-knowledge-vault/GitHub_Innovation_Master_List.md`, 2026.

---

*Prepared by Manus AI for the SIC HB1000 Solve Team. March 20, 2026.*  
*"It is expensive to be poor. That is a crime. We are trying to change it."*
