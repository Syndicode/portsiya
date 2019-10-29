const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer");
const findSync = require("../../../node/utils/findSync");
const getModifiedTimeMsSync = require("../../../node/utils/getModifiedTimeMsSync");

const timestampsPath = path.resolve(__dirname, "./screenshots.timestamps.json");
const timestampsData = JSON.parse(fs.readFileSync(timestampsPath, "utf8"));
const mdxFiles = findSync("./src", /\.mdx$/);

populateTimestampsDiff()
  .then(takeScreenshots)
  .then(writeToTimestampFile)
  .catch(err => console.log("ERROR:::", err));

async function populateTimestampsDiff() {
  return mdxFiles.reduce((diff, file) => {
    const mtimeMs = getModifiedTimeMsSync(file);
    if (timestampsData[file] !== mtimeMs) diff[file] = mtimeMs;
    return diff;
  }, {});
}

async function takeScreenshots(diff) {
  const mdxFilesToProcess = Object.keys(diff);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 882, height: 1000 });

  for (let index = 0; index < mdxFilesToProcess.length; index++) {
    const file = mdxFilesToProcess[index];
    const fileContents = fs.readFileSync(file, "utf8");
    const pagePath = getStoryPagePath(fileContents);

    if (!pagePath) continue;

    await gotoStoryDocsPath(page, pagePath);
    await page.evaluate(revealStorySrcCode);
    await page.screenshot({
      path: file.replace(/\.mdx$/, ".png"),
      fullPage: true
    });
  }

  await browser.close();
  return diff;
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

async function gotoStoryDocsPath(page, path) {
  await page.goto(path);
  const iframeID = "storybook-preview-iframe";
  const getIframeSrc = id => document.getElementById(id).src;
  const iframePath = await page.evaluate(getIframeSrc, iframeID);
  await page.goto(iframePath);
}

function revealStorySrcCode() {
  Array.from(document.querySelectorAll("button"))
    .filter(el => el.textContent.includes("Show code"))
    .forEach(el => el.click());
}

function writeToTimestampFile(diff) {
  if (!Object.keys(diff).length) {
    console.log("Already up to date :)");
    return;
  }

  const result = Object.assign(timestampsData, diff);
  const resultString = JSON.stringify(result, null, 2);
  fs.writeFile(timestampsPath, resultString, err => {
    if (err) throw err;
  });
}
