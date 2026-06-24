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

const routeMap = {
    '/Mypage': '/my',
    '/MyPage': '/my',
    '../login': '/login',
    '/signup/recruiter/email': '/signuprecruiteremail',
    '/signUpDeveloperPage': '/signupdeveloper',
    '/SignUpDeveloperEmailPage': '/signupdeveloperemail',
    '/SignUpRecruiterPage': '/signuprecruiter',
    '/SignUpRecruiterEmailPage': '/signuprecruiteremail'
};

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Fix remaining navigate strings
    content = content.replace(/navigate\(\{\s*to:\s*(["'`])(.*?)\1\s*\}\)/g, (match, quote, path) => {
        let newPath = path;
        for (const [key, value] of Object.entries(routeMap)) {
            if (newPath === key || newPath.startsWith(key + '/')) {
                newPath = newPath.replace(key, value);
                break;
            }
        }
        return `navigate({ to: \`${newPath}\` })`;
    });

    // Fix never[] inference in useState([])
    content = content.replace(/useState\(\[\]\)/g, 'useState<any[]>([])');
    
    // In PortfolioDetailPage.tsx etc: images: [] -> images: [] as any[]
    content = content.replace(/images:\s*\[\]\s*,/g, 'images: [] as any[],');
    
    // In PortfolioDetailPage.tsx etc: contacts: ["mock-contact"] -> wait, that's inferred string[]. No issue.
    // In MergerCreatePortfolioPage.tsx: selectedProjects.includes(project.projectId) when selectedProjects is never[]
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed file ' + file);
    }
}
