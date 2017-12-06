'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');

    /**
     * Controller of the inventory page.
     *
     */
    inventoryModule.controller('InventoryModule', ['$state', '$stateParams', 'InventoryService', 'Inventory', 'Ingredient', 'ToastService', 'ModalService',
        function ($state, $stateParams, InventoryService, Inventory, Ingredient, ToastService, ModalService) {
            var self = this;

            self.Ingredient = new Ingredient();
            self.inventory = new Inventory(); // acho que isso não deveria ser feito aqui

            /**
             * Add a new ingredient to the ingredient list of the inventory.
             */
            self.addIngredient = function () {
                self.inventory.ingredients.push(new Ingredient());
            };

            /**
             * Save a new recipe.
             *
             * @param {Object} recipeForm HTML form with the recipe data.
             */
            self.saveIngredient = function (recipeForm) {
                if (recipeForm.$valid) {
                    IngredientService.createIngredient(self.Ingredient)
                        .then(function () {
                            ToastService.successToast('Recipe saved!');
                            $state.go('app.recipes');
                        })
                        .catch(function (error) {
                            ToastService.errorToast('Recipe could not be saved.');
                            console.error(error);
                        });
                }
            };
        }
    ]);
})();
