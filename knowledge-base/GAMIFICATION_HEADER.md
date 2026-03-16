# Universal Gamification Header Standard V3.0

## Overview

The Gamification Header is a visual component that appears on every Learning Loop deliverable. It provides immediate visual feedback on protocol completion status and serves as a quality seal.

---

## Design Specifications

### Layout Structure

```
╔══════════════════════════════════════════════════════════════════╗
║  🎯 MILESTONE MAP                                                ║
╠══════════════════════════════════════════════════════════════════╣
║  [✓] Intake  [✓] Record  [✓] Innovate  [✓] Guard  [✓] Present   ║
║  [✓] Evolve  [✓] Certify                                        ║
╠══════════════════════════════════════════════════════════════════╣
║  Fidelity Score: 94/100  │  Status: CERTIFIED                   ║
║                                          Certified by LLP V9.2   ║
╚══════════════════════════════════════════════════════════════════╝
```

### Color Palette

| Element | Color | Hex Code |
| :------ | :---- | :------- |
| Background | Black | #0A0A0A |
| Border | Ruby Red | #E63946 |
| Text (Primary) | White | #FFFFFF |
| Text (Secondary) | Gray | #888888 |
| Completed Phase | Green | #22C55E |
| Current Phase | Ruby Red | #E63946 |
| Pending Phase | Gray | #4A4A4A |

### Typography

| Element | Font | Size | Weight |
| :------ | :--- | :--- | :----- |
| Title | Inter | 16px | Bold |
| Phase Labels | JetBrains Mono | 12px | Regular |
| Score | JetBrains Mono | 14px | Bold |
| Version Seal | Inter | 10px | Medium |

---

## Phase Indicators

### Status Icons

| Status | Icon | Color |
| :----- | :--- | :---- |
| Completed | ✓ | #22C55E (Green) |
| In Progress | ● | #E63946 (Ruby Red) |
| Pending | ○ | #4A4A4A (Gray) |
| Failed | ✗ | #EF4444 (Red) |

### Phase Labels

| Phase | Short Label | Full Label |
| :---- | :---------- | :--------- |
| 0 | Intake | System of Intake |
| 1 | Record | System of Record |
| 2 | Innovate | System of Innovation |
| 3 | Guard | System of Adversarial Integrity |
| 4 | Present | System of Communication |
| 5 | Evolve | System of Evolution |
| 6 | Certify | System of Certification |

---

## Score Display

### Fidelity Score Format

```
Fidelity Score: [SCORE]/100
```

### Status Labels

| Score Range | Status | Color |
| :---------- | :----- | :---- |
| 90-100 | CERTIFIED | #22C55E |
| 80-89 | PASSED | #3B82F6 |
| 70-79 | MARGINAL | #F59E0B |
| 0-69 | FAILED | #EF4444 |

---

## Version Seal

### Format

```
Certified by LLP V9.2
```

### Placement

- Position: Bottom-right corner of header
- Alignment: Right-aligned
- Font: Inter, 10px, Medium weight
- Color: #888888 (Gray)

---

## Implementation Examples

### HTML/CSS Implementation

```html
<div class="gamification-header">
  <div class="header-title">
    <span class="icon">🎯</span>
    <span class="title">MILESTONE MAP</span>
  </div>
  
  <div class="phase-track">
    <div class="phase completed">
      <span class="icon">✓</span>
      <span class="label">Intake</span>
    </div>
    <div class="phase completed">
      <span class="icon">✓</span>
      <span class="label">Record</span>
    </div>
    <div class="phase current">
      <span class="icon">●</span>
      <span class="label">Innovate</span>
    </div>
    <div class="phase pending">
      <span class="icon">○</span>
      <span class="label">Guard</span>
    </div>
    <!-- ... remaining phases ... -->
  </div>
  
  <div class="footer">
    <div class="score">
      Fidelity Score: <span class="value">94</span>/100
    </div>
    <div class="status certified">CERTIFIED</div>
    <div class="seal">Certified by LLP V9.2</div>
  </div>
</div>
```

```css
.gamification-header {
  background: #0A0A0A;
  border: 2px solid #E63946;
  padding: 16px;
  font-family: 'Inter', sans-serif;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  color: #FFFFFF;
  border-bottom: 1px solid #333;
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.phase-track {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}

.phase.completed { color: #22C55E; }
.phase.current { color: #E63946; }
.phase.pending { color: #4A4A4A; }

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #333;
}

.score {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: #FFFFFF;
}

.score .value {
  font-weight: bold;
  color: #22C55E;
}

.status.certified {
  color: #22C55E;
  font-weight: bold;
}

.seal {
  font-size: 10px;
  color: #888888;
}
```

### ASCII Art Version (for text-based outputs)

```
╔══════════════════════════════════════════════════════════════════╗
║  🎯 MILESTONE MAP                                                ║
╠══════════════════════════════════════════════════════════════════╣
║  [✓] Intake  [✓] Record  [✓] Innovate  [✓] Guard  [✓] Present   ║
║  [✓] Evolve  [✓] Certify                                        ║
╠══════════════════════════════════════════════════════════════════╣
║  Fidelity Score: 94/100  │  Status: CERTIFIED                   ║
║                                          Certified by LLP V9.2   ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Responsive Behavior

### Desktop (≥768px)

- Full horizontal layout
- All phases visible in single row
- Score and status side-by-side

### Mobile (<768px)

- Phases wrap to two rows
- Score and status stack vertically
- Version seal moves to center

---

## Integration with Presentations

### Slide Placement

- **Title Slide**: Header at bottom, full width
- **Content Slides**: Header in footer area, condensed
- **Closing Slide**: Header prominently displayed, full size

### Print Considerations

- Ensure sufficient contrast for B&W printing
- Use solid fills instead of gradients
- Maintain minimum 10px font size

---

*Certified by Learning Loop Protocol V9.2*
