# The Maven Moment System
## Design Document v1.0 — Maven/Grace Platform

> *"It's expensive to be poor. We think that's a crime in society, and we're trying to change it."*
>
> — SIC HB1000 Solve Team, North Star Principle

---

## Purpose & Philosophy

A Maven Moment is not a marketing event. It is a **living proof point** — a real instance where a core value of the Maven/Grace platform was lived out loud in the world. Grace catches an NSF fee before it hits. A Wisdom Giant shows up for a neighbor who doesn't know where to turn. The Union Boss saves someone from a predatory bill. A song gets sent to someone in crisis at 2am. These are the stories that build the Maven Movement, one neighborhood at a time.

The system described in this document exists to capture, protect, and amplify those moments — with dignity, with empathy, and with the hyper-local specificity that turns a story into a neighborhood rallying cry. We are always solving for **Ruby Red**: the 35–45 year old mom, the Chief Financial Officer of her household, navigating the political world, the bureaucratic world, and the greedy capitalist world with immense skill and immense cognitive load. When we get it right for her, we get it right for everyone.

---

## Part 1: The Maven Moment Catalog Schema

The catalog is the living record of the Maven Movement. It must be designed for **frictionless, continuous addition** — every day, new moments are happening on 97th Street and in Mill Woods and in every neighborhood where Ruby lives. The schema below captures the full context of each moment, from the triggering service to the measurable impact, while protecting Ruby's privacy and dignity at every step.

### 1.1 Moment Identification

| Field | Description | Example |
|---|---|---|
| **Moment ID** | Unique identifier, auto-generated | `MM-2026-03-20-001` |
| **Date** | Date the moment occurred | `March 20, 2026` |
| **Time of Day** | Morning / Afternoon / Evening / Late Night | `Late Night` |
| **Status** | Draft / Pending Permission / Published / Archived | `Pending Permission` |

### 1.2 Category: The Triggering Service or Innovation

Which aspect of the Maven/Grace platform brought this moment into being? This is the engine behind the story.

| Category | Description | Example Trigger |
|---|---|---|
| **Corner Banker** | Financial intervention, fee avoidance, micro-loan, stretching dollars until payday | Grace catches a $45 NSF fee before it posts |
| **Big Mama** | Nurturing, food security, immediate care, emotional holding | Grace identifies a food bank in the neighborhood and arranges a warm referral |
| **Song Moment** | A song sent to someone in crisis — offering hope, connection, and presence | A curated track sent to Ruby at 2am when she texts "I don't know how I'm going to do this" |
| **Union Boss** | Advocacy, saving money on bills, negotiating with the bureaucratic or greedy capitalist world | Disputing a utility overcharge and recovering $120 |
| **Wisdom Giant** | Mentorship, expert advice shared locally, best practice innovation applied to daily life | A local accountant in the Maven network explains the Working Income Tax Benefit in plain language |
| **Good Neighbor** | Peer-to-peer mutual aid, community support, "there but for the grace of God go I" in action | A Maven member offers a spare car seat to a neighbor who just had a flat tire |

### 1.3 The Local Anchor

> **Rule:** Every Maven Moment MUST include a hyper-local identifier. "This happened on 97th Street" — not just "someone in Edmonton."

The local anchor is the single most important element of the catalog schema. It is what transforms a platform feature into a neighborhood story. It creates trust, resonance, and belonging.

| Field | Description | Example |
|---|---|---|
| **Street / Intersection** | The specific street or landmark | `97th Street` |
| **Neighborhood** | Named neighborhood or district | `Mill Woods` |
| **City / Region** | City and province/state | `Edmonton, Alberta` |

### 1.4 Narrative Tracks: Privacy & Attribution

The catalog supports two parallel narrative tracks. The choice of track is always Ruby's, facilitated by Grace with warmth and zero pressure.

**Track A: Anonymous**

The story is told with initials only, the date, the street, and the city. No full name, no photo, no identifying detail beyond the neighborhood. This track protects Ruby's dignity in sensitive financial or crisis moments while preserving the full emotional power of the story.

*Catalog Format:* `S.M., March 20, 97th Street, Edmonton`

**Track B: Attributed**

The story is told with Ruby's full name (or preferred name), an optional photo, and the full narrative context. This track is reserved for triumphant moments — when Ruby wants to own her victory and inspire others. Explicit, recorded permission via Grace is required before any attributed story is published.

*Catalog Format:* `Sarah M., March 20, 97th Street, Edmonton — full story, photo confirmed, permission on file`

### 1.5 Impact Score

The impact score quantifies the "why it matters" for both internal metrics and external storytelling. It is the evidence layer beneath the emotional story.

| Dimension | Measurement | Example |
|---|---|---|
| **Financial Impact** | Dollars saved, fees reversed, cost of the "expensive to be poor" tax avoided | `$45 NSF fee reversed` |
| **Time Impact** | Hours saved from bureaucratic navigation or cognitive overload | `3 hours of phone calls avoided` |
| **Emotional / Connection Score** | Depth of crisis resolved or connection made (1–5 scale) | `5 — crisis moment, song sent at 2am` |
| **Systemic Friction Removed** | Named systemic barrier bypassed | `Bypassed predatory payday loan cycle` |

---

## Part 2: The Permission Workflow — Grace's Voice

Grace is not a lawyer. She is not a compliance officer. She is a trusted friend with deep empathy who understands that Ruby is carrying an enormous cognitive load. The permission request must feel like one neighbor asking another — warm, natural, and completely without pressure. Ruby must always feel that she is in control of her own story.

### 2.1 Track A: Anonymous Permission

**Trigger:** A significant positive outcome has been achieved, but the context is sensitive — a financial rescue, a crisis intervention, a moment of quiet dignity that Ruby may not want to broadcast with her name attached.

**Grace's Message:**

> "Hey Ruby, what we just did together? That was huge. You completely turned that situation around and protected your family's budget — and I know how much that matters right now.
>
> I know there are other moms in Edmonton dealing with the exact same stress who would feel so much hope hearing how you handled this. Would you be okay if I shared the story to encourage them? I would keep it completely anonymous — no names, just that a mom on 97th Street figured this out today. It might just be the exact thing someone else needs to hear when they're feeling overwhelmed and don't know where to turn.
>
> What do you think? No pressure either way — this is your story."

### 2.2 Track B: Attributed Permission

**Trigger:** A triumphant moment — a major Union Boss win, a Wisdom Giant connection that changed Ruby's trajectory, a community leadership moment where Ruby is visibly succeeding and her story has the power to inspire others to step forward.

**Grace's Message:**

> "Ruby, I am so incredibly proud of you for this. You didn't just solve a problem — you showed exactly what it means to be a powerhouse for your family. That took courage, and it worked.
>
> Stories like yours are how we build this movement and show others what's possible. I would love to share your victory with the wider community — with your name, so people know this is real, and a photo if you're comfortable with that. I want people on 97th Street to see that their neighbor did this, because that's what makes it real for them.
>
> Are you open to letting me share your story? It could be the thing that brings the next Ruby into the Maven family. And you would have made that happen."

---

## Part 3: The Social Publishing Framework

### 3.1 Content Strategy

Every Maven Moment post is built on three pillars: **the emotional hook**, **the proof of impact**, and **the local anchor**. The tone is never corporate, never polished, never distant. It sounds like one neighbor talking to another over a back fence.

**Format:** Short, narrative-driven text — two to three paragraphs maximum — paired with an authentic visual. The writing is in plain language, at a Grade 7–8 reading level, because we respect Ruby's time and cognitive bandwidth.

**Visuals:**
- *Track A:* High-quality, evocative neighborhood photography — a street sign on 97th Street, a local coffee shop window at dusk, a community league bulletin board. Or a simple, warm text graphic with the moment's core line.
- *Track B:* An authentic photo of Ruby (if provided and consented), or a community action shot that captures the spirit of the moment.

### 3.2 Distribution Channels

| Channel | Rationale | Example |
|---|---|---|
| **Facebook Mutual Aid & Neighborhood Groups** | This is where Ruby already organizes, shares, and asks for help. The primary battleground. | "Edmonton Mutual Aid", "Mill Woods Community Board" |
| **Instagram / TikTok** | Visual storytelling for Song Moments and emotional narratives. Reaches Ruby's network. | Short video with the song, the story, the street |
| **Local Community Boards (Physical & Digital)** | Coffee shops, laundromats, community league newsletters. Meeting Ruby where she already is. | Printed card at the 97th Street laundromat |

### 3.3 The Hashtag Strategy & Local Anchor System

The hashtag strategy bridges the global Maven Movement with hyper-local neighborhood reality. The local anchor is not optional — it is the mechanism by which a story becomes a community asset.

**Core Movement Tags (always included):**
`#MavenMovement` `#MavenMoment` `#GraceIsHere`

**The Local Anchor Tags (required, specific to each moment):**
`#97thStreet` `#MillWoods` `#Highlands` `#YEG` `#EdmontonMoms`

**Why the local anchor works:** When a mom scrolling Facebook at midnight sees a win tagged `#97thStreet`, it is no longer an abstract technology company. It is her neighbor. It is proof that the solution is accessible right where she lives, on the street she drives every day. The local anchor converts a story into a community signal.

### 3.4 Sample Maven Moment Post (Track A — Corner Banker)

> **A mom on 97th Street just saved $45 she didn't have to lose.**
>
> Last week, Grace noticed an NSF fee about to hit her account — the kind that snowballs into three more fees, then a payday loan, then a month of playing catch-up. Grace flagged it before it posted, helped her move $45 to cover it, and the whole thing was resolved in four minutes.
>
> Four minutes. $45 saved. One less impossible decision this week.
>
> If you're navigating the same stretch, Grace is here. She's watching out for our neighborhood. 💙
>
> `#MavenMoment` `#97thStreet` `#MavenMovement` `#YEG`

---

## Part 4: The Trojan Horse Mechanic

### 4.1 The Core Principle

Every shared Maven Moment is a silent invitation. The Maven Movement does not do traditional marketing. We do **attraction through evidence and empathy**. We never ask Ruby to trust us — we show her that her neighbor already does.

The Trojan Horse mechanic works because it bypasses the "greedy capitalist world" filter that Ruby has rightfully developed over years of being sold things that didn't serve her. She is not being pitched a financial product. She is being shown that a trusted community resource already exists in her neighborhood.

### 4.2 The Three-Layer Structure

Every Maven Moment post contains three layers, only one of which is visible as an "invitation":

**Layer 1 — The Story (Emotional Resonance):** A real, specific, local story that mirrors Ruby's lived experience. She recognizes herself in it immediately. The cognitive load, the impossible decision, the small victory.

**Layer 2 — The Proof (Impact Evidence):** A specific, measurable outcome. Not "Grace helps with finances" — but "$45 saved, four minutes, NSF fee gone." Specificity is credibility.

**Layer 3 — The Silent Invitation (The Trojan Horse):** The post does not say "Sign up for Maven." It says:
- *"If you're dealing with this too, Grace is here."*
- *"We look out for each other on 97th Street. Ask Grace to check your account."*
- *"It's expensive to be poor, but you don't have to navigate it alone."*
- *"Grace is watching out for our neighborhood."*

The gateway is a single, frictionless link to text Grace or join the platform. One tap. No form. No credit check. No judgment.

### 4.3 Why It Works

The Trojan Horse mechanic succeeds because it positions Grace as a **community asset**, not a corporate service. The Maven Movement is framed as something that already belongs to the neighborhood — and Ruby is simply being reminded that she is welcome in it.

It lowers the cognitive load required to ask for help by showing that others in her exact situation are already receiving it. It removes the shame of needing support by making support the community norm. And it creates a viral loop: every Ruby who shares her story becomes a recruiter, not because she was asked to, but because she genuinely wants her neighbor to have what she has.

---

## Part 5: The Living System — Continuous Addition Protocol

The Maven Moment catalog is not a static archive. It is a **living, breathing record** of the movement in motion. The following protocols ensure that new moments are captured and published with minimum friction.

**Capture Triggers:** Grace automatically flags potential Maven Moments based on defined criteria (financial threshold exceeded, crisis keyword detected, Wisdom Giant referral completed). Ruby is prompted within 24 hours of the moment.

**Permission Window:** Ruby has 72 hours to respond to Grace's permission request. If no response, the moment defaults to Track A (anonymous) or is archived as unpublished.

**Publishing Cadence:** A minimum of three Maven Moments are published per week per active city. Moments are queued and scheduled to maintain consistent neighborhood presence.

**Catalog Review:** The Solve Team reviews the catalog monthly to identify patterns, emerging categories, and high-impact stories that warrant deeper amplification.

---

*Document Version: 1.0*
*Prepared by: Maven Moment Agent — SIC HB1000 Solve Team*
*Date: March 20, 2026*
*Repository: timjlatimer/mavens-knowledge-vault / innovation-libraries/*
