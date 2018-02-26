'use strict';

(function () {
    var AuthenticationClient = require('auth0').AuthenticationClient;
    var ManagementClient = require('auth0').ManagementClient;
    var _ = require('../util/util');

    var auth0Authentication;
    var auth0Management;

    /**
     * Create a new instance of the AuthenticationClient.
     * @private
     */
    function _auth0AuthenticationInit() {
        auth0Authentication = new AuthenticationClient({
            domain: _.AUTH0.DOMAIN,
            clientId: _.AUTH0.MANAGER_ID,
            clientSecret: _.AUTH0.MANAGER_SECRET
        });
    }

    /**
     * Create a new instance of the ManagementClient.
     * @private
     */
    function _auth0ManagementInit() {
        var options = {
            audience: 'https://' + _.AUTH0.DOMAIN + '/api/v2/',
            scope: 'read:users read:user_idp_tokens'
        };

        auth0Authentication.clientCredentialsGrant(options, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                auth0Management = new ManagementClient({
                    token: response.access_token,
                    domain: _.AUTH0.DOMAIN
                });
            }
        });
    }

    /**
     * Service that handles authentication.
     */
    var AuthService = {};

    /**
     * Return a user given its access token.
     *
     * @param {String} accessToken Access token of the user.
     * @returns {Promise} Promise with the user from Auth0.
     */
    AuthService.getUserByAccessToken = function (accessToken) {
        return auth0Authentication.getProfile(accessToken)
            .then(function (response) {
                response = (!_.isObject(response)) ? JSON.parse(response) : response;
                return response;
            });
    };

    /**
     * Return a user given its user ID.
     *
     * @param {String} userId User ID.
     * @returns {Promise} Promise with the user from Auth0.
     */
    AuthService.getUserById = function (userId) {
        return auth0Management.getUser({id: userId})
            .then(function (response) {
                response = (!_.isObject(response)) ? JSON.parse(response) : response;
                return response;
            });
    };

    /**
     * Initialize Auth0 clients.
     */
    (function () {
        if (process.env.PROFILE !== 'test') {
            _auth0AuthenticationInit();
            _auth0ManagementInit();
        }
    })();

    module.exports = AuthService;
})();
