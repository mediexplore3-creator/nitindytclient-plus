const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const pagesDir = path.join(rootDir, 'pages');
const indexFile = path.join(rootDir, 'index.html');
const indexContent = fs.readFileSync(indexFile, 'utf8');

function adjustPaths(html, isSubPage = false) {
    if (!isSubPage) return html;
    let adjusted = html.replace(/href="\.\//g, 'href="../');
    adjusted = adjusted.replace(/src="\.\//g, 'src="../');
    adjusted = adjusted.replace(/content="\.\//g, 'content="../');
    adjusted = adjusted.replace(/href="\.\.\/pages\//g, 'href="./');
    return adjusted;
}

// Extraction
const headMatch = indexContent.match(/<head>([\s\S]*?)<\/head>/);
const rootHeadHtml = headMatch ? headMatch[1] : "";

const navMatch = indexContent.match(/<nav class="nav">[\s\S]*?<\/nav>\s*<div class="nav__mobile-background[\s\S]*?<\/div>/);
const rootNavHtml = navMatch ? navMatch[0] : "";

const bannerMatch = indexContent.match(/<a href="\.\/pages\/ads-fraud-claims\.html" class="statement-banner">[\s\S]*?<\/a>/);
const rootBannerHtml = bannerMatch ? bannerMatch[0] : "";

const footerMatch = indexContent.match(/<footer class="padd-l center-mobile">[\s\S]*?<\/footer>/);
const rootFooterHtml = footerMatch ? footerMatch[0] : "";

const scriptsMatch = indexContent.match(/<!-- Scripts Start -->([\s\S]*?)<!-- Scripts End -->/);
const rootScriptsHtml = scriptsMatch ? scriptsMatch[0] : "";

const filesToUpdate = [
    'privacy.html', 'terms.html', 'third-party.html', 'ads-fraud-claims.html',
    'community-guidelines.html', 'about.html', 'contact.html', 'blog.html',
    'blog-fps-optimization.html', 'blog-competitive-mods.html', 'blog-launcher-architecture.html'
];

const pageHeadHtml = adjustPaths(rootHeadHtml, true);
const pageNavHtml = adjustPaths(rootNavHtml, true);
const pageBannerHtml = adjustPaths(rootBannerHtml, true);
const pageFooterHtml = adjustPaths(rootFooterHtml, true);
const pageScriptsHtml = adjustPaths(rootScriptsHtml, true);

for (const file of filesToUpdate) {
    const filePath = path.join(pagesDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // 1. Head Replacement
    content = content.replace(/<head>[\s\S]*?<\/head>/, `<head>${pageHeadHtml}</head>`);

    // 2. Nav Replacement
    const existingNavRegex = /<nav class="nav">[\s\S]*?<\/nav>(?:\s*<div class="nav__mobile-background[\s\S]*?<\/div>)?/g;
    content = content.replace(existingNavRegex, pageNavHtml);

    // 3. Banner Replacement (if exists in page)
    const existingBannerRegex = /<a href="[^"]*ads-fraud-claims\.html" class="statement-banner">[\s\S]*?<\/a>/g;
    if (pageBannerHtml) {
        content = content.replace(existingBannerRegex, pageBannerHtml);
    }

    // 4. Footer Replacement
    const existingFooterRegex = /<footer class="padd-l center-mobile">[\s\S]*?<\/footer>/g;
    content = content.replace(existingFooterRegex, pageFooterHtml);

    // 5. Scripts Replacement
    const existingScriptsRegex = /(?:<!-- Scripts Start -->[\s\S]*?<!-- Scripts End -->|<script src="(?:\.\/|\.\.\/)js\/main\.min\.js">[\s\S]*?)/g;
    content = content.replace(existingScriptsRegex, pageScriptsHtml);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully updated pages/${file}`);
    }
}
