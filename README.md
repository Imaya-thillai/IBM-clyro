# CYLRO — Evidence-Based Legacy Modernization with IBM Bob

CYLRO is a proof of concept for the "IBM Dev Day: Bob in Action" hackathon that demonstrates how IBM Bob can safely turn an undocumented Clipper/xBase application into traceable modernization work.

The project does not claim to migrate the complete legacy application. It uses Bob to reconstruct verified behavior and then modernizes exactly one user-approved workflow—the **"New Interment"** scheduling and financial reservation flow for a legacy Cemetery/Funeral Home (Cocheria) system—as a live Next.js, Tailwind v4, and IBM Cloudant NoSQL vertical slice.

[Review the IBM Bob task/session evidence](./bob_sessions/README.md)

## The Problem
Critical behavior in the legacy application is embedded in large PRG files, screen-coordinate code, global state, dynamic DBF aliases, and implicit index relationships. The sanitized snapshot contains 25 PRG files and 22 DBF schemas (including `COCHERIA.DBF` and `RESERVA.PRG`), but it lacks a complete Clipper runtime. Understanding the system manually is slow and risky: a developer must separate active behavior from historical utilities, locate hidden writes, and avoid promoting assumptions into requirements.

## The Solution
IBM Bob acts as an evidence and orchestration layer:
* Read the persistent project contract and create bounded tasks.
* Perform a privacy and safety review before functional analysis.
* Coordinate five specialized read-only analyses in parallel.
* Classify findings as VERIFIED, INFERRED, or UNKNOWN.
* Consolidate source inventory, data model, business rules, workflows, and migration risks with narrow source citations.
* Require user approval before a verified rule can become a modernization requirement.

The approved proof of concept modernizes the **New Interment Reservation Workflow** leveraging verified legacy rules extracted directly from `RESERVA.PRG`. The implementation separates UI, API routing, domain validation, and cloud persistence concerns and validates the selected behavior via a direct integration with **IBM Cloudant**.

## What IBM Bob Did
| Task | IBM Bob contribution | Evidence |
|---|---|---|
| OTN-00/01 | Project contract, task structure, and reusable personas | [bob_sessions/otn-01-project-initialization.png](./bob_sessions/otn-01-project-initialization.png) |
| OTN-10 | Privacy and security gate | [bob_sessions/otn-10-security-review.png](./bob_sessions/otn-10-security-review.png) |
| OTN-20 | PRG source and dependency inventory | [bob_result/agents/01-source-inventory.md](./bob_result/agents/01-source-inventory.md) |
| OTN-21 | DBF schema and relationship reconstruction | [bob_result/agents/02-data-model.md](./bob_result/agents/02-data-model.md) |
| OTN-22 | Business-rule extraction | [bob_result/agents/03-business-rules.md](./bob_result/agents/03-business-rules.md) |
| OTN-23 | End-to-end workflow reconstruction | [bob_result/agents/04-workflows.md](./bob_result/agents/04-workflows.md) |
| OTN-24 | Maintainability and migration-risk analysis | [bob_result/agents/05-migration-risks.md](./bob_result/agents/05-migration-risks.md) |
| OTN-25 | Consolidation and cross-report conflict review | [bob_result/final/analysis-summary.md](./bob_result/final/analysis-summary.md) |

Three unmodified JSON files produced by IBM Bob's Export Current Task command are available through the [task/session evidence index](./bob_sessions/README.md#official-ibm-bob-task-exports). They cover OTN-00/01/01A, OTN-10, and OTN-20 through OTN-25. SHA-256 hashes are published alongside the files so their exported contents can be verified.

## Modernized Workflow
The selected flow implements source-backed business rules verified by IBM Bob during the analysis of `RESERVA.PRG`:
| Rule | Approved behavior |
|---|---|
| LR-001 | A new reservation must set the base financial `Expensa` constant to 10. |
| LR-002 | The reservation period must properly record `Ult_Mes` as 2. |
| LR-003 | The reservation period must properly record `ult_ano` as 1999. |

Every other legacy workflow is explicitly out of scope for this vertical slice.

## Architecture
Next.js View → React Component State → Next.js API Route → Domain Rules ↓ IBM Cloudant Persistence
* Next.js 16 and Tailwind CSS v4 web portal.
* Live IBM Cloudant NoSQL database connection (IAM Authenticated).
* Deterministic synthetic fixtures.
* No runtime access to the root PRG or DBF evidence.

Architecture details and diagrams:
* [Target architecture](./bob_result/final/target-architecture.md)
* [Migration plan](./bob_result/final/migration-plan.md)
* [Target architecture diagram](./bob_result/diagrams/target-architecture.md)
* [Legacy flow diagram](./bob_result/diagrams/legacy-flow.md)

## Verified Results
| Metric | Result |
|---|---|
| Legacy PRG files inventoried | 25 |
| DBF schemas documented | 22 |
| Parallel specialized Bob analyses | 5 |
| Consolidated verified business rules | 46 |
| Independent PoC validation passes | 100% |

## Build, Test, and Run
Prerequisite: Node.js 18+.

```bash
cd web-portal
npm install
npm run dev
```
Then visit `http://localhost:3000`

Use the web portal to explore the IBM Bob analysis and run the interactive "New Interment" validation flow which syncs synthetic reservation data directly to IBM Cloudant.

## Repository Guide
| Path | Contents |
|---|---|
| .bob/agents/ | Reusable specialized IBM Bob personas |
| bob_result/agents/ | IBM Bob specialist reports |
| bob_result/final/ | Consolidated analysis, architecture, validation, and submission documents |
| bob_result/diagrams/ | Legacy and target architecture diagrams |
| bob_result/logs/ | Build, test, correction, and provenance records |
| [bob_sessions/](./bob_sessions/README.md) | Indexed IBM Bob task/session evidence and clearly labeled manual captures |
| web-portal/ | Runnable Next.js/React proof of concept with live IBM Cloudant integration |
| Root *.PRG / *.DBF | Read-only sanitized legacy evidence |

## Submission Materials
* [Final hackathon report](./bob_result/final/final-hackathon-report.md)
* [Three-minute demo script](./bob_result/final/demo-script.md)
* [Submission form text](./bob_result/final/submission-form-text.md)
* [Submission checklist](./bob_result/final/submission-checklist.md)

## Privacy, Safety, and Limitations
* All DBF records and generated fixtures are visibly synthetic.
* Original indexes were intentionally removed because they could retain source values; no NTX/CDX file is committed.
* Root PRG and DBF files are preserved as read-only evidence.
* Destructive legacy utilities are never executed.
* Full legacy runtime parity remains UNKNOWN because the sanitized snapshot is incomplete.
* Only the targeted "New Interment" rules extracted from `RESERVA.PRG` are implemented and validated.
* Only synthetic data was used in this repository.
