```mermaid
flowchart LR
    LEGACY["Legacy PRG / DBF"] 
        --> BOB["IBM Bob Analysis"]

    BOB --> SOURCE["Source Inventory"]
    BOB --> RULES["Business Rules"]
    BOB --> DATA["Data Model"]
    BOB --> FLOW["Workflow Reconstruction"]
    BOB --> RISK["Migration Risks"]

    SOURCE --> ARCH["Modernization Architecture"]
    RULES --> ARCH
    DATA --> ARCH
    FLOW --> ARCH
    RISK --> ARCH

    ARCH --> POC["Modernized PoC"]

    POC --> UI["Next.js UI"]
    POC --> API["API"]
    POC --> CLOUDANT["IBM Cloudant"]

    POC --> VALIDATE["Independent Validation"]

    VALIDATE --> RESULT["Validation Report"]
