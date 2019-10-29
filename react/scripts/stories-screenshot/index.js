const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const findSync = require("../../../node/utils/findSync");
const getModifiedTimeMsSync = require("../../../node/utils/getModifiedTimeMsSync");

const timestampsPath = path.resolve(__dirname, "./screenshots.timestamps.json");
const timestampsData = JSON.parse(fs.readFileSync(timestampsPath, "utf8"));
const timestampsDiff = {};
const mdxFiles = findSync("./src", /\.mdx$/);
const mdxFilesToPrint = [];

function getPreviewFrameSrc() {
  const el = document.getElementById("storybook-preview-iframe");
  return el.src;
}

function revealStorySrcCode() {
  [...document.querySelectorAll("button")]
    .filter(el => el.textContent.includes("Show code"))
    .forEach(el => el.click());
}

function getStoryPagePath(storyFile) {
  const fileLines = storyFile.split("\n");
  const findPagePathLine = line => line.indexOf("$pagePath") > -1;
  const pagePathLine = fileLines.find(findPagePathLine) || "";
  return pagePathLine
    .trim()
    .replace(/^\$pagePath\=/, "")
    .replace(/\"/g, "");
}

function writeToTimestampFile() {
  if (!Object.keys(timestampsDiff).length) {
    console.log("Already up to date :)");
    return;
  }

  const result = Object.assign(timestampsData, timestampsDiff);
  const resultString = JSON.stringify(result, null, 2);
  const handleError = err => {
    if (err) throw err;
  };

  fs.writeFile(timestampsPath, resultString, handleError);
}

mdxFiles.forEach(file => {
  const mtimeMs = getModifiedTimeMsSync(file);

  if (String(timestampsData[file]) !== String(mtimeMs)) {
    timestampsDiff[file] = String(mtimeMs);
    mdxFilesToPrint.push(file);
  }
});

async function gotoStoryPath

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 882, height: 1000 });

  for (let index = 0; index < mdxFilesToPrint.length; index++) {
    const file = mdxFilesToPrint[index];
    const fileContents = fs.readFileSync(file, "utf8");
    const pagePath = getStoryPagePath(fileContents);

    if (!pagePath) continue;


    await page.evaluate(revealStorySrcCode);
    await page.screenshot({
      path: file.replace(/\.mdx$/, ".png"),
      fullPage: true
    });
  }

  await browser.close();
}

takeScreenshots()
  .then(writeToTimestampFile)
  .catch(err => console.log("ERROR:::", err));
