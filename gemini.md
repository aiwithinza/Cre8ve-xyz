# gemini.md — Project Constitution
> **This file is law. Do not modify unless a schema changes, a rule is added, or architecture is modified.**

---

## 🧭 Project Identity

| Field | Value |
|---|---|
| **Project Name** | Cre8ve |
| **System Pilot Version** | 1.0 |
| **Protocol** | B.L.A.S.T. |
| **Architecture** | A.N.T. 3-Layer |
| **Constitution Version** | v1.0 |
| **Last Modified** | 2026-03-15 |
| **Status** | 🟡 INITIALIZING |

---

## ⭐ North Star

> *The singular desired outcome of this system.*
```
Achieve 1M app downloads for our first product (AI Resume Builder) with a 5-10% conversion rate to paid users, targeting ₹2-3cr MRR within the next 12-24 months.
```

**Success looks like:**
- [ ] Product Launch: Finalize and launch the AI Resume Builder MVP (currently 90% done).
- [ ] Growth Metric: Reach 1,000,000 downloads through strategic marketing and user acquisition.
- [ ] Revenue Metric: Scale to ₹2-3 Crore Monthly Recurring Revenue (MRR) via a paid subscription model (₹199/month India | $4.99/month International).
- [ ] Investor Appeal: Create a company profile that effectively communicates this growth trajectory and technical capability.

---

## 🗄️ Source of Truth

| Data Source | Type | Location | Access Method |
|---|---|---|---|
| AI Resume Builder | Core Product | `MVP (90% Ready)` | Internal Logic |
| Product Features | Capabilities | Scanned | ATS Real-time scanning, 1-click LinkedIn/Indeed/Naukri import, 2-click optimization |

---

## 📦 Data Schema (The Payload Contract)

### Schema Status

| Schema | Status | Confirmed By | Date |
|---|---|---|---|
| Input | 🔴 PENDING | — | — |
| Output | 🔴 PENDING | — | — |

---

## 🧠 Behavioral Rules

### ✅ DO Rules
```
[PENDING — Discovery Question 5]
```

- Rule 1: Always validate input before processing
- Rule 2: Retry failed API calls up to 3 times with exponential backoff
- Rule 3: Log every state change to .tmp/logs/

### 🚫 DO NOT Rules

- Never guess at business logic — halt and ask the user
- Never write to the cloud destination with unvalidated data
- Never hardcode credentials — always reference `.env`
- Never modify `gemini.md` for reasons other than schema, rule, or architecture changes
- Never proceed past a broken Link (failed API verification)
- Never skip updating `progress.md` after a meaningful task

---

## 🏗️ Architectural Invariants

> These rules govern the 3-layer system and cannot be violated.

### Layer 1 — Architecture (`architecture/`)
- Every tool must have a corresponding `.md` SOP file
- If logic changes → **update the SOP before updating the code**
- SOPs define: goal, inputs, tool logic, edge cases, known errors

### Layer 2 — Navigation (Decision Layer)
- The Navigator routes data between SOPs and Tools only
- The Navigator never performs complex computation itself
- All routing decisions must be traceable in `progress.md`

### Layer 3 — Tools (`tools/`)
- Every script must be **atomic** (does one thing only) and **testable in isolation**
- All secrets loaded exclusively from `.env`
- All intermediate files written to `.tmp/` only
- A tool is complete only when it passes its standalone test

---

## 🚦 System Status Dashboard

| Phase | Name | Status |
|---|---|---|
| Phase 0 | Initialization | 🟡 IN PROGRESS |
| Phase 1 | Blueprint | 🔴 PENDING |
| Phase 2 | Link | 🔴 LOCKED |
| Phase 3 | Architect | 🔴 LOCKED |
| Phase 4 | Stylize | 🔴 LOCKED |
| Phase 5 | Trigger | 🔴 LOCKED |

---

*gemini.md is law. When in doubt, return here.*
