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
