const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace 'ABOUT ME' with 'ABOUT'
    content = content.replace(/>ABOUT ME<\/a>/g, '>ABOUT</a>');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Nav links updated to Home, Skills, About, Contact');
