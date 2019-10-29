const path = require("path");
const fs = require("fs");

/**
 * Finds files in a folder.
 * Works the same as `find <startPath> | grep <filter>
 *
 * @param {string} startPath - The folder to start finding from.
 * @param {string} filter - to test found filenames against
 * @param {string[]} [result] - results array to push filenames to.
 * @returns {string[]}
 */
function findSync(startPath, filter, result = []) {
  if (!fs.existsSync(startPath)) {
    console.log(`${startPath} is not a directory.`);
    return result;
  }

  const files = fs.readdirSync(startPath);

  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      findSync(filename, filter, result);
    } else if (filter.test(filename)) {
      result.push(filename);
    }
  }

  return result;
}

module.exports = findSync;
