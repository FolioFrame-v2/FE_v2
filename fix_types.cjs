const fs = require('fs');

function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (let i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            if (!name.includes('node_modules')) getFiles(name, files_);
        } else if (name.endsWith('.tsx') || name.endsWith('.ts')) {
            files_.push(name);
        }
    }
    return files_;
}

const files = getFiles('src');
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/=\s*\(e\)\s*=>/g, '= (e: any) =>');
    content = content.replace(/=\s*async\s*\(e\)\s*=>/g, '= async (e: any) =>');
    content = content.replace(/=\s*\(name,\s*date\)\s*=>/g, '= (name: any, date: any) =>');
    content = content.replace(/=\s*\(index\)\s*=>/g, '= (index: any) =>');
    content = content.replace(/=\s*async\s*\(index\)\s*=>/g, '= async (index: any) =>');
    content = content.replace(/=\s*\(id\)\s*=>/g, '= (id: any) =>');
    content = content.replace(/=\s*\(item\)\s*=>/g, '= (item: any) =>');
    content = content.replace(/\(\(prevData\)\s*=>/g, '((prevData: any) =>');
    content = content.replace(/\(\(prevComments\)\s*=>/g, '((prevComments: any) =>');
    content = content.replace(/\(\(prev\)\s*=>/g, '((prev: any) =>');
    content = content.replace(/=\s*\(\{([^\}]+)\}\)\s*=>/g, '= ({$1}: any) =>'); // For components like const DashBoard = ({ name, nickname }) =>
    content = content.replace(/const\s+([A-Za-z0-9_]+)\s*=\s*\(([^:\)]+)\)\s*=>/g, (match, funcName, args) => {
        // Only if it doesn't already have type annotations (no colon)
        if (args.trim() === '' || args.includes(':') || args.includes('{')) return match;
        const typedArgs = args.split(',').map(arg => arg.trim() + ': any').join(', ');
        return `const ${funcName} = (${typedArgs}) =>`;
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated types in ' + file);
    }
}
