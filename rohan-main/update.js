const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Update Navigation Links
    let newLinks = '';
    if (file === 'index.html') {
        newLinks = '<ul class="nav-links">\n' +
                   '                    <li><a href="#home" class="nav-link">HOME</a></li>\n' +
                   '                    <li><a href="#what-i-do" class="nav-link">WHAT I DO</a></li>\n' +
                   '                    <li><a href="#skill-set" class="nav-link">SKILL SET</a></li>\n' +
                   '                    <li><a href="#projects" class="nav-link">PROJECTS</a></li>\n' +
                   '                    <li><a href="#about" class="nav-link">WHO AM I</a></li>\n' +
                   '                    <li><a href="#contact" class="nav-link\">CONTACT</a></li>\n' +
                   '                </ul>';
    } else {
        newLinks = '<ul class="nav-links">\n' +
                   '                    <li><a href="index.html#home" class="nav-link">HOME</a></li>\n' +
                   '                    <li><a href="index.html#what-i-do" class="nav-link">WHAT I DO</a></li>\n' +
                   '                    <li><a href="index.html#skill-set" class="nav-link">SKILL SET</a></li>\n' +
                   '                    <li><a href="index.html#projects" class="nav-link">PROJECTS</a></li>\n' +
                   '                    <li><a href="index.html#about" class="nav-link">WHO AM I</a></li>\n' +
                   '                    <li><a href="index.html#contact" class="nav-link">CONTACT</a></li>\n' +
                   '                </ul>';
    }
    
    content = content.replace(/<ul class="nav-links">[\s\S]*?<\/ul>/, newLinks);

    // 2. Remove duplicate tracking in documentary.html
    if (file === 'documentary.html') {
        content = content.replace(/<img src="school documentary \(2\)\.jpeg"[\s\S]*?class="hover-zoom">/, '');
        content = content.replace(/<img src="school documentary \(3\)\.jpeg"[\s\S]*?class="hover-zoom">/, '');
        content = content.replace(/<img src="school documentary \(4\)\.jpeg"[\s\S]*?class="hover-zoom">/, '');
        content = content.replace(/<img src="school documentary \(5\)\.jpeg"[\s\S]*?class="hover-zoom">/, '');
        content = content.replace(/<img src="school documentary \(6\)\.jpeg"[\s\S]*?class="hover-zoom">/, '');
    }

    fs.writeFileSync(file, content, 'utf8');
});

console.log('Done modifying HTML files');
