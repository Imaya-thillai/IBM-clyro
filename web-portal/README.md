# IBM Legacy Modernization Platform

A production-quality dashboard demonstrating the legacy modernization process of Clipper/xBase applications using IBM Bob.

## Overview
This platform visualizes:
- Legacy Source analysis (PRG/DBF)
- Workflows extracted by IBM Bob
- Modernized Domain Rules mapped to Avalonia/C# logic
- Interactive simulation of a modernized workflow execution

## Tech Stack
- Next.js 16 (App Router)
- React
- Tailwind CSS (v4)
- TypeScript
- Mermaid.js (Architecture and Flow diagrams)
- Lucide React (Icons)

## Setup and Running

1. **Prerequisites**: Ensure you have Node.js 18+ installed.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **IBM Cloudant Integration**: The application is pre-configured with IBM Cloudant credentials. When executing the "New Interment" workflow, synthetic data will be persisted live to the IBM Cloud. 
4. **Run the development server**:
   ```bash
   npm run dev
   ```
5. **View**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `src/app/`: The Next.js pages routing (Overview, Workflow, Rules, Architecture)
- `src/components/`: Reusable UI components (shadcn-inspired styling)
- `src/data/`: Mock JSON data and TypeScript interfaces for the PoC
- `src/types/`: Centralized interfaces for Legacy files and Rules

## Hackathon Demo Flow
1. Start at the **Overview** dashboard to show the massive scope (25 PRGs, 22 DBFs).
2. Navigate to **Legacy Files** to show the source material (e.g. `RESERVA.PRG`).
3. View the **Program Flow** mermaid diagram visualizing legacy calls.
4. Go to **Business Rules** to see how `Expensa=10` was extracted.
5. Click **Modernized Workflow** and run the interactive simulated C# rule execution to demonstrate the 100% successful validation!
