const routes = require('next-routes')();

routes.add('/movie/:movie_id', '/movie/index');

module.exports = routes;
