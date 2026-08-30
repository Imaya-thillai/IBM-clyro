# bob_result/agents/02-data-model.md
# Task 3 — OTN-21: Data Model Reconstruction
# Persona: data-model-specialist
# Gate: OTN-10 returned SAFE TO PROCEED
# Date: 2026-08-30

---

## Executive Summary

22 DBF files were identified. All are binary dBASE format files with indexes (.NTX/.CDX) intentionally removed. Schema content could not be read from binary headers without a dBASE runtime. Cross-referencing with PRG source yielded only **one VERIFIED schema reference**: `reserva.dbf` via `SELECT reserva` in `RESERVA.PRG`.

All other 21 DBF schemas are classified **UNKNOWN** — their field structures, candidate keys, and relationships cannot be determined from the available sanitized snapshot.

---

## VERIFIED Schema Reference

### reserva.dbf
**Evidence:** `RESERVA.PRG`, `Reserva_Main` procedure, lines 4–9  

| Field | Type | Classification | Evidence |
|-------|------|----------------|----------|
| Expensa | Numeric | VERIFIED | `REPLACE ALL Expensa WITH 10` — line 5 |
| Ult_Mes | Numeric | VERIFIED | `REPLACE ALL Ult_Mes WITH 2` — line 6 |
| ult_ano | Numeric/Character | VERIFIED | `REPLACE ALL ult_ano WITH 1999` — line 7 |

**Inferred field widths / types:** UNKNOWN — binary header not readable without runtime.  
**Candidate key:** UNKNOWN — no SEEK or INDEX statements present in the snapshot.  
**Relationships:** UNKNOWN — no SET RELATION statements found.

---

## DBF Topology (22 files — UNKNOWN schemas)

All schemas below are UNKNOWN. File names provide topological hints about domain purpose only.

| DBF File | Case | Inferred Domain Purpose | Schema | Classification |
|----------|------|------------------------|--------|----------------|
| reserva.dbf | lower | Reservations / orders | 3 fields confirmed | VERIFIED (partial) |
| CTACTE.DBF | upper | Customer account ledger | UNKNOWN | UNKNOWN |
| ctaexp.dbf | lower | Account export/expanded | UNKNOWN | UNKNOWN |
| RECIBO.DBF | upper | Receipts / manifests | UNKNOWN | UNKNOWN |
| VALOREXP.DBF | upper | Value export / fees | UNKNOWN | UNKNOWN |
| SUBNIVEL.DBF | upper | Sub-level / zones | UNKNOWN | UNKNOWN |
| SUPLENTE.DBF | upper | Substitute / alternate | UNKNOWN | UNKNOWN |
| titular.DBF | mixed | Titular / account holder | UNKNOWN | UNKNOWN |
| parquenu.dbf | lower | Parcel / plot | UNKNOWN | UNKNOWN |
| PROMOTOR.DBF | upper | Promoter / agent | UNKNOWN | UNKNOWN |
| COCHERIA.DBF | upper | Funeral home / courier | UNKNOWN | UNKNOWN |
| ATAUD.DBF | upper | Coffin / package | UNKNOWN | UNKNOWN |
| AREAS.DBF | upper | Areas / zones | UNKNOWN | UNKNOWN |
| BAJA.DBF | upper | Deregistration / cancellation | UNKNOWN | UNKNOWN |
| bancos.dbf | lower | Banks / financial | UNKNOWN | UNKNOWN |
| cobrador.dbf | lower | Collector / courier agent | UNKNOWN | UNKNOWN |
| CONTRAS.DBF | upper | Contracts / agreements | UNKNOWN | UNKNOWN |
| FILTRO.DBF | upper | Filter / search cache | UNKNOWN | UNKNOWN |
| MAEASO.DBF | upper | Master association | UNKNOWN | UNKNOWN |
| mutual.dbf | lower | Mutual / cooperative | UNKNOWN | UNKNOWN |
| PROVINCI.DBF | upper | Province / region | UNKNOWN | UNKNOWN |
| RENA.DBF | upper | Registry / national | UNKNOWN | UNKNOWN |

---

## Case-Sensitivity Note
5 DBFs use lowercase names (`reserva.dbf`, `bancos.dbf`, `cobrador.dbf`, `ctaexp.dbf`, `mutual.dbf`, `parquenu.dbf`). On the original DOS/Clipper environment (case-insensitive), these were equivalent to their uppercase variants. On Windows NTFS (also case-insensitive) this is not a problem. On Linux (case-sensitive) these would require explicit mapping.  
**Classification:** INFERRED risk for Linux-hosted migration environments.

---

## Missing Indexes
All .NTX and .CDX index files were intentionally removed from the sanitized snapshot per README documentation. SEEK-based lookups, sort orders, and uniqueness constraints enforced by indexes **cannot be verified** from the available files.  
**Classification:** VERIFIED gap.

---

## IBM Cloudant Modern Mapping (CYLRO PoC)

| Legacy DBF | Cloudant Database | Notes |
|------------|-------------------|-------|
| reserva.dbf | `cylro-shipping-logs` | Active — document per manifest |
| All others | Not implemented | Out of scope for PoC |
