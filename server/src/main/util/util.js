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

    _.AUTH0 = {
        DOMAIN: 'brewday.eu.auth0.com',
        CLIENT_ID: 'w3hplz2BJojOeIv7orTMOFexv9AFhxi9',
        CLIENT_SECRET: process.env.BREWDAY_CLIENT_SECRET,
        MANAGER_ID: 'gFeiptMZjzpbktSgoB5ykcXZlxEtuZo3',
        MANAGER_SECRET: process.env.BREWDAY_MANAGER_SECRET
    };

    module.exports = _;
})();
