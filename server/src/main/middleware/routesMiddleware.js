'use strict';

(function () {
    var _ = require('../util/util');

    var recipeRouter = require('../router/recipeRouter');
    var inventoryRouter = require('../router/inventoryRouter');
    var brewRouter = require('../router/brewRouter');

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

        app.use('/api/recipe', _.authCheck(), recipeRouter);
        app.use('/api/inventory', _.authCheck(), inventoryRouter);
        app.use('/api/brew', _.authCheck(), brewRouter);
    };

    module.exports = routesMiddleware;
})();

