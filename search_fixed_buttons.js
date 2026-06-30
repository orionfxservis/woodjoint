const fs = require('fs');

const content = fs.readFileSync('d:/Freelance/Web Designing/WoodJoint/Sample 1/index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
    if (line.includes('fixed bottom') || line.includes('Go to Top') || line.includes('whatsapp') || line.includes('WhatsApp')) {
        console.log(`${idx + 1}: ${line.trim()}`);
    }
});
