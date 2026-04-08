import esbuild from "esbuild";
import { argv } from "process";
import { readFileSync, writeFileSync, existsSync, symlinkSync, rmSync } from "fs";
import { resolve } from "path";

const setup = argv.includes("--setup");
const watch = argv.includes("--watch");

// Load .env if present (copy .env.example to .env and set your local paths)
const env = {};
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.+?)\s*$/);
    if (match) env[match[1]] = match[2];
  }
}

const HA_CONFIG = env.HA_CONFIG ?? process.env.HA_CONFIG ?? "../ha-config/homeassistant";
const HA_WWW = env.HA_WWW ?? process.env.HA_WWW ?? `${HA_CONFIG}/www/polr_tmdb`;
const RESOURCES_FILE = env.HA_RESOURCES_FILE ?? process.env.HA_RESOURCES_FILE ?? `${HA_CONFIG}/.storage/lovelace_resources`;
const INIT_PY = "custom_components/polr_tmdb/__init__.py";

// ---------------------------------------------------------------------------
// Setup: create custom_components symlink in HA config
// ---------------------------------------------------------------------------

function runSetup() {
  if (!env.HA_CONFIG) {
    console.error("Error: HA_CONFIG is not set in .env");
    process.exit(1);
  }
  const target = resolve("custom_components/polr_tmdb");
  const link = resolve(`${HA_CONFIG}/custom_components/polr_tmdb`);

  try { rmSync(link, { recursive: true, force: true }); } catch {}
  symlinkSync(target, link);
  console.log(`Symlink created: ${link} → ${target}`);
}

// ---------------------------------------------------------------------------
// Bump ?v= on card.js (lovelace resource) and panel.js (module_url in __init__.py)
// ---------------------------------------------------------------------------

function bumpVersions() {
  if (RESOURCES_FILE === "/dev/null") return;
  // --- card.js in lovelace_resources ---
  const raw = readFileSync(RESOURCES_FILE, "utf8");
  const data = JSON.parse(raw);
  let next = 1;
  for (const item of data.data.items) {
    if (item.url.includes("polr_tmdb/card.js")) {
      const current = parseInt(item.url.match(/[?&]v=(\d+)/)?.[1] || "1", 10);
      next = current + 1;
      item.url = item.url.replace(/[?&]v=\d+/, "").replace(/\?$/, "") + `?v=${next}`;
    }
  }
  writeFileSync(RESOURCES_FILE, JSON.stringify(data, null, 2));

  // --- panel.js module_url in __init__.py ---
  let init = readFileSync(INIT_PY, "utf8");
  init = init.replace(
    /"module_url": "\/local\/polr_tmdb\/panel\.js(\?v=\d+)?"/,
    `"module_url": "/local/polr_tmdb/panel.js?v=${next}"`
  );
  writeFileSync(INIT_PY, init);

  console.log(`  Resource version → v${next}`);
}

// ---------------------------------------------------------------------------

const sharedConfig = {
  bundle: true,
  minify: !watch,
  sourcemap: watch ? "inline" : false,
  format: "esm",
  target: ["es2020"],
  logLevel: "info",
};

const builds = [
  { entryPoints: ["www/polr_tmdb/src/card.js"],  outfile: `${HA_WWW}/card.js` },
  { entryPoints: ["www/polr_tmdb/src/panel.js"], outfile: `${HA_WWW}/panel.js` },
];

if (setup) {
  runSetup();
} else if (watch) {
  const contexts = await Promise.all(
    builds.map((b) => esbuild.context({ ...sharedConfig, ...b }))
  );
  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log(`Watching — output to ${HA_WWW}/`);
} else {
  await Promise.all(builds.map((b) => esbuild.build({ ...sharedConfig, ...b })));
  bumpVersions();
  console.log(`Build complete — output to ${HA_WWW}/`);
}
