const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'images');
const outputDir = path.join(inputDir, 'optimized');
const maxWidth = 900; // Change as needed

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

fs.readdirSync(inputDir).forEach(file => {
  const ext = path.extname(file).toLowerCase();
  if (['.jpg', '.jpeg', '.png'].includes(ext)) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(png|jpeg)$/, '.jpg'));

    // Only process if not already optimized
    if (!fs.existsSync(outputPath)) {
      sharp(inputPath)
        .resize({ width: maxWidth })
        .toFormat('jpeg', { quality: 80 })
        .toFile(outputPath)
        .then(() => console.log(`Optimized: ${file}`))
        .catch(err => console.error(`Error processing ${file}:`, err));
    }
  }
}); 