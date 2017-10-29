'use strict';

(function () {
    var AuthenticationClient = require('auth0').AuthenticationClient;
    var ManagementClient = require('auth0').ManagementClient;
    var _ = require('../util/util');

    var auth0Authentication;
    var auth0Management;

    /**
     * Create a new instance of the AuthenticationClient.
     */
    function auth0AuthenticationInit() {
        auth0Authentication = new AuthenticationClient({
            domain: _.AUTH0.DOMAIN,
            clientId: _.AUTH0.MANAGER_ID,
            clientSecret: _.AUTH0.MANAGER_SECRET
        });
    }

    function auth0ManagementInit() {
        var options = {
            audience: 'https://' + _.AUTH0.DOMAIN + '/api/v2/',
            scope: 'read:users read:user_idp_tokens'
        };
    }
})();
