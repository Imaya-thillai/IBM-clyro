'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeftClose, PanelLeftOpen, Plus, LayoutDashboard, FileCode2, Network, BrainCircuit, NotebookTabs, Layers, Workflow, CheckCircle, Boxes } from 'lucide-react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();

    const links = [
        { title: 'Overview', href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
        { title: 'Legacy Files', href: '/legacy-files', icon: <FileCode2 className="w-4 h-4" /> },
        { title: 'Program Flow', href: '/program-flow', icon: <Network className="w-4 h-4" /> },
        { title: 'IBM Bob Analysis', href: '/ibm-bob-analysis', icon: <BrainCircuit className="w-4 h-4" /> },
        { title: 'Business Rules', href: '/business-rules', icon: <NotebookTabs className="w-4 h-4" /> },
        { title: 'Target Architecture', href: '/target-architecture', icon: <Layers className="w-4 h-4" /> },
        { title: 'Shipping & Delivery', href: '/modernized-workflow', icon: <Workflow className="w-4 h-4" /> },
        { title: 'Validation', href: '/validation', icon: <CheckCircle className="w-4 h-4" /> },
        { title: 'Artifacts', href: '/artifacts', icon: <Boxes className="w-4 h-4" /> },
    ];

    return (
        <aside className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} border-r border-slate-800 bg-slate-950/50 backdrop-blur sticky top-14 h-[calc(100vh-3.5rem)] flex flex-col shrink-0`}>
            <div className="p-3 flex items-center justify-between">
                {isOpen && (
                    <Link href="/modernized-workflow" className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-md transition-colors text-sm font-medium mr-2">
                        <Plus className="w-4 h-4" />
                        <span>New Delivery</span>
                    </Link>
                )}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className={`p-2 hover:bg-slate-800 rounded-md text-slate-400 hover:text-slate-100 transition-colors ${!isOpen ? 'mx-auto' : ''}`}
                    title="Toggle Sidebar"
                >
                    {isOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-2 space-y-1 px-3">
                {isOpen && <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3 mt-2">Documentation</div>}
                
                {links.map(link => {
                    const isActive = pathname === link.href;
                    return (
                        <Link 
                            key={link.href} 
                            href={link.href} 
                            className={`flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${isActive ? 'bg-blue-900/40 text-blue-400 font-medium' : 'text-slate-300 hover:bg-slate-800 hover:text-slate-50'} ${!isOpen ? 'justify-center px-0' : ''}`}
                            title={!isOpen ? link.title : undefined}
                        >
                            <span className="shrink-0">{link.icon}</span>
                            {isOpen && <span className="truncate">{link.title}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
