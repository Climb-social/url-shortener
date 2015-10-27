var Joi = require('joi');
var Inert = require('inert');

module.exports = function(server) {

    server.register(Inert, function () {});

    server.route({
        method: 'GET',
        path: '/{url?}',
        handler: function (request, reply) {
            var url = request.params.url ? encodeURIComponent(request.params.url) : 'index.html';

            if (url == 'index.html'){
                reply.file('public/index.html');
            } else if (url == 'bundle.js') {
                reply.file('public/bundle.js');
            } else if (url == 'favicon.ico') {
                reply.file('public/favicon.ico');
            } else {
                server.methods.translateUrl(url, function(err, long_url) {
                    if (err) {
                        reply(err).code(404);
                    } else {
                        reply.redirect(long_url);
                    }
                })
            }
        }
    });
};
