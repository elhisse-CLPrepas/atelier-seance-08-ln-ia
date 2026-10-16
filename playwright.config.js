import { defineConfig } from '@playwright/test';
const remote = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.mjs',
  workers: 1,
  reporter: 'list',
  use: {
    channel: 'chrome',
    baseURL: remote || 'http://127.0.0.1:4174/atelier-seance-08-ln-ia/',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
  },
  webServer: remote ? undefined : {
    command: 'node scripts/serve-built.mjs',
    url: 'http://127.0.0.1:4174/atelier-seance-08-ln-ia/',
    reuseExistingServer: true,
  },
});
