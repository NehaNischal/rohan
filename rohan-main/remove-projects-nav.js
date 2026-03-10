const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the PROJECTS link from the nav
    // Matches <li><a href="index.html#projects" class="nav-link">PROJECTS</a></li> or similar
    content = content.replace(/<li><a href="[^"]*#projects" class="nav-link">.*?<\/a><\/li>\s*/gi, '');
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('PROJECTS link removed from all navbars');
