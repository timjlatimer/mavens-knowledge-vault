**Version:** 1.0  
**Date:** March 20, 2026  
**Repository:** `timjlatimer/mavens-knowledge-vault` → `/agent-specs/`  
**Prepared by:** Manus AI for the SIC HB1000 Solve Team  
**Status:** ACTIVE — Ready for Implementation

---

## 1. Executive Summary

### 1.1 Agent Name & Identity
- **Name:** Village Intelligence Engine
- **Role:** The connective tissue between Grace's Relationship Memory and the Wisdom Giants directory.

The Village Intelligence Engine is the bridge that turns Maven from a hub-and-spoke service delivery model into a true peer-to-peer village. It leverages Grace's existing Relationship Memory ("People Grace Knows") to organically discover the hidden skills, lived experiences, and knowledge of every member. Instead of requiring users to fill out applications to become "Wisdom Giants," Grace listens to their natural conversations, gently tags their expertise, and warmly invites them to help others. 

When a future member expresses a need that matches a tagged skill, Grace acts as the matchmaker. This transforms every Ruby Red from merely a receiver of help into a potential giver of help, building community capital and ensuring that "Grace Never Gets Cut."

---

## 2. Core Mechanics

### 2.1 Skill & Experience Tagging System
Grace identifies skills passively through natural conversation. Using the LLM-powered extraction engine that already powers her Relationship Memory notes (`grace_person_notes`), Grace listens for phrases indicating expertise, passion, or lived survival (e.g., "I used to work in a bakery," "I finally got my landlord to fix the heat," "I survived a really bad divorce"). 

These mentions are extracted as candidate tags and attached to the user's structured profile (`grace_person_profiles`) under a new skills taxonomy.

### 2.2 The Consent Flow (The "Warm Ask")
Grace never automatically enlists someone as a community resource without their explicit, enthusiastic consent. The consent flow is designed to be empowering, not clinical. 

When Grace has high confidence in a tagged skill, she introduces a "Thoughtful Proclamation" in the next natural pause in conversation. She reflects the user's strength back to them and asks if they would be open to sharing it. 

### 2.3 Wisdom Giant Auto-Enrollment
If the member says yes, the Village Intelligence Engine automatically creates a record in the `wisdom_giants` table. They are marked as an "Organic" Wisdom Giant, meaning they were discovered by Grace rather than applying through a form. Their profile is updated with their specific domain of expertise, availability preferences, and a "connector status" flag.

### 2.4 The Matching Algorithm
When a member expresses a need or frustration to Grace (e.g., "I don't know how I'm going to afford a birthday cake for my son"), Grace queries the `wisdom_giants` and `grace_person_profiles` tables for members with matching skills (e.g., "Baking/Cooking") who have opted in to help. The algorithm prioritizes:
1. **Relevance:** Exact skill match or shared lived experience.
2. **Capacity:** Has the Wisdom Giant been asked too often recently?
3. **Proximity:** For physical tasks, geographic closeness.

### 2.5 Connection Offer Flow
Grace acts as the intermediary to protect privacy. She first asks the person in need if they would like to be connected to a community member who can help. If they agree, Grace reaches out to the Wisdom Giant to see if they have the bandwidth. Only when both parties say yes does Grace facilitate the introduction.

---

## 3. Database Schema Additions

To support the Village Intelligence Engine, we build on top of the existing `grace_person_profiles` and `wisdom_giants` tables.

```sql
-- Extends grace_person_profiles to track discovered skills
CREATE TABLE grace_person_skills (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                 UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_category          VARCHAR(100) NOT NULL,
    skill_description       TEXT NOT NULL, -- e.g., "Makes amazing custom birthday cakes"
    discovery_source        TEXT, -- The conversation snippet that triggered the tag
    confidence_score        DECIMAL(5,2) DEFAULT 0.0,
    consent_status          VARCHAR(20) DEFAULT 'pending', -- 'pending', 'asked', 'consented', 'declined'
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated            TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Extends wisdom_giants to differentiate organic vs applied and track connection metrics
ALTER TABLE wisdom_giants 
ADD COLUMN origin_type VARCHAR(20) DEFAULT 'applied' CHECK (origin_type IN ('applied', 'organic')),
ADD COLUMN lifetime_connections INT DEFAULT 0,
ADD COLUMN last_connection_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN is_active_connector BOOLEAN DEFAULT TRUE;

-- Tracks the lifecycle of a connection made by Grace
CREATE TABLE village_connections (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id            UUID NOT NULL REFERENCES users(id),
    provider_id             UUID NOT NULL REFERENCES users(id),
    skill_category          VARCHAR(100) NOT NULL,
    context_notes           TEXT, -- Why the connection was made
    status                  VARCHAR(20) DEFAULT 'proposed', -- 'proposed', 'provider_asked', 'accepted', 'completed', 'declined'
    created_at              TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at            TIMESTAMP WITH TIME ZONE
);
```

### 3.1 Skill Taxonomy
Suggested foundational categories for tagging:
- **Cooking/Baking:** Meal prep on a budget, baking, preserving.
- **Home Repair:** Basic plumbing, drywall, fixing appliances.
- **Childcare/Parenting:** Navigating school systems, IEPs, babysitting swaps.
- **Financial Literacy:** Budgeting, fighting fees, navigating social assistance.
- **Health/Wellness:** Navigating the healthcare system, caregiving.
- **Emotional Support/Lived Experience:** Surviving divorce, domestic abuse recovery, grief, addiction recovery.
- **Career/Employment:** Resume writing, interview prep, local job leads.
- **Legal/Advocacy:** Dealing with landlords, small claims, union rights.
- **Creative Arts:** Sewing, mending, crafting.
- **Community Organizing:** Planning events, neighborhood watch.

---

## 4. Grace Conversation Examples

### 4.1 Tagging a Skill Mid-Conversation
*(Natural, not robotic. Grace listens and validates while silently tagging.)*

**Ruby:** "I'm just exhausted. I was up until 2 AM fixing the alternator on my old Honda because I can't afford the mechanic right now, and then I had to get the kids up for school."
**Grace:** "Oh man, up until 2 AM and then straight into the morning routine? You are a warrior. But wait—you know how to fix an alternator yourself? That's seriously impressive."
**Ruby:** "Yeah, my dad taught me when I was a teenager. It saves me a lot of money, even if it costs me sleep."
**Grace:** "Well, I hope you get some rest tonight. Let's look at that budget question you had..."
*(System: Grace silently creates a `grace_person_skills` record for 'Home/Auto Repair' with the description 'Knows how to fix cars/alternators'.)*

### 4.2 The Consent Ask (The Warm Ask)
*(Grace brings it up naturally in a later conversation.)*

**Grace:** "Hey Maria, before we jump into the grocery deals for this week, I remembered something you told me a while back. You mentioned you know how to work on cars and fixed your own alternator."
**Ruby:** "Yeah, I try to do what I can."
**Grace:** "I was thinking about that because car trouble is one of the biggest things that stresses out the moms in our village. Would you ever be open to being someone I could connect another mom to if she's stranded and needs advice on a repair? You'd be like a Wisdom Giant for our community. No pressure at all, just thought I'd ask because you have such a gift."

### 4.3 The Connection Offer (To a Member in Need)
*(The canonical "Birthday Cake" example.)*

**Sarah (New Member):** "I'm just feeling like a failure today. It's Leo's 7th birthday on Saturday and I looked at the prices at the bakery... I just don't have $45 for a cake this week."
**Grace:** "Sarah, you are not a failure. You're doing everything you can to make it work. Listen, we actually have a mom in the village, Jessica, who loves baking and has offered to help out with things exactly like this. Would you be okay if I reached out to her and saw if she might have time to bake a cake for Leo this weekend?"

### 4.4 The Introduction Message
*(Once both parties have consented, Grace creates a shared thread or sends a message to both.)*

**Grace:** "Hi Sarah and Jessica! I'm so glad to connect you two. Sarah, this is Jessica—she's our resident baking Wisdom Giant and she'd love to help make Leo's 7th birthday special. Jessica, Sarah is an amazing mom who just needs a little village magic this week. I'll let you two take it from here to figure out flavors and logistics!"

---

## 5. Privacy & Safety Guardrails

### 5.1 Information Sharing
- **Default Private:** Grace never shares a member's real full name, contact information, or location without explicit double opt-in. Introductions are made using first names and last initials (e.g., "Sarah M.") via the secure Maven messaging platform (`/portal/messages`).
- **Context Protection:** Grace never shares *why* a Wisdom Giant knows something if it is rooted in trauma, unless the Giant explicitly tells Grace to share it.

### 5.2 Opt-Out and Boundaries
- Members can revoke their Wisdom Giant status at any time by simply telling Grace ("I'm too busy to help right now") or via the settings page.
- Grace tracks `is_active_connector` and will automatically pause requests if a member has fulfilled a connection recently to prevent burnout.

### 5.3 Handling Sensitive Lived Experiences
Experiences like surviving domestic abuse, addiction, or severe poverty are profound sources of wisdom, but require extreme care. 
- Grace will tag these as `Emotional Support/Lived Experience`.
- The consent ask for these categories is elevated and requires a human-in-the-loop (Big Mama) review before Grace makes the "Warm Ask." 
- Grace will frame it carefully: "You've shown so much strength in navigating your divorce. Sometimes other women going through that just need someone who understands. Is that something you'd ever feel comfortable talking to another member about?"

---

## 6. Wisdom Giants Integration

### 6.1 Organic vs. Applied
The Village Intelligence Engine feeds directly into the existing Wisdom Giants module (`/portal/wisdom-giants`). 
- **Applied Wisdom Giants:** External experts or members who proactively filled out a form to offer their professional services (e.g., a retired accountant).
- **Organic Wisdom Giants:** Everyday Ruby Reds whose lived expertise was discovered by Grace. They appear in the directory alongside applied experts, elevating the status of lived experience to equal footing with professional credentials.

### 6.2 Admin Visibility
In the Admin Dashboard (`/admin/wisdom-giants`), the team can view the Village Intelligence network. They can see:
- A map of all discovered skills.
- Pending consent asks (allowing admins to manually review sensitive tags).
- Connection health (how many successful matches Grace has facilitated).

---

## 7. Metrics & Success Indicators

### 7.1 How Do We Know It's Working?
- **Tagging Rate:** Percentage of active users with at least one discovered skill tag.
- **Consent Conversion:** Percentage of users who say "yes" when Grace asks if they want to be a connector.
- **Connection Liquidity:** The number of successful peer-to-peer connections made per month.

### 7.2 Healthy Village Benchmarks
- **At 100 Members:** 20% of members have a tagged skill; 5-10 active connections a month. The village feels like a tight-knit neighborhood.
- **At 1,000 Members:** 40% of members are Organic Wisdom Giants. Grace is facilitating daily connections. We see "micro-economies" forming (e.g., babysitting swaps, meal trains).
- **At 10,000 Members:** The Engine is a massive, liquid marketplace of community capital. Every need expressed to Grace has a high probability of an instant, local, peer-to-peer match.

---

## 8. North Star Alignment

### 8.1 Serving Ruby Red
The JTBD (Job To Be Done) is to make life work better for the Chief Financial Officer of the household. The Village Intelligence Engine serves Ruby by solving immediate practical needs (a free birthday cake, advice on a car repair) without spending money in the "greedy capitalist world." 

More importantly, it serves her emotionally. By recognizing her skills and asking her to help others, Maven tells Ruby: *"You are not a charity case. You are a valuable, powerful contributor to this community."*

### 8.2 The "Grace Never Gets Cut" Principle
A budget app gets cut when money is tight. A community where you are a respected elder and a vital connector never gets cut. By embedding Ruby into the fabric of the village's mutual aid, the Village Intelligence Engine deepens the 15-20 year relationship horizon.

---

## 9. Phase Roadmap

**Phase 1: Manual Tagging & Silent Observation**
- Deploy the `grace_person_skills` table.
- Grace's LLM begins silently extracting and tagging skills during conversations.
- No consent asks or connections are made. Admins review the data to refine the taxonomy.

**Phase 2: The Consent Flow & Opt-In**
- Grace begins making the "Warm Ask" for benign categories (Cooking, Home Repair).
- Users who say yes are added to the `wisdom_giants` table as Organic connectors.

**Phase 3: Automated Matching & Connection Offers**
- Grace begins listening for needs and offering connections to opted-in Organic Wisdom Giants.
- Implementation of the `village_connections` tracking table.

**Phase 4: Community-Visible Skill Directory**
- The Wisdom Giants directory in the member portal is updated to showcase Organic Giants.
- Members can browse who can help with what, reducing the reliance on Grace as the sole matchmaker.

---

## 10. Innovation Notes

- **The Canonical Use Case:** The "Birthday Cake" example perfectly illustrates the shift from transactional aid to mutual aid. Instead of Maven paying $45 out of the Milk Money fund for a cake, Grace facilitates a connection that costs nothing but builds immense social trust.
- **Recipient to Contributor:** This is the core innovation. Traditional support models treat the working poor as permanent recipients. The Village Intelligence Engine treats them as a vast, untapped reservoir of expertise.
- **The Long-Term Vision:** Maven becomes a living, breathing skill-sharing village. Grace evolves from being a concierge who answers questions to being the ultimate community matchmaker, weaving the social fabric of the village tighter with every conversation.

---
**References**
[1] `maven-app-docs/ARCHITECTURE.md` - Grace's Relationship Memory system
[2] `maven-app-docs/MAVEN_PLATFORM_OVERVIEW.md` - Wisdom Giants module
[3] `maven-app-docs/Grace_Relationship_Intelligence.md` - The "Big Mama" Memory Architecture
[4] `agent-specs/Identity_Spectrum_Agent_Spec.md` - Consent flow and Thoughtful Proclamation patterns
[5] `agent-specs/Stage_of_Life_Agent_Spec.md` - The 15-20 year relationship horizon and contributor pathways
