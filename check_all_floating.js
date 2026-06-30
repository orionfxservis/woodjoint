const fs = require('fs');
const path = require('path');

const files = [
    'd:/Freelance/Web Designing/WoodJoint/Sample 1/index.html',
    'd:/Freelance/Web Designing/WoodJoint/Sample 1/pages/amc.html',
    'd:/Freelance/Web Designing/WoodJoint/Sample 1/pages/privacy-policy.html',
    'd:/Freelance/Web Designing/WoodJoint/Sample 1/pages/terms-of-service.html'
];

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('goToTopBtn')) {
        console.log(`Found goToTopBtn in: ${file}`);
    } else {
        console.log(`NOT found in: ${file}`);
    }
});
