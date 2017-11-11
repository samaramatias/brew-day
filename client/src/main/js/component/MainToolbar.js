'use strict';

(function () {
    var mainToolbarModule = angular.module('mainToolbarModule', []);

    /**
     * Component that contains logic and view of the main toolbar.
     */
    mainToolbarModule.component('mainToolbar', {
        templateUrl: '/view/component/mainToolbar.html',
        bindings: {},
        controller: ['$state', '$rootScope', 'AuthService', 'User', 'SideMenuService',
            function ($state, $rootScope, AuthService, User, SideMenuService) {
                var self = this;

                self.auth = AuthService;

                /**
                 * Toggle the side menu on and off.
                 */
                self.toggleSideMenu = function () {
                    SideMenuService.toggle();
                };

                /**
                 * Go to the home page (the recipe page if the user is logged in and the
                 * login page if it's not).
                 */
                self.goToIndex = function () {
                    $state.go(self.auth.isAuthenticated() ? 'app.recipe' : 'app.login');
                };

                /**
                 * Sign the user out.
                 */
                self.signOut = function () {
                    self.auth.logout();
                    $state.go('app.login');
                };

                /**
                 * Show the Auth0 lock modal.
                 */
                self.signIn = function () {
                    self.lock.show();
                };

                /**
                 * Authenticate the user using Auth0 lock.
                 *
                 * @param {Object} authResult Result given by Auth0 lock.
                 * @private
                 */
                self._authenticate = function (authResult) {
                    self.lock.getProfile(authResult.idToken, function (error, response) {
                        if (error) {
                            console.error('An error occurred when trying to authenticate!');
                            console.error(error);
                            return;
                        }

                        self.user = new User(response);
                        AuthService.authenticate(authResult.accessToken, authResult.idToken, self.user);
                        $state.go('app.recipe');
                    });
                };

                /**
                 * Initialize Auth0 lock.
                 */
                (function () {
                    self.lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, LOCK_CONFIG);
                    self.lock.on('authenticated', self._authenticate);
                })();
            }
        ]
    });
})();
