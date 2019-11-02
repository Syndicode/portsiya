const path = require("path");
const fs = require("fs");
const glob = require("glob");

const files = glob.sync("./src/**/*.js");

files.forEach(file => {
  // fs.createWriteStream(file).pipe(".ts")
  // const newFile = file.replace(/\.js$/, ".ts");
  // const rs = fs.createReadStream(file);
  // const ws = fs.createWriteStream(newFile);

  // rs.pipe(ws)/

  fs.unlinkSync(file);
});

// console.log("files", files);
