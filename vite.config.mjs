import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'node:fs';
import { resolve, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));

function htmlEntries(dir) {
  const entries = {};
  const walk = current => {
    for (const name of readdirSync(current)) {
      if (['node_modules', 'dist', 'src', 'scripts', 'public'].includes(name)) continue;
      const full = resolve(current, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name === 'index.html') {
        const key = relative(root, dirname(full)).replaceAll('\\\\', '/') || 'home';
        entries[key] = full;
      }
    }
  };
  walk(dir);
  return entries;
}

export default defineConfig({
  root,
  publicDir: 'public',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: { input: htmlEntries(root) }
  }
});
