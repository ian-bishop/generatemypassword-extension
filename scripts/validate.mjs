import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("manifest.json", "utf8"));

assert.equal(manifest.manifest_version, 3, "manifest must use Manifest V3");
assert.match(manifest.version, /^\d+\.\d+\.\d+$/, "manifest version must use three numeric parts");
assert.equal(manifest.permissions, undefined, "extension must not request permissions");
assert.equal(manifest.host_permissions, undefined, "extension must not request host permissions");
assert.equal(manifest.action?.default_popup, "popup.html", "popup entry point must remain popup.html");

const requiredFiles = [
  "popup.html",
  "popup.js",
  "style.css",
  "words.json",
  ...Object.values(manifest.icons ?? {}),
];
await Promise.all(requiredFiles.map((file) => access(file)));

const words = JSON.parse(await readFile("words.json", "utf8"));
assert.equal(words.length, 7776, "wordlist must contain 7,776 entries");
assert.equal(new Set(words).size, 7776, "wordlist entries must be unique");
assert.ok(words.every((word) => typeof word === "string" && /^[a-z]+(?:-[a-z]+)*$/.test(word)), "wordlist contains an invalid entry");

const popupHtml = await readFile("popup.html", "utf8");
assert.doesNotMatch(popupHtml, /<script[^>]+src=["']https?:/i, "popup must not load remote scripts");
assert.doesNotMatch(popupHtml, /<link[^>]+href=["']https?:/i, "popup must not load remote styles");

const popupJs = await readFile("popup.js", "utf8");
assert.match(popupJs, /crypto\.getRandomValues/, "generator must use the Web Crypto API");
assert.doesNotMatch(popupJs, /\b(?:XMLHttpRequest|WebSocket|sendBeacon)\b/, "popup must not contain network clients");

console.log(`Validated GenerateMyPassword extension v${manifest.version} with ${words.length.toLocaleString("en-US")} unique words.`);
