const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
    const fullPath = path.join(__dirname, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content.trim() + '\n', 'utf-8');
};

['ibm-bob-analysis', 'validation', 'artifacts'].forEach(page => {
    write('src/app/' + page + '/page.tsx', `
        export default function Page() {
            return (
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold text-slate-50 capitalize">` + page.replace(/-/g, ' ') + `</h1>
                    <p className="mt-4 text-slate-400">Content for ` + page + ` will go here.</p>
                </div>
            );
        }
    `);
});
