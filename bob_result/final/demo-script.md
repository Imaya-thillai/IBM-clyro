# CYLRO - Three-Minute Demo Script

*(Start screen recording on the Web Portal Overview Dashboard)*

**[0:00 - 0:30] Introduction & The Problem**
"Hey everyone, welcome to CYLRO. For this hackathon, we decided to tackle a problem that plagues almost every large enterprise: undocumented, legacy spaghetti code. 

What you're looking at is the dashboard for our subject application—an old Clipper/xBase system used for managing a cemetery. We started with 25 legacy programs and 22 DBF tables. Normally, figuring out how this works would take a team of developers months of painful code archeology. But we took a different approach."

**[0:30 - 1:15] IBM Bob Analysis**
*(Click over to the Legacy Files / IBM Bob Analysis section)*
"Instead of diving into the code ourselves, we unleashed IBM Bob. We used Bob to orchestrate a multi-agent analysis of the entire codebase. 

Bob completely mapped out the dependencies, reconstructed the data models, and flagged major migration risks—like the fact that all the NTX index files were completely missing. Most importantly, Bob managed to extract 46 verified business rules. For instance, right here in `RESERVA.PRG`, Bob found the exact financial constants, like `Expensa=10`, that the system uses to process new interment records."

**[1:15 - 1:45] The Modernized Architecture**
*(Navigate to the Target Architecture or Program Flow diagram)*
"Once we had those verified rules, we built the modernized version. We built a Next.js 16 app that enforces these exact domain rules through its API routes. But we also knew we had to get rid of those fragile DBF files. So, we wired the entire backend directly into IBM Cloudant. Moving to a NoSQL JSON document store gives us the global scalability and reliability that the old system could never provide."

**[1:45 - 2:45] Live Interactive Demo**
*(Go to the Modernized Workflow / "New Interment" screen)*
"Let me show you how it actually works. We're going to simulate the 'New Interment' workflow right now. 

*(Fill out the form on screen and click 'Run Validation')*

When I hit submit, the Next.js API processes the request. It’s validating the inputs against the exact business rules IBM Bob extracted from the legacy code. 

*(Point to the successful validation message)*

As you can see, validation passes 100%. The data is then packaged into a JSON document and persisted live to our IBM Cloudant database. We literally just took a completely undocumented workflow from the 1990s and executed it flawlessly on modern cloud infrastructure."

**[2:45 - 3:00] Conclusion**
"CYLRO proves that modernizing legacy apps doesn't have to be a nightmare. By pairing IBM Bob's incredible analysis capabilities with the scalability of IBM Cloudant, we’ve created a blueprint for safely rescuing mission-critical systems. Thanks for watching!"
