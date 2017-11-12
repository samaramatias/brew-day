'use strict';

(function () {
    var appModule = angular.module('appModule', []);

    /**
     * Controller of the abstract initial state of the app.
     */
    appModule.controller('AppController', ['AuthService',
        function (AuthService) {
            var self = this;

            /**
             * Check if user is authenticated.
             *
             * @returns {Boolean} True if user is authenticated, false otherwise.
             */
            self.isAuthenticated = function () {
                return AuthService.isAuthenticated();
            };
        }
    ]);
})();
