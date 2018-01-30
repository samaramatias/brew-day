'use strict';

(function () {
    var brewModule = angular.module('brewModule');

    /**
     * Controller of the brews page.
     */
    brewModule.controller('BrewsController', ['BrewService', 'ToastService',
        function (BrewService, ToastService) {
            var self = this;

            self.brews = [];

            /**
             * Load brews from the server.
             */
            self.loadBrews = function () {
                BrewService.loadBrews()
                    .then(function (response) {
                        self.brews = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Failed to load brews.');
                    });
            };

            (function () {
                self.loadBrews();
            })();
        }
    ]);
})();
