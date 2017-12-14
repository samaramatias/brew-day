'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');

    /**
     * Controller of the inventory page.
     */
    inventoryModule.controller('InventoryController', ['InventoryService', 'Inventory', 'Ingredient', 'ToastService', 'ModalService',
        function (InventoryService, Inventory, Ingredient, ToastService, ModalService) {
            var self = this;

            self.quantityUnits = InventoryService.quantityUnits;
            self.readableQuantityUnits = _.keys(self.quantityUnits);

            self.inventory = new Inventory();
            self.inventory.ingredients.push(new Ingredient());

            /**
             * Add a new ingredient to the inventory.
             */
            self.addIngredient = function () {
                self.inventory.ingredients.push(new Ingredient());
            };

            /**
             * Remove an ingredient from the ingredient list of the inventory.
             *
             * @param {Object} ingredient Ingredient that will be removed.
             */
            self.removeIngredient = function (ingredient) {
                _.remove(self.inventory.ingredients, function (element) {
                    return element === ingredient;
                });
            };

            /**
             * Save the inventory.
             *
             * @param {Object} inventoryForm HTML form with the inventory data.
             */
            self.saveInventory = function (inventoryForm) {
                if (inventoryForm.$valid) {
                    if (self.inventory._id) {
                        InventoryService.updateInventory(self.inventory)
                            .then(function (response) {
                                self.inventory = response.data;
                                ToastService.successToast('Inventory updated!');
                            })
                            .catch(function (error) {
                                ToastService.errorToast('Inventory could not be updated.');
                                console.error(error);
                            });
                    } else {
                        InventoryService.createInventory(self.inventory)
                            .then(function (response) {
                                self.inventory = response.data;
                                ToastService.successToast('Inventory created!');
                            })
                            .catch(function (error) {
                                ToastService.errorToast('Inventory could not be created.');
                                console.error(error);
                            });
                    }
                }
            };

            /**
             * Delete an ingredient from the inventory.
             *
             * @param {Object} ingredient Ingredient that will be deleted.
             */
            self.deleteIngredient = function (ingredient) {
                if (ingredient._id) {
                    ModalService.confirm('Delete ingredient?', 'Are you sure you want to delete this ingredient?')
                        .then(function () {
                            InventoryService.deleteIngredient(ingredient._id)
                                .then(function () {
                                    self.removeIngredient(ingredient);
                                    ToastService.successToast('Ingredient deleted!');
                                })
                                .catch(function (error) {
                                    ToastService.errorToast('Ingredient could not be deleted.');
                                    console.error(error);
                                });
                        });
                } else {
                    self.removeIngredient(ingredient);
                }
            };

            /**
             * Load inventory from the server.
             */
            self.loadInventory = function () {
                InventoryService.loadInventory()
                    .then(function (response) {
                        if (response.data._id) {
                            self.inventory = response.data;

                            if (_.isEmpty(self.inventory.ingredients)) {
                                self.addIngredient();
                            }
                        }
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
