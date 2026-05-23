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
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// Create stub files (paths are relative from inside node_modules back to src/)
writeFileSync(join(esmDir, "stub-router-entry.js"),
  `export { getRouter } from '../../../../../src/router.tsx';`
);
writeFileSync(join(esmDir, "stub-start-entry.js"),
  `export { startInstance } from '../../../../../src/start.ts';`
);
writeFileSync(join(esmDir, "stub-plugin-adapters.js"),
  `export const hasPluginAdapters = false;\nexport const pluginSerializationAdapters = [];`
);

console.log("✓ Patched @tanstack/start-server-core");