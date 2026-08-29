import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const outputDir = "D:/me/其他/性格/competitions/hackathon/Prometheus_September_AI_2026/ConceptBridge/recordings";
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe"
});
const context = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  recordVideo: { dir: outputDir, size: { width: 1280, height: 900 } }
});
const page = await context.newPage();

await page.goto("http://127.0.0.1:8771/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.getByRole("button", { name: "Build a boundary test" }).click();
await page.waitForTimeout(1800);
await page.getByRole("textbox", { name: "Your answer" }).fill(
  "No. Without usable light, the plant cannot keep converting the ingredients into stored energy."
);
await page.getByRole("button", { name: "Compare my prediction" }).click();
await page.waitForTimeout(1200);
await page.getByRole("textbox", { name: "Revised explanation" }).fill(
  "Plants use usable light energy to transform water and carbon dioxide into stored chemical energy; having the ingredients alone is not enough."
);
await page.getByRole("button", { name: "Save reflection" }).click();
await page.waitForTimeout(2200);

const video = page.video();
await context.close();
await browser.close();
console.log(video ? await video.path() : "no video");
