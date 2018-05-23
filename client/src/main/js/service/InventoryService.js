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
                'Spoon': 'SP',
                'Tea-cup': 'TC'
            };

            /**
             * Check if inventory has an ingredient. This method will automatically
             * convert units to a base unit to make the comparison.
             *
             * @param {Object} ingredient Ingredient to be checked.
             * @param {Object} inventory Inventory with all the ingredients.
             * @returns {Boolean} True if the inventory has the ingredient. False otherwise.
             */
            self.hasIngredient = function (ingredient, inventory) {
                var hasIngredient = false;

                _.each(inventory.ingredients, function (invIngredient) {
                    if (invIngredient.name === ingredient.name &&
                        invIngredient.getNormalQuantity() >= ingredient.getNormalQuantity()) {
                        hasIngredient = true;
                        return;
                    }
                });
                return hasIngredient;
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
             * Create a new inventory.
             *
             * @param {Object} inventory Inventory to be created.
             * @returns {Promise} Promise with the created inventory.
             */
            self.createInventory = function (inventory) {
                return $http.post(inventoryApi, inventory)
                    .then(function (response) {
                        return {
                            data: new Inventory(response.data)
                        }
                    });
            };

            /**
             * Update an existing inventory.
             *
             * @param {Object} inventory Inventory to be updated.
             * @returns {Promise} Promise with the updated inventory.
             */
            self.updateInventory = function (inventory) {
                return $http.put(inventoryApi + '/' + inventory._id, inventory)
                    .then(function (response) {
                        return {
                            data: new Inventory(response.data)
                        }
                    });
            };

            /**
             * Delete an ingredient from the inventory.
             *
             * @param {int} ingredientId ID of the ingredient.
             * @returns {Promise} Promise with the result of the operation.
             */
            self.deleteIngredient = function (ingredientId) {
                return $http.delete(inventoryApi + '/ingredients/' + ingredientId);
            };
        }
    ]);
})();
