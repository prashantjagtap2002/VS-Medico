/**
 * Works around a Windows-only bug in `next build` static export (Next 16.3 and 16.4):
 * route segment prefetch files are written as nested folders, e.g.
 *   out/contact/__next.contact/__PAGE__.txt
 * because path.relative() returns backslashes on Windows, while the client
 * router requests the flat name:
 *   out/contact/__next.contact.__PAGE__.txt
 * The mismatch 404s every prefetch and turns client-side navigation into full
 * page reloads. This flattens those folders. On Linux/macOS builds there is
 * nothing to fix and the script is a no-op.
 */
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = path.resolve(process.argv[2] || 'out');

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(full) : [full];
  });
}

function findSegmentDirs(dir, found = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith('__next.')) found.push(full);
    else findSegmentDirs(full, found);
  }
  return found;
}

if (!fs.existsSync(OUT_DIR)) {
  console.log(`[fix-export-segments] ${OUT_DIR} not found, skipping.`);
  process.exit(0);
}

let moved = 0;
for (const segmentDir of findSegmentDirs(OUT_DIR)) {
  const parent = path.dirname(segmentDir);
  for (const file of listFiles(segmentDir)) {
    const rel = path.relative(segmentDir, file).split(path.sep).join('.');
    const dest = path.join(parent, `${path.basename(segmentDir)}.${rel}`);
    fs.renameSync(file, dest);
    moved++;
  }
  fs.rmSync(segmentDir, { recursive: true, force: true });
}

console.log(`[fix-export-segments] ${moved ? `flattened ${moved} prefetch file(s)` : 'nothing to fix'}.`);
