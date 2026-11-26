import { defineConfig } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseURL = process.env.PORTFOLIO_E2E_BASE_URL;
if (!baseURL) {
  throw new Error("Run npm run test:e2e to build and serve a fresh static export.");
}

export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.ts",
  outputDir: join(tmpdir(), "portfolio-p012-playwright"),
  use: {
    baseURL,
    browserName: "chromium",
    channel: "msedge",
  },
  reporter: "list",
});
