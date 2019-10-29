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

mdxFiles.forEach(file => {
  const mtimeMs = getModifiedTimeMsSync(file);
  const shouldTakeScreenshot = String(timestampsData[file]) !== String(mtimeMs);

  if (shouldTakeScreenshot) {
    timestampsDiff[file] = String(mtimeMs);
    mdxFilesToPrint.push(file);
  }
});

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 720, height: 1000 });

  for (let index = 0; index < mdxFilesToPrint.length; index++) {
    const file = mdxFilesToPrint[index];
    const fileContents = fs.readFileSync(file, "utf8");
    const pagePath = getStoryPagePath(fileContents);

    if (!pagePath) return;

    await page.goto(pagePath);
    const iframePath = await page.evaluate(getPreviewFrameSrc);
    await page.goto(iframePath);
    await page.evaluate(revealStorySrcCode);
    await page.screenshot({
      path: file.replace(/\.mdx$/, ".png"),
      fullPage: true
    });
  }

  await browser.close();
}

takeScreenshots()
  .then(() => {
    /* TODO: write to timestamp file */
  })
  .catch(err => console.log("ERROR:::", err));

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
