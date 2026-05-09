const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ghtni/OneDrive/Desktop/NITINDYT CLIENT/CLIENT_WEB';
const files = [
    'index.html',
    'privacy.html',
    'terms.html',
    'third-party.html',
    'ads-fraud-claims.html',
    'community-guidelines.html',
    'about.html',
    'contact.html',
    'blog.html',
    'blog-fps-optimization.html',
    'blog-competitive-mods.html',
    'blog-launcher-architecture.html'
];

for (const file of files) {
    const filePath = path.join(dir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // The regex looks for line start, followed by one or more digits, a colon, and an optional space.
    // e.g. "150: " or "150:"
    const cleanedContent = content.split('\n').map(line => {
        // Repeatedly replace line numbers if they were stacked like "150: 150:"
        let prev = "";
        while(prev !== line) {
            prev = line;
            line = line.replace(/^\s*\d+:\s*/, '');
        }
        return line;
    }).join('\n');
    
    if (content !== cleanedContent) {
        fs.writeFileSync(filePath, cleanedContent, 'utf8');
        console.log(`Cleaned line numbers from ${file}`);
    } else {
        console.log(`${file} was already clean.`);
    }
}
