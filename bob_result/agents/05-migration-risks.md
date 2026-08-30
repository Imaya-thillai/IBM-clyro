# bob_result/agents/05-migration-risks.md
# Task 6 — OTN-24: Migration Risk Assessment
# Persona: migration-risk-specialist
# Gate: OTN-10 returned SAFE TO PROCEED
# Date: 2026-08-30

---

## Executive Summary

Migration risks were assessed across all 25 PRG files and 22 DBF schemas. The dominant risk in this project is not a technical complexity risk — it is a **source availability risk**: 96% of the source base contains no extractable logic, making full parity assessment impossible.

3 HIGH severity, 3 MEDIUM severity, and 2 LOW severity risks were identified.

---

## HIGH Severity Risks

### RISK-01 — Critical Source Coverage Gap
- **Severity:** HIGH
- **Location:** 24/25 PRG files
- **Finding:** 24 PRG files are synthetic stubs containing no business logic. The original inter-module behavior, call graph, validation logic, and workflow orchestration from the real Clipper application are entirely absent from this snapshot.
- **Impact:** Full legacy parity cannot be achieved or even assessed. Any modernization beyond RESERVA.PRG's 3 verified constants requires domain reconstruction, not source-based migration.
- **Classification:** VERIFIED
- **Mitigation:** CYLRO PoC explicitly scopes to only what is VERIFIED. All PoC rules beyond LR-001/002/003 are labeled RECONSTRUCTED. Full parity is not claimed.

### RISK-02 — Unfiltered REPLACE ALL Operations
- **Severity:** HIGH
- **Location:** `RESERVA.PRG`, lines 5–7
- **Finding:** Three `REPLACE ALL` statements operate without any WHERE/FOR clause. In Clipper, `REPLACE ALL` without a scope modifier writes to every record in the active work area. If this procedure runs against a populated database, it overwrites ALL rows globally.
- **Impact:** In a migration context, naively re-implementing this as a SQL `UPDATE` without `WHERE` would corrupt all records. The modern equivalent must be scoped intentionally.
- **Classification:** VERIFIED
- **Mitigation:** CYLRO PoC does not replicate the unfiltered REPLACE ALL. Modern API writes are scoped per-document in Cloudant.

### RISK-03 — Missing Index Files (NTX/CDX)
- **Severity:** HIGH
- **Location:** All 22 DBF files
- **Finding:** No index files were included in the sanitized snapshot (per README — intentionally removed). SEEK-based lookups, uniqueness enforcement, and sort order behavior all depended on these indexes in the original runtime.
- **Impact:** Uniqueness constraints, candidate key identification, and query performance characteristics are entirely UNKNOWN.
- **Classification:** VERIFIED gap
- **Mitigation:** Uniqueness is enforced at the application layer in the CYLRO PoC (BR-061 tracking uniqueness check via Cloudant query).

---

## MEDIUM Severity Risks

### RISK-04 — Binary DBF Schema Unreadability
- **Severity:** MEDIUM
- **Location:** All 22 DBF files
- **Finding:** DBF headers are in binary dBASE format. Without a Clipper/dBASE runtime or DBF parser, field names, types, widths, and decimal precision for 21/22 schemas cannot be confirmed.
- **Impact:** Data migration schema mapping is INFERRED at best for 21 DBFs.
- **Classification:** VERIFIED (gap is confirmed)

### RISK-05 — Cloudant Credential Hardcoded in Server Route
- **Severity:** MEDIUM
- **Location:** `web-portal/src/app/api/shipping/route.ts`, line 7
- **Finding:** IBM Cloudant API key is a plaintext constant in the source file.
- **Impact:** If the repository is made public (it already is), the key is exposed. A rotated or revoked key is required for any production deployment.
- **Classification:** VERIFIED
- **Mitigation:** Move to `process.env.CLOUDANT_APIKEY` via `.env.local` (not committed).

### RISK-06 — Case-Sensitivity of DBF Filenames
- **Severity:** MEDIUM
- **Location:** `bancos.dbf`, `cobrador.dbf`, `ctaexp.dbf`, `mutual.dbf`, `parquenu.dbf`, `reserva.dbf`
- **Finding:** 6 DBFs use lowercase names while 16 use uppercase. Original Clipper on DOS was case-insensitive. Migration to Linux requires careful filename normalization.
- **Classification:** INFERRED

---

## LOW Severity Risks

### RISK-07 — Synthetic Proc_N Boilerplate in Committed Files
- **Severity:** LOW
- **Location:** All 25 PRG files (bodies)
- **Finding:** Committed stub code (Proc_1 through Proc_1000) adds ~275,000 lines of noise. This creates a misleading size signal (files appear large and active).
- **Classification:** VERIFIED

### RISK-08 — ult_ano Hardcoded to 1999
- **Severity:** LOW
- **Location:** `RESERVA.PRG`, line 7
- **Finding:** `REPLACE ALL ult_ano WITH 1999` hard-codes a year value that is 27 years in the past. Any modern system that replicates this constant will produce date-comparison anomalies unless the value is treated as a legacy anchor.
- **Classification:** VERIFIED
- **Mitigation:** CYLRO PoC preserves this as a read-only legacy reference constant, not an active date field.

---

## Risk Register Summary

| ID | Severity | Classification | Mitigated in PoC |
|----|----------|----------------|-----------------|
| RISK-01 | HIGH | VERIFIED | ✅ Scope limited to VERIFIED only |
| RISK-02 | HIGH | VERIFIED | ✅ Scoped writes in Cloudant |
| RISK-03 | HIGH | VERIFIED | ✅ App-layer uniqueness (BR-061) |
| RISK-04 | MEDIUM | VERIFIED | ✅ Only confirmed schema used |
| RISK-05 | MEDIUM | VERIFIED | ⚠️ Advisory — move to env var |
| RISK-06 | MEDIUM | INFERRED | ✅ Windows deployment (case-insensitive) |
| RISK-07 | LOW | VERIFIED | ✅ No impact on PoC |
| RISK-08 | LOW | VERIFIED | ✅ Treated as legacy constant |
