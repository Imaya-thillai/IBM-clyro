# bob_result/agents/03-business-rules.md
# Task 4 — OTN-22: Business Rule Extraction
# Persona: business-rules-specialist
# Gate: OTN-10 returned SAFE TO PROCEED
# Date: 2026-08-30

---

## Executive Summary

All 25 PRG files were scanned. **Only RESERVA.PRG yielded extractable business rules.** The remaining 24 files are synthetic stubs with no IF/ENDIF, no validation logic, no SEEK, and no conditional REPLACE.

**3 VERIFIED rules** were extracted from `RESERVA.PRG` lines 4–9. These are the only rules in this entire codebase that can be classified as VERIFIED with source citation.

All BR-060 through BR-064 rules designated in the CYLRO PoC are **PoC-reconstructed rules** — they represent what the modern shipping workflow *should* enforce based on domain knowledge and the legacy field constants discovered. They are explicitly labeled as RECONSTRUCTED/PoC, not legacy-verified.

---

## VERIFIED Legacy Rules

### LR-001 — Expense Constant Assignment
- **Source:** `RESERVA.PRG`, `Reserva_Main`, line 5
- **Verbatim:** `REPLACE ALL Expensa WITH 10`
- **Classification:** ✅ VERIFIED
- **Behavior:** All records in `reserva.dbf` have their `Expensa` field set to the constant value 10. This is an unconditional global write — no filter, no guard condition, no user input.
- **Modern note:** This constant is preserved in the CYLRO PoC as the default shipping fee baseline.

### LR-002 — Last Month Constant Assignment
- **Source:** `RESERVA.PRG`, `Reserva_Main`, line 6
- **Verbatim:** `REPLACE ALL Ult_Mes WITH 2`
- **Classification:** ✅ VERIFIED
- **Behavior:** All records have `Ult_Mes` (Last Month) set to constant 2. Unconditional global write.
- **Modern note:** Mapped to the legacy reference period field in the CYLRO manifest document.

### LR-003 — Last Year Constant Assignment
- **Source:** `RESERVA.PRG`, `Reserva_Main`, line 7
- **Verbatim:** `REPLACE ALL ult_ano WITH 1999`
- **Classification:** ✅ VERIFIED
- **Behavior:** All records have `ult_ano` (Last Year) set to constant 1999. Unconditional global write.
- **Modern note:** Confirms the system's legacy reference epoch. Preserved as a synthetic fixture value.

---

## PoC-Reconstructed Rules (BR-060 to BR-064)

> ⚠️ **These rules are RECONSTRUCTED for the CYLRO PoC. They are NOT legacy-verified from source code.** They represent domain-appropriate validation added to the modernized shipping workflow. They are labeled as PoC rules throughout all documentation.

| Rule ID | Behavior | Source | Classification |
|---------|----------|--------|----------------|
| BR-060 | Order must exist and be marked PAID | Domain knowledge + reserva.dbf alias | RECONSTRUCTED/PoC |
| BR-061 | Tracking number must not already exist | Domain knowledge + uniqueness pattern | RECONSTRUCTED/PoC |
| BR-062 | Shipping address must be complete (≥5 chars) | Domain knowledge | RECONSTRUCTED/PoC |
| BR-063 | Shipping mode must be STANDARD, EXPRESS, or OVERNIGHT | Domain knowledge | RECONSTRUCTED/PoC |
| BR-064 | Package weight must be > 0 | Domain knowledge | RECONSTRUCTED/PoC |

---

## UNKNOWN Rules
All 24 stub PRGs (COBRA.PRG, VALOR.PRG, MENU.PRG, etc.) contain zero business rules in this snapshot. Their original rule content is **UNKNOWN**.

---

## Conflict Detection
No conflicts between rules — there is only one source of VERIFIED rules (RESERVA.PRG) and it contains no conditional logic that could create contradictions.

---

## Approved for CYLRO PoC
| Rule | Approved | Notes |
|------|----------|-------|
| LR-001 (Expensa=10) | ✅ Yes | Used as default fee constant |
| LR-002 (Ult_Mes=2) | ✅ Yes | Legacy reference field |
| LR-003 (ult_ano=1999) | ✅ Yes | Legacy epoch marker |
| BR-060 | ✅ Yes | PoC reconstructed — clearly labeled |
| BR-061 | ✅ Yes | PoC reconstructed — clearly labeled |
| BR-062 | ✅ Yes | PoC reconstructed — clearly labeled |
| BR-063 | ✅ Yes | PoC reconstructed — clearly labeled |
| BR-064 | ✅ Yes | PoC reconstructed — clearly labeled |
