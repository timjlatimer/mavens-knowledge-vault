#!/usr/bin/env python3
"""Build Pearl's Brain knowledge base from Gmail extraction data."""

import os
import json
from datetime import datetime

BRAIN_DIR = "/home/ubuntu/pearls_brain"
CONTACTS_DIR = os.path.join(BRAIN_DIR, "contacts")
PORTFOLIO_DIR = os.path.join(BRAIN_DIR, "portfolio")
KB_DIR = os.path.join(BRAIN_DIR, "knowledge_base")

os.makedirs(CONTACTS_DIR, exist_ok=True)
os.makedirs(PORTFOLIO_DIR, exist_ok=True)
os.makedirs(KB_DIR, exist_ok=True)

TODAY = "2026-02-15"

# ============================================================
# CONTACTS — Key people extracted from Gmail + known context
# ============================================================

contacts = {
    "tim_latimer": {
        "name": "Tim Latimer",
        "role": "Chief Visionary Officer, SIC HB1000 Solve Team",
        "emails": ["timjlatimer@gmail.com", "tim@businessasaforceforgood.ca", "tim@freedomcannabis.ca", "livinseasy@yahoo.com"],
        "relationship": "Principal — the user. Founder and driving force behind the entire SIC portfolio.",
        "gmail_threads": 273,
        "notes": "Uses multiple email addresses across different ventures. Primary personal is timjlatimer@gmail.com. Business as a Force for Good domain is the primary business identity."
    },
    "samantha_meunier": {
        "name": "Samantha Meunier (née Frampton)",
        "role": "Key team member at CashCo Financial",
        "emails": ["smeunier@cashcofinancial.com", "sframpton@cashcofinancial.com", "sframpton@Cashcofinancial.com"],
        "relationship": "Core team member. Appears in 54+ threads as Meunier, 17+ as Frampton. Most frequent correspondent after Tim.",
        "gmail_threads": 71,
        "notes": "Name changed from Frampton to Meunier. Central to CashCo Financial operations."
    },
    "chuck_russell": {
        "name": "Chuck Russell",
        "role": "Legal counsel (McRoss)",
        "emails": ["chuck.russell@mross.com"],
        "relationship": "External legal advisor. 25 threads. Involved in corporate, real estate, and cannabis matters.",
        "gmail_threads": 25,
        "notes": "McRoss law firm. Handles multiple portfolio matters."
    },
    "clay_douglass": {
        "name": "Clay Douglass",
        "role": "Technology partner — Beyond Livin",
        "emails": ["claydouglass@gmail.com"],
        "relationship": "Key technology collaborator. 24+ threads. Connected to Beyond Livin platform development.",
        "gmail_threads": 24,
        "notes": "Referenced as having a 'brilliant developer'. Beyond Livin appears to be a tech platform in the portfolio."
    },
    "erika_kiss": {
        "name": "Erika Kiss",
        "role": "Legal team (McRoss)",
        "emails": ["erika.kiss@mross.com"],
        "relationship": "Part of the McRoss legal team supporting the portfolio.",
        "gmail_threads": 19,
        "notes": "Works with Chuck Russell at McRoss."
    },
    "fidel_cagomoc": {
        "name": "Fidel Cagomoc",
        "role": "Team member — Business as a Force for Good",
        "emails": ["Fidel@businessasaforceforgood.ca"],
        "relationship": "Part of the BAFG team. 18 threads.",
        "gmail_threads": 18,
        "notes": "Uses the businessasaforceforgood.ca domain."
    },
    "anya_beckett": {
        "name": "Anya Beckett",
        "role": "Team member — CashCo Financial",
        "emails": ["abeckett@cashcofinancial.com"],
        "relationship": "CashCo Financial team. 17 threads.",
        "gmail_threads": 17,
        "notes": ""
    },
    "johnfrank_potestio": {
        "name": "JohnFrank Potestio",
        "role": "Team member — Freedom Cannabis",
        "emails": ["johnfrankpotestio@freedomcannabis.ca"],
        "relationship": "Connected to Freedom Cannabis operations. 15 threads. Part of the Potestio family.",
        "gmail_threads": 15,
        "notes": "Potestio family appears multiple times in the portfolio."
    },
    "jessie_moores": {
        "name": "Jessie Moores",
        "role": "Team member — CashCo Financial",
        "emails": ["jmoores@cashcofinancial.com"],
        "relationship": "CashCo Financial team. 15 threads.",
        "gmail_threads": 15,
        "notes": ""
    },
    "michelle_craig": {
        "name": "Michelle Craig",
        "role": "Team member — CashCo Financial",
        "emails": ["mcraig@cashcofinancial.com"],
        "relationship": "CashCo Financial team. 15 threads.",
        "gmail_threads": 15,
        "notes": ""
    },
    "boon_han_ong": {
        "name": "Boon Han Ong",
        "role": "Team member — CashCo Financial",
        "emails": ["bhong@cashcofinancial.com"],
        "relationship": "CashCo Financial team. 12 threads.",
        "gmail_threads": 12,
        "notes": ""
    },
    "thomas_geitzenauer": {
        "name": "Thomas Geitzenauer",
        "role": "Seba Hub / Village Vows",
        "emails": ["bookings@sebahub.ca", "forestweddings@villagevows.com"],
        "relationship": "Connected to Seba Hub operations and Village Vows (forest weddings). 12 threads.",
        "gmail_threads": 12,
        "notes": "Seba Hub appears to be a hospitality/venue property. Village Vows is a wedding service."
    },
    "ateel_kumar": {
        "name": "Ateel Kumar",
        "role": "Team member — CashCo Financial",
        "emails": ["akumar@cashcofinancial.com"],
        "relationship": "CashCo Financial team. 10 threads.",
        "gmail_threads": 10,
        "notes": ""
    },
    "sharon_latimer": {
        "name": "Sharon Latimer",
        "role": "Family — spouse",
        "emails": ["sharonclatimer@gmail.com"],
        "relationship": "Tim's spouse. 9 threads. Appears in personal and some business matters.",
        "gmail_threads": 9,
        "notes": "Appears in financial statements (TimandSharonLatimerPNWstatement.pdf)."
    },
    "robert_shields": {
        "name": "Robert Shields",
        "role": "Great Dives TV",
        "emails": ["greatdivestv@gmail.com"],
        "relationship": "Connected to media/content creation. 9 threads.",
        "gmail_threads": 9,
        "notes": ""
    },
    "dave_chen": {
        "name": "Dave Chen",
        "role": "Blue Copper Capital",
        "emails": ["davec@bluecoppercapital.com"],
        "relationship": "Investment/capital connection. 9 threads.",
        "gmail_threads": 9,
        "notes": "Blue Copper Capital — likely an investment or advisory firm."
    },
    "diana_machado": {
        "name": "Diana Machado",
        "role": "Team member — Business as a Force for Good",
        "emails": ["Diana@businessasaforceforgood.ca"],
        "relationship": "Part of the BAFG team. 9 threads.",
        "gmail_threads": 9,
        "notes": ""
    },
    "jesse_latimer_jr": {
        "name": "Jesse Latimer Jr.",
        "role": "Family — son / Business as a Force for Good",
        "emails": ["Jesse@businessasaforceforgood.ca"],
        "relationship": "Tim's son. Works within the BAFG organization. 7 threads.",
        "gmail_threads": 7,
        "notes": "Next generation involvement in the family business portfolio."
    },
    "robert_reyerse": {
        "name": "Robert Reyerse",
        "role": "Associate",
        "emails": ["robert.reyerse@gmail.com"],
        "relationship": "8 threads. Specific role unclear from Gmail data alone.",
        "gmail_threads": 8,
        "notes": ""
    },
    "rich_horning": {
        "name": "Rich Horning",
        "role": "Rich Fundraising",
        "emails": ["Rich@richfundraising.com"],
        "relationship": "Fundraising advisor/consultant. 8 threads.",
        "gmail_threads": 8,
        "notes": "Connected to fundraising activities across the portfolio."
    },
    "irene_renzenbrink": {
        "name": "Irene Renzenbrink",
        "role": "Associate / Family friend",
        "emails": ["irenz@yahoo.com"],
        "relationship": "6 threads. Personal connection.",
        "gmail_threads": 6,
        "notes": ""
    },
    "grant_starrie": {
        "name": "Grant Starrie",
        "role": "Associate",
        "emails": ["vgstar@telus.net"],
        "relationship": "6 threads.",
        "gmail_threads": 6,
        "notes": ""
    }
}

# Write contact files
for key, data in contacts.items():
    filename = f"{key}.md"
    filepath = os.path.join(CONTACTS_DIR, filename)
    emails_list = "\n".join([f"- {e}" for e in data["emails"]])
    content = f"""# {data['name']}

**Last Updated:** {TODAY}
**Role:** {data['role']}
**Gmail Threads:** {data['gmail_threads']}

## Contact Information

**Emails:**
{emails_list}

## Relationship to SIC Portfolio

{data['relationship']}

## Notes

{data['notes'] if data['notes'] else 'No additional notes yet. Will be enriched as more data becomes available (Outlook extraction pending).'}

---
*Profile auto-generated from Gmail extraction. Will be enriched with Outlook data when available.*
"""
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Created {len(contacts)} contact profiles")

# ============================================================
# PORTFOLIO — Key projects and ventures
# ============================================================

portfolio = {
    "cashco_financial": {
        "name": "CashCo Financial",
        "status": "Active",
        "description": "Financial services company. The core business entity in the portfolio. Provides financial products and services, likely focused on underserved communities (aligned with Ruby Red mission).",
        "key_people": ["Samantha Meunier", "Anya Beckett", "JohnFrank Potestio", "Jessie Moores", "Michelle Craig", "Boon Han Ong", "Ateel Kumar"],
        "gmail_threads": 194,
        "domain": "cashcofinancial.com",
        "notes": "Highest email volume after BAFG. Multiple team members on the cashcofinancial.com domain. Connected to ZumBaaS product construct and prepaid/secured cards."
    },
    "business_as_force_for_good": {
        "name": "Business as a Force for Good (BAFG)",
        "status": "Active",
        "description": "The overarching philosophy and organizational identity. businessasaforceforgood.ca is the primary domain for Tim's business communications. Represents the ethos that business should serve social good.",
        "key_people": ["Tim Latimer", "Fidel Cagomoc", "Diana Machado", "Jesse Latimer Jr."],
        "gmail_threads": 301,
        "domain": "businessasaforceforgood.ca",
        "notes": "Highest email volume (301 threads). This is the umbrella identity. The domain is used as Tim's primary business email."
    },
    "freedom_cannabis": {
        "name": "Freedom Cannabis",
        "status": "Active (recent — Jun 2025 to Feb 2026)",
        "description": "Cannabis industry venture. Recent activity concentrated in the last 8 months. JohnFrank Potestio is a key team member.",
        "key_people": ["JohnFrank Potestio", "Tim Latimer"],
        "gmail_threads": 57,
        "domain": "freedomcannabis.ca",
        "notes": "Relatively recent activity. Tim uses tim@freedomcannabis.ca for this venture."
    },
    "seba_hub": {
        "name": "Seba Hub",
        "status": "Active",
        "description": "Hospitality/venue property. Connected to Village Vows (forest weddings) and tree removal services. Thomas Geitzenauer manages operations.",
        "key_people": ["Thomas Geitzenauer"],
        "gmail_threads": 31,
        "domain": "sebahub.ca",
        "notes": "Multi-use property — bookings, events, weddings. Connected to Kokanee Springs area."
    },
    "kokanee_springs": {
        "name": "Kokanee Springs",
        "status": "Active",
        "description": "Real estate / property in the Kokanee Springs area. Connected to Seba Hub operations.",
        "key_people": [],
        "gmail_threads": 7,
        "domain": "",
        "notes": "Appears in real estate and property management context. May be the physical location of Seba Hub."
    },
    "beyond_livin": {
        "name": "Beyond Livin",
        "status": "Active",
        "description": "Technology platform. Clay Douglass is the key partner. Appears to be a tech venture in the portfolio.",
        "key_people": ["Clay Douglass"],
        "gmail_threads": 38,
        "domain": "beyond-livin.com (inferred)",
        "notes": "Lucas appears connected (lucas@beyond-livin.). Clay Douglass described as having a 'brilliant developer'."
    },
    "pawns_on_whyte": {
        "name": "Pawns on Whyte",
        "status": "Active",
        "description": "Pawn shop business on Whyte Avenue (Edmonton area). Part of the portfolio of businesses.",
        "key_people": [],
        "gmail_threads": 10,
        "domain": "",
        "notes": "USA Pawns on Whyte document found in vault. Connected to physical retail operations."
    },
    "stony_plain_farmers_market": {
        "name": "Stony Plain Farmers Market / RJ Industrial Park",
        "status": "Active",
        "description": "Real estate development project in Stony Plain. Involves a farmers market vision for an industrial park property.",
        "key_people": [],
        "gmail_threads": 3,
        "domain": "",
        "notes": "Multiple presentation files in vault. Connected to VTB (Vendor Take Back) LOI. Structured deal."
    },
    "tiger21": {
        "name": "Tiger21",
        "status": "Active",
        "description": "Peer-to-peer learning network for high-net-worth investors. Tim is a member. Portfolio defense presentations and 'Your Story' documents in the vault.",
        "key_people": ["Tim Latimer"],
        "gmail_threads": 2,
        "domain": "",
        "notes": "Multiple Tiger21 documents in vault: Portfolio Defense (qualitative), Your Story, Cloud Butterflies worksheet, Pre-Read documents. Tim presents to this group."
    },
    "settlement_lenders": {
        "name": "Settlement Lenders",
        "status": "Historical",
        "description": "Earlier financial services venture. Gmail records go back to 2013.",
        "key_people": [],
        "gmail_threads": 6,
        "domain": "",
        "notes": "Older venture. May be a predecessor or related entity to CashCo Financial."
    },
    "maven_dn": {
        "name": "Maven DN / The Maven",
        "status": "Active — In Development",
        "description": "Digital platform / app being developed. Connected to CashCo Guardian concept. The definitive master document (V7) exists in the vault.",
        "key_people": [],
        "gmail_threads": 0,
        "domain": "",
        "notes": "Referenced in vault as 'The Maven + Cashco Guardian: The Definitive Master Document (V7)'. This appears to be a major product initiative. ZumBaaS product construct may be related."
    }
}

# Write portfolio files
for key, data in portfolio.items():
    filename = f"{key}.md"
    filepath = os.path.join(PORTFOLIO_DIR, filename)
    people_list = "\n".join([f"- {p}" for p in data["key_people"]]) if data["key_people"] else "- To be populated from Outlook data"
    content = f"""# {data['name']}

**Last Updated:** {TODAY}
**Status:** {data['status']}
**Gmail Threads:** {data['gmail_threads']}
**Domain:** {data['domain'] if data['domain'] else 'N/A'}

## Description

{data['description']}

## Key People

{people_list}

## Notes

{data['notes']}

---
*Profile auto-generated from Gmail extraction. Will be enriched with Outlook data when available.*
"""
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Created {len(portfolio)} portfolio profiles")

# ============================================================
# KNOWLEDGE BASE — Key concepts and frameworks
# ============================================================

knowledge = {
    "ruby_red": {
        "title": "Ruby Red — The North Star Client",
        "content": """Ruby Red is the default North Star for all SIC Solve Team work. She is the 35-45 year old mom of two, the CFO of the household, trying to make her finances stretch until the next payday. She represents the working poor, left out and left behind, the unbanked and underbanked part of the community.

She makes difficult decisions every day: does she put something back in the grocery line? Does she let the kids go to the $30 extracurricular? How does she pay for the flat tire on the car outside?

The team's superpower with her is empathy, practiced with a sense of "there for the grace of God go I."

Core principle: "It's expensive to be poor." The SIC Solve Team believes this is a crime in society and is working to change it.

Ruby Red lives in three hostile worlds (the Three Gangster Worlds): the Political World, the Bureaucratic World, and the Greedy Capitalist World.

If we get it right for Ruby Red, we get it right for everybody else."""
    },
    "hb1000": {
        "title": "HB1000 — The Operating System for Being Human",
        "content": """The HB1000 is a conceptual framework developed by the SIC Solve Team. It is described as "An Operating System for Being Human." It represents the team's approach to solving complex human problems through structured thinking, empathy, and systematic improvement.

The HB1000 architecture has been through multiple versions (v3 referenced in vault). It connects to the broader mission of making life work better for Ruby Red and the communities she represents.

Key documents in vault: 'The HB1000: An Operating System for Being Human.md', 'hb1000_architecture_v3.md', 'hb1000_covey_research.md', 'hb1000_cultural_universality.md', 'hb1000_moonshot_research.md'."""
    },
    "learning_loop_v13": {
        "title": "Learning Loop Protocol V13.0 — The Genie Release",
        "content": """The Learning Loop Protocol is the standard operating procedure for the SIC Solve Team. Version 13.0 (The Genie Release) is the current and only version.

It is a universal nine-phase (0-8) evaluation and certification system with a persistent learning agent (The Genie). Its purpose is to ensure every AI-generated deliverable is Correct, Competitive, Aligned, Communicated, Evolutionary, and Certified.

Key innovations in V13.0: The Genie (persistent learning agent), per-phase KPI scoring, the Persistence Engine (Phase Ledger, anti-drift enforcement), expanded Drift Agent, Quick Scan mode, North Star as mandatory calibration instrument, Dashboard vs KPI-Only modes.

Installed as a skill at: /home/ubuntu/skills/learning-loop-v13/SKILL.md"""
    },
    "three_gangster_worlds": {
        "title": "The Three Gangster Worlds",
        "content": """A framework used by the SIC Solve Team to describe the hostile environments that Ruby Red navigates daily:

1. The Political World — where policy decisions are made without her voice
2. The Bureaucratic World — where systems are designed to be impenetrable to her
3. The Greedy Capitalist World — where she pays more for less because she has less

The JTBD (Job To Be Done) is to figure out how to make life work better for Ruby Red in these three worlds: support her, empower her, enable her, or fix things."""
    },
    "pearls_brain": {
        "title": "Pearl's Brain — Persistent Memory Architecture",
        "content": """Pearl's Brain is the externalized memory system that solves context drift and cross-session amnesia. It is stored in the sandbox filesystem at /home/ubuntu/pearls_brain/.

Architecture:
- smelling_salts.md — Core identity and non-negotiable principles (read FIRST every session)
- current_state.md — Session-to-session bridge (what happened, what's pending)
- session_logs/ — Timestamped logs of every session
- knowledge_base/ — Key concepts and frameworks
- portfolio/ — Portfolio company profiles
- contacts/ — Key people profiles

Session protocol: Read smelling_salts.md and current_state.md at start. Update current_state.md and write session log at end. Update knowledge base as new information emerges.

Created: 2026-02-15. Designed to work in concert with Learning Loop V13.0's Phase 8 session archiving."""
    },
    "swiss_presentation_protocol": {
        "title": "Swiss Presentation Protocol",
        "content": """The standard design system for all SIC Solve Team presentations. Based on Swiss International Style typographic principles: grid-based layout, high-contrast palettes, data-driven content, source citations, and brutalist typography.

All presentations produced by the team, including Learning Loop Phase 4 outputs, must follow this protocol.

Installed as a skill at: /home/ubuntu/skills/swiss-presentation-protocol/SKILL.md"""
    }
}

# Write knowledge base files
for key, data in knowledge.items():
    filename = f"{key}.md"
    filepath = os.path.join(KB_DIR, filename)
    content = f"""# {data['title']}

**Last Updated:** {TODAY}

{data['content']}

---
*Knowledge base entry. Updated as new information becomes available.*
"""
    with open(filepath, 'w') as f:
        f.write(content)

print(f"Created {len(knowledge)} knowledge base entries")

# ============================================================
# Summary
# ============================================================

print(f"\n{'='*60}")
print(f"PEARL'S BRAIN POPULATION COMPLETE")
print(f"{'='*60}")
print(f"Contacts:       {len(contacts)} profiles")
print(f"Portfolio:       {len(portfolio)} profiles")
print(f"Knowledge Base:  {len(knowledge)} entries")
print(f"Total files:     {len(contacts) + len(portfolio) + len(knowledge)}")
print(f"{'='*60}")
