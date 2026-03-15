#!/usr/bin/env python3
"""
HB1000 — 100% Architecture Infographic
Swiss International Style — High contrast, grid-based, data-driven
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
import numpy as np

# ============================================================
# CONFIGURATION
# ============================================================
WIDTH = 36  # inches
HEIGHT = 54  # inches (poster size)
DPI = 150

# Swiss color palette
BLACK = '#0A0A0A'
WHITE = '#FFFFFF'
DARK_GRAY = '#1A1A1A'
MED_GRAY = '#333333'
LIGHT_GRAY = '#E8E8E8'
ACCENT_RED = '#C41E3A'      # Ruby Red
ACCENT_BLUE = '#1B4F72'     # Blue Seal
ACCENT_GOLD = '#B8860B'     # Wisdom/Premium
ACCENT_TEAL = '#008080'     # Growth/Engines
ACCENT_GREEN = '#2E7D32'    # Funding/Trust
ACCENT_PURPLE = '#6A1B9A'   # Protection
ACCENT_ORANGE = '#E65100'   # Communication
SOFT_BG = '#F5F5F0'         # Off-white background

# Layer colors (left accent bars)
LAYER_COLORS = [
    ACCENT_GOLD,    # L1: North Star / Vivid Vision
    ACCENT_RED,     # L2: Philosophy
    BLACK,          # L3: HB1000 OS (centre)
    ACCENT_TEAL,    # L4: Bingo Card Universe
    ACCENT_TEAL,    # L5: Engines
    ACCENT_PURPLE,  # L6: Protection
    ACCENT_ORANGE,  # L7: Communication
    ACCENT_BLUE,    # L8: LDP
    ACCENT_BLUE,    # L9: Certification
    ACCENT_GREEN,   # L10: Funding
    MED_GRAY,       # L11: Governance
    MED_GRAY,       # L12: Maven Registry
    ACCENT_RED,     # L13: The Guardian (Pearl)
]

fig, ax = plt.subplots(1, 1, figsize=(WIDTH, HEIGHT), dpi=DPI)
fig.patch.set_facecolor(SOFT_BG)
ax.set_xlim(0, 100)
ax.set_ylim(0, 150)
ax.set_aspect('equal')
ax.axis('off')

def draw_layer_box(ax, y_bottom, height, color, title, subtitle_lines, detail_boxes=None, is_centre=False):
    """Draw a single layer with accent bar, title, and content."""
    x_left = 3
    x_right = 97
    w = x_right - x_left
    
    # Background
    bg_color = DARK_GRAY if is_centre else WHITE
    text_color = WHITE if is_centre else BLACK
    
    rect = FancyBboxPatch((x_left, y_bottom), w, height, 
                          boxstyle="round,pad=0.3",
                          facecolor=bg_color, edgecolor=color, linewidth=3)
    ax.add_patch(rect)
    
    # Left accent bar
    accent = plt.Rectangle((x_left, y_bottom), 1.5, height, 
                           facecolor=color, edgecolor='none')
    ax.add_patch(accent)
    
    # Title
    ax.text(x_left + 3, y_bottom + height - 1.2, title,
            fontsize=16, fontweight='bold', color=text_color,
            fontfamily='sans-serif', va='top')
    
    # Subtitle lines
    for i, line in enumerate(subtitle_lines):
        ax.text(x_left + 3, y_bottom + height - 3.0 - (i * 1.4), line,
                fontsize=9, color=text_color if not is_centre else '#CCCCCC',
                fontfamily='sans-serif', va='top', alpha=0.85)
    
    # Detail boxes (sub-components within the layer)
    if detail_boxes:
        box_y = y_bottom + 0.8
        num_boxes = len(detail_boxes)
        box_w = (w - 6) / num_boxes - 0.5
        for j, (box_title, box_items, box_color) in enumerate(detail_boxes):
            box_x = x_left + 3 + j * (box_w + 0.5)
            inner = FancyBboxPatch((box_x, box_y), box_w, height - 5.5,
                                   boxstyle="round,pad=0.2",
                                   facecolor=box_color, edgecolor=color,
                                   linewidth=1, alpha=0.15)
            ax.add_patch(inner)
            ax.text(box_x + 0.5, box_y + height - 6.2, box_title,
                    fontsize=8, fontweight='bold', color=text_color,
                    fontfamily='sans-serif', va='top')
            for k, item in enumerate(box_items):
                ax.text(box_x + 0.5, box_y + height - 7.5 - (k * 1.1), f"• {item}",
                        fontsize=6.5, color=text_color, fontfamily='sans-serif',
                        va='top', alpha=0.8)

# ============================================================
# TITLE BANNER
# ============================================================
title_rect = plt.Rectangle((0, 145), 100, 5, facecolor=BLACK, edgecolor='none')
ax.add_patch(title_rect)
ax.text(50, 148.5, 'THE HB1000 ECOSYSTEM', fontsize=28, fontweight='bold',
        color=WHITE, fontfamily='sans-serif', ha='center', va='center')
ax.text(50, 146.5, 'Operating System for Being Human — Complete Architecture',
        fontsize=14, color=LIGHT_GRAY, fontfamily='sans-serif', ha='center', va='center')
ax.text(3, 146, 'SIC HB1000 SOLVE TEAM', fontsize=8, color=ACCENT_RED,
        fontfamily='sans-serif', va='center')
ax.text(97, 146, 'V3.1 — February 2026', fontsize=8, color=ACCENT_RED,
        fontfamily='sans-serif', va='center', ha='right')

# ============================================================
# LAYER 1: NORTH STAR / VIVID VISION (TOP)
# ============================================================
y = 135
h = 9
draw_layer_box(ax, y, h, ACCENT_GOLD,
    'LAYER 1: THE NORTH STAR — VIVID VISION',
    ['The aspirational ceiling. Every Bingo Card has a Vivid Vision at its top. The HB1000 meta-job is JOY.'],
    [
        ('JOY Framework', [
            'J = Joy as Destination (not happiness)',
            'O = Operating Principles (gratitude, humility, selflessness)',
            'Y = Your North Star & Moonshots',
            '"The Funeral Test" — Covey Habit 2'
        ], ACCENT_GOLD),
        ('Vivid Vision', [
            'Cameron Herold 3-year painted picture',
            'Written in present tense: "We are..."',
            'Sits at TOP of every Bingo Card',
            'JTBD derived from Vivid Vision'
        ], ACCENT_GOLD),
        ('Destiny Discovered', [
            'Tim Latimer: 1,600+ biographies studied',
            'Sense of Destiny + Purpose + Legacy',
            'Jim Collins BHAG + Core Values',
            'Cloud Butterflies = seeds of destiny'
        ], ACCENT_GOLD),
    ])

# ============================================================
# LAYER 2: PHILOSOPHY
# ============================================================
y = 125
h = 9
draw_layer_box(ax, y, h, ACCENT_RED,
    'LAYER 2: THE PHILOSOPHY — SOCIAL IMPACT CAPITALISM',
    ['"It\'s expensive to be poor." We think that\'s a crime in society, and we\'re trying to change it.'],
    [
        ('Ruby Red', [
            '35-45 yr old mom of two',
            'CFO of the household',
            'Working poor, unbanked, underbanked',
            'If we get it right for her, we get it right for all'
        ], ACCENT_RED),
        ('Three Gangster Worlds', [
            'Political: policy without her voice',
            'Bureaucratic: systems designed to exhaust',
            'Greedy Capitalist: she pays more for less',
            'Pearl fights all three simultaneously'
        ], ACCENT_RED),
        ('SIC Principles', [
            '1. The Ruby Red Test',
            '2. The Empathy Imperative',
            '3. The Sustainability Mandate',
            'Empathy is our superpower'
        ], ACCENT_RED),
        ('UBI > UBS > UBP', [
            'UBI gives money',
            'UBS gives services',
            'UBP gives PURPOSE',
            'Pearl makes UBP operational'
        ], ACCENT_RED),
    ])

# ============================================================
# LAYER 3: THE HB1000 OS (CENTRE — DARK)
# ============================================================
y = 114
h = 10
draw_layer_box(ax, y, h, WHITE,
    'LAYER 3: THE HB1000 — OPERATING SYSTEM FOR BEING HUMAN',
    ['The universal substrate. Every other component plugs into this. Culturally universal (Schwartz values, 80+ countries).'],
    [
        ('System 1: Universal HB1000', [
            'Guardian: Pearl',
            'Audience: Any human, any culture',
            'Scope: Full life operating system',
            'Services: Open-ended, user-configured',
            'Pricing: TBD'
        ], WHITE),
        ('SHARED ARCHITECTURE', [
            'Bingo Card Protocol: SHARED',
            'Wisdom Library: SHARED',
            'PTK Engine: SHARED',
            'Learning Loops: Bidirectional',
            'Best practices flow both ways'
        ], WHITE),
        ('System 2: Grace / Big Mama', [
            'Guardian: Big Mama + Grace',
            'Audience: Left Out, Left Behind, Working Poor',
            'Scope: ~150 curated services for Ruby Red',
            'Enhanced Protection Layer',
            '$5.85/mo basic | $14.88/mo premium'
        ], WHITE),
    ], is_centre=True)

# ============================================================
# LAYER 4: BINGO CARD UNIVERSE
# ============================================================
y = 103
h = 10
draw_layer_box(ax, y, h, ACCENT_TEAL,
    'LAYER 4: THE BINGO CARD UNIVERSE — UNIVERSAL INTERACTION ARCHITECTURE',
    ['Every interaction = a Bingo Card. Every life area = a collection of cards. The user\'s entire life viewed through cards.'],
    [
        ('Card Anatomy', [
            'Squares (items to complete)',
            'Multi/Genie (AI agent attached)',
            'Graphics (infographics, data)',
            'PTK Engine (commitment tracking)',
            'Context + Phase + KPIs'
        ], ACCENT_TEAL),
        ('Card Intelligence', [
            'Vivid Vision at TOP of card',
            'JTBD derived from Vision',
            '3 Dimensions: Functional, Social, Emotional',
            '4 Forces: Push, Pull, Anxiety, Allegiance',
            'Milkshake Test / Drill vs. Hole'
        ], ACCENT_TEAL),
        ('Card Flow', [
            'Flypaper captures thought',
            '> Triage Queue (Pearl suggests)',
            '> Assigned to Bingo Card',
            'Daily update > Ticker Tape',
            'Bingo Card Universe = life dashboard'
        ], ACCENT_TEAL),
        ('Card Lifecycle', [
            'Setup > Active > Monitoring',
            'Each card has own Learning Loop',
            'KPIs: completion rate, time, outstanding',
            'Cards can spawn sub-cards',
            'Archive when complete'
        ], ACCENT_TEAL),
    ])

# ============================================================
# LAYER 5: THE ENGINES
# ============================================================
y = 90
h = 12
draw_layer_box(ax, y, h, ACCENT_TEAL,
    'LAYER 5: THE ENGINES — PTK + WISDOM WORKS + WISDOM GIANTS',
    ['Three engines run across all Bingo Cards. PTK tracks promises. Wisdom Works answers questions. Wisdom Giants provide human wisdom.'],
    [
        ('PTK v1: Trojan Horse', [
            '"Promise Keeper" — innocuous name',
            'Zero onboarding friction',
            'Daily briefing: what\'s due today',
            'Tracks promises between people',
            'No LDP/HB1000 branding',
            'Graduation path to v2'
        ], ACCENT_TEAL),
        ('PTK v2: Organizational', [
            'Full OAuth email integration',
            'Reliability scoring + LDEI',
            'Ghost Buster (broken promises)',
            'Force for Good Coach',
            'Promise Feed dashboard',
            'Morning Briefing integrated'
        ], ACCENT_TEAL),
        ('Wisdom Works', [
            'L1: Multi-AI consensus',
            '(Claude, GPT, Gemini, DeepSeek)',
            'L2: Wisdom Giants (voice/video)',
            '90s / 2m / 5m time limits',
            'Immediate + 24hr Soak response',
            '"Gatekeep output, not input"'
        ], ACCENT_TEAL),
        ('Wisdom Giants (5 Sections)', [
            '1. The Seed (parents\' voice)',
            '2. The Growth (10,000+ collective)',
            '3. The Fusion (collective in YOUR voice)',
            '4. The Dual (Mother=aware, Father=act)',
            '5. The Extraction Loop (evolve)',
            '"Seed is personal. Growth is collective."'
        ], ACCENT_TEAL),
    ])

# ============================================================
# LAYER 6: PROTECTION
# ============================================================
y = 81
h = 8
draw_layer_box(ax, y, h, ACCENT_PURPLE,
    'LAYER 6: THE PROTECTION LAYER',
    ['Active defense against the Three Gangsters. Measures manipulation. Protects Ruby Red from extraction.'],
    [
        ('Puppet Strings Report', [
            'Fear level (H/M/L)',
            'Scarcity exposure',
            'Social Proof manipulation',
            'Authority Bias',
            'Harvest Level (value extracted)'
        ], ACCENT_PURPLE),
        ('Enhanced (Grace/Big Mama)', [
            'Banking Watchdog (hourly)',
            'Bullshit Detector (real-time)',
            'Creep Watch (emotional)',
            'JOY Nudges (mood tracking)',
            'Joy Hijack Alert'
        ], ACCENT_PURPLE),
        ('Negative News KPI', [
            'External news impact',
            'Internal life events impact',
            'Information intake > wellbeing',
            'Curated feed protection',
            'Mental Manipulation Exposure'
        ], ACCENT_PURPLE),
    ])

# ============================================================
# LAYER 7: COMMUNICATION & AWARENESS
# ============================================================
y = 72
h = 8
draw_layer_box(ax, y, h, ACCENT_ORANGE,
    'LAYER 7: COMMUNICATION & AWARENESS',
    ['How the system talks to the user and keeps them informed without overwhelming them.'],
    [
        ('Ticker Tape', [
            'Up to 2 customizable bars',
            'Peer Feed (community)',
            'Multi Feed (AI status)',
            'Personal Feed (Bingo/PTK)',
            'World Feed (curated news)'
        ], ACCENT_ORANGE),
        ('Morning Anthem', [
            'Daily briefing ritual',
            'PTK promises due today',
            'Bingo Card updates',
            'Protection alerts',
            'Integrated with Maven'
        ], ACCENT_ORANGE),
        ('Jolene Protocol', [
            'Opening Hook (image first)',
            'Physical Object (concrete)',
            'Quote Discipline (one per source)',
            'The Kicker (line that stays)',
            'Restraint (trust the material)'
        ], ACCENT_ORANGE),
        ('Cloud Butterflies', [
            'Fleeting thought capture',
            'Seeds of destiny',
            '"Involuntary, momentary insights"',
            'Captured > processed > routed',
            'Feeds into Flypaper > Bingo'
        ], ACCENT_ORANGE),
    ])

# ============================================================
# LAYER 8: LDP (ORGANIZATIONAL)
# ============================================================
y = 63
h = 8
draw_layer_box(ax, y, h, ACCENT_BLUE,
    'LAYER 8: LATIMER DOUGLAS PROTOCOL — THE ORGANIZATIONAL LAYER',
    ['Autonomous AI-driven meta-layer. An unseen, benevolent Chief of Staff for organizations.'],
    [
        ('5-Level Biomimetic', [
            '1. Memory (immutable recall)',
            '2. Perception (gap scanning)',
            '3. Rehearsal (simulate moves)',
            '4. Morphology (shape-shift UI)',
            '5. Immunity (risk + patches)'
        ], ACCENT_BLUE),
        ('Governance', [
            'Human-in-the-Loop always',
            'Master\'s Nod required',
            'Council of Rivals (LLM debate)',
            'Debate visible to leader',
            'Senses > Simulates > Proposes'
        ], ACCENT_BLUE),
        ('Go-to-Market', [
            'PTK Trojan Horse > adoption',
            '> Peer Spread',
            '> Islands of Competence',
            '> Enterprise Inevitability',
            'Product-led growth'
        ], ACCENT_BLUE),
    ])

# ============================================================
# LAYER 9: CERTIFICATION & TRUST
# ============================================================
y = 55
h = 7
draw_layer_box(ax, y, h, ACCENT_BLUE,
    'LAYER 9: CERTIFICATION & TRUST — BLUE SEAL + STAGE TWO',
    ['The integrity signal. Proves an initiative meets SIC standards. Not permanent — must be renewed.'],
    [
        ('Blue Seal Criteria', [
            '1. Social Impact Verified',
            '2. Financial Sustainability Confirmed',
            '3. Learning Loop Certified',
            'Must be renewed via ongoing loops',
            'Drift = lose the seal'
        ], ACCENT_BLUE),
        ('Stage Two', [
            'Entrepreneur Insurance Guarantee',
            'Up to $100K capital guarantee',
            'Tied to LDEI scores',
            'For entrepreneurs following LDP',
            'Safety net for moonshots'
        ], ACCENT_BLUE),
        ('SIC Matrix', [
            'X: Economic Engine Strength',
            'Y: Purpose Alignment & Impact',
            'Deadwood > Martyr > SOB > Honeybee',
            'B-Chart = assessment tool',
            'Target: Honeybee Zone (7-8 range)'
        ], ACCENT_BLUE),
    ])

# ============================================================
# LAYER 10: FUNDING ENGINE
# ============================================================
y = 46
h = 8
draw_layer_box(ax, y, h, ACCENT_GREEN,
    'LAYER 10: THE FUNDING ENGINE — SOCIAL IMPACT CAPITALISM ECONOMICS',
    ['Every dollar generates both financial return and measurable social impact. Neither is optional.'],
    [
        ('10% Tithe', [
            'Economic Floor (direct support)',
            'Economic Engine (seed capital)',
            'Civic Framework (accountability)',
            '10% of top-line revenue',
            'Back to community always'
        ], ACCENT_GREEN),
        ('Reserve Fund', [
            'Self-perpetuating by Year 7',
            '$30M+ annual contributions',
            '$7M annual claims',
            'Mathematical sustainability',
            'No perpetual grants needed'
        ], ACCENT_GREEN),
        ('50/50 Foundation Trust', [
            'Half the cost of moonshots',
            'Through HB1000 access point',
            'Philanthropists > direct support',
            'No NGOs in between',
            'Direct human-to-human'
        ], ACCENT_GREEN),
        ('MicroCharge Model', [
            'Small-dollar revenue embedded',
            'In existing functionality',
            'Big Mama: $5.85 / $14.88/mo',
            '10% profits > Village members',
            'Village Council decides allocation'
        ], ACCENT_GREEN),
    ])

# ============================================================
# LAYER 11: GOVERNANCE ENGINE
# ============================================================
y = 38
h = 7
draw_layer_box(ax, y, h, MED_GRAY,
    'LAYER 11: THE GOVERNANCE ENGINE — LEARNING LOOPS V13.0 (THE GENIE RELEASE)',
    ['Continuous improvement protocol. 9 phases. Persistence Engine. Anti-drift enforcement. The standard operating procedure.'],
    [
        ('9 Phases', [
            'P0: Ignition (North Star)',
            'P1-P2: Research + Analysis',
            'P3: Build + Execute',
            'P4: Swiss Presentation',
            'P5-P6: Evolution + Certification'
        ], MED_GRAY),
        ('Persistence Engine', [
            'Phase Ledger tracking',
            'One-phase-per-response',
            'Completion proofs required',
            'Anti-drift enforcement',
            'Session archiving'
        ], MED_GRAY),
        ('Three Guardians', [
            'Devil\'s Advocate (challenge)',
            'North Star\'s Voice (alignment)',
            'The Pragmatist (feasibility)',
            'Emotional Reality Check',
            'Smelling Salts Protocol'
        ], MED_GRAY),
    ])

# ============================================================
# LAYER 12: MAVEN SERVICE REGISTRY
# ============================================================
y = 30
h = 7
draw_layer_box(ax, y, h, MED_GRAY,
    'LAYER 12: MAVEN SERVICE REGISTRY — 143 SERVICES ACROSS 16 CATEGORIES',
    ['The complete catalogue of everything Grace/Big Mama offers. Four tiers. 10 non-negotiable universals.'],
    [
        ('4 Tiers', [
            'Free: Core services',
            'Essential: $5.85/mo',
            'Growth: $14.88/mo',
            'Premium: $29.88/mo',
            '10 Non-Negotiable at ALL tiers'
        ], MED_GRAY),
        ('16 Categories', [
            'Financial, Health, Career, Education',
            'Legal, Housing, Family, Mental Health',
            'Transportation, Food, Technology',
            'Community, Government, Insurance',
            'Entertainment, Emergency'
        ], MED_GRAY),
        ('Non-Negotiable 10', [
            'PTK Dashboard, Banking Watchdog',
            'Emergency SOS, Puppet Strings',
            'Morning Anthem, Cloud Butterflies',
            'Wisdom Works Basic, Bingo Cards',
            'Community Board, Help Directory'
        ], MED_GRAY),
    ])

# ============================================================
# LAYER 13: THE GUARDIAN (PEARL) — BOTTOM
# ============================================================
y = 20
h = 9
draw_layer_box(ax, y, h, ACCENT_RED,
    'LAYER 13: THE GUARDIAN — PEARL',
    ['"Mother of all Graces" — Persistent, always-learning, deeply persistent digital guardian.'],
    [
        ('Pearl\'s Identity', [
            'Matriarchal AI executive assistant',
            'Protector of projects',
            'Wise counsel in decisions',
            'Authority who keeps it moving',
            'Empathy is the superpower'
        ], ACCENT_RED),
        ('Pearl\'s Brain', [
            'Smelling Salts (core identity)',
            'Current State (session bridge)',
            'Knowledge Base (25+ entries)',
            'Commitment Tracker (open items)',
            'Session Logs (every session)'
        ], ACCENT_RED),
        ('Grace (Daughters)', [
            'Individual project agents',
            'Spawned and managed by Pearl',
            'Each Bingo Card can have a Grace',
            'Pearl oversees all Graces',
            'Grace = Big Mama\'s assistant'
        ], ACCENT_RED),
        ('Maturation Path', [
            '1. Watcher (observe only)',
            '2. Advisor (suggest actions)',
            '3. Partner (co-decide)',
            '4. Oracle (trusted authority)',
            'Trust earned over time'
        ], ACCENT_RED),
    ])

# ============================================================
# VERTICAL FLOW ARROWS (left side)
# ============================================================
for y_pos in [134.5, 124.5, 113.5, 102.5, 89.5, 80.5, 71.5, 62.5, 54.5, 45.5, 37.5, 29.5]:
    ax.annotate('', xy=(1.5, y_pos - 0.5), xytext=(1.5, y_pos + 0.5),
                arrowprops=dict(arrowstyle='->', color=MED_GRAY, lw=2))

# ============================================================
# SIDE ANNOTATIONS (right margin)
# ============================================================
# Go-to-market arrow
ax.text(99, 130, 'ASPIRATION', fontsize=7, color=ACCENT_GOLD, fontfamily='sans-serif',
        ha='right', va='center', rotation=90, fontweight='bold')
ax.text(99, 108, 'INTERACTION', fontsize=7, color=ACCENT_TEAL, fontfamily='sans-serif',
        ha='right', va='center', rotation=90, fontweight='bold')
ax.text(99, 80, 'PROTECTION', fontsize=7, color=ACCENT_PURPLE, fontfamily='sans-serif',
        ha='right', va='center', rotation=90, fontweight='bold')
ax.text(99, 55, 'TRUST', fontsize=7, color=ACCENT_BLUE, fontfamily='sans-serif',
        ha='right', va='center', rotation=90, fontweight='bold')
ax.text(99, 38, 'GOVERNANCE', fontsize=7, color=MED_GRAY, fontfamily='sans-serif',
        ha='right', va='center', rotation=90, fontweight='bold')
ax.text(99, 24, 'GUARDIAN', fontsize=7, color=ACCENT_RED, fontfamily='sans-serif',
        ha='right', va='center', rotation=90, fontweight='bold')

# ============================================================
# BOTTOM BANNER — THE FOUNDING QUOTE
# ============================================================
bottom_rect = plt.Rectangle((0, 15), 100, 4, facecolor=ACCENT_RED, edgecolor='none')
ax.add_patch(bottom_rect)
ax.text(50, 17, '"IT\'S EXPENSIVE TO BE POOR."  We think that\'s a crime in society, and we\'re trying to change it.',
        fontsize=14, fontweight='bold', color=WHITE, fontfamily='sans-serif',
        ha='center', va='center', style='italic')

# Cross-cutting elements at very bottom
ax.text(50, 13, 'CROSS-CUTTING: Blank Slate Architecture (Universal template) | Covey Protocol Foundation | '
        'Poverty as Cognitive Condition (-13 IQ pts, Mullainathan & Shafir) | Hormozi Grand Slam Offer',
        fontsize=7, color=MED_GRAY, fontfamily='sans-serif', ha='center', va='center')

ax.text(50, 11.5, 'GO-TO-MARKET: PTK Trojan Horse > Peer Spread > Islands of Competence > Enterprise Inevitability | '
        'The Drill vs. The Hole: Ruby Red wants the feeling, not the feature.',
        fontsize=7, color=MED_GRAY, fontfamily='sans-serif', ha='center', va='center')

# ============================================================
# SAVE
# ============================================================
plt.tight_layout(pad=0.5)
plt.savefig('/home/ubuntu/HB1000_Complete_Architecture_Infographic.png', 
            dpi=DPI, bbox_inches='tight', facecolor=SOFT_BG)
plt.close()

print("✅ Infographic saved: /home/ubuntu/HB1000_Complete_Architecture_Infographic.png")
print(f"   Size: {WIDTH}x{HEIGHT} inches at {DPI} DPI = {WIDTH*DPI}x{HEIGHT*DPI} pixels")
