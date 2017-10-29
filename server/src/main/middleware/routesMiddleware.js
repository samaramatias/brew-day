'use strict';

(function () {
    var jwt = require('express-jwt');
    var _ = require('../util/util');

    var authCheck = jwt({
        secret: _.AUTH0.CLIENT_SECRET,
        audience: _.AUTH0.CLIENT_ID
    });

    var routesMiddleware = {};

    /**
     * Configure application routes.
     * @param {Object} app Express application.
     * @param {String} clientFilesPath Path to the client files.
     */
    routesMiddleware.set = function (app, clientFilesPath) {
        app.get('/app*', function (req, res) {
            res.sendFile(clientFilesPath + '/index.html');
        });

        app.get('/', function (req, res) {
            res.sendFile(clientFilesPath + '/index.html');
        });

        app.post('/', function (req, res) {
            res.sendFile(clientFilesPath + '/index.html');
        });
    };

    module.exports = routesMiddleware;
})();

