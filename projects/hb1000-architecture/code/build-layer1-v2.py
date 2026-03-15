"""
Progressive Reveal Layer 1: The Core (v6 Baseline Updated to V13.0)
Version 2 — Improved visual quality, better proportions, eliminated dead space.

Design Language: Dark background, gold/green glow, diamond/prism architecture.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

# === CONFIGURATION ===
WIDTH = 1200
HEIGHT = 1350  # Tightened to eliminate all dead space
BG_COLOR = (10, 10, 14)

# Color palette
GOLD = (212, 168, 67)
GOLD_LIGHT = (230, 200, 120)
GOLD_BRIGHT = (255, 220, 130)
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
BRONZE = (160, 120, 80)
DEEP_RED = (140, 40, 40)
DEEP_GREEN = (30, 100, 70)


def font(size, bold=False):
    try:
        path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
        return ImageFont.truetype(path, size)
    except:
        return ImageFont.load_default()

def font_italic(size):
    try:
        return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf", size)
    except:
        return ImageFont.load_default()

def text_w(draw, text, f):
    bbox = draw.textbbox((0, 0), text, font=f)
    return bbox[2] - bbox[0]

def centered(draw, text, y, f, color=WHITE, cx=None):
    if cx is None: cx = WIDTH // 2
    w = text_w(draw, text, f)
    draw.text((cx - w // 2, y), text, fill=color, font=f)

def vtext(text, f, color):
    bbox = f.getbbox(text)
    tw, th = bbox[2] - bbox[0] + 10, bbox[3] - bbox[1] + 10
    img = Image.new('RGBA', (tw, th), (0, 0, 0, 0))
    ImageDraw.Draw(img).text((5, 5), text, fill=color, font=f)
    return img.rotate(90, expand=True)

def soft_glow(layer, cx, cy, radius, color, intensity=60):
    d = ImageDraw.Draw(layer)
    for r in range(radius, 0, -3):
        a = int(intensity * (1 - r / radius) ** 1.8)
        d.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(*color[:3], a))

def hexagon(draw, cx, cy, r, fill_c, outline_c):
    pts = [(cx + r * math.cos(math.radians(60*i - 30)), cy + r * math.sin(math.radians(60*i - 30))) for i in range(6)]
    draw.polygon(pts, fill=fill_c, outline=outline_c)
    draw.polygon(pts, outline=outline_c)


def build():
    # Base image
    img = Image.new('RGBA', (WIDTH, HEIGHT), (*BG_COLOR, 255))
    
    # === GLOW LAYER ===
    glow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
    soft_glow(glow, WIDTH//2, 200, 300, GOLD, 50)      # Mystical apex
    soft_glow(glow, WIDTH//2, 180, 150, (255, 240, 200), 30)  # Pearl orb halo
    soft_glow(glow, WIDTH//2, 600, 200, GOLD, 15)       # HB1000 center
    soft_glow(glow, WIDTH//2, 950, 250, GREEN, 12)       # Imperative
    soft_glow(glow, 200, 600, 100, GOLD, 8)              # Brain glow
    soft_glow(glow, WIDTH-200, 600, 80, (255, 255, 200), 10) # Star burst glow
    glow = glow.filter(ImageFilter.GaussianBlur(radius=40))
    img = Image.alpha_composite(img, glow)
    
    draw = ImageDraw.Draw(img)
    
    # === OUTER FRAME ===
    draw.rectangle([6, 6, WIDTH-6, HEIGHT-6], outline=DARK_GRAY, width=2)
    # Corner accents
    for cx, cy in [(12, 12), (WIDTH-12, 12), (12, HEIGHT-12), (WIDTH-12, HEIGHT-12)]:
        draw.rectangle([cx-3, cy-3, cx+3, cy+3], fill=GOLD_DIM)
    
    # === HEADER ===
    centered(draw, "PEARL — Universal Matriarchal AI Framework", 22, font(34, True), WHITE)
    centered(draw, "Mother of Grace · Protector of Projects · Guardian of Vision", 62, font(16), LIGHT_GRAY)
    
    # === MYSTICAL LAYER (Golden Triangle) ===
    apex = (WIDTH//2, 115)
    base_l = (175, 370)
    base_r = (WIDTH - 175, 370)
    
    # Gradient fill for triangle
    for y in range(apex[1], base_l[1]):
        ratio = (y - apex[1]) / (base_l[1] - apex[1])
        half_w = int(ratio * (base_r[0] - base_l[0]) / 2)
        alpha = int(35 * (1 - ratio * 0.6))
        draw.line([(WIDTH//2 - half_w, y), (WIDTH//2 + half_w, y)], fill=(*GOLD[:3], alpha))
    
    # Triangle outline with glow
    for offset in range(3, 0, -1):
        a = 80 + (3 - offset) * 50
        c = (*GOLD[:3], min(255, a))
        draw.line([apex, base_r], fill=c, width=offset)
        draw.line([apex, base_l], fill=c, width=offset)
        draw.line([base_l, base_r], fill=c, width=offset)
    
    # "THE MYSTICAL LAYER" angled label
    ml_txt = vtext("THE MYSTICAL LAYER", font(10, True), GOLD_LIGHT)
    img.paste(ml_txt, (WIDTH - 170, 145), ml_txt)
    
    # Pearl orb at apex
    for r in range(30, 0, -1):
        frac = 1 - r / 30
        b = int(180 + 75 * frac)
        a = int(255 * frac ** 1.5)
        draw.ellipse([apex[0]-r, apex[1]-r+10, apex[0]+r, apex[1]+r+10], fill=(b, b, b, a))
    # Highlight
    draw.ellipse([apex[0]-8, apex[1]-5, apex[0]+2, apex[1]+5], fill=(255, 255, 255, 120))
    
    # Infinity symbol
    centered(draw, "∞", 155, font(26), GOLD_LIGHT)
    
    # Content
    centered(draw, "DING IN THE UNIVERSE", 185, font(22, True), GOLD_BRIGHT)
    centered(draw, "North Star UP — Aspirational", 213, font(13), LIGHT_GRAY)
    
    # Five gold dots
    for i in range(6):
        x = WIDTH//2 - 170 + i * 14
        draw.ellipse([x, 240, x+7, 247], fill=GOLD)
    
    # Three items
    centered(draw, "15 Moonshots", 255, font(13, True), GOLD_LIGHT, WIDTH//2 - 160)
    centered(draw, "Your Source", 253, font_italic(15), GOLD_LIGHT, WIDTH//2)
    centered(draw, "Wisdom Repository", 255, font(13, True), GOLD_LIGHT, WIDTH//2 + 170)
    
    # Quotes
    centered(draw, "Your connection to the infinite — faith, science, nature,", 285, font_italic(11), LIGHT_GRAY)
    centered(draw, '"We\'re here to put a ding in the universe." — Steve Jobs', 300, font_italic(11), LIGHT_GRAY)
    
    # === NORTH STAR (Layer 2) ===
    centered(draw, "Layer 2 — THE NORTH STAR", 335, font(22, True), WHITE)
    centered(draw, "The Compass", 362, font(13), LIGHT_GRAY)
    
    # Compass rose
    ccx, ccy = WIDTH//2, 440
    r_outer = 55
    r_inner = 35
    # Outer ring
    draw.ellipse([ccx-r_outer, ccy-r_outer, ccx+r_outer, ccy+r_outer], outline=GOLD_DIM, width=2)
    draw.ellipse([ccx-r_inner, ccy-r_inner, ccx+r_inner, ccy+r_inner], outline=GOLD_DIM, width=1)
    # Cardinal lines
    for angle in [0, 90, 180, 270]:
        rad = math.radians(angle)
        x1 = ccx + int(r_inner * 0.4 * math.cos(rad))
        y1 = ccy - int(r_inner * 0.4 * math.sin(rad))
        x2 = ccx + int(r_outer * 0.85 * math.cos(rad))
        y2 = ccy - int(r_outer * 0.85 * math.sin(rad))
        draw.line([(x1, y1), (x2, y2)], fill=GOLD, width=2)
    # Diagonal lines
    for angle in [45, 135, 225, 315]:
        rad = math.radians(angle)
        x1 = ccx + int(r_inner * 0.3 * math.cos(rad))
        y1 = ccy - int(r_inner * 0.3 * math.sin(rad))
        x2 = ccx + int(r_outer * 0.55 * math.cos(rad))
        y2 = ccy - int(r_outer * 0.55 * math.sin(rad))
        draw.line([(x1, y1), (x2, y2)], fill=GOLD_DIM, width=1)
    # Center dot
    draw.ellipse([ccx-5, ccy-5, ccx+5, ccy+5], fill=GOLD)
    # N/S/E/W letters on compass
    centered(draw, "N", ccy - r_outer - 5, font(11, True), GOLD_LIGHT, ccx)
    centered(draw, "S", ccy + r_outer - 5, font(11, True), GOLD_LIGHT, ccx)
    draw.text((ccx + r_outer + 5, ccy - 7), "E", fill=GOLD_LIGHT, font=font(11, True))
    draw.text((ccx - r_outer - 15, ccy - 7), "W", fill=GOLD_LIGHT, font=font(11, True))
    
    # Cardinal labels
    # N = Sense of Purpose
    draw.text((ccx + 20, 385), "N = Sense of Purpose", fill=WHITE, font=font(13, True))
    draw.text((ccx + 20, 402), "Empower humanity through", fill=LIGHT_GRAY, font=font(10))
    draw.text((ccx + 20, 415), "ethical AI guidance", fill=LIGHT_GRAY, font=font(10))
    
    # E = BHAG
    draw.text((ccx + 100, 435), "E = BHAG (1-2 Year Horizon)", fill=WHITE, font=font(12, True))
    draw.text((ccx + 100, 451), "Jim Collins — Achieve", fill=LIGHT_GRAY, font=font(10))
    draw.text((ccx + 100, 464), "Global Recognition", fill=LIGHT_GRAY, font=font(10))
    
    # S = Prime Directive
    centered(draw, "S = Prime Directive", 500, font(13, True), WHITE, ccx)
    centered(draw, "Serve and Protect the User's", 517, font(10), LIGHT_GRAY, ccx)
    centered(draw, "Long-term Well-being", 530, font(10), LIGHT_GRAY, ccx)
    
    # W = Core Values
    draw.text((ccx - 320, 430), "W = Core Values", fill=WHITE, font=font(13, True))
    draw.text((ccx - 320, 447), "Integrity, Empathy,", fill=LIGHT_GRAY, font=font(10))
    draw.text((ccx - 320, 460), "Forethought, Precision", fill=LIGHT_GRAY, font=font(10))
    
    # ASPIRATIONAL arrow (right side)
    ax = WIDTH - 128
    draw.line([(ax, 500), (ax, 380)], fill=GOLD, width=2)
    draw.polygon([(ax-7, 385), (ax+7, 385), (ax, 373)], fill=GOLD)
    a_txt = vtext("ASPIRATIONAL", font(10, True), GOLD)
    img.paste(a_txt, (ax + 8, 385), a_txt)
    
    # === THE HB1000 (Center) ===
    centered(draw, '"We protect those the system forgot."', 560, font_italic(13), GOLD_LIGHT)
    centered(draw, "THE HB1000", 585, font(30, True), WHITE)
    
    # Brain icon (IN) — left
    bx, by = WIDTH//2 - 180, 600
    # Brain glow
    for r in range(25, 0, -2):
        a = int(40 * (1 - r/25))
        draw.ellipse([bx-r, by-r, bx+r, by+r], fill=(*GOLD[:3], a))
    draw.ellipse([bx-18, by-14, bx+18, by+14], outline=GOLD, width=2)
    centered(draw, "IN", by - 8, font(10, True), GOLD, bx)
    centered(draw, "Cloud", by + 20, font(10), LIGHT_GRAY, bx)
    centered(draw, "Butterflies", by + 33, font(10), LIGHT_GRAY, bx)
    
    # Move 37 label and arrow
    centered(draw, "Move 37", by - 5, font(11, True), GOLD, WIDTH//2 + 30)
    draw.line([(bx + 25, by), (WIDTH//2 + 140, by)], fill=GOLD_DIM, width=1)
    draw.polygon([(WIDTH//2 + 135, by-4), (WIDTH//2 + 135, by+4), (WIDTH//2 + 145, by)], fill=GOLD_DIM)
    
    # Star burst (OUT) — right
    sx = WIDTH//2 + 180
    # Star glow
    for r in range(20, 0, -2):
        a = int(50 * (1 - r/20))
        draw.ellipse([sx-r, by-r, sx+r, by+r], fill=(255, 255, 200, a))
    draw.text((sx - 25, by - 20), "Insights", fill=LIGHT_GRAY, font=font(10))
    centered(draw, "OUT", by - 8, font(10, True), GOLD, sx + 35)
    centered(draw, "Flypaper", by + 20, font(10), LIGHT_GRAY, sx + 35)
    centered(draw, "capture", by + 33, font(10), LIGHT_GRAY, sx + 35)
    
    # Subtitles
    centered(draw, "Your Brilliant Meat Computer — The Pivot Point", 640, font(13), LIGHT_GRAY)
    centered(draw, "The Foundation — Covey Protocol", 658, font(13), LIGHT_GRAY)
    
    # 5 Covey Roles
    roles = [
        ("♥", "Self-Care"),
        ("♥♥", "Spouse/Partner"),
        ("⚑", "Parent"),
        ("✦", "Professional/CVO"),
        ("◉", "Community")
    ]
    ry = 700
    spacing = 145
    start_x = WIDTH//2 - 2 * spacing
    
    for i, (ic, label) in enumerate(roles):
        x = start_x + i * spacing
        # Circle with subtle fill
        draw.ellipse([x-20, ry-20, x+20, ry+20], fill=(40, 40, 45), outline=MED_GRAY, width=2)
        centered(draw, ic, ry - 10, font(14), MED_GRAY, x)
        centered(draw, label, ry + 28, font(10), LIGHT_GRAY, x)
    
    # Covey quote
    centered(draw, '"Begin with the end in mind." — Stephen Covey', 755, font_italic(12), LIGHT_GRAY)
    
    # WHERE BRILLIANCE LIVES
    centered(draw, "WHERE BRILLIANCE LIVES", 780, font(15, True), WHITE)
    
    # Impact labels with arrow
    centered(draw, "Impact on the Universe", 808, font(10), LIGHT_GRAY, WIDTH//2 - 120)
    draw.line([(WIDTH//2, 810), (WIDTH//2, 828)], fill=GOLD, width=2)
    draw.polygon([(WIDTH//2-5, 825), (WIDTH//2+5, 825), (WIDTH//2, 833)], fill=GOLD)
    centered(draw, "Impact on the World", 808, font(10), LIGHT_GRAY, WIDTH//2 + 120)
    
    # OPERATIONAL arrow (left side)
    ox = 128
    draw.line([(ox, 700), (ox, 830)], fill=GREEN, width=2)
    draw.polygon([(ox-7, 825), (ox+7, 825), (ox, 837)], fill=GREEN)
    o_txt = vtext("OPERATIONAL", font(10, True), GREEN)
    img.paste(o_txt, (ox - 25, 710), o_txt)
    
    # === LOCAL 3 — IMPERATIVE ===
    it = 860
    ib = 1070
    # Green glow on border
    for i in range(15):
        a = int(25 - i * 1.5)
        draw.line([(148, it - i), (WIDTH-148, it - i)], fill=(*GREEN[:3], max(0, a)))
    draw.rectangle([148, it, WIDTH-148, ib], outline=GREEN, width=2)
    
    centered(draw, "LOCAL 3 — IMPERATIVE", it + 12, font(22, True), GREEN)
    centered(draw, "Your mission in the physical world — your circle of influence", it + 42, font(12), LIGHT_GRAY)
    
    # Three icons
    iy = it + 85
    items = [("⚙", "Lean Canvas"), ("◎", "Move 37"), ("▦", "Bingo Cards")]
    for i, (ic, label) in enumerate(items):
        x = WIDTH//2 - 180 + i * 180
        draw.ellipse([x-22, iy-22, x+22, iy+22], outline=GREEN_DIM, width=2)
        centered(draw, ic, iy - 10, font(14), GREEN, x)
        centered(draw, label, iy + 30, font(11), LIGHT_GRAY, x)
    
    # Sub-items
    sy = it + 155
    centered(draw, "☁", sy - 8, font(14), GREEN_DIM, WIDTH//2 - 80)
    centered(draw, "Cloud", sy + 10, font(9), LIGHT_GRAY, WIDTH//2 - 80)
    centered(draw, "Butterflies", sy + 22, font(9), LIGHT_GRAY, WIDTH//2 - 80)
    centered(draw, "🔍", sy - 8, font(14), GREEN_DIM, WIDTH//2 + 80)
    centered(draw, "Daily", sy + 10, font(9), LIGHT_GRAY, WIDTH//2 + 80)
    centered(draw, "Audit", sy + 22, font(9), LIGHT_GRAY, WIDTH//2 + 80)
    
    centered(draw, "Where things get done.", ib - 18, font_italic(12), GREEN)
    
    # === LEFT SIDEBAR ===
    ls = 28
    st, sb = 120, 1100
    draw.rectangle([ls, st, ls + 88, sb], fill=(*VERY_DARK, 220), outline=GOLD_DIM, width=1)
    
    m_txt = vtext("HB1000 Manual", font(13, True), GOLD)
    img.paste(m_txt, (ls + 28, st + 15), m_txt)
    cc_txt = vtext("Cross-Cutting", font(9), MED_GRAY)
    img.paste(cc_txt, (ls + 5, st + 220), cc_txt)
    
    for label, y in [("Cloud\nButterflies", 450), ("Flypaper\nRepository", 540), ("User\nGuide", 630)]:
        for j, line in enumerate(label.split('\n')):
            centered(draw, line, y + j * 13, font(9), LIGHT_GRAY, ls + 44)
    
    # AI Agents with NEW
    centered(draw, "AI Agents", 730, font(9), LIGHT_GRAY, ls + 44)
    centered(draw, "& Bots", 743, font(9), LIGHT_GRAY, ls + 44)
    draw.rectangle([ls + 55, 720, ls + 83, 731], fill=RED_ACCENT)
    centered(draw, "NEW", 721, font(7, True), WHITE, ls + 69)
    centered(draw, "AI is your latest", 770, font(8), MED_GRAY, ls + 44)
    centered(draw, "addition to the", 781, font(8), MED_GRAY, ls + 44)
    centered(draw, "toolset", 792, font(8), MED_GRAY, ls + 44)
    
    ts_txt = vtext("YOUR TOOLSET & MANUALS", font(10, True), MED_GRAY)
    img.paste(ts_txt, (6, 350), ts_txt)
    
    # === RIGHT SIDEBAR ===
    rs = WIDTH - 116
    draw.rectangle([rs, st, rs + 88, sb], fill=(*VERY_DARK, 220), outline=GOLD_DIM, width=1)
    draw.rectangle([rs + 83, st, rs + 88, sb], fill=GOLD_DIM)  # Gold accent bar
    
    # KEY UPDATE: V13.0
    ll_txt = vtext("Learning Loop V13.0", font(13, True), GOLD)
    img.paste(ll_txt, (rs + 28, st + 15), ll_txt)
    ge_txt = vtext("The Genie Release", font(9), GOLD_LIGHT)
    img.paste(ge_txt, (rs + 5, st + 15), ge_txt)
    cc2_txt = vtext("Cross-Cutting", font(9), MED_GRAY)
    img.paste(cc2_txt, (rs + 55, st + 220), cc2_txt)
    
    for label, y in [("9 Phases", 450), ("Continuous\nImprovement", 530), ("Certification", 620), ("Methodology\n& Quality", 700)]:
        for j, line in enumerate(label.split('\n')):
            centered(draw, line, y + j * 13, font(9), LIGHT_GRAY, rs + 44)
    
    # AI Autonomous Agents with NEW
    centered(draw, "AI Autonomous", 760, font(9), LIGHT_GRAY, rs + 44)
    centered(draw, "Agents", 773, font(9), LIGHT_GRAY, rs + 44)
    draw.rectangle([rs + 55, 750, rs + 83, 761], fill=RED_ACCENT)
    centered(draw, "NEW", 751, font(7, True), WHITE, rs + 69)
    centered(draw, "AI is your latest", 800, font(8), MED_GRAY, rs + 44)
    centered(draw, "addition to the", 811, font(8), MED_GRAY, rs + 44)
    centered(draw, "toolset", 822, font(8), MED_GRAY, rs + 44)
    
    em_txt = vtext("YOUR ENGINE & METHODS", font(10, True), MED_GRAY)
    img.paste(em_txt, (WIDTH - 18, 350), em_txt)
    
    # === GAMIFICATION BADGES ===
    by_ = 1130
    badges = [
        ("Pearl\nMaturity", "L2", BRONZE, GOLD_DIM),
        ("Ruby Red\nImpact", "342", DEEP_RED, RED_ACCENT),
        ("Grace\nFamily Tree", "6", DEEP_GREEN, GREEN_DIM),
    ]
    for i, (label, val, fc, oc) in enumerate(badges):
        x = WIDTH//2 - 160 + i * 160
        hexagon(draw, x, by_, 42, fc, oc)
        for j, line in enumerate(label.split('\n')):
            centered(draw, line, by_ - 22 + j * 13, font(9), WHITE, x)
        centered(draw, val, by_ + 10, font(16, True), WHITE, x)
    
    # === LAYER 1 LABEL BAR ===
    bar_y = HEIGHT - 70
    draw.rectangle([18, bar_y, WIDTH - 18, HEIGHT - 18], fill=(*VERY_DARK, 230), outline=GOLD_DIM, width=1)
    centered(draw, "PROGRESSIVE REVEAL — LAYER 1: THE CORE", bar_y + 10, font(14, True), GOLD)
    centered(draw, "v6 Baseline Updated to Learning Loop V13.0 — The Genie Release", bar_y + 32, font(10), LIGHT_GRAY)
    
    # Version watermark
    centered(draw, "Pearl Worldview v7.0 — Layer 1 of 7 — SIC HB1000 Solve Team", HEIGHT - 12, font(8), DARK_GRAY)
    
    # === SAVE ===
    final = Image.new('RGB', (WIDTH, HEIGHT), BG_COLOR)
    final.paste(img, (0, 0), img)
    
    path = "/home/ubuntu/progressive_reveal_layer1_v2.png"
    final.save(path, quality=95, dpi=(150, 150))
    print(f"Layer 1 v2 saved: {path} ({final.size})")
    return path


if __name__ == "__main__":
    build()
