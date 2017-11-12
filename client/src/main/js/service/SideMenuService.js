'use strict';

(function () {
    var sideMenuModule = angular.module('sideMenuModule', []);

    /**
     * Service tha controls the side menu.
     */
    sideMenuModule.service('SideMenuService', ['$mdSidenav', function ($mdSidenav) {
        var self = this;

        /**
         * Toggle the side menu on and off.
         */
        self.toggle = function () {
            var sideMenu = $mdSidenav('side-menu');
            sideMenu.toggle()
        };
    }]);
})();
