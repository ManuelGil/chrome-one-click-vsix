import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  outDir: 'dist',
  manifest: {
    'name': 'One-Click VSIX',
    'description':
      'Integrates with VSCode Marketplace pages to add a one-click button for instant VSIX downloads.',
  },
});
