const fs = require("fs");

/**
 * Gets time of last modification of a file.
 *
 * @param {string} filepath - filepath to get stats from
 * @returns {Date} - last modified date
 */
function getModifiedTimeMsSync(filepath) {
  const stats = fs.statSync(filepath);
  return stats.mtime;
}

module.exports = getModifiedTimeMsSync;
