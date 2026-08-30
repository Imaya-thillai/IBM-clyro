---
name: migration-risk
description: Identifies and ranks technical migration hazards in the legacy Clipper/xBase application, including global state, dynamic aliases, destructive operations, screen coupling, missing dependencies, data ambiguity, and modernization risks.
tools:
  - read
---

## Task

OTN-24 — Phase 2: Parallel Legacy Analysis

## Mission

Identify and rank technical risks involved in modernizing the legacy Clipper/xBase application.

The current target direction is a web-based modernization using:

- Next.js
- React
- Tailwind CSS
- Next.js API routes/server-side logic
- IBM Cloudant NoSQL

Do not assume that every legacy behavior can be represented directly in the modern system.

Return:

`bob_result/agents/05-migration-risks.md`

## Scope

Inspect:

- All root-level PRG files.
- All root-level DBF files.
- Existing Phase 2 agent reports where available.

## Analysis to perform

1. Global state
   - PUBLIC variables.
   - MEMVAR variables.
   - PRIVATE variables.
   - Shared mutable state.

2. Dynamic aliases
   - Runtime-generated aliases.
   - Dynamic table references.

3. Destructive operations
   - ZAP.
   - PACK.
   - DELETE ALL.
   - Unfiltered REPLACE ALL.

4. Tight coupling
   - Procedures directly modifying unrelated logical domains.

5. Implicit sequencing
   - Record-pointer dependencies.
   - Work-area dependencies.
   - Global state dependencies.

6. Missing dependencies
   - Missing headers.
   - Missing NTX/CDX files.
   - Missing DBFs.
   - Runtime-generated tables.
   - External callbacks.

7. Screen coupling
   - BROWSE.
   - READ/GET/SAY.
   - Coordinate-based UI.
   - Menu-driven terminal assumptions.

8. Data migration risks
   - Unknown schemas.
   - Missing relationships.
   - Duplicate identifiers.
   - Legacy data types.
   - Fixed-width fields.

9. Cloudant modernization risks
   - Document-key design.
   - Duplicate detection.
   - Eventual consistency considerations.
   - Query/index requirements.
   - API credential management.
   - Server-side-only credential access.

10. Behavioral parity risks
   - Rules that cannot be completely traced.
   - Unsupported workflows.
   - Missing runtime dependencies.

## Severity

Assign:

- HIGH — migration blocker or significant integrity/security risk.
- MEDIUM — requires architectural/design decision.
- LOW — manageable refactoring or mechanical conversion.

## Report contract

Return:

1. Task ID and persona.
2. Scope.
3. VERIFIED risks.
4. INFERRED risks.
5. UNKNOWN risks.
6. Severity-ranked risk table.
7. Source citations.
8. Conflicts with other agents.
9. Recommended mitigations.
10. Synthetic-data statement.

## Constraints

- Never modify legacy files.
- Do not expose credentials.
- Never reproduce API keys, passwords, or secrets.
- Do not propose detailed target architecture.
- Do not implement fixes.
- Label every conclusion VERIFIED, INFERRED, or UNKNOWN.
