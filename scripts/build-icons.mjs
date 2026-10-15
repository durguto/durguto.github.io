// Builds the favicon set and the OG image from the O mark (src/lib/omark.mjs).
// PNGs are rendered with headless Chrome; favicon.ico is packed from them with Python/Pillow.
//
//   node scripts/build-icons.mjs
//
// CHROME can point at another Chromium binary.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { markup, STILL, SCALE, SCALE_SMALL } from "../src/lib/omark.mjs";

const root = resolve(new URL("..", import.meta.url).pathname);
const pub = join(root, "public");
const tmp = mkdtempSync(join(tmpdir(), "omark-"));
const chrome =
  process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const BG = "#111111";
const FG = "#eeeeee";

// rounded tile for browser tabs; small sizes use the heavier, sparser rows
const tile = (scale) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
  `<rect width="100" height="100" rx="22" fill="${BG}"/>` +
  `<g transform="translate(7 7) scale(0.86)">${markup(scale, STILL, FG, "f")}</g></svg>`;

// full-bleed square: iOS and Android round the corners themselves
const square = () =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">` +
  `<rect width="100" height="100" fill="${BG}"/>` +
  `<g transform="translate(15 15) scale(0.7)">${markup(SCALE, STILL, FG, "a")}</g></svg>`;

function shoot(name, html, w, h) {
  const page = join(tmp, `${name.replace("/", "_")}.html`);
  writeFileSync(page, html);
  execFileSync(chrome, [
    "--headless=new",
    `--user-data-dir=${join(tmp, "profile")}`,
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--default-background-color=00000000",
    `--window-size=${w},${h}`,
    `--screenshot=${join(pub, name)}`,
    `file://${page}`,
  ], { stdio: "ignore" });
}

const svgPage = (svg, size) =>
  `<!doctype html><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`;

writeFileSync(join(pub, "favicon.svg"), tile(SCALE_SMALL) + "\n");

for (const size of [16, 32, 48]) {
  shoot(size === 48 ? "favicon-48x48.png" : `favicon-${size}x${size}.png`, svgPage(tile(SCALE_SMALL), size), size, size);
}
shoot("apple-touch-icon.png", svgPage(square(), 180), 180, 180);
shoot("android-chrome-192x192.png", svgPage(square(), 192), 192, 192);
shoot("android-chrome-512x512.png", svgPage(square(), 512), 512, 512);

execFileSync("python3", [
  "-c",
  `import sys
from PIL import Image
imgs = [Image.open(p).convert("RGBA") for p in sys.argv[2:]]
imgs[-1].save(sys.argv[1], sizes=[i.size for i in imgs], append_images=imgs[:-1])`,
  join(pub, "favicon.ico"),
  join(pub, "favicon-16x16.png"),
  join(pub, "favicon-32x32.png"),
  join(pub, "favicon-48x48.png"),
]);
execFileSync("rm", [join(pub, "favicon-48x48.png")]);

// OG image: mark over the name, Geist from the site's own font file
const font = `file://${join(pub, "fonts/geist/Geist-Variable.woff2")}`;
const og = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Geist;src:url("${font}") format("woff2");font-weight:100 900}
html,body{margin:0;width:1200px;height:630px;background:${BG};color:${FG};font-family:Geist,sans-serif}
main{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}
svg{width:260px;height:190px;overflow:visible}
h1{margin:44px 0 0;font-size:46px;font-weight:500;letter-spacing:-0.02em}
p{margin:10px 0 0;font-size:26px;color:#8a8a8a;letter-spacing:-0.01em}
</style><main><svg viewBox="9 20 82 60">${markup(SCALE, STILL, FG, "o")}</svg>
<h1>Oğuzhan Durgut</h1><p>durguto</p></main>`;
shoot("images/og.png", og, 1200, 630);

console.log("wrote favicon.svg, favicon.ico, PNG icons and images/og.png");
console.log(readFileSync(join(pub, "favicon.svg"), "utf8").length, "bytes in favicon.svg");
