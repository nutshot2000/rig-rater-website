const fs = require('fs');
const path = require('path');

const htmlDir = __dirname;
const imagesDir = path.join(htmlDir, 'images');
const optimizedDir = path.join(imagesDir, 'optimized');

// Supported image extensions
const exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Regex to match image references (src, content, url(), etc.) not in images/optimized/
const imgRegex = /(["'\(=]\s*)(images\/(?!optimized\/)([^"'\) >]+\.(?:jpg|jpeg|png|webp|gif)))/gi;

// Get all HTML files in the directory
function getHtmlFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.html'));
}

// Check if optimized version exists
function hasOptimizedVersion(imgPath) {
  const base = path.basename(imgPath);
  // Try .jpg first, then original extension
  const candidates = [
    path.join(optimizedDir, base.replace(/\.[^.]+$/, '.jpg')),
    path.join(optimizedDir, base)
  ];
  return candidates.find(fs.existsSync);
}

function updateHtmlFile(file) {
  const filePath = path.join(htmlDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  let missing = [];
  let updated = [];

  html = html.replace(imgRegex, (match, prefix, imgPath) => {
    const base = path.basename(imgPath);
    const optimizedPath = `images/optimized/${base.replace(/\.[^.]+$/, '.jpg')}`;
    const optimizedFullPath = path.join(optimizedDir, base.replace(/\.[^.]+$/, '.jpg'));
    if (fs.existsSync(optimizedFullPath)) {
      changed = true;
      updated.push(imgPath + ' -> ' + optimizedPath);
      return prefix + optimizedPath;
    } else {
      // Try original extension
      const altOptimizedPath = `images/optimized/${base}`;
      const altOptimizedFullPath = path.join(optimizedDir, base);
      if (fs.existsSync(altOptimizedFullPath)) {
        changed = true;
        updated.push(imgPath + ' -> ' + altOptimizedPath);
        return prefix + altOptimizedPath;
      } else {
        missing.push(imgPath);
        return match;
      }
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
  }
  return { file, changed, updated, missing };
}

function main() {
  const htmlFiles = getHtmlFiles(htmlDir);
  let totalChanged = 0;
  let totalMissing = [];
  let totalUpdated = [];

  for (const file of htmlFiles) {
    const { changed, updated, missing } = updateHtmlFile(file);
    if (changed) {
      console.log(`Updated: ${file}`);
      totalChanged++;
    }
    if (updated.length) {
      updated.forEach(u => console.log('  ' + u));
      totalUpdated.push(...updated);
    }
    if (missing.length) {
      totalMissing.push(...missing.map(m => `${file}: ${m}`));
    }
  }

  console.log(`\nSummary:`);
  console.log(`  Files updated: ${totalChanged}`);
  if (totalUpdated.length) {
    console.log(`  Image references updated: ${totalUpdated.length}`);
  }
  if (totalMissing.length) {
    console.log(`  Image references NOT updated (no optimized version):`);
    totalMissing.forEach(m => console.log('    ' + m));
  } else {
    console.log('  All image references are using optimized versions or have optimized files.');
  }
}

main(); 