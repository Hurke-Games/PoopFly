import { build } from 'vite';
import { copyFileSync } from 'fs';

console.log('Building standalone root bundle...');
await build({
  configFile: false,
  base: './',
  build: {
    outDir: '.',
    emptyOutDir: false,
    lib: {
      entry: './index.tsx',
      name: 'PoopFly',
      fileName: () => 'index.bundle.js',
      formats: ['es']
    }
  }
});

console.log('Root index.bundle.js ready.');
