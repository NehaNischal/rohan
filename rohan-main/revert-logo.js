const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Revert logo HTML structure back to ROHAN ELDHOSE
    content = content.replace(
        /<span class="logo-hidden"[^>]*>OHAN ELDHOSE MANJUMMEKUDIYIL<\/span>/g, 
        '<span class="logo-hidden" style="display:inline-block; max-width:0; opacity:0; overflow:hidden; transition: max-width 0.5s ease, opacity 0.4s ease; vertical-align: bottom;">OHAN ELDHOSE</span>'
    );
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Logo reverted to ROHAN ELDHOSE!');
