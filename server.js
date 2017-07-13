const path = require('path');
const next = require('next');
const express = require('express')
const compression = require('compression');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handler = routes.getRequestHandler(app);
const PORT = process.env.PORT || 3000;

app.prepare()
.then(() => {
  const server = express();
  server.use(compression({threshold: 0}));

  server.get('/sw.js', (req, res) => {
    // req.url === '/sw.js'
    app.serveStatic(req, res, path.resolve('./.next/sw.js'));
  })

  server.get('*', (req, res) => {
    handler(req, res);
  })

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);    
  })
})