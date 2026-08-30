# bob_result/final/legacy-system-overview.md
# Consolidated Legacy System Overview — CYLRO IBM Bob Analysis
# Date: 2026-08-30

---

## System Identity
- **Name:** Unknown (original system name not present in snapshot)
- **Language:** Clipper/xBase (DOS-era, compiled)
- **UI paradigm:** Terminal-based, screen-coordinate SAY/GET layout
- **Persistence:** dBASE IV DBF binary tables, NTX/CDX indexes (removed from snapshot)
- **Domain (inferred):** Logistics, reservations, and account management (likely cemetery / municipal services based on field names: `Expensa`, `Ult_Mes`, `parquenu`, `COCHERIA`, `ATAUD`, `BAJA`)

---

## Snapshot Composition
| Component | Count | Verifiable Content |
|-----------|-------|--------------------|
| PRG source files | 25 | 1 real procedure in RESERVA.PRG |
| DBF schema files | 22 | 3 field names confirmed in reserva.dbf |
| Index files (NTX/CDX) | 0 | Intentionally removed |
| Executable runtime | 0 | Not present |

---

## What Is Confirmed (VERIFIED)
1. The system operates with a `reserva` work area backed by `reserva.dbf`.
2. `reserva.dbf` contains at minimum three fields: `Expensa` (numeric), `Ult_Mes` (numeric), `ult_ano` (numeric/char).
3. The initialization procedure `Reserva_Main` performs three unscoped global writes setting those fields to `10`, `2`, and `1999` respectively.
4. The module topology (25 named PRG files) provides a topological map of what the original system's modules were, but not what they did.

---

## What Cannot Be Determined (UNKNOWN)
- The entry point and navigation structure (MENU.PRG is a stub)
- Any user-facing workflow steps or screen layouts
- Any validation, conditional, or business logic beyond the 3 REPLACE statements
- All 21 DBF schemas beyond the three confirmed fields in reserva.dbf
- The purpose of 24/25 PRG modules beyond their names

---

## Domain Field Name Evidence (INFERRED system domain)

The DBF and PRG file names suggest a **municipal cemetery or funeral services management** domain:
- `COCHERIA.DBF` — funeral home registry
- `ATAUD.DBF` — coffin registry  
- `BAJA.DBF` — deregistration / burial record removal
- `parquenu.dbf` — parcel/plot registry
- `SUBNIVEL.DBF` — burial sub-levels (depth)
- `AREAS.DBF` — cemetery areas/zones
- `Expensa` — service expense / fee
- `Ult_Mes` / `ult_ano` — last billing month/year

**Classification:** INFERRED (file names provide domain hints but not verifiable logic)

> The CYLRO PoC modernizes this domain pattern into a Shipping & Delivery workflow, preserving the structural lesson of the legacy system while adapting the domain for IBM Cloud demonstration purposes.
