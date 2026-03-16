# Mobile Testing Checklist — Learning Loop Mission Control V12.8.5

## Overview

This checklist ensures the mobile experience meets accessibility and usability standards for the Learning Loop Mission Control dashboard.

## Device Requirements

Test on the following device categories:
- **iOS:** iPhone 12 or newer (Safari)
- **Android:** Pixel 5 or newer (Chrome)
- **Tablet:** iPad Air or Android tablet (optional)

## Mobile Toggle FAB Testing

| Test | Expected Result | Pass/Fail |
|------|-----------------|-----------|
| FAB appears on screens < 768px | Floating button visible in bottom-right | |
| FAB hidden on screens ≥ 768px | No floating button on desktop | |
| Tap FAB switches to Dashboard view | Full-screen dashboard appears | |
| Tap FAB again switches to Protocol view | Full-screen protocol appears | |
| Haptic feedback on tap (Android) | Short vibration pulse felt | |
| FAB pulses when protocol is running | Visual pulse animation visible | |
| FAB touch target ≥ 44x44px | Easy to tap without mis-taps | |

## Accessibility Standards

| Requirement | Specification | Status |
|-------------|---------------|--------|
| Touch target size | Minimum 44x44 CSS pixels | ✅ (64x64px) |
| Color contrast | WCAG AA (4.5:1 for text) | ✅ |
| Focus indicators | Visible focus ring on interactive elements | ✅ |
| Screen reader labels | aria-label on FAB button | ✅ |
| Reduced motion support | Respects prefers-reduced-motion | ⚠️ TODO |

## View-Specific Tests

### Protocol View (Mobile)
- [ ] Initiative input field is accessible
- [ ] North Star input is visible without scrolling
- [ ] Intensity slider works with touch
- [ ] Start Execution button is prominent
- [ ] Quick Start Templates are tappable

### Dashboard View (Mobile)
- [ ] Current Phase indicator is visible
- [ ] Score display is readable
- [ ] Phase Progress list is scrollable
- [ ] Activity Log shows recent entries
- [ ] Artifacts status is visible

## Performance Tests

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 2s | |
| Time to Interactive | < 3s | |
| View toggle animation | < 300ms | |
| Haptic feedback latency | < 50ms | |

## Known Limitations

1. **iOS Safari:** `navigator.vibrate()` is not supported — haptic feedback will not work on iPhones
2. **Older Android:** Some devices may block vibration in browser context
3. **PWA Mode:** Consider adding to home screen for better mobile experience

## Testing Notes

Record any issues found during testing:

```
Date: ___________
Device: ___________
OS Version: ___________
Browser: ___________

Issues Found:
1. 
2. 
3. 
```

## Sign-Off

- [ ] All critical tests passed
- [ ] No blocking issues found
- [ ] Ready for production deployment

Tested by: ___________
Date: ___________
