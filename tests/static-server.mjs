import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";

const root = join(process.cwd(), "out");
const types = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

createServer(async (request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }

  const relative = normalize(pathname).replace(/^[/\\]+/, "");
  const target = join(root, relative);
  if (target !== root && !target.startsWith(root + sep)) {
    response.writeHead(400).end();
    return;
  }

  const candidates = pathname === "/" ? [join(root, "index.html")] : [target, `${target}.html`, join(target, "index.html")];
  for (const candidate of candidates) {
    try {
      if (!(await stat(candidate)).isFile()) continue;
      const body = await readFile(candidate);
      response.writeHead(200, { "content-type": types[extname(candidate)] ?? "application/octet-stream" }).end(body);
      return;
    } catch {
      // Try the next static-export path.
    }
  }

  response.writeHead(404, { "content-type": types[".html"] }).end(await readFile(join(root, "404.html")));
}).listen(4173, "127.0.0.1");
