import './build-obsidian.mjs';
import {copyFile} from 'node:fs/promises';

await Promise.all(['main.js', 'styles.css', 'manifest.json'].map(name =>
  copyFile(new URL('../dist/yishi/' + name, import.meta.url), new URL('../' + name, import.meta.url))));
