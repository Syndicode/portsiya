const fs = require("fs");

function isDirectorySync(dirpath) {
  try {
    return fs.statSync(dirpath).isDirectory();
  } catch {
    return false;
  }
}

module.exports = isDirectorySync;
