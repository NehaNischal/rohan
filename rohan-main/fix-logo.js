const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Remove the bad inline styles
    content = content.replace(
        /<span class="logo-hidden" style="[^"]*">OHAN ELDHOSE<\/span><span class="logo-em" style="display:none;">E<\/span>/g,
        '<span class="logo-hidden">OHAN ELDHOSE</span><span class="logo-em">E</span>'
    );
    
    // Just in case it's slightly different
    content = content.replace(
        /<span class="logo-hidden"[^>]*>OHAN ELDHOSE<\/span><span class="logo-em"[^>]*>E<\/span>/g,
        '<span class="logo-hidden">OHAN ELDHOSE</span><span class="logo-em">E</span>'
    );

    fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed inline styles!');
