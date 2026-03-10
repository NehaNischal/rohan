const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Create new nav links for Home, Skills, About Me, Contact
    let newLinks = '';
    if (file === 'index.html') {
        newLinks = '<ul class="nav-links">\n' +
                   '                    <li><a href="#home" class="nav-link">HOME</a></li>\n' +
                   '                    <li><a href="#skill-set" class="nav-link">SKILLS</a></li>\n' +
                   '                    <li><a href="#about" class="nav-link">ABOUT ME</a></li>\n' +
                   '                    <li><a href="#contact" class="nav-link">CONTACT</a></li>\n' +
                   '                </ul>';
    } else {
        newLinks = '<ul class="nav-links">\n' +
                   '                    <li><a href="index.html#home" class="nav-link">HOME</a></li>\n' +
                   '                    <li><a href="index.html#skill-set" class="nav-link">SKILLS</a></li>\n' +
                   '                    <li><a href="index.html#about" class="nav-link">ABOUT ME</a></li>\n' +
                   '                    <li><a href="index.html#contact" class="nav-link">CONTACT</a></li>\n' +
                   '                </ul>';
    }
    
    // Replace the existing ul block
    content = content.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, newLinks);
    
    fs.writeFileSync(file, content, 'utf8');
});
console.log('Nav links updated to Home, Skills, About Me, Contact');
