import matplotlib.pyplot as plt
import matplotlib.patches as patches
import textwrap

def generate_lean_canvas(data, filename="lean_canvas_output.png", bg_color="#E6F3FF"):
    """
    Generates a high-quality 2-Page Lean Canvas image (Solve Edition).
    """
    # Setup Figure (2 Pages side-by-side)
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(24, 14))
    fig.patch.set_facecolor(bg_color)

    # Text Color Logic
    text_color = 'white' if bg_color in ['#1A1A1A', '#000000'] else '#1A1A1A'
    border_color = '#2C3E50' if text_color == '#1A1A1A' else '#ECF0F1'

    # --- PAGE 1: LEAN IMPACT CANVAS ---
    ax1.set_facecolor(bg_color)
    ax1.set_xlim(0, 10)
    ax1.set_ylim(0, 10)
    ax1.axis('off')
    ax1.set_title("PAGE 1: LEAN IMPACT CANVAS", fontsize=24, fontweight='bold', color=text_color, pad=20)

    # Define Blocks for Page 1 (x, y, w, h, title)
    rects_p1 = [
        (0, 5.5, 2, 4.5, "1. Problem"),
        (2, 7.75, 2, 2.25, "4. Solution"),
        (2, 5.5, 2, 2.25, "8. Key Metrics"),
        (4, 5.5, 2, 4.5, "3. Unique Value Prop"),
        (6, 7.75, 2, 2.25, "5. Unfair Advantage"),
        (6, 5.5, 2, 2.25, "9. Channels"),
        (8, 5.5, 2, 4.5, "2. Customer Segments"),
        (0, 2.5, 5, 3.0, "7. Cost Structure"),
        (5, 2.5, 5, 3.0, "6. Revenue Streams"),
        (0, 0, 10, 2.5, "10. Impact")
    ]

    for x, y, w, h, title in rects_p1:
        rect = patches.Rectangle((x, y), w, h, linewidth=2, edgecolor=border_color, facecolor='none')
        ax1.add_patch(rect)
        ax1.text(x + 0.1, y + h - 0.2, title, fontsize=14, fontweight='bold', color=text_color)
        content = data.get(title, "")
        wrapper = textwrap.TextWrapper(width=25)
        wrapped_content = wrapper.fill(text=content)
        ax1.text(x + 0.1, y + h - 0.8, wrapped_content, fontsize=11, color=text_color, verticalalignment='top')

    # --- PAGE 2: STRATEGY EXECUTION (SOLVE) ---
    ax2.set_facecolor(bg_color)
    ax2.set_xlim(0, 10)
    ax2.set_ylim(0, 10)
    ax2.axis('off')
    ax2.set_title("PAGE 2: STRATEGY EXECUTION (SOLVE)", fontsize=24, fontweight='bold', color=text_color, pad=20)

    # Define Blocks for Page 2
    rects_p2 = [
        (0, 8, 10, 2, "Purpose (Blue Seal)"),
        (0, 6, 5, 2, "BHAG (Done Seal)"),
        (5, 6, 5, 2, "Core Values (Promise Seal)"),
        (0, 3, 5, 3, "Quarterly Priorities"),
        (5, 3, 5, 3, "Key Metrics (KPIs)"),
        (0, 0, 10, 3, "Strategic Moves (3Y / 1Y)")
    ]

    for x, y, w, h, title in rects_p2:
        rect = patches.Rectangle((x, y), w, h, linewidth=2, edgecolor=border_color, facecolor='none')
        ax2.add_patch(rect)
        ax2.text(x + 0.1, y + h - 0.2, title, fontsize=14, fontweight='bold', color=text_color)
        content = data.get(title, "")
        wrapper = textwrap.TextWrapper(width=40 if w > 5 else 20)
        wrapped_content = wrapper.fill(text=content)
        ax2.text(x + 0.1, y + h - 0.8, wrapped_content, fontsize=11, color=text_color, verticalalignment='top')

    plt.tight_layout()
    plt.savefig(filename, dpi=150)
    print(f"Canvas successfully generated: {filename}")

# --- REPLACE THIS DATA DICTIONARY WITH USER CONTENT ---
data = {
    "1. Problem": "1. Financial exclusion: Unbanked/underbanked lack support.\n2. Transactional lending: No relationship after loan.\n3. Denied applicants abandoned: No path forward.",
    "2. Customer Segments": "Unbanked, underbanked, left out, left behind. People for whom 'it's expensive to be poor.' Both approved and denied applicants.",
    "3. Unique Value Prop": "Your Personal Superpower: A lifelong AI friend that provides relief today and hope for tomorrow. Empathy is our superpower.",
    "4. Solution": "1. Persistent AI Guardian from first keystroke.\n2. Personality-matched, 'living' bot companion.\n3. 'Not Yet' path for denied applicants.",
    "5. Unfair Advantage": "Relationship Density (Life Ledger), Generosity Pipeline (denied applicants), Brand Reputation built on radical generosity.",
    "6. Revenue Streams": "Increased loan retention, reduced defaults, ecosystem upsells (Maven Village), lifetime customer value from 'Not Yet' conversions.",
    "7. Cost Structure": "AI/LLM infrastructure, community resource database, frontline staff training, ongoing bot personality development.",
    "8. Key Metrics": "Guardian adoption rate, NPS, 'Not Yet' conversion rate, payment-on-time rate, customer lifetime value, relationship depth score.",
    "9. Channels": "In-app Guardian, SMS, email, voice. Multi-channel, user-preference driven communication.",
    "10. Impact": "End financial exclusion. Prove that Purpose with Profit works. Help people return to regular credit. Build a model that changes the industry.",
    "Purpose (Blue Seal)": "To provide relief today and hope for tomorrow. To end financial exclusion by proving that empathy is a superpower and that people don't care how much you know until they know how much you care.",
    "BHAG (Done Seal)": "Become the most trusted financial companion for the underserved, with a Guardian for every person who needs one, turning 'Not Yet' into 'Welcome Back.'",
    "Core Values (Promise Seal)": "1. Empathy First: Lead with care.\n2. Radical Generosity: Give without expectation.\n3. Relentless Hope: Never give up on anyone.\n4. Outcomes over Process.",
    "Quarterly Priorities": "1. Finalize Guardian personality archetypes.\n2. Build community resource database.\n3. Integrate frontline staff insights.\n4. Pilot 'Not Yet' companion.",
    "Key Metrics (KPIs)": "1. Guardian Activation Rate: >90%\n2. 'Not Yet' 24-Month Conversion: >25%\n3. NPS: >70\n4. Payment-on-Time Rate: +10%",
    "Strategic Moves (3Y / 1Y)": "3Y: Full Guardian ecosystem live across Maven + Cashco. Industry-recognized leader in empathetic AI lending.\n1Y: Launch V1 Guardian for approved borrowers. Pilot 'Not Yet' companion. Integrate Pawn Princess."
}

# EXECUTE
generate_lean_canvas(data, "maven_cashco_guardian_lean_canvas.png")
