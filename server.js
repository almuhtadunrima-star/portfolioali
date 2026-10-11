const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.wasm': 'application/wasm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.ico': 'image/x-icon'
};

function startServer(port = DEFAULT_PORT) {
  const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';

    // Strip leading slash for safe cross-platform joining
    const cleanRelPath = reqPath.replace(/^\/+/, '');
    const directFile = path.join(PUBLIC_DIR, cleanRelPath);

    // Candidates resolution
    const candidates = [
      directFile,
      directFile + '.html',
      path.join(directFile, 'index.html'),
      path.join(PUBLIC_DIR, cleanRelPath + '.html')
    ];

    let resolvedPath = null;
    for (const c of candidates) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) {
        resolvedPath = c;
        break;
      }
    }

    if (!resolvedPath) {
      // If it's a route navigation, fallback to index.html
      const isAsset = /\.(?:js|css|wasm|glb|woff2|woff|ttf|png|jpg|jpeg|webp|avif|svg|mp3|mp4|webm|bin|json)$/i.test(reqPath);
      if (!isAsset) {
        const fallback = path.join(PUBLIC_DIR, 'index.html');
        if (fs.existsSync(fallback)) {
          resolvedPath = fallback;
        }
      }
    }

    if (!resolvedPath) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const stat = fs.statSync(resolvedPath);
    const ext = path.extname(resolvedPath).toLowerCase();
    let contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Handle gzip files (e.g. color-timelines.bin.gz)
    if (resolvedPath.endsWith('.bin.gz') || resolvedPath.endsWith('.gz')) {
      res.setHeader('Content-Encoding', 'gzip');
      contentType = 'application/octet-stream';
    }

    // Range requests for audio and video
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mp3')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(resolvedPath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType
      });
      file.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'no-cache'
    });

    fs.createReadStream(resolvedPath).pipe(res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, () => {
    console.log(`=======================================================`);
    console.log(`  Studio Mirage Clone is running successfully!         `);
    console.log(`  Local URL: http://localhost:${port}                  `);
    console.log(`  Pages: / | /works | /about-us | /legal-notice        `);
    console.log(`=======================================================`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
