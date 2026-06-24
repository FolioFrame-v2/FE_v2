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
    if (content.includes('react-router-dom')) {
        let newContent = content.replace(/['"]react-router-dom['"]/g, '"@tanstack/react-router"');
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
    }
}
