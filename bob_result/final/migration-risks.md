# bob_result/final/migration-risks.md
# Consolidated Migration Risk Register — CYLRO IBM Bob Analysis
# Date: 2026-08-30

---

## High Priority Risks (Mitigated via Scoping)

### RISK-01: Critical Source Coverage Gap
**Severity:** HIGH  
**Finding:** 24 of 25 PRG files are synthetic stubs containing no logic. The vast majority of the original system's behavior cannot be reconstructed from this snapshot.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** The CYLRO PoC is strictly scoped to what is VERIFIED (the constants in `RESERVA.PRG`) and RECONSTRUCTED (the shipping workflow). Full feature parity is abandoned, as it is impossible.

### RISK-02: Unfiltered REPLACE ALL Operations
**Severity:** HIGH  
**Finding:** `Reserva_Main` performs global `REPLACE ALL` operations on the `reserva.dbf` table without any `WHERE` or `FOR` clause. If executed naively, this corrupts the entire database.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** Unfiltered bulk updates are rejected in the modern architecture. IBM Cloudant document writes are strictly scoped to individual tracking manifests.

### RISK-03: Missing Index Files (NTX/CDX)
**Severity:** HIGH  
**Finding:** No index files were included in the snapshot. All legacy uniqueness, sorting, and lookup behaviors are permanently unknown.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** Uniqueness is enforced programmatically in the Next.js API layer (e.g., BR-061 Tracking Number uniqueness) rather than at the database schema level.

---

## Medium Priority Risks (Addressed)

### RISK-04: Binary DBF Schema Unreadability
**Severity:** MEDIUM  
**Finding:** DBF headers are unreadable without a runtime environment. Schema mappings for 21/22 files are INFERRED.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** IBM Cloudant is a NoSQL schema-less document database. Only the fields required for the CYLRO shipping manifest workflow are defined in the application layer. The 21 unknown DBFs are ignored.

### RISK-05: Cloudant Credential Hardcoded in Server Route
**Severity:** MEDIUM  
**Finding:** The IBM Cloudant API key (`vbZX...`) is hardcoded in `route.ts`.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** The key is currently safe because it exists only in a Next.js server-side API route and is never bundled to the client. However, an advisory is placed to move this to `process.env` prior to any production deployment.

### RISK-06: Case-Sensitivity of DBF Filenames
**Severity:** MEDIUM  
**Finding:** Legacy DBF filenames use mixed case. This risks file-not-found errors if migrated to a Linux/POSIX environment.  
**Classification:** INFERRED  
**Resolution / Mitigation:** The CYLRO PoC does not attempt to read or write the legacy DBF files directly. It operates exclusively against IBM Cloudant, rendering local file case-sensitivity moot.

---

## Low Priority Risks

### RISK-07: Synthetic Proc_N Boilerplate
**Severity:** LOW  
**Finding:** ~275,000 lines of noise boilerplate artificially inflate the codebase size metrics.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** None required; documented as noise.

### RISK-08: ult_ano Hardcoded to 1999
**Severity:** LOW  
**Finding:** `RESERVA.PRG` hardcodes the year to 1999.  
**Classification:** VERIFIED  
**Resolution / Mitigation:** CYLRO PoC treats this as a read-only legacy constant, not as the system's active date.
