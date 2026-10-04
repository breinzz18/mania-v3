// Shrinks the two fonts to only the characters used in data/ + assets/i18n.js + index.html.
// Run from a folder where "subset-font" and the @fontsource-variable packages are installed:
//   npm i subset-font @fontsource-variable/bricolage-grotesque @fontsource-variable/atkinson-hyperlegible-next
//   then set `site` below to this site folder and run: node subset-fonts.mjs
import subsetFont from "subset-font"; import fs from "fs";
const site = "C:/Users/cioba/Desktop/VS Code/sites/mania-v2/";
const text = ["data/menu.js", "data/site.js", "assets/i18n.js", "index.html"].map(f => fs.readFileSync(site + f, "utf8")).join("")
  + " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿŒœ€–—‘’“”„•…·×★♥←→↑↓";
const chars = [...new Set(text)].filter(c => c.codePointAt(0) >= 32).join("");
console.log("unique characters:", chars.length);
const files = { "bricolage-grotesque-latin-standard-normal.woff2": { opsz: 32 }, "atkinson-hyperlegible-next-latin-wght-normal.woff2": null };
for (const [name, pin] of Object.entries(files)) {
  const src = fs.readFileSync(`node_modules/@fontsource-variable/${name.startsWith("bricolage") ? "bricolage-grotesque" : "atkinson-hyperlegible-next"}/files/${name}`);
  const out = await subsetFont(src, chars, { targetFormat: "woff2", ...(pin ? { variationAxes: pin } : {}) });
  const dst = site + "fonts/" + name.replace("-latin-standard-normal", "-subset").replace("-latin-wght-normal", "-subset");
  fs.writeFileSync(dst, out); console.log(name, Math.round(src.length / 1024) + "KB ->", Math.round(out.length / 1024) + "KB", "→", dst.split("/").pop());
}
