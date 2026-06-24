const fs = require('fs');

function getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (let i in files) {
        const name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {
            if (!name.includes('node_modules')) getFiles(name, files_);
        } else if (name.endsWith('.tsx') || name.endsWith('.ts') || name.endsWith('.jsx')) {
            files_.push(name);
        }
    }
    return files_;
}

const files = getFiles('src');
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;

    const usesUseParams = content.includes('useParams');
    const importsUseParams = content.includes('useParams') && /import.*useParams.*from/.test(content);
    
    const usesUseNavigate = content.includes('useNavigate');
    const importsUseNavigate = content.includes('useNavigate') && /import.*useNavigate.*from/.test(content);

    const usesNavigate = content.includes('navigate(') || content.includes('navigate ');

    let importsToAdd = [];
    if (usesUseParams && !importsUseParams) importsToAdd.push('useParams');
    if ((usesUseNavigate || usesNavigate) && !importsUseNavigate) importsToAdd.push('useNavigate');

    if (importsToAdd.length > 0) {
        const newImport = `import { ${importsToAdd.join(', ')} } from '@tanstack/react-router';\n`;
        content = newImport + content;
        changed = true;
    }

    if (usesNavigate && !content.includes('const navigate = useNavigate()')) {
        content = content.replace(/(const\s+[A-Z][a-zA-Z0-9_]*\s*=\s*\([^)]*\)\s*(?:=>)?\s*\{)/, '$1\n  const navigate = useNavigate();\n');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Added router imports to ' + file);
    }
}
