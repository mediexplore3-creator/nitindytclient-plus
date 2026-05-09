const fs = require('fs');
const path = require('path');

const iconPath = path.join('/assets/icon/icon.png');
const svgPath = path.join('/assets/images/logo.svg');

if (fs.existsSync(iconPath)) {
  const iconBase64 = fs.readFileSync(iconPath).toString('base64');
  const dataUri = `data:image/png;base64,${iconBase64}`;

  let svgContent = `<svg width="250" height="60" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00e5ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <image href="${dataUri}" x="0" y="5" width="50" height="50" />
  
  <text x="60" y="32" font-family="'Oswald', sans-serif" font-weight="700" font-size="28" fill="url(#logoGradient)" style="letter-spacing: 1px;">NITINDYT</text>
  <text x="60" y="52" font-family="'Oswald', sans-serif" font-weight="500" font-size="16" fill="#ffffff" style="letter-spacing: 4px; opacity: 0.9;">CLIENT+</text>
</svg>`;

  fs.writeFileSync(svgPath, svgContent);
  console.log('Successfully embedded icon.png as Base64 in logo.svg');
} else {
  console.error('icon.png not found at', iconPath);
}
