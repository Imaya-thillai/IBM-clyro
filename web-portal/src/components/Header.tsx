import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

export default function Header() {
    return (
        <header className="h-14 border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 flex items-center justify-between px-4">
            <div className="flex items-center space-x-4">
                <Link href="/" className="font-bold text-slate-100 flex items-center space-x-2">
                    <Image src="/favicon.png" alt="CYLRO Logo" width={28} height={28} className="rounded" />
                    <span className="tracking-wide">CYLRO</span>
                </Link>
                <Badge variant="brand" className="hidden sm:inline-flex">IBM Modernization PoC</Badge>
            </div>
            
            <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center relative mr-2">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3" />
                    <input type="text" placeholder="Search documentation..." className="bg-slate-900 border border-slate-800 rounded-md pl-9 pr-4 py-1.5 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64" />
                </div>
                
                <a href="https://github.com/Imaya-thillai/IBM-clyro" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-100 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                
                <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block"></div>
                
                <Button variant="ghost" className="text-sm hidden sm:inline-flex px-3 py-1.5 h-auto">Sign In</Button>
                <Button variant="primary" className="text-sm px-3 py-1.5 h-auto rounded-full">Sign Up</Button>
            </div>
        </header>
    );
}
