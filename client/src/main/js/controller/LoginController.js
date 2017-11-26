'use strict';

(function () {
    var loginModule = angular.module('loginModule', []);

    /**
     * Controller of the login page.
     */
    loginModule.controller('LoginController', ['$state', 'AuthService',
        function ($state, AuthService) {
            var self = this;

            self.user = AuthService.getUserLoggedIn();

            (function () {
                if (!_.isEmpty(self.user)) {
                    $state.go('app.recipes')
                }
            })();
        }
    ]);
})();
