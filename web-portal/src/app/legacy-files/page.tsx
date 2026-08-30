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
