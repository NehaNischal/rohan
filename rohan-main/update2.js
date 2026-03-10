const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make sure we only replace the exact logo link text
    content = content.replace(
        /<a href="([^"]*)" class="logo">\s*REM\s*<\/a>/g, 
        '<a href="$1" class="logo"><span class="logo-r">R</span><span class="logo-hidden">OHAN ELDHOSE</span><span class="logo-em">EM</span></a>'
    );
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Logo HTML updated!');
