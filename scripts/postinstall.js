const fs = require('fs');
const path = require('path');

// Get the directory of the current script
const scriptDir = __dirname;

// Path to your modified file
const sourcePath = path.resolve(scriptDir, '../scripts/Window.js');
// Path to the file you want to overwrite in node_modules
const destinationPath = path.resolve(scriptDir, '../node_modules/jsdom/lib/jsdom/browser/Window.js');

// Check if the destination directory exists, create it if necessary
const destinationDir = path.dirname(destinationPath);
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

// Copy the modified file to the destination
fs.copyFileSync(sourcePath, destinationPath);

console.log('File overwritten successfully.');
