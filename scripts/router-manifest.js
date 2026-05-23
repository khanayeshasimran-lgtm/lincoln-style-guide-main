import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkgPath = join(root, "node_modules/@tanstack/start-server-core/package.json");
const esmDir = join(root, "node_modules/@tanstack/start-server-core/dist/esm");

// Patch package.json imports map
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
pkg.imports["#tanstack-router-entry"] = { default: "./dist/esm/stub-router-entry.js" };
pkg.imports["#tanstack-start-entry"] = { default: "./dist/esm/stub-start-entry.js" };
pkg.imports["#tanstack-start-plugin-adapters"] = { default: "./dist/esm/stub-plugin-adapters.js" };
pkg.imports["#tanstack-start-manifest-v"] = { default: "./dist/esm/stub-manifest.js" };
pkg.imports["#tanstack-start-head-scripts-v"] = { default: "./dist/esm/stub-head-scripts.js" };
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// Patch router-manifest.js to replace unresolvable custom protocols
const manifestPath = join(esmDir, "router-manifest.js");
let manifestSrc = readFileSync(manifestPath, "utf8");
manifestSrc = manifestSrc
  .replace(`"tanstack-start-manifest:v"`, `"#tanstack-start-manifest-v"`)
  .replace(`"tanstack-start-injected-head-scripts:v"`, `"#tanstack-start-head-scripts-v"`);
writeFileSync(manifestPath, manifestSrc);

// Stub files
writeFileSync(join(esmDir, "stub-router-entry.js"),
  `export { getRouter } from '../../../../../src/router.tsx';`);
writeFileSync(join(esmDir, "stub-start-entry.js"),
  `export { startInstance } from '../../../../../src/start.ts';`);
writeFileSync(join(esmDir, "stub-plugin-adapters.js"),
  `export const hasPluginAdapters = false;\nexport const pluginSerializationAdapters = [];`);
writeFileSync(join(esmDir, "stub-manifest.js"),
  `export const tsrStartManifest = { routes: {}, routesById: {}, routeFilesById: {}, routeFullPathById: {}, routeIds: [] };`);
writeFileSync(join(esmDir, "stub-head-scripts.js"),
  `export default [];`);

console.log("✓ Patched @tanstack/start-server-core");