'use strict';

(function () {
    var authModule = angular.module('authModule', []);

    authModule.service('AuthService', ['$http', 'store', '$rootScope', '$q', 'auth', 'User',
        function ($http, store, $rootScope, $q, auth, User) {
            var self = this;

            /**
             * Authenticate user and store its access token.
             *
             * @param {String} accessToken Access token of the user.
             * @param {String} token User ID token.
             * @param {Object} user Auth0 user object.
             * @returns {Promise} Promise with the user.
             */
            self.authenticate = function (accessToken, token, user) {
                auth.authenticate(user, token);
                store.set('accessToken', accessToken);
                store.set('idToken', token);
                store.set('user', JSON.stringify(user));

                return $q.when(user);
            };

            /**
             * Check if user is authenticated.
             *
             * @returns {Boolean} True if user is authenticated, false otherwise.
             */
            self.isAuthenticated = function () {
                return auth.isAuthenticated;
            };

            /**
             * Get user that is logged in.
             *
             * @returns {Object} User that is logged in.
             */
            self.getUserLoggedIn = function () {
                var user = angular.isString(auth.profile) ? JSON.parse(auth.profile) : auth.profile;
                return user ? new User(user) : undefined;
            };

            /**
             * Get idToken of the user that is logged in.
             *
             * @returns {String} idToken of the user that is logged in.
             */
            self.getIdToken = function () {
                return auth.idToken;
            };

            /**
             * Delete user tokens and close session.
             */
            self.logout = function () {
                store.remove('idToken');
                store.remove('user');
                auth.signout();
            };
        }
    ]);
})();
