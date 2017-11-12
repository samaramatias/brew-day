'use strict';

(function () {
    var sideMenuModule = angular.module('sideMenuModule');

    /**
     * Component that contains logic and view of the side menu.
     */
    sideMenuModule.component('sideMenu', {
        templateUrl: '/view/component/sideMenu.html',
        bindings: {},
        controller: ['$state', 'AuthService', 'User',
            function ($state, AuthService, User) {
                var self = this;

                self.user = new User(AuthService.getUserLoggedIn());
                self.userName = _.first(self.user.full_name.split(' '));
            }
        ]
    });
})();
