const fs = require('fs');
const path = require('path');

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
    if (content.includes('@/components/commmon/')) {
        let newContent = content.replace(/@\/components\/commmon\//g, '@/components/');
        // Replace templateInfo.jsx with mock data if it imports it
        if (newContent.includes('dummydata/templateInfo.jsx')) {
            newContent = newContent.replace(/import\s*\{\s*templateInfo\s*\}\s*from\s*"@\/components\/dummydata\/templateInfo\.jsx";/g, 'const templateInfo = [ { id: 1, name: "Mock Template" } ];');
            // If the import path was left as @/components/commmon/dummydata/templateInfo.jsx and replaced to @/components/dummydata/templateInfo.jsx
        }
        if (newContent.includes('dummydata/userInfo.jsx')) {
            newContent = newContent.replace(/import\s*\{\s*userInfo\s*\}\s*from\s*"@\/components\/dummydata\/userInfo\.jsx";/g, 'const userInfo = [];');
        }
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
    }
}
