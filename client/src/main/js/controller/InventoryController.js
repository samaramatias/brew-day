'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');

    /**
     * Controller of the inventory page.
     *
     */
    inventoryModule.controller('InventoryModule', ['$state', '$stateParams', 'InventoryService', 'Inventory', 'Ingredient', 'ToastService', 'ModalService', 'IngredientService',
        function ($state, $stateParams, InventoryService, Inventory, Ingredient, ToastService, ModalService, IngredientService) {
            var self = this;

            self.Ingredient = new Ingredient();
            self.inventory = new Inventory(); // acho que isso não deveria ser feito aqui

            /**
             * Add a new ingredient to the ingredient list of the inventory.
             */
            self.addIngredient = function (ingredient) {
                self.inventory.ingredients.push(ingredient);
            };

            /**
             * Save a new recipe.
             *
             * @param {Object} ingredientForm HTML form with the recipe data.
             */
            self.saveIngredient = function (ingredientForm) {
                if (ingredientForm.$valid) {
                    IngredientService.createIngredient(self.Ingredient)
                        .then(function (result) {
                            addIngredient(result);
                            ToastService.successToast('Ingredient saved!');
                        })
                        .catch(function (error) {
                            ToastService.errorToast('Recipe could not be savedIngredient could not be saved.');
                            console.error(error);
                        });
                }
            };
        }
    ]);
})();
