const fs = require('fs');
const indexContent = fs.readFileSync('index.html', 'utf8');
const headAssetsMatch = indexContent.match(/<meta property="og:site_name"[\s\S]*?<meta name="theme-color" content="#000000">/);
if (headAssetsMatch) {
    console.log("MATCH FOUND:");
    console.log(headAssetsMatch[0]);
} else {
    console.log("NO MATCH");
}
