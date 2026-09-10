// Behaviour + layout audit across the four breakpoints.
// Usage: node scripts/audit.mjs [baseUrl] [outDir]
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = process.argv[3] ?? "audit-out";
mkdirSync(OUT, { recursive: true });

const routes = ["/", "/services", "/services/sizzle-reels"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 991, height: 800, touch: true },
  { name: "mobile-l", width: 767, height: 900, touch: true },
  { name: "mobile", width: 390, height: 844, touch: true },
];

const report = [];
const browser = await chromium.launch();

for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    hasTouch: !!vp.touch,
    isMobile: vp.width < 768,
    deviceScaleFactor: 1,
  });
  for (const route of routes) {
    const page = await ctx.newPage();
    const errors = [];
    const failed = [];
    page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 200)));
    page.on("pageerror", (e) => errors.push("pageerror: " + e.message.slice(0, 200)));
    page.on("response", (r) => {
      if (r.status() >= 400 && !r.url().includes("ytimg")) failed.push(`${r.status()} ${r.url().slice(0, 120)}`);
    });

    await page.goto(BASE + route, { waitUntil: "load", timeout: 90000 });
    await page.waitForFunction(() => !document.querySelector('[role="status"]'), null, { timeout: 15000 }).catch(() => errors.push("loader never left"));
    await page.waitForTimeout(600);
    const tag = `${vp.name}${route.replace(/\//g, "_") || "_home"}`;
    await page.screenshot({ path: `${OUT}/${tag}-top.png` });

    // scroll through the page so lazy media, pins and reveals run
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    const steps = Math.ceil(height / (vp.height * 0.8));
    for (let i = 1; i <= steps; i++) {
      await page.mouse.wheel(0, vp.height * 0.8);
      await page.evaluate((y) => window.scrollTo(0, y), i * vp.height * 0.8);
      await page.waitForTimeout(140);
    }
    await page.waitForTimeout(800);

    const layout = await page.evaluate(() => {
      const vw = window.innerWidth;
      const clipped = (el) => {
        for (let p = el.parentElement; p; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (/(hidden|clip|auto|scroll)/.test(s.overflowX) || /(hidden|clip)/.test(s.overflow)) return true;
        }
        return false;
      };
      const offenders = [];
      document.querySelectorAll("body *").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > vw + 1 || r.left < -1) && !clipped(el) && getComputedStyle(el).position !== "fixed") {
          offenders.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)} [${Math.round(r.left)},${Math.round(r.right)}]`);
        }
      });
      const hiddenText = [...document.querySelectorAll(".split-word")].filter((w) => {
        const t = getComputedStyle(w).transform;
        return t && t !== "none" && /matrix\([^)]*,\s*-?\d+(\.\d+)?,\s*(-?\d{2,})/.test(t) && Math.abs(+t.split(",")[5]?.replace(")", "") || 0) > 5;
      }).length;
      return {
        docOverflow: document.documentElement.scrollWidth - vw,
        offenders: offenders.slice(0, 8),
        h1: document.querySelectorAll("h1").length,
        canvases: document.querySelectorAll("canvas").length,
        videos: document.querySelectorAll("video[src]").length,
        smooth: document.documentElement.dataset.smooth === "on",
        stuckWords: hiddenText,
        locked: document.body.classList.contains("is-locked"),
      };
    });
    await page.screenshot({ path: `${OUT}/${tag}-end.png` });

    let menu = null;
    if (vp.width < 1024) {
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      await page.click('button[aria-label="Open menu"]');
      await page.waitForTimeout(1100);
      menu = await page.evaluate(() => {
        const m = document.querySelector('[aria-label="Mobile"]')?.closest("[id]");
        if (!m) return { found: false };
        const r = m.getBoundingClientRect();
        const hit = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
        return { found: true, w: Math.round(r.width), h: Math.round(r.height), centreInMenu: m.contains(hit), locked: document.body.classList.contains("is-locked") };
      });
      await page.screenshot({ path: `${OUT}/${tag}-menu.png` });
      await page.keyboard.press("Escape");
      await page.waitForTimeout(700);
      menu.unlockedAfterClose = !(await page.evaluate(() => document.body.classList.contains("is-locked")));
    }

    report.push({ vp: vp.name, route, errors: [...new Set(errors)].slice(0, 6), failed: [...new Set(failed)].slice(0, 6), ...layout, menu });
    await page.close();
  }
  await ctx.close();
}

// route transition on desktop: curtain must cover, then reveal, and the new page must start at the top
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForFunction(() => !document.querySelector('[role="status"]'), null, { timeout: 15000 });
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(400);
  // scrolling back up brings the hidden header back
  await page.evaluate(() => window.scrollTo(0, 1300));
  await page.waitForTimeout(900);
  await page.hover('nav[aria-label="Main"] button[aria-expanded]');
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/desktop-mega.png` });
  await page.click('a[href="/services/sizzle-reels"] >> nth=0');
  await page.waitForTimeout(400);
  const midCover = await page.evaluate(() => document.body.classList.contains("is-locked"));
  await page.waitForURL("**/services/sizzle-reels", { timeout: 10000 });
  await page.waitForTimeout(1800);
  const after = await page.evaluate(() => ({ y: Math.round(window.scrollY), locked: document.body.classList.contains("is-locked"), path: location.pathname }));
  report.push({ transition: { midCover, ...after } });
  await ctx.close();
}

await browser.close();
writeFileSync(`${OUT}/report.json`, JSON.stringify(report, null, 1));
for (const r of report) {
  if (r.transition) {
    console.log("TRANSITION", JSON.stringify(r.transition));
    continue;
  }
  const flags = [];
  if (r.docOverflow > 0) flags.push(`overflow+${r.docOverflow}`);
  if (r.offenders.length) flags.push(`offenders:${r.offenders.length}`);
  if (r.errors.length) flags.push(`errors:${r.errors.length}`);
  if (r.failed.length) flags.push(`failed:${r.failed.length}`);
  if (r.h1 !== 1) flags.push(`h1:${r.h1}`);
  if (r.locked) flags.push("LOCKED");
  if (r.menu && (!r.menu.found || !r.menu.centreInMenu || !r.menu.unlockedAfterClose)) flags.push("MENU:" + JSON.stringify(r.menu));
  console.log(`${r.vp.padEnd(8)} ${r.route.padEnd(24)} canvas=${r.canvases} video=${r.videos} lenis=${r.smooth} ${flags.join(" ") || "OK"}`);
  if (r.errors.length) console.log("   errors:", r.errors);
  if (r.failed.length) console.log("   failed:", r.failed);
  if (r.offenders.length) console.log("   offenders:", r.offenders);
}
