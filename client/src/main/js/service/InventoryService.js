'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');

    /**
     * Service for operations with an inventory.
     */
    inventoryModule.service('InventoryService', ['$rootScope', '$http', 'Inventory',
        function ($rootScope, $http, Inventory) {
            var self = this;

            var inventoryApi = $rootScope.apiRoot + '/inventory';

            self.quantityUnits = {
                'Kilograms': 'KG',
                'Grams': 'G',
                'Milliliters': 'ML',
                'Liters': 'L',
                'Gallons': 'GL'
            };

            /**
             * Load a user's inventory from the server.
             *
             * @returns {Promise} Promise with the inventory.
             */
            self.loadInventory = function () {
                return $http.get(inventoryApi)
                    .then(function (response) {
                        return {
                            data: new Inventory(response.data)
                        }
                    });
            };
        }
    ]);
})();
