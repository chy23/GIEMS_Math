const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Button active scale
content = content.replace(
    'className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow text-sm"',
    'className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all duration-100 ease-out text-white font-bold py-2 px-4 rounded shadow text-sm"'
);

// 2. Title Typography
content = content.replace(
    'className="text-base sm:text-lg md:text-xl font-bold text-center mb-10 leading-relaxed whitespace-nowrap"',
    'className="text-base sm:text-lg md:text-xl font-bold text-center mb-10 leading-tight tracking-tight whitespace-nowrap flex items-center justify-center"'
);
// Added flex items-center justify-center to properly vertically align the rounded inputs with text.

// 3. Inputs
const inputOld = 'border-b-2 border-gray-400 mx-1 w-12 md:w-16 text-center focus:outline-none focus:border-blue-500';
const inputNew = 'bg-gray-100 rounded-md mx-1 py-1 w-12 md:w-16 text-center focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-shadow';
content = content.split(inputOld).join(inputNew);

const inputOld2 = 'border-b-2 border-gray-400 mx-1 w-16 md:w-24 text-center focus:outline-none focus:border-blue-500';
const inputNew2 = 'bg-gray-100 rounded-md mx-1 py-1 w-16 md:w-24 text-center focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition-shadow';
content = content.split(inputOld2).join(inputNew2);

// 4. SubThemes Animation
content = content.replace(
    'className="flex flex-wrap gap-4 ml-4"',
    'className="flex flex-wrap gap-4 ml-4 transition-all duration-300 ease-out"'
);
content = content.replace(
    'className="flex items-center cursor-pointer text-sm text-gray-700 hover:text-blue-600"',
    'className="flex items-center cursor-pointer text-sm text-gray-700 hover:text-blue-600 animate-[fadeIn_0.2s_ease-out]"'
);

fs.writeFileSync('src/App.tsx', content);

// Add fadeIn animation to tailwind config
let configContent = fs.readFileSync('tailwind.config.js', 'utf8');
if (!configContent.includes('keyframes')) {
    configContent = configContent.replace(
        'extend: {},',
        `extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-5px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },`
    );
    fs.writeFileSync('tailwind.config.js', configContent);
}

