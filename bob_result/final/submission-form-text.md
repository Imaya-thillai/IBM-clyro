# Hackathon Submission Form Text

**Project Name:** 
CYLRO: Evidence-Based Legacy Modernization

**Elevator Pitch (Short Description):**
We used IBM Bob's multi-agent AI to crack open a decades-old Clipper/xBase application, safely extracting its core business rules to power a sleek new Next.js dashboard backed by IBM Cloudant.

**Full Description:**
Let's face it: enterprises are weighed down by decades-old legacy applications that are too critical to turn off, but way too scary to touch. 

For this hackathon, we decided to tackle that exact problem using a legacy funeral home and cemetery management system. The codebase was a classic black box—25 PRG source files and 22 DBF tables of undocumented Clipper/xBase spaghetti code. 

Instead of guessing how it worked, we put IBM Bob to work. We used Bob as an orchestration layer to run a full multi-agent analysis on the code. Bob did the heavy lifting: mapping dependencies, reconstructing the `reserva.dbf` data model, and extracting 46 verified business rules (like hardcoded financial constants). 

Once we had the verified rules, we built the modernized version. We took the "New Interment" workflow and created a highly responsive Next.js 16 dashboard. But we didn't just update the UI—we completely overhauled the data layer. We integrated the workflow directly with IBM Cloudant, transforming fragile, local DBF writes into highly available, scalable NoSQL JSON document transactions. 

CYLRO proves that with IBM Bob doing the analysis and IBM Cloudant handling the data, modernizing legacy systems doesn't have to be a nightmare. 

**Tech Stack:**
- IBM Bob (AI Orchestration & Code Analysis)
- IBM Cloudant (NoSQL Data Persistence)
- Next.js 16 (React Framework)
- Tailwind CSS v4 (Styling)
- TypeScript

**Track/Category (if applicable):**
IBM Bob in Action / Legacy Modernization

**Repository Link:**
[Paste your GitHub/GitLab link here]

**Demo Video Link:**
[Paste your YouTube/Vimeo link here]
