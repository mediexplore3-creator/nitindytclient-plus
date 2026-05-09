const fs = require('fs');
const path = require('path');

const pagesDir = './pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Regex to match the duplicated block
    // Specifically from the first <meta property="og:site_name" down to theme-color
    // We look for consecutive occurrences
    const headPattern = /(?:<meta property="og:site_name"[\s\S]*?<meta name="theme-color" content="#000000">\s*){2,}/g;
    
    if (headPattern.test(content)) {
        console.log(`Cleaning ${file}...`);
        // Replace with only one instance
        // We need to extract one instance first
        const match = content.match(/<meta property="og:site_name"[\s\S]*?<meta name="theme-color" content="#000000">/);
        if (match) {
            content = content.replace(headPattern, '\n    ' + match[0] + '\n');
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
    
    // Also clean up duplicate title/preconnect if they were left over
    content = content.replace(/(<title>.*?<\/title>\s*)<title>.*?<\/title>/g, '$1');
    content = content.replace(/(<link rel="preconnect" href="https:\/\/fonts\.bunny\.net">\s*)<link rel="preconnect" href="https:\/\/fonts\.bunny\.net">/g, '$1');
    
    fs.writeFileSync(filePath, content, 'utf8');
}
