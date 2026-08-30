# bob_result/final/business-rules.md
# Consolidated Business Rule Register — CYLRO IBM Bob Analysis
# Approved: ✅ by project owner (CYLRO PoC scope)
# Date: 2026-08-30

---

> ⚠️ This register distinguishes **VERIFIED** rules (from source code) from **RECONSTRUCTED** rules (domain-appropriate PoC additions). Only VERIFIED rules have source citations.

---

## VERIFIED Legacy Rules

| Rule ID | File | Lines | Verbatim Code | Behavior | Approved |
|---------|------|-------|---------------|----------|----------|
| LR-001 | RESERVA.PRG | 5 | `REPLACE ALL Expensa WITH 10` | Sets expense constant to 10 for all records | ✅ |
| LR-002 | RESERVA.PRG | 6 | `REPLACE ALL Ult_Mes WITH 2` | Sets last-month reference to 2 for all records | ✅ |
| LR-003 | RESERVA.PRG | 7 | `REPLACE ALL ult_ano WITH 1999` | Sets last-year reference to 1999 for all records | ✅ |

---

## RECONSTRUCTED PoC Rules (BR-060 to BR-064)

> These rules are domain-appropriate validations added to the modernized CYLRO shipping workflow. They are NOT present in the legacy source code. They are labeled as RECONSTRUCTED throughout all documentation.

| Rule ID | Behavior | Type | Approved |
|---------|----------|------|----------|
| BR-060 | Order must exist and be marked PAID | Existence + status check | ✅ |
| BR-061 | Tracking number must not already exist in database | Uniqueness check | ✅ |
| BR-062 | Shipping address must be non-empty (≥ 5 characters) | Completeness check | ✅ |
| BR-063 | Shipping mode must be STANDARD, EXPRESS, or OVERNIGHT | Enum validation | ✅ |
| BR-064 | Package weight must be greater than 0 kg | Range check | ✅ |

---

## Not Approved / Out of Scope

All rules from the 24 stub PRG files (COBRA.PRG, VALOR.PRG, MENU.PRG, etc.) are classified UNKNOWN and are explicitly **not approved** for any modernization requirement. They may only become requirements if and when the original source is provided.

---

## Implementation Status (CYLRO PoC)

| Rule | Implemented In | Location | Status |
|------|---------------|----------|--------|
| LR-001 | mockData.ts | `src/data/mockData.ts` | ✅ Constant preserved |
| LR-002 | mockData.ts | `src/data/mockData.ts` | ✅ Constant preserved |
| LR-003 | mockData.ts | `src/data/mockData.ts` | ✅ Constant preserved |
| BR-060 | API route | `src/app/api/shipping/route.ts` | ✅ App-layer check |
| BR-061 | API route | `src/app/api/shipping/route.ts` | ✅ Cloudant duplicate check |
| BR-062 | UI + API | Shipping form + API route | ✅ Frontend + backend |
| BR-063 | UI + API | Select dropdown + enum check | ✅ Frontend + backend |
| BR-064 | UI + API | Input validation + check | ✅ Frontend + backend |
