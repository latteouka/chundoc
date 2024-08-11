const fs = require("fs");
const path = require("path");

const pagesDir = path.join(__dirname, "pages");

const skipFiles = new Set(["_app", "_meta", "jpbox.module", "privacy"]);

function generateMetaJson(dir) {
  const items = fs.readdirSync(dir);
  let meta = {};

  const metaFilePath = path.join(dir, "_meta.json");

  // Check if _meta.json already exists
  if (fs.existsSync(metaFilePath)) {
    const existingMeta = fs.readFileSync(metaFilePath, "utf-8");
    try {
      meta = JSON.parse(existingMeta);
    } catch (error) {
      console.error(`Error parsing _meta.json in ${dir}:`, error);
      return;
    }
  }

  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      generateMetaJson(itemPath);
    } else if (stats.isFile()) {
      const ext = path.extname(item);
      const fileName = path.basename(item, ext);

      if (!meta[fileName] && !skipFiles.has(fileName)) {
        meta[fileName] = fileName;
        console.log(`Added ${fileName} to _meta.json in ${dir}`);
      }
    }
  });

  fs.writeFileSync(metaFilePath, JSON.stringify(meta, null, 3));
  console.log(`Updated ${metaFilePath}`);
}

generateMetaJson(pagesDir);
