'use strict';

(function () {
    var _ = require('lodash');

    _.BAD_REQUEST = 400;
    _.NOT_FOUND = 404;
    _.FORBIDDEN = 403;
    _.UNAUTHORIZED = 401;
    _.OK = 200;
    _.CREATED = 201;

    _.FIRST_INDEX = 0;
    _.INVALID_INDEX = -1;

    _.ONE_HOUR = 3600000;
    _.THIRTY_MINUTES = _.ONE_HOUR / 2;

    _.AUTH0 = {
        DOMAIN: 'brewday.eu.auth0.com',
        CLIENT_ID: 'w3hplz2BJojOeIv7orTMOFexv9AFhxi9',
        CLIENT_SECRET: process.env.BREWDAY_CLIENT_SECRET,
        MANAGER_ID: 'gFeiptMZjzpbktSgoB5ykcXZlxEtuZo3',
        MANAGER_SECRET: process.env.BREWDAY_MANAGER_SECRET
    };

    /**
     * Get the user access token from the request headers.
     *
     * @param {Object} req Request object.
     *
     * @returns {String} User access token from the request headers.
     */
    _.getToken = function (req) {
        return req.header('access_token') || _.getAuthorizationToken(req)
    };

    /**
     * Get the Authorization token from the request headers.
     *
     * @param {Object} req Request object.
     *
     * @returns {String} Authorization token from the request headers.
     */
    _.getAuthorizationToken = function (req) {
        var authHeader = req.header('Authorization');
        return authHeader.substring(authHeader.indexOf(' ')).trim();
    };

    module.exports = _;
})();
