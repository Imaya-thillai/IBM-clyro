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
