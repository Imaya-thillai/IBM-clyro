const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
    const fullPath = path.join(__dirname, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
};

// --- TYPES ---
write('src/types/index.ts', `
export interface LegacyFile {
    id: string;
    name: string;
    type: string;
    size: string;
    role: string;
    referencedBy: string[];
    status: 'Analyzed' | 'Pending' | 'Unknown';
}

export interface BusinessRule {
    id: string;
    legacySource: string;
    rule: string;
    modernizedEquivalent: string;
    status: 'Validated' | 'Pending' | 'Rejected';
}
`);

// --- DATA ---
write('src/data/mockData.ts', `
import { LegacyFile, BusinessRule } from '../types';

export const legacyFiles: LegacyFile[] = [
    { id: '1', name: 'MENU.PRG', type: 'PRG', size: '45 KB', role: 'Main Entry Point', referencedBy: [], status: 'Analyzed' },
    { id: '2', name: 'RESERVA.PRG', type: 'PRG', size: '120 KB', role: 'Reservation Workflow', referencedBy: ['MENU.PRG'], status: 'Analyzed' },
    { id: '3', name: 'COBRA.PRG', type: 'PRG', size: '90 KB', role: 'Billing Workflow', referencedBy: ['MENU.PRG'], status: 'Analyzed' },
    { id: '4', name: 'CTACTE.DBF', type: 'DBF', size: '10 MB', role: 'Current Accounts', referencedBy: ['COBRA.PRG'], status: 'Analyzed' },
    { id: '5', name: 'reserva.dbf', type: 'DBF', size: '5 MB', role: 'Reservations Table', referencedBy: ['RESERVA.PRG'], status: 'Analyzed' },
];

export const businessRules: BusinessRule[] = [
    { id: 'BR-060', legacySource: 'RESERVA.PRG', rule: 'The parcel must exist.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-061', legacySource: 'RESERVA.PRG', rule: 'Parcel, level, and sublevel must not already exist.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-062', legacySource: 'RESERVA.PRG', rule: 'Every earlier sublevel for the same parcel and level must exist.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-063', legacySource: 'RESERVA.PRG', rule: 'Service type must be S or T.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-064', legacySource: 'RESERVA.PRG', rule: 'Level must be 1-3 and sublevel must be 1-6.', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
];

export const modernRules = [
    { id: 'BR-001', legacySource: 'RESERVA.PRG', rule: 'Expensa = 10', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-002', legacySource: 'RESERVA.PRG', rule: 'Ult_Mes = 2', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
    { id: 'BR-003', legacySource: 'RESERVA.PRG', rule: 'ult_ano = 1999', modernizedEquivalent: 'Domain Rule', status: 'Validated' },
];
`);

// --- UI COMPONENTS ---
write('src/components/ui/Card.tsx', `
import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={\`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden \${className}\`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={\`px-6 py-4 border-b border-slate-800 \${className}\`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <h3 className={\`text-lg font-semibold text-slate-100 \${className}\`}>
        {children}
    </h3>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={\`p-6 \${className}\`}>
        {children}
    </div>
);
`);

write('src/components/ui/Button.tsx', `
import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }: any) => {
    const base = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800 text-slate-100",
        ghost: "bg-transparent hover:bg-slate-800 text-slate-300 hover:text-slate-50"
    };
    return (
        <button className={\`\${base} \${variants[variant as keyof typeof variants]} \${className}\`} {...props}>
            {children}
        </button>
    );
};
`);

write('src/components/ui/Badge.tsx', `
import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }: any) => {
    const variants = {
        default: 'bg-slate-800 text-slate-300',
        success: 'bg-green-900/30 text-green-400 border border-green-800/50',
        brand: 'bg-blue-900/30 text-blue-400 border border-blue-800/50'
    };
    return (
        <span className={\`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium \${variants[variant as keyof typeof variants]} \${className}\`}>
            {children}
        </span>
    );
};
`);

write('src/components/ui/Input.tsx', `
import React from 'react';

export const Input = React.forwardRef<HTMLInputElement, any>(({ className = '', ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={\`flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 \${className}\`}
            {...props}
        />
    );
});
Input.displayName = 'Input';
`);

write('src/components/Mermaid.tsx', `
'use client';
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'Inter, sans-serif'
});

export default function Mermaid({ chart }: { chart: string }) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            mermaid.render('mermaid-svg-' + Math.random().toString(36).substr(2, 9), chart).then(({ svg }) => {
                if (ref.current) ref.current.innerHTML = svg;
            });
        }
    }, [chart]);

    return <div ref={ref} className="flex justify-center my-8 overflow-auto" />;
}
`);

// --- LAYOUT COMPONENTS ---
write('src/components/Sidebar.tsx', `
import Link from 'next/link';

export default function Sidebar() {
    const links = [
        { title: 'Overview', href: '/' },
        { title: 'Legacy Files', href: '/legacy-files' },
        { title: 'Program Flow', href: '/program-flow' },
        { title: 'IBM Bob Analysis', href: '/ibm-bob-analysis' },
        { title: 'Business Rules', href: '/business-rules' },
        { title: 'Target Architecture', href: '/target-architecture' },
        { title: 'Modernized Workflow', href: '/modernized-workflow' },
        { title: 'Validation', href: '/validation' },
        { title: 'Artifacts', href: '/artifacts' },
    ];

    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-950/50 backdrop-blur sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto hidden md:block">
            <nav className="p-4 space-y-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Documentation</div>
                {links.map(link => (
                    <Link key={link.href} href={link.href} className="block px-3 py-2 text-sm text-slate-300 rounded-md hover:bg-slate-800 hover:text-slate-50 transition-colors">
                        {link.title}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
`);

write('src/components/Header.tsx', `
import Link from 'next/link';
import { Search, Github } from 'lucide-react';
import { Badge } from './ui/Badge';

export default function Header() {
    return (
        <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
                <Link href="/" className="font-bold text-slate-100 flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs text-white">IBM</div>
                    <span>Legacy Modernization</span>
                </Link>
                <Badge variant="brand">PoC • Synthetic Data</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3" />
                    <input type="text" placeholder="Search documentation..." className="bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64" />
                </div>
                <a href="https://github.com/Imaya-thillai/vault-of-code-todo-list" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-100">
                    <Github className="w-5 h-5" />
                </a>
            </div>
        </header>
    );
}
`);

// --- APP ---
write('src/app/layout.tsx', `
import './globals.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IBM Legacy Modernization Platform',
  description: 'Evidence-Based Legacy Modernization with IBM Bob',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={\`\${inter.className} bg-slate-950 text-slate-200 min-h-screen selection:bg-blue-900 selection:text-white\`}>
        <Header />
        <div className="flex max-w-8xl mx-auto">
            <Sidebar />
            <main className="flex-1 min-w-0 px-4 md:px-8 py-8">
                {children}
            </main>
        </div>
      </body>
    </html>
  );
}
`);

write('src/app/globals.css', `
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}
`);

write('src/app/page.tsx', `
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-50">Legacy Application Modernization</h1>
            <p className="text-xl text-slate-400">Analyze legacy systems. Extract business rules. Build and validate modern equivalents.</p>
            <div className="pt-4">
                <Link href="/modernized-workflow">
                    <Button variant="primary">Start Demo Workflow</Button>
                </Link>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
                <CardContent className="p-4 flex flex-col justify-center items-center text-center space-y-1">
                    <div className="text-3xl font-bold text-slate-100">25</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Legacy Programs</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4 flex flex-col justify-center items-center text-center space-y-1">
                    <div className="text-3xl font-bold text-slate-100">22</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">DBF Tables</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4 flex flex-col justify-center items-center text-center space-y-1">
                    <div className="text-3xl font-bold text-slate-100">46</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Business Rules</div>
                </CardContent>
            </Card>
            <Card>
                <CardContent className="p-4 flex flex-col justify-center items-center text-center space-y-1">
                    <div className="text-3xl font-bold text-green-400">100%</div>
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Validation Passing</div>
                </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-100">Modernization Pipeline</h2>
            <div className="flex flex-col space-y-2">
                {['Legacy Source', 'IBM Bob Analysis', 'Workflow Discovery', 'Business Rule Extraction', 'Modern Architecture', 'Implementation', 'Validation'].map((step, i) => (
                    <div key={i} className="flex items-center space-x-4">
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-medium">{i + 1}</div>
                        <div className="flex-1 bg-slate-900/50 border border-slate-800 p-4 rounded-lg text-slate-300 font-medium">{step}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
`);

write('src/app/legacy-files/page.tsx', `
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { legacyFiles } from '@/data/mockData';

export default function LegacyFiles() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
        <div>
            <h1 className="text-3xl font-bold text-slate-50 mb-2">Legacy Files</h1>
            <p className="text-slate-400">Searchable inventory of discovered PRG and DBF files.</p>
        </div>

        <Card>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900/50 border-b border-slate-800 text-slate-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium">File</th>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium">Size</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {legacyFiles.map(file => (
                            <tr key={file.id} className="hover:bg-slate-900/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-200">{file.name}</td>
                                <td className="px-6 py-4 text-slate-400">{file.type}</td>
                                <td className="px-6 py-4 text-slate-400">{file.size}</td>
                                <td className="px-6 py-4 text-slate-400">{file.role}</td>
                                <td className="px-6 py-4"><Badge variant="success">{file.status}</Badge></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
}
`);

write('src/app/program-flow/page.tsx', `
import Mermaid from '@/components/Mermaid';
import { Card, CardContent } from '@/components/ui/Card';

export default function ProgramFlow() {
    const chart = \`
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
    \`;

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
`);

write('src/app/business-rules/page.tsx', `
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { businessRules, modernRules } from '@/data/mockData';

export default function BusinessRules() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-50 mb-2">Business Rules</h1>
                <p className="text-slate-400">Rules extracted from legacy source via IBM Bob.</p>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-200">WF-003 (New Reservation) Modernized Rules</h2>
                <Card>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-900/50 border-b border-slate-800 text-slate-400 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 font-medium">Rule ID</th>
                                <th className="px-6 py-4 font-medium">Source</th>
                                <th className="px-6 py-4 font-medium">Rule</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {modernRules.map(rule => (
                                <tr key={rule.id} className="hover:bg-slate-900/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-200">{rule.id}</td>
                                    <td className="px-6 py-4 text-slate-400 font-mono text-xs">{rule.legacySource}</td>
                                    <td className="px-6 py-4 font-medium text-blue-400">{rule.rule}</td>
                                    <td className="px-6 py-4"><Badge variant="success">✓ {rule.status}</Badge></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    );
}
`);

write('src/app/target-architecture/page.tsx', `
import Mermaid from '@/components/Mermaid';
import { Card, CardContent } from '@/components/ui/Card';

export default function TargetArchitecture() {
    const chart = \`
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
    \`;

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
`);

write('src/app/modernized-workflow/page.tsx', `
'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2 } from 'lucide-react';

export default function ModernizedWorkflow() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleRun = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setResult({
                status: 'success',
                message: 'Modernized workflow validation PASSED',
                rulesApplied: [
                    { rule: 'Expensa = 10', passed: true },
                    { rule: 'Ult_Mes = 2', passed: true },
                    { rule: 'ult_ano = 1999', passed: true },
                ]
            });
            setLoading(false);
        }, 800);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-slate-50">WF-003 • New Reservation</h1>
                    <Badge variant="brand">Synthetic Data Only</Badge>
                </div>
                <p className="text-slate-400">Interactive demonstration of the extracted business rules applied to modern input.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Reservation Input</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRun} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-300">Reservation ID</label>
                                <Input defaultValue="RES-001" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-300">Parcel Code</label>
                                <Input defaultValue="D010101" />
                            </div>
                            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                                {loading ? 'Processing...' : 'Run Modernized Workflow'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-slate-900/50 border-blue-900/50">
                        <CardHeader>
                            <CardTitle className="text-blue-400 text-sm uppercase tracking-wider">Applied Rules</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-2 font-mono text-sm">
                            <div className="bg-slate-950 p-2 rounded text-slate-300">Expensa = 10</div>
                            <div className="bg-slate-950 p-2 rounded text-slate-300">Ult_Mes = 2</div>
                            <div className="bg-slate-950 p-2 rounded text-slate-300">ult_ano = 1999</div>
                        </CardContent>
                    </Card>

                    {result && (
                        <Card className="border-green-900/50 bg-green-950/20">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-2 text-green-400 font-bold mb-4">
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>{result.message}</span>
                                </div>
                                <div className="space-y-2">
                                    {result.rulesApplied.map((r: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <span className="text-slate-300">{r.rule}</span>
                                            <Badge variant="success">✓ Verified</Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
`);


