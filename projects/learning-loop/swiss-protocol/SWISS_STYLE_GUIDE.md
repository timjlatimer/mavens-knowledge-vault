# Swiss International Style Guide for Learning Loop Presentations

## Overview

The Swiss International Style (also known as the International Typographic Style) is the official design language for all Learning Loop Protocol presentations. This guide defines the specific implementation for digital presentations with a Digital Brutalism fusion aesthetic.

---

## Design Philosophy

### Core Principles

1. **Clarity Over Decoration**: Content is king; design serves communication
2. **Grid-Based Structure**: Mathematical precision in layout
3. **Asymmetric Balance**: Dynamic tension through intentional imbalance
4. **High Contrast**: Maximum readability through stark color differences
5. **Typography as Design**: Type is the primary visual element

### Digital Brutalism Fusion

The Learning Loop aesthetic combines Swiss precision with Digital Brutalism:

- **Raw, Honest Materials**: No gradients, no shadows, no rounded corners
- **Bold, Unapologetic Typography**: Large, impactful text
- **Exposed Structure**: Grid lines and borders as design elements
- **Monospace Accents**: Technical, code-like details

---

## Color System

### Primary Palette

| Color | Name | Hex | RGB | Usage |
| :---- | :--- | :-- | :-- | :---- |
| ██████ | Black | #0A0A0A | 10, 10, 10 | Background |
| ██████ | White | #FFFFFF | 255, 255, 255 | Primary text |
| ██████ | Ruby Red | #E63946 | 230, 57, 70 | Accent, emphasis |

### Secondary Palette

| Color | Name | Hex | Usage |
| :---- | :--- | :-- | :---- |
| ██████ | Dark Gray | #1A1A1A | Card backgrounds |
| ██████ | Medium Gray | #4A4A4A | Borders, dividers |
| ██████ | Light Gray | #888888 | Secondary text |
| ██████ | Success Green | #22C55E | Positive indicators |
| ██████ | Warning Amber | #F59E0B | Caution indicators |
| ██████ | Error Red | #EF4444 | Negative indicators |

### Color Rules

1. **Background**: Always #0A0A0A (black)
2. **Primary Text**: Always #FFFFFF (white)
3. **Accent Usage**: Ruby Red for emphasis only (max 10% of visual area)
4. **No Gradients**: Solid colors only
5. **Contrast Ratio**: Minimum 7:1 for text

---

## Typography

### Font Stack

| Purpose | Font | Fallback |
| :------ | :--- | :------- |
| Headings | Inter | Helvetica Neue, Arial |
| Body | Inter | Helvetica Neue, Arial |
| Data/Code | JetBrains Mono | Consolas, monospace |

### Type Scale

| Element | Size | Weight | Line Height |
| :------ | :--- | :----- | :---------- |
| H1 (Title) | 64px | Bold (700) | 1.1 |
| H2 (Section) | 48px | Bold (700) | 1.2 |
| H3 (Subsection) | 32px | Semibold (600) | 1.3 |
| Body Large | 24px | Regular (400) | 1.5 |
| Body | 18px | Regular (400) | 1.6 |
| Caption | 14px | Regular (400) | 1.4 |
| Data | 16px | Regular (400) | 1.4 |

### Typography Rules

1. **All Caps for Headings**: H1 and H2 in uppercase
2. **Left Alignment**: No centered text (except title slides)
3. **No Justification**: Ragged right edge preferred
4. **Letter Spacing**: +2% for uppercase headings
5. **No Italics**: Use bold or color for emphasis

---

## Grid System

### 12-Column Grid

```
┌──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┐
│1 │2 │3 │4 │5 │6 │7 │8 │9 │10│11│12│
└──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┴──┘
```

### Common Layouts

**Two-Column (6-6)**
```
┌─────────────────┬─────────────────┐
│                 │                 │
│     Content     │     Content     │
│                 │                 │
└─────────────────┴─────────────────┘
```

**Asymmetric (4-8)**
```
┌───────────┬─────────────────────────┐
│           │                         │
│  Sidebar  │        Main Content     │
│           │                         │
└───────────┴─────────────────────────┘
```

**Asymmetric (8-4)**
```
┌─────────────────────────┬───────────┐
│                         │           │
│      Main Content       │  Sidebar  │
│                         │           │
└─────────────────────────┴───────────┘
```

### Spacing System

| Token | Value | Usage |
| :---- | :---- | :---- |
| xs | 4px | Inline spacing |
| sm | 8px | Tight grouping |
| md | 16px | Standard spacing |
| lg | 32px | Section separation |
| xl | 64px | Major divisions |
| 2xl | 128px | Slide margins |

---

## Slide Templates

### Title Slide

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                                                                  │
│                                                                  │
│                    INITIATIVE TITLE                              │
│                    ─────────────────                             │
│                    Subtitle or Description                       │
│                                                                  │
│                                                                  │
│                                                                  │
│  [Gamification Header]                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Content Slide (Text)

```
┌──────────────────────────────────────────────────────────────────┐
│  SECTION TITLE                                                   │
│  ═══════════════════════════════════════════════════════════════ │
│                                                                  │
│  Key Point One                                                   │
│  ───────────────────────────────────────────────────────────     │
│  Supporting text that explains the key point in detail.         │
│                                                                  │
│  Key Point Two                                                   │
│  ───────────────────────────────────────────────────────────     │
│  Supporting text that explains the key point in detail.         │
│                                                                  │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

### Content Slide (Data)

```
┌──────────────────────────────────────────────────────────────────┐
│  DATA VISUALIZATION                                              │
│  ═══════════════════════════════════════════════════════════════ │
│                                                                  │
│  ┌─────────────────────────────────┐  ┌────────────────────────┐ │
│  │                                 │  │  KEY METRICS           │ │
│  │         [Chart Area]            │  │  ────────────────────  │ │
│  │                                 │  │  Value 1: 94%          │ │
│  │                                 │  │  Value 2: 87/100       │ │
│  │                                 │  │  Value 3: +15%         │ │
│  └─────────────────────────────────┘  └────────────────────────┘ │
│                                                                  │
│  Source: [Data Source]                                           │
└──────────────────────────────────────────────────────────────────┘
```

### Closing Slide

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│                                                                  │
│                    THANK YOU                                     │
│                    ─────────────────                             │
│                                                                  │
│                    Next Steps:                                   │
│                    • Action Item 1                               │
│                    • Action Item 2                               │
│                    • Action Item 3                               │
│                                                                  │
│                                                                  │
│  [Gamification Header - Full Size]                               │
└──────────────────────────────────────────────────────────────────┘
```

---

## Visual Elements

### Borders and Dividers

| Element | Style | Color | Width |
| :------ | :---- | :---- | :---- |
| Section Divider | Solid | #E63946 | 2px |
| Content Divider | Solid | #4A4A4A | 1px |
| Card Border | Solid | #4A4A4A | 1px |
| Emphasis Border | Solid | #E63946 | 4px |

### Data Visualization

**Chart Colors (in order of use)**:
1. #E63946 (Ruby Red)
2. #FFFFFF (White)
3. #888888 (Gray)
4. #22C55E (Green)
5. #3B82F6 (Blue)

**Chart Rules**:
- No 3D effects
- No shadows
- Minimal grid lines
- Labels in JetBrains Mono
- Always include data source

### Icons

- Style: Outline only, 2px stroke
- Color: White or Ruby Red
- Size: 24px standard, 32px for emphasis
- Source: Lucide Icons (recommended)

---

## Accessibility

### Contrast Requirements

| Combination | Ratio | Status |
| :---------- | :---- | :----- |
| White on Black | 21:1 | ✓ Excellent |
| Ruby Red on Black | 4.5:1 | ✓ Passes AA |
| Gray on Black | 3.8:1 | ⚠ Large text only |

### Font Size Minimums

- Body text: 18px minimum
- Captions: 14px minimum
- Never below 12px for any text

### Animation

- No animations in presentations
- Static content only
- If transitions needed, use simple fade (0.3s)

---

## File Specifications

### Slide Dimensions

| Format | Width | Height | Aspect Ratio |
| :----- | :---- | :----- | :----------- |
| Standard | 1920px | 1080px | 16:9 |
| Print | 1920px | 1440px | 4:3 |

### Export Formats

| Format | Use Case | Quality |
| :----- | :------- | :------ |
| HTML | Web viewing | Native |
| PDF | Print/Share | 300 DPI |
| PNG | Screenshots | 2x scale |

---

## Examples

### Good Example ✓

```
┌──────────────────────────────────────────────────────────────────┐
│  FINANCIAL WELLNESS ANALYSIS                                     │
│  ═══════════════════════════════════════════════════════════════ │
│                                                                  │
│  Key Finding                                                     │
│  ───────────────────────────────────────────────────────────     │
│  87% of Ruby Red clients report cognitive overload when          │
│  managing household finances.                                    │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  87%  ████████████████████████████████████░░░░░░░░░░░░░░░  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Source: SIC Solve Team Research, 2026                           │
└──────────────────────────────────────────────────────────────────┘
```

### Bad Example ✗

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│           ✨ Financial Wellness Analysis ✨                      │
│                                                                  │
│    ┌─────────────────────────────────────────────────────────┐   │
│    │  ╭─────────────────────────────────────────────────╮    │   │
│    │  │  Key Finding!!!                                 │    │   │
│    │  │  87% of clients are stressed about money :-(    │    │   │
│    │  ╰─────────────────────────────────────────────────╯    │   │
│    └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│                    [Gradient Background]                         │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Issues**: Centered text, emoji, rounded corners, gradients, informal language, no data source.

---

*Certified by Learning Loop Protocol V9.2*
