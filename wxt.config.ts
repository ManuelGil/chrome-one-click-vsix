import { resolve } from 'node:path';
import { defineConfig } from 'wxt';

export default defineConfig({
  outDir: 'dist',

  alias: {
    '@': resolve('./'),
  },

  manifest: {
    name: 'One-Click VSIX',

    description:
      'Integrates with VSCode Marketplace pages to add a one-click button for instant VSIX downloads.',
  },
});
