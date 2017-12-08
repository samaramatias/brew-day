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
            /**
             * Load a recipe from the server.
             *
             * @param {int} ingredientId ID of the ingredient.
             * @returns {Promise} Promise with the ingredient.
             */
            self.getIngredient = function (ingredientId) {
                return $http.get(inventoryApi + '/' + ingredientId)
                    .then(function (response) {
                        return {
                            data: new Ingredient(response.data)
                        };
                    });
            };
            /**
             * Update an existing ingredient.
             *
             * @param {Object} ingredient   Ingredient to be updated.
             * @returns {Promise}       Promise with the updated ingredient.
             */
            self.updateIngredient = function (ingredient) {
                return $http.put(inventoryApi + '/' + ingredient._id, ingredient)
                    .then(function (response) {
                        return {
                            data: new Ingredient(response.data)
                        }
                    });
            };


        }
    ]);
})();
