'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');

    /**
     * Controller of the inventory page.
     */

    inventoryModule.controller('InventoryController', ['InventoryService', 'ToastService',
        function (InventoryService, ToastService) {
            var self = this;

            self.inventory = [];

            /**
             * Load inventory from the server.
             */

            self.loadInventory = function () {
                InventoryService.loadInventory()
                    .then(function (response) {
                        self.inventory = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Failed to load inventory.');
                    });
            };

            (function () {
                self.loadInventory();
            })();
        }
    ]);
})();