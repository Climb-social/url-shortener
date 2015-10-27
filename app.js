var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
    port: 3000,
    router: {
        stripTrailingSlash: true
    },
    routes: {
        cors: true
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

var methods = require('./methods')(server);
var backend = require('./routes')(server);

module.exports = server;
