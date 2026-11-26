import { spawn } from "node:child_process";
import { once } from "node:events";
import { createRequire } from "node:module";
import { staticServer } from "./static-server.mjs";

const require = createRequire(import.meta.url);
const cli = require.resolve("@playwright/test/cli");

try {
  // Bind an OS-assigned port in this process so no pre-existing server can be reused.
  staticServer.listen(0, "127.0.0.1");
  await once(staticServer, "listening");
  const baseURL = `http://127.0.0.1:${staticServer.address().port}`;
  console.log(`Serving the static export at ${baseURL}`);

  const child = spawn(process.execPath, [cli, "test", "--workers=2", ...process.argv.slice(2)], {
    env: { ...process.env, PORTFOLIO_E2E_BASE_URL: baseURL },
    stdio: "inherit",
  });
  const [code] = await once(child, "exit");
  process.exitCode = code ?? 1;
} finally {
  if (staticServer.listening) {
    await new Promise((resolve, reject) => {
      staticServer.close((error) => error ? reject(error) : resolve());
      staticServer.closeAllConnections();
    });
    console.log("Static export server stopped.");
  }
}
