const routes = require('next-routes')();

routes
    .add('/movie/:movie_id', '/movie/index')
    .add('/people/:person_id', '/people/index');

module.exports = routes;
