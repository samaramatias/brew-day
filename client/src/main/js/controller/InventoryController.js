'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule');
    /**
     * Controller of the inventory page.
     */
    inventoryModule.controller('InventoryController', ['$state', '$stateParams', 'InventoryService', 'Recipe', 'InventoryService', 'Inventory', 'Ingredient', 'ToastService', 'ModalService',
        function ($state, $stateParams, InventoryService, Recipe, InventoryService, Inventory, Ingredient, ToastService, ModalService
        function (InventoryService, ToastService) {
            var self = this;

            self.ingredientId = $stateParams.ingredientId;

            self.quantityUnits = InventoryService.quantityUnits;
            self.readableQuantityUnits = _.keys(self.quantityUnits);

            self.editMode = false;
            self.oldIngredient = undefined;

            self.ingredients = [];

            /**
             * Load ingredients from the server.
             */
            self.loadIngredients = function () {
                RecipeService.loadIngredients()
                    .then(function (response) {
                        self.ingredients = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Failed to load ingredients.');
                    });
            };

            (function () {
                self.loadIngredients();
            })();


            /**
             * Enter or exit the edit mode of an ingredient.
             */
            self.toggleEditMode = function () {
                self.editMode = !self.editMode;

                if (self.editMode) {
                    self.oldIngredient = angular.copy(self.ingredient);
                 } else {
                         self.ingredient = angular.copy(self.oldIngredient);
               }
            };


            /**
             * Save an ingredient.
             *
             * @param {Object} ingredientForm HTML form with the recipe data.
             */
/*            self.saveIngredient = function (ingredientForm) {
                if (ingredientForm.$valid) {
                    if (self.editMode){
                        InventoryService.updateIngredient(self.ingredient)
                            .then(function () {
                                ToastService.successToast('Ingredient saved!');
                                $state.go('app.inventory');
                            })
                            .catch(function (error) {
                                ToastService.errorToast('Ingredient could not be saved.');
                                console.error(error);
                            });
                    } else {
/*                      //TODO: EDIT QUANDO A FUNCAO DE INSERIR NOVO INGREDIENTE ESTIVER DEFINIDA NO INVENTORY

                        InventoryService.createIngredient(self.ingredient)
                            .then(function () {
                                ToastService.successToast('Ingredient saved!');
                                $state.go('app.inventory');
                            })
                            .catch(function (error) {
                               ToastService.errorToast('Ingredient could not be saved.');
                                console.error(error);
                            });

                    }
                }
            }; */
        }
    ]);
})();
