const path = require('path');
const next = require('next');
const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const routes = require('./src/routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src', dev });
const handler = routes.getRequestHandler(app);
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(helmet());

  // 如果有 proxy server 例如 nginx 就由它來處理 gzip 壓縮比較好
  server.use(compression({ threshold: 0 }));

  server.use(express.static(path.join(__dirname, '.next/public')));

  // server.get('/sw.js', (req, res) => {
  //   app.serveStatic(req, res, path.resolve('./.next/sw.js'));
  // })

  server.get('*', (req, res) => {
    handler(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
