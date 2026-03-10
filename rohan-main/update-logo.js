const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace EM with E in the logo
    content = content.replace(
        /<span class="logo-em">EM<\/span>/g, 
        '<span class="logo-em">E</span>'
    );
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Logo updated to RE!');
