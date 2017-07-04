const path = require('path');
const Koa = require('koa');
const next = require('next');
const Router = require('koa-router');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: '.', dev });
const handler = routes.getRequestHandler(app);
const PORT = process.env.PORT || 3000;

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('*', async ctx => {
    if (ctx.req.url === '/sw.js') {
			await app.serveStatic(ctx.req, ctx.res, path.resolve('./.next/sw.js'));
		} else {
			await handler(ctx.req, ctx.res)
      ctx.respond = false
		}
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`);
  })
})