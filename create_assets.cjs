const fs = require('fs');
const path = require('path');
const log = fs.readFileSync('C:/Users/te493/.gemini/antigravity-ide/brain/6b6e50af-9852-4972-ab11-fd7307cad38a/.system_generated/tasks/task-415.log', 'utf8');

const regex = /ENOENT: no such file or directory, open '([^']+)'/g;
let match;
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const pngBuffer = Buffer.from(pngBase64, 'base64');
const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"></svg>';
const mp4Buffer = Buffer.from('');

while ((match = regex.exec(log)) !== null) {
  const filePath = match[1];
  console.log('Creating: ' + filePath);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    if (filePath.endsWith('.png')) {
      fs.writeFileSync(filePath, pngBuffer);
    } else if (filePath.endsWith('.svg')) {
      fs.writeFileSync(filePath, svgContent, 'utf8');
    } else if (filePath.endsWith('.mp4')) {
      fs.writeFileSync(filePath, mp4Buffer);
    } else {
      fs.writeFileSync(filePath, '', 'utf8');
    }
  }
}
console.log('Done.');
