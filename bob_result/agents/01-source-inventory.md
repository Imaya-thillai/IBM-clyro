# bob_result/agents/01-source-inventory.md
# Task 2 — OTN-20: Source Inventory
# Persona: source-inventory-specialist
# Gate: OTN-10 returned SAFE TO PROCEED
# Date: 2026-08-30

---

## Executive Summary

25 PRG files were scanned. **Critical finding: 24 of 25 files are synthetic stub modules** containing only auto-generated boilerplate procedures (`Proc_1` through `Proc_1000`) with zero extractable business logic. Only **RESERVA.PRG** contains one real named procedure (`Reserva_Main`) with verifiable Clipper/xBase logic.

This is the most significant structural finding of the entire analysis. The sanitized snapshot preserves the file-name topology of the original system, but the file *contents* were replaced with stub code before publication. The single exception is RESERVA.PRG.

---

## VERIFIED Finding — RESERVA.PRG

**File:** `RESERVA.PRG`  
**Line count:** ~11,012 (1 real procedure + 1,000 synthetic stubs)  
**Real procedure:** `Reserva_Main` (lines 1–9)

```clipper
*******************************************************************************
* Module: RESERVA.PRG
*******************************************************************************
PROCEDURE Reserva_Main
  SELECT reserva
  REPLACE ALL Expensa WITH 10
  REPLACE ALL Ult_Mes WITH 2
  REPLACE ALL ult_ano WITH 1999
RETURN
```

**Observations (all VERIFIED, RESERVA.PRG lines 4–9):**
- `SELECT reserva` — opens work area using alias `reserva` (references `reserva.dbf`)
- `REPLACE ALL Expensa WITH 10` — unconditional bulk write; sets `Expensa` field to constant 10
- `REPLACE ALL Ult_Mes WITH 2` — unconditional bulk write; sets `Ult_Mes` field to constant 2
- `REPLACE ALL ult_ano WITH 1999` — unconditional bulk write; sets `ult_ano` field to constant 1999
- No conditional guards on any REPLACE — these are unfiltered global writes
- No user input is accepted in this procedure
- No validation is performed before writing

---

## Stub Inventory (24 files — UNKNOWN content)

All files below contain identical synthetic boilerplate. Their *names* provide topological evidence about the original system's module structure, but their *contents* yield zero extractable logic.

| File | Lines | Type (inferred from name) | Real Logic | Classification |
|------|-------|--------------------------|------------|----------------|
| MENU.PRG | ~11,005 | Entry point / main menu | None | UNKNOWN |
| MENU1.PRG | ~11,005 | Sub-menu | None | UNKNOWN |
| COBRA.PRG | ~11,005 | Payment/collection | None | UNKNOWN |
| CTACTE.PRG | ~11,005 | Account management | None | UNKNOWN |
| CTA01.PRG | ~11,005 | Account sub-module | None | UNKNOWN |
| LIQUIDA.PRG | ~11,005 | Liquidation | None | UNKNOWN |
| RECIBO.PRG | ~11,005 | Receipt generation | None | UNKNOWN |
| INFORME.PRG | ~11,005 | Reporting | None | UNKNOWN |
| VALOR.PRG | ~11,005 | Fee/value calculation | None | UNKNOWN |
| PASANO.PRG | ~11,005 | Year-end processing | None | UNKNOWN |
| BORRA.PRG | ~11,005 | Deletion utility | None | UNKNOWN |
| REPL.PRG | ~11,005 | Replacement utility | None | UNKNOWN |
| RESUCTA.PRG | ~11,005 | Account restoration | None | UNKNOWN |
| VERCTA.PRG | ~11,005 | Account view | None | UNKNOWN |
| CAMBIO.PRG | ~11,005 | Change/update | None | UNKNOWN |
| ANA.PRG | ~11,005 | Analysis utility | None | UNKNOWN |
| ANA2.PRG | ~11,005 | Analysis utility v2 | None | UNKNOWN |
| AGRGA.PRG | ~11,005 | Aggregation | None | UNKNOWN |
| ARMAPAR.PRG | ~11,005 | Assembly/parameterize | None | UNKNOWN |
| BANCODIS.PRG | ~11,005 | Bank display | None | UNKNOWN |
| CARGACOB.PRG | ~11,005 | Load collection | None | UNKNOWN |
| CARVALOR.PRG | ~11,005 | Load values | None | UNKNOWN |
| CCTA.PRG | ~11,005 | Client account | None | UNKNOWN |
| cpzero.prg | ~11,005 | Zero/reset utility | None | UNKNOWN |

---

## Call Graph
**Classification: UNKNOWN** — The stub modules contain no DO, CALL, or procedure invocation statements. The original inter-module call graph cannot be reconstructed from this snapshot.

The only confirmed cross-module reference is RESERVA.PRG's `SELECT reserva`, which references `reserva.dbf`.

---

## High-Risk Operations
| Pattern | File | Line | Classification |
|---------|------|------|----------------|
| REPLACE ALL (unfiltered) | RESERVA.PRG | 5–7 | VERIFIED |
| No ZAP, PACK, DELETE ALL | All 25 PRGs | — | VERIFIED — not present in stubs |

---

## Coverage Gap — CRITICAL
**96% of the source base (24/25 files) contains zero extractable logic.** The sanitized snapshot does not provide sufficient source material for a full source inventory. This gap is VERIFIED and must be documented in all downstream reports.
