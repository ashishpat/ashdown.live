#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = path.join(__dirname, '..', 'static', 'gallery');
const MANIFEST_PATH = path.join(GALLERY_DIR, 'manifest.json');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm', '.m4v']);
const PINNED_FIRST = 'kgarira1';

const files = fs.readdirSync(GALLERY_DIR).filter((name) => {
  const ext = path.extname(name).toLowerCase();
  return IMAGE_EXT.has(ext) || VIDEO_EXT.has(ext);
});

files.sort((a, b) => {
  const aPinned = path.parse(a).name.toLowerCase() === PINNED_FIRST;
  const bPinned = path.parse(b).name.toLowerCase() === PINNED_FIRST;
  if (aPinned && !bPinned) return -1;
  if (bPinned && !aPinned) return 1;
  return a.localeCompare(b);
});

const manifest = files.map((name) => ({
  file: name,
  type: VIDEO_EXT.has(path.extname(name).toLowerCase()) ? 'video' : 'image',
}));

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n');
console.log(`Wrote ${manifest.length} entries to ${MANIFEST_PATH}`);
