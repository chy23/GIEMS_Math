const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('@keyframes fadeIn')) {
    css += `
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;
    fs.writeFileSync('src/index.css', css);
}
