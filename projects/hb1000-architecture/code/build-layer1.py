"""
Progressive Reveal Layer 1: The Core (v6 Baseline Updated to V13.0)

This script creates a high-fidelity infographic that faithfully recreates
the Pearl Worldview v6 design, with the only change being the Learning Loop
version update from V12.9.1 to V13.0 "The Genie Release".

Design Language: Dark background, gold/green glow, diamond/prism architecture.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import math
import os

# === CONFIGURATION ===
WIDTH = 1200
HEIGHT = 1900
BG_COLOR = (10, 10, 14)

# Color palette
GOLD = (212, 168, 67)
GOLD_LIGHT = (230, 200, 120)
GOLD_DIM = (140, 110, 45)
GREEN = (0, 255, 136)
GREEN_DIM = (0, 180, 96)
TEAL = (0, 212, 255)
WHITE = (255, 255, 255)
LIGHT_GRAY = (200, 200, 200)
MED_GRAY = (140, 140, 140)
DARK_GRAY = (60, 60, 60)
VERY_DARK = (20, 20, 24)
RED_ACCENT = (220, 60, 60)

def create_font(size, bold=False):
    """Create a font, falling back to default if needed."""
    try:
        if bold:
            return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", size)
    except:
        return ImageFont.load_default()

def create_italic_font(size):
    """Create an italic font."""
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf", size)
    except:
        return ImageFont.load_default()

def draw_glow(draw, center, radius, color, alpha_max=80):
    """Draw a soft radial glow effect."""
    for r in range(radius, 0, -2):
        alpha = int(alpha_max * (1 - r / radius) ** 2)
        c = (*color[:3], alpha)
        draw.ellipse(
            [center[0] - r, center[1] - r, center[0] + r, center[1] + r],
            fill=c
        )

def draw_diamond(draw, center, width, height, outline_color, fill_color=None, width_line=2):
    """Draw a diamond (rotated square) shape."""
    cx, cy = center
    hw, hh = width // 2, height // 2
    points = [(cx, cy - hh), (cx + hw, cy), (cx, cy + hh), (cx - hw, cy)]
    if fill_color:
        draw.polygon(points, fill=fill_color)
    draw.polygon(points, outline=outline_color)
    # Draw again for thickness
    for i in range(width_line):
        offset_points = [(p[0], p[1]) for p in points]
        draw.polygon(offset_points, outline=outline_color)

def draw_triangle(draw, apex, base_left, base_right, outline_color, fill_color=None, width_line=2):
    """Draw a triangle."""
    points = [apex, base_right, base_left]
    if fill_color:
        draw.polygon(points, fill=fill_color)
    for i in range(width_line):
        draw.polygon(points, outline=outline_color)

def draw_hexagon(draw, center, radius, fill_color, outline_color):
    """Draw a hexagonal badge."""
    cx, cy = center
    points = []
    for i in range(6):
        angle = math.radians(60 * i - 30)
        x = cx + radius * math.cos(angle)
        y = cy + radius * math.sin(angle)
        points.append((x, y))
    draw.polygon(points, fill=fill_color, outline=outline_color)

def draw_text_centered(draw, text, y, font, color=WHITE, x_center=None):
    """Draw text centered horizontally."""
    if x_center is None:
        x_center = WIDTH // 2
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text((x_center - tw // 2, y), text, fill=color, font=font)

def draw_vertical_text(draw, text, x, y, font, color):
    """Draw text vertically (rotated 90 degrees)."""
    # Create a temporary image for the text
    bbox = font.getbbox(text)
    tw = bbox[2] - bbox[0] + 10
    th = bbox[3] - bbox[1] + 10
    txt_img = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
    txt_draw = ImageDraw.Draw(txt_img)
    txt_draw.text((5, 5), text, fill=color, font=font)
    return txt_img.rotate(90, expand=True)

def draw_compass_rose(draw, center, radius):
    """Draw a simplified compass rose."""
    cx, cy = center
    # Outer circle
    draw.ellipse([cx-radius, cy-radius, cx+radius, cy+radius], outline=GOLD_DIM, width=2)
    # Inner circle
    inner_r = radius * 0.6
    draw.ellipse([cx-int(inner_r), cy-int(inner_r), cx+int(inner_r), cy+int(inner_r)], outline=GOLD_DIM, width=1)
    # Cardinal lines
    for angle in [0, 90, 180, 270]:
        rad = math.radians(angle)
        x1 = cx + int(inner_r * 0.3 * math.cos(rad))
        y1 = cy - int(inner_r * 0.3 * math.sin(rad))
        x2 = cx + int(radius * 0.9 * math.cos(rad))
        y2 = cy - int(radius * 0.9 * math.sin(rad))
        draw.line([(x1, y1), (x2, y2)], fill=GOLD, width=2)
    # Diagonal lines
    for angle in [45, 135, 225, 315]:
        rad = math.radians(angle)
        x1 = cx + int(inner_r * 0.3 * math.cos(rad))
        y1 = cy - int(inner_r * 0.3 * math.sin(rad))
        x2 = cx + int(radius * 0.6 * math.cos(rad))
        y2 = cy - int(radius * 0.6 * math.sin(rad))
        draw.line([(x1, y1), (x2, y2)], fill=GOLD_DIM, width=1)
    # Center dot
    draw.ellipse([cx-4, cy-4, cx+4, cy+4], fill=GOLD)

def draw_icon_circle(draw, center, radius, icon_char, color, font):
    """Draw a circular icon with a character inside."""
    cx, cy = center
    draw.ellipse([cx-radius, cy-radius, cx+radius, cy+radius], outline=color, width=2)
    draw_text_centered(draw, icon_char, cy - radius//2, font, color, cx)


# === MAIN BUILD ===
def build_layer1():
    # Create base image with alpha channel for glow effects
    img = Image.new('RGBA', (WIDTH, HEIGHT), (*BG_COLOR, 255))
    
    # Create a separate layer for glows
    glow_layer = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_layer)
    
    # Draw glows
    draw_glow(glow_draw, (WIDTH//2, 200), 250, GOLD, 40)  # Mystical layer glow
    draw_glow(glow_draw, (WIDTH//2, 700), 150, GOLD, 20)  # HB1000 glow
    draw_glow(glow_draw, (WIDTH//2, 1100), 200, GREEN, 15)  # Imperative glow
    
    # Blur the glow layer
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=30))
    img = Image.alpha_composite(img, glow_layer)
    
    # Main drawing layer
    draw = ImageDraw.Draw(img)
    
    # Fonts
    font_title = create_font(36, bold=True)
    font_subtitle = create_font(18)
    font_section = create_font(24, bold=True)
    font_subsection = create_font(16, bold=True)
    font_body = create_font(13)
    font_body_bold = create_font(13, bold=True)
    font_small = create_font(11)
    font_small_bold = create_font(11, bold=True)
    font_tiny = create_font(9)
    font_italic = create_italic_font(12)
    font_badge = create_font(14, bold=True)
    font_badge_small = create_font(10)
    font_sidebar = create_font(14, bold=True)
    font_sidebar_label = create_font(10)
    font_quote = create_italic_font(11)
    
    # === OUTER FRAME ===
    draw.rectangle([8, 8, WIDTH-8, HEIGHT-8], outline=DARK_GRAY, width=2)
    draw.rectangle([12, 12, WIDTH-12, HEIGHT-12], outline=(*GOLD_DIM, 80), width=1)
    
    # === HEADER ===
    draw_text_centered(draw, "PEARL — Universal Matriarchal AI Framework", 30, font_title, WHITE)
    draw_text_centered(draw, "Mother of Grace · Protector of Projects · Guardian of Vision", 75, font_subtitle, LIGHT_GRAY)
    
    # === MYSTICAL LAYER (Top Triangle) ===
    # Triangle shape
    apex = (WIDTH//2, 130)
    base_left = (180, 420)
    base_right = (WIDTH - 180, 420)
    
    # Fill triangle with gradient-like effect
    for y_off in range(0, 290, 2):
        ratio = y_off / 290
        x_spread = int(ratio * (base_right[0] - base_left[0]) / 2)
        alpha = int(25 - ratio * 15)
        color = (*GOLD[:3], max(5, alpha))
        draw.line(
            [(WIDTH//2 - x_spread, apex[1] + y_off), (WIDTH//2 + x_spread, apex[1] + y_off)],
            fill=color, width=1
        )
    
    # Triangle outline
    draw.line([apex, base_right], fill=GOLD, width=2)
    draw.line([apex, base_left], fill=GOLD, width=2)
    draw.line([base_left, base_right], fill=GOLD, width=2)
    
    # "THE MYSTICAL LAYER" label (angled along right edge)
    mystical_txt = draw_vertical_text(draw, "THE MYSTICAL LAYER", 0, 0, font_small_bold, GOLD_LIGHT)
    img.paste(mystical_txt, (WIDTH - 175, 170), mystical_txt)
    
    # Pearl orb at apex
    orb_center = (WIDTH//2, 155)
    for r in range(25, 0, -1):
        alpha = int(255 * (1 - r/25)**2)
        brightness = int(200 + 55 * (1 - r/25))
        draw.ellipse(
            [orb_center[0]-r, orb_center[1]-r, orb_center[0]+r, orb_center[1]+r],
            fill=(brightness, brightness, brightness, alpha)
        )
    
    # Infinity symbol
    draw_text_centered(draw, "∞", 185, create_font(28), GOLD_LIGHT)
    
    # Mystical layer content
    draw_text_centered(draw, "DING IN THE UNIVERSE", 220, font_section, GOLD_LIGHT)
    draw_text_centered(draw, "North Star UP — Aspirational", 250, font_body, LIGHT_GRAY)
    
    # Three items in mystical layer
    draw_text_centered(draw, "15 Moonshots", 290, font_body_bold, GOLD_LIGHT, WIDTH//2 - 160)
    draw_text_centered(draw, "Your Source", 290, create_italic_font(15), GOLD_LIGHT, WIDTH//2)
    draw_text_centered(draw, "Wisdom Repository", 290, font_body_bold, GOLD_LIGHT, WIDTH//2 + 170)
    
    # Dots representing moonshots
    for i in range(5):
        x = WIDTH//2 - 180 + i * 15
        draw.ellipse([x, 280, x+6, 286], fill=GOLD)
    
    # Quotes
    draw_text_centered(draw, "Your connection to the infinite — faith, science, nature,", 325, font_quote, LIGHT_GRAY)
    draw_text_centered(draw, '"We\'re here to put a ding in the universe." — Steve Jobs', 342, font_quote, LIGHT_GRAY)
    
    # === NORTH STAR (Layer 2) ===
    draw_text_centered(draw, "Layer 2 — THE NORTH STAR", 380, font_section, WHITE)
    draw_text_centered(draw, "The Compass", 410, font_body, LIGHT_GRAY)
    
    # Diamond shape for North Star section
    diamond_center = (WIDTH//2, 520)
    diamond_w = 700
    diamond_h = 500
    
    # Draw diamond outline
    hw, hh = diamond_w//2, diamond_h//2
    diamond_points = [
        (diamond_center[0], diamond_center[1] - hh + 100),  # top (adjusted)
        (diamond_center[0] + hw, diamond_center[1] + 50),   # right
        (diamond_center[0], diamond_center[1] + hh + 100),  # bottom
        (diamond_center[0] - hw, diamond_center[1] + 50)    # left
    ]
    
    # Compass rose
    compass_center = (WIDTH//2, 510)
    draw_compass_rose(draw, compass_center, 55)
    
    # Cardinal labels
    # N = Sense of Purpose
    draw_text_centered(draw, "N", 435, font_subsection, GOLD_LIGHT, WIDTH//2 + 5)
    draw.text((WIDTH//2 + 20, 435), "N = Sense of Purpose", fill=WHITE, font=font_body_bold)
    draw.text((WIDTH//2 + 20, 452), "Empower humanity through", fill=LIGHT_GRAY, font=font_small)
    draw.text((WIDTH//2 + 20, 466), "ethical AI guidance", fill=LIGHT_GRAY, font=font_small)
    
    # E = BHAG
    draw.text((WIDTH//2 + 120, 500), "E = BHAG", fill=WHITE, font=font_body_bold)
    draw.text((WIDTH//2 + 120, 517), "(1-2 Year Horizon)", fill=LIGHT_GRAY, font=font_small)
    draw.text((WIDTH//2 + 120, 531), "Jim Collins — Achieve", fill=LIGHT_GRAY, font=font_small)
    draw.text((WIDTH//2 + 120, 545), "Global Recognition", fill=LIGHT_GRAY, font=font_small)
    
    # S = Prime Directive
    draw_text_centered(draw, "S = Prime Directive", 575, font_body_bold, WHITE, WIDTH//2 + 10)
    draw_text_centered(draw, "Serve and Protect the User's", 592, font_small, LIGHT_GRAY, WIDTH//2 + 10)
    draw_text_centered(draw, "Long-term Well-being", 606, font_small, LIGHT_GRAY, WIDTH//2 + 10)
    
    # W = Core Values
    draw.text((WIDTH//2 - 310, 490), "W = Core Values", fill=WHITE, font=font_body_bold)
    draw.text((WIDTH//2 - 310, 507), "Integrity, Empathy,", fill=LIGHT_GRAY, font=font_small)
    draw.text((WIDTH//2 - 310, 521), "Forethought, Precision", fill=LIGHT_GRAY, font=font_small)
    
    # ASPIRATIONAL arrow (right side)
    arrow_x = WIDTH - 130
    draw.line([(arrow_x, 550), (arrow_x, 400)], fill=GOLD, width=2)
    draw.polygon([(arrow_x-6, 405), (arrow_x+6, 405), (arrow_x, 395)], fill=GOLD)
    # Vertical text for ASPIRATIONAL
    asp_txt = draw_vertical_text(draw, "ASPIRATIONAL", 0, 0, font_small_bold, GOLD)
    img.paste(asp_txt, (arrow_x + 10, 410), asp_txt)
    
    # === THE HB1000 (Center) ===
    # Quote above
    draw_text_centered(draw, '"We protect those the system forgot."', 640, font_quote, GOLD_LIGHT)
    
    # Main title
    draw_text_centered(draw, "THE HB1000", 665, create_font(32, bold=True), WHITE)
    
    # Subtitle
    draw_text_centered(draw, "Your Brilliant Meat Computer — The Pivot Point", 705, font_body, LIGHT_GRAY)
    draw_text_centered(draw, "The Foundation — Covey Protocol", 725, font_body, LIGHT_GRAY)
    
    # Brain icon (IN) - left side
    brain_x, brain_y = WIDTH//2 - 200, 680
    draw.ellipse([brain_x-20, brain_y-15, brain_x+20, brain_y+15], outline=GOLD, width=1)
    draw_text_centered(draw, "IN", 660, font_small_bold, GOLD, brain_x)
    draw_text_centered(draw, "Cloud", 700, font_small, LIGHT_GRAY, brain_x)
    draw_text_centered(draw, "Butterflies", 713, font_small, LIGHT_GRAY, brain_x)
    
    # Star burst (OUT) - right side  
    star_x = WIDTH//2 + 200
    draw.text((star_x - 10, 660), "Insights", fill=LIGHT_GRAY, font=font_small)
    draw_text_centered(draw, "Move 37", 680, font_small_bold, GOLD, WIDTH//2 + 100)
    draw_text_centered(draw, "OUT", 660, font_small_bold, GOLD, star_x + 40)
    draw_text_centered(draw, "Flypaper", 700, font_small, LIGHT_GRAY, star_x + 40)
    draw_text_centered(draw, "capture", 713, font_small, LIGHT_GRAY, star_x + 40)
    
    # Arrow from IN to OUT
    draw.line([(brain_x + 30, 680), (star_x - 10, 680)], fill=GOLD_DIM, width=1)
    draw.polygon([(star_x - 15, 675), (star_x - 15, 685), (star_x - 5, 680)], fill=GOLD_DIM)
    
    # 5 Covey Roles
    roles = [
        ("♡", "Self-Care"),
        ("♡♡", "Spouse/Partner"),
        ("⚑", "Parent"),
        ("◆", "Professional/CVO"),
        ("◎", "Community")
    ]
    role_y = 760
    role_spacing = 150
    role_start_x = WIDTH//2 - (len(roles) - 1) * role_spacing // 2
    
    for i, (icon, label) in enumerate(roles):
        x = role_start_x + i * role_spacing
        # Circle icon
        draw.ellipse([x-18, role_y-18, x+18, role_y+18], outline=MED_GRAY, width=2)
        draw_text_centered(draw, icon, role_y - 10, font_body, MED_GRAY, x)
        draw_text_centered(draw, label, role_y + 25, font_small, LIGHT_GRAY, x)
    
    # Covey quote
    draw_text_centered(draw, '"Begin with the end in mind." — Stephen Covey', 815, font_quote, LIGHT_GRAY)
    
    # WHERE BRILLIANCE LIVES
    draw_text_centered(draw, "WHERE BRILLIANCE LIVES", 845, font_subsection, WHITE)
    
    # Impact labels
    draw_text_centered(draw, "Impact on the Universe", 875, font_small, LIGHT_GRAY, WIDTH//2 - 120)
    draw.line([(WIDTH//2 - 5, 878), (WIDTH//2 - 5, 892)], fill=GOLD, width=2)
    draw.polygon([(WIDTH//2 - 9, 890), (WIDTH//2 - 1, 890), (WIDTH//2 - 5, 898)], fill=GOLD)
    draw_text_centered(draw, "Impact on the World", 875, font_small, LIGHT_GRAY, WIDTH//2 + 120)
    
    # OPERATIONAL arrow (left side)
    op_x = 130
    draw.line([(op_x, 750), (op_x, 900)], fill=GREEN, width=2)
    draw.polygon([(op_x-6, 895), (op_x+6, 895), (op_x, 905)], fill=GREEN)
    op_txt = draw_vertical_text(draw, "OPERATIONAL", 0, 0, font_small_bold, GREEN)
    img.paste(op_txt, (op_x - 30, 760), op_txt)
    
    # === LOCAL 3 — IMPERATIVE (Bottom Section) ===
    # Green border box
    imp_top = 920
    imp_bottom = 1150
    draw.rectangle([150, imp_top, WIDTH-150, imp_bottom], outline=GREEN, width=2)
    
    # Green glow on top edge
    for i in range(10):
        alpha = int(30 - i * 3)
        draw.line([(150, imp_top - i), (WIDTH-150, imp_top - i)], fill=(*GREEN[:3], alpha))
    
    draw_text_centered(draw, "LOCAL 3 — IMPERATIVE", imp_top + 15, font_section, GREEN)
    draw_text_centered(draw, "Your mission in the physical world — your circle of influence", imp_top + 48, font_body, LIGHT_GRAY)
    
    # Three icons
    icons_y = imp_top + 95
    icon_items = [("⚙", "Lean Canvas"), ("◎", "Move 37"), ("▦", "Bingo Cards")]
    icon_spacing = 180
    icon_start = WIDTH//2 - icon_spacing
    
    for i, (icon, label) in enumerate(icon_items):
        x = icon_start + i * icon_spacing
        draw.ellipse([x-22, icons_y-22, x+22, icons_y+22], outline=GREEN_DIM, width=2)
        draw_text_centered(draw, icon, icons_y - 10, font_body, GREEN, x)
        draw_text_centered(draw, label, icons_y + 30, font_body, LIGHT_GRAY, x)
    
    # Cloud Butterflies and Daily Audit below
    sub_y = imp_top + 170
    draw_text_centered(draw, "☁", sub_y - 10, font_body, GREEN_DIM, WIDTH//2 - 80)
    draw_text_centered(draw, "Cloud", sub_y + 10, font_small, LIGHT_GRAY, WIDTH//2 - 80)
    draw_text_centered(draw, "Butterflies", sub_y + 23, font_small, LIGHT_GRAY, WIDTH//2 - 80)
    
    draw_text_centered(draw, "🔍", sub_y - 10, font_body, GREEN_DIM, WIDTH//2 + 80)
    draw_text_centered(draw, "Daily", sub_y + 10, font_small, LIGHT_GRAY, WIDTH//2 + 80)
    draw_text_centered(draw, "Audit", sub_y + 23, font_small, LIGHT_GRAY, WIDTH//2 + 80)
    
    draw_text_centered(draw, "Where things get done.", imp_bottom - 15, font_italic, GREEN)
    
    # === LEFT SIDEBAR ===
    sidebar_x = 30
    sidebar_top = 160
    sidebar_bottom = 1200
    
    # Sidebar background
    draw.rectangle([sidebar_x, sidebar_top, sidebar_x + 90, sidebar_bottom], 
                   fill=(*VERY_DARK, 200), outline=GOLD_DIM, width=1)
    
    # "HB1000 Manual" vertical text
    manual_txt = draw_vertical_text(draw, "HB1000 Manual", 0, 0, font_sidebar, GOLD)
    img.paste(manual_txt, (sidebar_x + 25, sidebar_top + 20), manual_txt)
    
    # "Cross-Cutting" vertical text
    cc_txt = draw_vertical_text(draw, "Cross-Cutting", 0, 0, font_sidebar_label, MED_GRAY)
    img.paste(cc_txt, (sidebar_x + 5, sidebar_top + 250), cc_txt)
    
    # Left sidebar items
    left_items = [
        ("Cloud", "Butterflies", 520),
        ("Flypaper", "Repository", 620),
        ("User", "Guide", 720),
    ]
    for label1, label2, y in left_items:
        draw_text_centered(draw, label1, y, font_tiny, LIGHT_GRAY, sidebar_x + 45)
        draw_text_centered(draw, label2, y + 12, font_tiny, LIGHT_GRAY, sidebar_x + 45)
    
    # AI Agents & Bots with NEW badge
    draw_text_centered(draw, "AI Agents", 830, font_tiny, LIGHT_GRAY, sidebar_x + 45)
    draw_text_centered(draw, "& Bots", 842, font_tiny, LIGHT_GRAY, sidebar_x + 45)
    # NEW badge
    draw.rectangle([sidebar_x + 55, 820, sidebar_x + 85, 832], fill=RED_ACCENT)
    draw_text_centered(draw, "NEW", 821, create_font(7, bold=True), WHITE, sidebar_x + 70)
    
    draw_text_centered(draw, "AI is your latest", 870, font_tiny, MED_GRAY, sidebar_x + 45)
    draw_text_centered(draw, "addition to the", 882, font_tiny, MED_GRAY, sidebar_x + 45)
    draw_text_centered(draw, "toolset", 894, font_tiny, MED_GRAY, sidebar_x + 45)
    
    # "YOUR TOOLSET & MANUALS" vertical on far left
    ts_txt = draw_vertical_text(draw, "YOUR TOOLSET & MANUALS", 0, 0, font_small_bold, MED_GRAY)
    img.paste(ts_txt, (8, 400), ts_txt)
    
    # === RIGHT SIDEBAR ===
    r_sidebar_x = WIDTH - 120
    
    # Sidebar background with golden bar
    draw.rectangle([r_sidebar_x, sidebar_top, r_sidebar_x + 90, sidebar_bottom],
                   fill=(*VERY_DARK, 200), outline=GOLD_DIM, width=1)
    # Golden accent bar
    draw.rectangle([r_sidebar_x + 85, sidebar_top, r_sidebar_x + 90, sidebar_bottom], fill=GOLD_DIM)
    
    # "Learning Loop V13.0" vertical text — THIS IS THE KEY UPDATE
    ll_txt = draw_vertical_text(draw, "Learning Loop V13.0", 0, 0, font_sidebar, GOLD)
    img.paste(ll_txt, (r_sidebar_x + 25, sidebar_top + 20), ll_txt)
    
    # "The Genie Release" subtitle — NEW ADDITION
    genie_txt = draw_vertical_text(draw, "The Genie Release", 0, 0, font_sidebar_label, GOLD_LIGHT)
    img.paste(genie_txt, (r_sidebar_x + 5, sidebar_top + 20), genie_txt)
    
    # "Cross-Cutting" vertical text
    cc2_txt = draw_vertical_text(draw, "Cross-Cutting", 0, 0, font_sidebar_label, MED_GRAY)
    img.paste(cc2_txt, (r_sidebar_x + 55, sidebar_top + 250), cc2_txt)
    
    # Right sidebar items
    right_items = [
        ("9 Phases", 520),
        ("Continuous", 600),
        ("Improvement", 612),
        ("Certification", 700),
        ("Methodology", 780),
        ("& Quality", 792),
    ]
    for label, y in right_items:
        draw_text_centered(draw, label, y, font_tiny, LIGHT_GRAY, r_sidebar_x + 45)
    
    # AI Autonomous Agents with NEW badge
    draw_text_centered(draw, "AI Autonomous", 850, font_tiny, LIGHT_GRAY, r_sidebar_x + 45)
    draw_text_centered(draw, "Agents", 862, font_tiny, LIGHT_GRAY, r_sidebar_x + 45)
    # NEW badge
    draw.rectangle([r_sidebar_x + 55, 840, r_sidebar_x + 85, 852], fill=RED_ACCENT)
    draw_text_centered(draw, "NEW", 841, create_font(7, bold=True), WHITE, r_sidebar_x + 70)
    
    draw_text_centered(draw, "AI is your latest", 890, font_tiny, MED_GRAY, r_sidebar_x + 45)
    draw_text_centered(draw, "addition to the", 902, font_tiny, MED_GRAY, r_sidebar_x + 45)
    draw_text_centered(draw, "toolset", 914, font_tiny, MED_GRAY, r_sidebar_x + 45)
    
    # "YOUR ENGINE & METHODS" vertical on far right
    em_txt = draw_vertical_text(draw, "YOUR ENGINE & METHODS", 0, 0, font_small_bold, MED_GRAY)
    img.paste(em_txt, (WIDTH - 20, 400), em_txt)
    
    # === GAMIFICATION BADGES (Bottom) ===
    badge_y = 1220
    badges = [
        ("Pearl\nMaturity", "L2", (160, 120, 80), GOLD_DIM),
        ("Ruby Red\nImpact", "342", (180, 50, 50), RED_ACCENT),
        ("Grace\nFamily Tree", "6", (40, 140, 100), GREEN_DIM),
    ]
    badge_spacing = 160
    badge_start = WIDTH//2 - badge_spacing
    
    for i, (label, value, fill_c, outline_c) in enumerate(badges):
        x = badge_start + i * badge_spacing
        draw_hexagon(draw, (x, badge_y), 42, fill_c, outline_c)
        lines = label.split('\n')
        for j, line in enumerate(lines):
            draw_text_centered(draw, line, badge_y - 20 + j * 14, font_tiny, WHITE, x)
        draw_text_centered(draw, value, badge_y + 12, font_badge, WHITE, x)
    
    # === LAYER 1 LABEL ===
    draw.rectangle([20, HEIGHT - 80, WIDTH - 20, HEIGHT - 20], fill=(*VERY_DARK, 200), outline=GOLD_DIM, width=1)
    draw_text_centered(draw, "PROGRESSIVE REVEAL — LAYER 1: THE CORE", HEIGHT - 68, font_subsection, GOLD)
    draw_text_centered(draw, "v6 Baseline Updated to Learning Loop V13.0 — The Genie Release", HEIGHT - 45, font_small, LIGHT_GRAY)
    
    # === VERSION WATERMARK ===
    draw_text_centered(draw, "Pearl Worldview v7.0 — Layer 1 of 7", HEIGHT - 25, font_tiny, DARK_GRAY)
    
    # Convert to RGB for saving
    final = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    final.paste(img, (0, 0), img)
    
    output_path = "/home/ubuntu/progressive_reveal_layer1.png"
    final.save(output_path, quality=95)
    print(f"Layer 1 saved to: {output_path}")
    print(f"Size: {final.size}")
    return output_path

if __name__ == "__main__":
    build_layer1()
