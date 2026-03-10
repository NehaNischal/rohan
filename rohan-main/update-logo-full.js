const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Update the logo HTML structure to say Rohan Eldhose Manjummekudiyil
    content = content.replace(
        /<a href="[^"]*" class="logo"><span class="logo-r">R<\/span><span class="logo-hidden"[^>]*>OHAN ELDHOSE<\/span><span class="logo-em"[^>]*>E<\/span><\/a>/g, 
        '<a href="index.html" class="logo"><span class="logo-r">R</span><span class="logo-hidden" style="display:inline-block; max-width:0; opacity:0; overflow:hidden; transition: max-width 0.5s ease, opacity 0.4s ease; vertical-align: bottom;">OHAN ELDHOSE MANJUMMEKUDIYIL</span><span class="logo-em" style="display:none;">E</span></a>'
    );
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Logo updated to full name!');
