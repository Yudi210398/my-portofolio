import { defineConfig } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

export default defineConfig({
  testDir: "./tests",
  testMatch: "*.spec.ts",
  outputDir: join(tmpdir(), "portfolio-p012-playwright"),
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
    channel: "msedge",
  },
  reporter: "list",
});
