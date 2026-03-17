# Learning Loop Protocol — Changelog

---

## V12.8.1 (February 3, 2026) — CANONICAL

**Status:** Code Freeze | Canonical Version

### Added
- **Phase 07: System of Drift Audit** — Independent audit mechanism with HB1000 HiTL decision
- **Drift Agent persona** — New persona for Phase 07
- **Rollback coordinates** — Checkpoint storage at every major decision point
- **Spirit check** — Verification that deliverable stayed true to original intent
- **Drift severity levels** — NONE, MINOR, MODERATE, MAJOR, CRITICAL

### Changed
- Protocol now has 8 phases (00-07) instead of 7 (00-06)
- Phase 06 approval now advances to Phase 07 instead of completing
- Version numbers standardized to V12.8.1 across all dashboard pages

### Dashboard Updates
- Home/Dashboard: V12.8.1
- Analytics: V12.8.1
- Gamification Tracker: V12.8.1
- Admin Console: V12.8.1
- Session Details: V12.8.1 (shows /7 phases)
- Live Protocol: Phase 7 added to execution sequence

---

## V12.8 (January 2026)

### Added
- **Gamification Gift Back** — Phase 04 now builds gamification into user's initiative
- **Gamification code generation** — Actual implementation code delivered
- **Existing gamification detection** — Detects and offers to enhance existing mechanics

### Changed
- Phase 04 renamed from "Swiss Report Generation" to "Swiss Report + Gamification Gift"
- HiTL checkpoint added for gamification selection

---

## V12.4 (January 2026)

### Added
- **Drift Agent service** — Backend service for drift detection
- **Initiative versioning** — Track all versions with rollback capability
- **Drift audit logging** — Database tables for audit trail

### Infrastructure
- `driftAgent.ts` — New service file
- `driftAuditLog` — New database table
- `initiativeVersions` — New database table
- `driftAgentReports` — New database table

---

## V12.0 (January 2026)

### Added
- **Live Protocol execution** — Real-time execution with WebSocket streaming
- **Execution timer** — Track phase and total execution time
- **Token cost estimation** — Estimate LLM token usage

### Changed
- Protocol execution moved from batch to streaming
- UI updated with live progress indicators

---

## V11.1 (January 2026)

### Added
- **Human-in-the-loop checkpoints** — Pause for user approval at key decisions
- **Approval modal** — UI component for HiTL decisions
- **Suggestion selection** — User chooses which improvements to implement

### Changed
- Phases 02, 03, 04, 05, 06 now have HiTL checkpoints
- Protocol waits for user input before proceeding

---

## V10.8 (December 2025)

### Added
- **Intensity Framework** — Variable intensity levels (CURIOUS to PRIMAL+)
- **Iteration persistence** — Max iterations based on intensity
- **Threshold calibration** — Target score based on intensity

### Changed
- Protocol adapts behavior based on intensity level
- Higher intensity = more iterations, higher threshold

---

## V9.1 (November 2025)

### Added
- **Protocol Engineer** — Phase 05 persona for evolution proposals
- **Amendment proposals** — Self-improvement mechanism
- **Evolution queue** — Central queue for protocol amendments

### Changed
- Phase 05 now proposes protocol improvements
- Amendments require formal approval process

---

## V9.0 (October 2025)

### Initial Release
- Seven-phase protocol (00-06)
- 5-dimension scoring
- Adversarial integrity debate
- Swiss-style presentation
- Certification with 90% threshold

---

**Current Canonical Version:** V12.8.1  
**Custodian:** SIC HB1000 Hive Mind Solve Team
