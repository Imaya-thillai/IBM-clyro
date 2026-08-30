# bob_result/final/project-initialization.md
# Gate 0 — Project Contract Confirmation
# OTN-00 / OTN-01 | Orchestrator (parent agent)
# Date: 2026-08-30

---

## Project: CYLRO — IBM Legacy Modernization PoC
**Repository:** https://github.com/Imaya-thillai/IBM-clyro  
**Hackathon:** IBM TechXchange 2026

---

## Confirmed In-Scope Files

### PRG Files (25 total)
AGRGA.PRG, ANA.PRG, ANA2.PRG, ARMAPAR.PRG, BANCODIS.PRG, BORRA.PRG, CAMBIO.PRG,
CARGACOB.PRG, CARVALOR.PRG, CCTA.PRG, COBRA.PRG, cpzero.prg, CTA01.PRG, CTACTE.PRG,
INFORME.PRG, LIQUIDA.PRG, MENU.PRG, MENU1.PRG, PASANO.PRG, RECIBO.PRG, REPL.PRG,
RESERVA.PRG, RESUCTA.PRG, VALOR.PRG, VERCTA.PRG

### DBF Files (22 total)
AREAS.DBF, ATAUD.DBF, BAJA.DBF, bancos.dbf, cobrador.dbf, COCHERIA.DBF, CONTRAS.DBF,
CTACTE.DBF, ctaexp.dbf, FILTRO.DBF, MAEASO.DBF, mutual.dbf, parquenu.dbf, PROMOTOR.DBF,
PROVINCI.DBF, RECIBO.DBF, RENA.DBF, reserva.dbf, SUBNIVEL.DBF, SUPLENTE.DBF,
titular.DBF, VALOREXP.DBF

---

## Classification Schema
| Label | Meaning |
|-------|---------|
| **VERIFIED** | Directly supported by a named file and exact line range. |
| **INFERRED** | Strongly suggested by indirect evidence; reasoning stated explicitly. |
| **UNKNOWN** | Cannot be determined from available source; gap documented. |

---

## Task IDs and Output Paths

| Task | ID | Persona | Output File |
|------|----|---------|-------------|
| Gate 0 | OTN-00/01 | Orchestrator | `bob_result/final/project-initialization.md` |
| Task 1 | OTN-10 | security-reviewer | `bob_result/agents/00-security-review.md` |
| Task 2 | OTN-20 | source-inventory | `bob_result/agents/01-source-inventory.md` |
| Task 3 | OTN-21 | data-model | `bob_result/agents/02-data-model.md` |
| Task 4 | OTN-22 | business-rules | `bob_result/agents/03-business-rules.md` |
| Task 5 | OTN-23 | workflow-reconstructor | `bob_result/agents/04-workflows.md` |
| Task 6 | OTN-24 | migration-risk | `bob_result/agents/05-migration-risks.md` |
| Task 7 | OTN-25 | Orchestrator | `bob_result/final/analysis-summary.md` + 4 others |

---

## Gate Conditions
- **Gate 1:** Task 1 (OTN-10) must return `SAFE TO PROCEED` before Tasks 2–6 may begin.
- **Gate 2:** All 5 parallel tasks (OTN-20–24) must complete before Task 7 (OTN-25).
- **Gate 3:** User must explicitly approve findings before any finding becomes a modernization requirement.

---

## User Approval Requirement
No finding — VERIFIED, INFERRED, or UNKNOWN — may become a modernization requirement until the user explicitly approves it. The approved PoC scope is limited to **WF-004** and **BR-060 through BR-064**.

---

## Cross-Cutting Constraints (All Tasks)
1. Never modify any `*.PRG` or `*.DBF` file.
2. Never reproduce credentials, API keys, passwords, or secrets.
3. Never treat demo/synthetic records as production data.
4. Never invent a finding without source evidence.
5. Never promote an INFERRED or UNKNOWN finding to a requirement.
6. Always cite exact filename and line range for every VERIFIED finding.
7. Do not propose modernization architecture during the analysis phase.

**Contract confirmed. Gate 0 complete. Gate 1 (OTN-10) authorized to begin.**
