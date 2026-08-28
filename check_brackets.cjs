const fs = require('fs');
const content = fs.readFileSync('src/App.tsx', 'utf8');
let counts = { '(': 0, ')': 0, '{': 0, '}': 0, '[': 0, ']': 0, '<': 0, '>': 0 };
for (let char of content) {
    if (counts[char] !== undefined) counts[char]++;
}
console.log(`( : ${counts['(']}, ) : ${counts[')']}`);
console.log(`{ : ${counts['{']}, } : ${counts['}']}`);
console.log(`[ : ${counts['[']}, ] : ${counts[']']}`);
