import esbuild from "esbuild";
import { argv } from "process";
import { readFileSync, existsSync, symlinkSync, rmSync, readdirSync, renameSync } from "fs";
import { resolve, extname, basename } from "path";

const setup = argv.includes("--setup");
const watch = argv.includes("--watch");
const screenshots = argv.includes("--screenshots");

// Load .env if present (copy .env.example to .env and set your local paths)
const env = {};
if (existsSync(".env")) {
  for (const line of readFileSync(".env", "utf8").split("\n")) {
    const match = line.match(/^\s*([^#=\s]+)\s*=\s*(.+?)\s*$/);
    if (match) env[match[1]] = match[2];
  }
}

const HA_CONFIG = env.HA_CONFIG ?? process.env.HA_CONFIG ?? "../ha-config/homeassistant";
// The integration serves the card itself (and cache-busts it by hash), so the
// build goes into the component, not into HA's www/ folder.
const CARD_OUT = "custom_components/polr_tmdb/frontend/card.js";

// ---------------------------------------------------------------------------
// Screenshots: compress images in screenshots/ to jpg, max 1200px wide
// ---------------------------------------------------------------------------

async function compressScreenshots() {
  const { default: sharp } = await import("sharp");
  const files = readdirSync("screenshots").filter(f => /\.(png|jpg|jpeg)$/i.test(f));
  for (const file of files) {
    const input = `screenshots/${file}`;
    const output = `screenshots/${basename(file, extname(file))}.jpg`;
    await sharp(input).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(output + ".tmp");
    rmSync(input, { force: true });
    renameSync(`${output}.tmp`, output);
    const size = readFileSync(output).length;
    console.log(`  ${file} → ${basename(output)} (${(size / 1024).toFixed(0)}KB)`);
  }
}

// ---------------------------------------------------------------------------
// Setup: create custom_components symlink in HA config
// ---------------------------------------------------------------------------

function runSetup() {
  if (!env.HA_CONFIG) {
    console.error("Error: HA_CONFIG is not set in .env");
    process.exit(1);
  }
  // HA_COMPONENT_LINK_TARGET lets you override the symlink target
  // when HA runs in Docker with the project mounted at a different path inside the
  // container (e.g. /config/tmdb_dev) vs the host path.
  const componentTarget = env.HA_COMPONENT_LINK_TARGET ?? resolve("custom_components/polr_tmdb");
  const componentLink = resolve(`${HA_CONFIG}/custom_components/polr_tmdb`);
  try { rmSync(componentLink, { recursive: true, force: true }); } catch {}
  symlinkSync(componentTarget, componentLink);
  console.log(`Symlink created: ${componentLink} → ${componentTarget}`);

  // The card is built into the component (frontend/card.js), so the symlink
  // is all HA needs: `npm run build` (or watch), then reload the browser.
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
  { entryPoints: ["www/polr_tmdb/src/card.js"], outfile: CARD_OUT },
  { entryPoints: ["www/polr_tmdb/src/card.js"], outfile: "card.js" }, // root copy for HACS plugin installs
];

if (setup) {
  runSetup();
} else if (screenshots) {
  await compressScreenshots();
} else if (watch) {
  const contexts = await Promise.all(
    builds.map((b) => esbuild.context({ ...sharedConfig, ...b }))
  );
  await Promise.all(contexts.map((ctx) => ctx.watch()));
  console.log(`Watching — card to ${CARD_OUT}`);
} else {
  await Promise.all(builds.map((b) => esbuild.build({ ...sharedConfig, ...b })));
  console.log(`Build complete — card to ${CARD_OUT}`);
}
