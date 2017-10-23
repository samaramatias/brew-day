'use strict';

(() => {
    const jwt = require('express-jwt');
    const _ = require('../util/util');

    const authCheck = jwt({
        secret: _.AUTH0.CLIENT_SECRET,
        audience: _.AUTH0.CLIENT_ID
    });

    const routesMiddleware = {};

    /**
     * Configure application routes.
     * @param {Object} app Express application.
     * @param {String} clientFilesPath Path to the client files.
     */
    routesMiddleware.set = (app, clientFilesPath) => {
        app.get('/app*', (req, res) => {
            res.sendFile(`${clientFilesPath}/index.html`);
        });

        app.get('/', (req, res) => {
            res.sendFile(`${clientFilesPath}/index.html`);
        });

        app.post('/', (req, res) => {
            res.sendFile(`${clientFilesPath}/index.html`);
        });
    };

    modules.export = routesMiddleware;
})();

