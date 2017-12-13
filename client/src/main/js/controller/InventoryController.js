'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');

    /**
     * Controller of the inventory page.
     */
    inventoryModule.controller('InventoryController', ['InventoryService', 'Inventory', 'ToastService',
        function (InventoryService, Inventory, ToastService) {
            var self = this;

            self.inventory = new Inventory();

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
