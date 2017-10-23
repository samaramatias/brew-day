'use strict';

(() => {
    const AuthenticationClient = require('auth0').AuthenticationClient;
    const ManagementClient = require('auth0').ManagementClient;
    const _ = require('../util/util');

    let auth0Authentication;
    let auth0Management;

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
        const options = {
            audience: `https://${_.AUTH0.DOMAIN}/api/v2/`,
            scope: 'read:users read:user_idp_tokens'
        };
    }
})();

