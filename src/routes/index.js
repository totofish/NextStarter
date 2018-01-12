const nextRoutes = require('next-routes');

const routes = nextRoutes();
module.exports = routes;

routes.add('page', '/page/:type(a|b|c|d)');
