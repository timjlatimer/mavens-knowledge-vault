# Swiss Presentation Protocol V1.0 — Full Reference

## Design Philosophy

Six governing principles from the Swiss International Typographic Style (1950s):

1. **Grid Discipline** — Every element aligns to a 12-column grid with 24px gutters. Nothing floats arbitrarily.
2. **Typographic Hierarchy** — Typography does the heavy lifting. One typeface family, weight and size as only variables.
3. **High Contrast** — Dark backgrounds with light text, or light with dark. 3-4 colors total.
4. **Data Over Decoration** — No filler slides. Charts, tables, and structured data over paragraphs.
5. **Asymmetric Balance** — Left-aligned text with right-weighted data. White space is deliberate.
6. **Source Transparency** — Every factual claim carries a source citation. Unsourced claims are labeled "AI Analysis" or "Estimated".

## Color Palettes

Choose ONE for the entire presentation:

| Palette | Background | Title | Body | Accent 1 | Accent 2 |
|---------|-----------|-------|------|----------|----------|
| **Terminal Dark** | `#0a0a0a` | `#e0ffe0` | `#a0c0a0` | `#00ff88` | `#f5a623` |
| **Deep Navy** | `#0a0f1a` | `#e0e8ff` | `#8899bb` | `#4488ff` | `#ff6644` |
| **Warm Charcoal** | `#1a1410` | `#f0e8d8` | `#b0a898` | `#d4a853` | `#e85d3a` |
| **Arctic White** | `#f5f5f0` | `#1a1a1a` | `#4a4a4a` | `#0055cc` | `#cc3300` |
| **Slate Professional** | `#1e2028` | `#e8e8ec` | `#9898a8` | `#6c8cff` | `#ffb347` |

Custom palettes allowed — enforce max 4 colors plus background.

## Typography

Single sans-serif family throughout. Recommended (Google Fonts):

| Typeface | Character | Best For |
|----------|-----------|----------|
| **Space Grotesk** | Technical, geometric | Data-heavy, tech, analytics |
| **Inter** | Neutral, readable | Business, general purpose |
| **DM Sans** | Geometric, warm | Creative, community |
| **Work Sans** | Industrial, sturdy | Operations, policy |
| **Montserrat** | Bold, confident | Marketing, executive |

### Type Scale

| Element | Title Slide | Content Slides |
|---------|------------|----------------|
| Headline | 64px Bold | 36px Bold |
| Subtitle | 28px Regular | 20px Regular |
| Body | 18px Regular | 15px Regular |
| Caption/Source | 12px Regular | 11px Regular |
| Section Label | 14px Mono Uppercase | 12px Mono Uppercase |

## Grid Layouts

| Layout | Split | Use For |
|--------|-------|---------|
| Full Width | 12 cols | Title slides, single-focus |
| Two Column | 6+6 | Comparison, text+data |
| Asymmetric | 7+5 or 8+4 | Primary+sidebar |
| Three Column | 4+4+4 | Feature comparison, triple metrics |
| Data Focus | 3+9 | Label+wide chart/table |

## Slide Structure

| Position | Type | Purpose |
|----------|------|---------|
| Slide 1 | Title (Template A) | Topic, subtitle, author, date |
| Slide 2 | Context (Template B) | Why this matters |
| Slides 3-N | Content (Templates C-F) | One key point per slide |
| Slide N+1 | Summary (Template G) | Takeaways, recommendations |
| Final | Closing (Template H) | Call to action, next steps |

Slide count: Executive 6-8, Standard 8-12, Comprehensive 12-16. Never exceed 16 unless requested.

## Content Rules

- **One point per slide** — if writing "also" or "additionally", split into two slides
- **Max 60 words** body text per slide (excluding headlines, labels, sources)
- **Data hierarchy**: Table > Bar chart > Line chart > Pie chart (avoid) > Text (last resort)
- **Section labels**: Every content slide has uppercase monospace label top-left (CONTEXT, ANALYSIS, FINDINGS, etc.)
- **Source citations**: Numbered references in caption text. Format: Source: [Author], "[Title]", [Year]. [URL]

## Slide Templates

### Template A: Title Slide
Centered layout. Main title 64px Bold. Thin horizontal rule in Accent 1. Subtitle 28px. Author 18px. Date 14px Monospace Accent 1.

### Template B: Problem/Context
Section label top-left. Headline 36px Bold. Rule. Two-column (7+5): Left=problem statement (max 40 words), Right=2-3 key statistics in large Accent 1.

### Template C: Data Table
Section label. Headline. Rule. Full-width table. Header row Accent 1 background. Alternating row tints. Text left, numbers right. Source citation bottom-right.

### Template D: Data Chart
Section label. Headline. Rule. Two-column (8+4): Left=chart visualization, Right=3-4 insight callouts with Accent 2 markers. Source below chart.

### Template E: Comparison
Section label. Headline. Rule. Three-column (4+4+4). Each: large Accent 2 number, column title 20px Bold Accent 1, description 15px, key metric 20px Bold Accent 1. Vertical rules between.

### Template F: Process/Timeline
Section label. Headline. Rule. Vertical timeline with Accent 1 line on left. Each step: Accent 2 node, title 20px Bold Accent 1, description 15px, duration right-aligned.

### Template G: Summary/Takeaway
Section label. Headline. Rule. Numbered list with large Accent 2 numbers. Each: number 36px Bold Accent 2, statement 20px Bold, detail 15px. Bottom bar with CTA.

### Template H: Closing
Centered. Headline 48px Bold Accent 1. Rule. CTA 20px. Author 15px. Rule. Quote/tagline 18px Italic Accent 1.

## Integration with Learning Loop Protocol

This is the design system for Phase 4 (System of Communication) of the Learning Loop Protocol V12.9.1. Apply automatically during Phase 4. Works independently for any presentation task.
