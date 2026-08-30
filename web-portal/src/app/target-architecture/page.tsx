import Mermaid from '@/components/Mermaid';
import { Card, CardContent } from '@/components/ui/Card';

export default function TargetArchitecture() {
    const chart = `
flowchart TD
    UI[Avalonia UI / Web Portal] --> APP[Application Layer]
    APP --> DOMAIN[Domain Layer - Business Rules]
    APP --> INFRA[Infrastructure Layer - SQLite/PostgreSQL]
    
    INFRA --> DB[(Database)]
    
    subgraph Domain_Rules [Modernized Rules]
        DR1[Expensa = 10]
        DR2[Ult_Mes = 2]
        DR3[ult_ano = 1999]
    end
    
    DOMAIN -.-> Domain_Rules
    `;

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-2">Target Architecture</h1>
                <p className="text-slate-400">The Clean Architecture design applied to the modernized system.</p>
            </div>
            
            <Card>
                <CardContent className="p-8">
                    <Mermaid chart={chart} />
                </CardContent>
            </Card>
        </div>
    );
}
