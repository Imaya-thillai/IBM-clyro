import Mermaid from '@/components/Mermaid';
import { Card, CardContent } from '@/components/ui/Card';

export default function ProgramFlow() {
    const chart = `
flowchart TD
    MENU[MENU.PRG / MENU1.PRG] --> OP[Operations]
    MENU --> QRY[Queries]
    MENU --> REP[Reports]
    
    OP --> WF3[WF-003 New Reservation]
    OP --> WF4[WF-004 New Inhumation]
    OP --> WF5[WF-005 Expense Collection]
    
    WF3 --> RESERVA[RESERVA.PRG]
    RESERVA --> RESDBF[(RESERVA.DBF)]
    
    WF5 --> COBRA[COBRA.PRG]
    COBRA --> CTACTE[(CTACTE.DBF)]
    
    classDef file fill:#1e293b,stroke:#334155,color:#f8fafc
    classDef db fill:#0f172a,stroke:#3b82f6,color:#bfdbfe
    class MENU,RESERVA,COBRA file
    class RESDBF,CTACTE db
    `;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-2">Program Flow</h1>
                <p className="text-slate-400">Interactive workflow graph derived from legacy source analysis.</p>
            </div>
            
            <Card>
                <CardContent className="p-8">
                    <Mermaid chart={chart} />
                </CardContent>
            </Card>
        </div>
    );
}
