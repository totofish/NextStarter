const nextRoutes = require('next-routes');
const routes = module.exports = nextRoutes();

routes.add('page', '/page/:type(a|b|c|d)')