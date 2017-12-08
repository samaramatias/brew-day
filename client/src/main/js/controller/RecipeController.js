'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Controller of the recipe page.
     *
     * TODO: Edit.
     */
    recipeModule.controller('RecipeController', ['$state', '$stateParams', 'InventoryService', 'Recipe', 'InventoryService', 'Inventory', 'Ingredient', 'ToastService', 'ModalService',
        function ($state, $stateParams, InventoryService, Recipe, InventoryService, Inventory, Ingredient, ToastService, ModalService) {
            var self = this;

            self.recipe = new Recipe();
            self.recipe.ingredients.push(new Ingredient());
            self.inventory = new Inventory();
            self.recipeId = $stateParams.recipeId;
            self.editMode = false;

            self.volumeUnits = RecipeService.volumeUnits;
            self.readableVolumeUnits = _.keys(self.volumeUnits);

            self.quantityUnits = InventoryService.quantityUnits;
            self.readableQuantityUnits = _.keys(self.quantityUnits);

            /**
             * Enter or exit the edit mode of a recipe.
             */
            self.toggleEditMode = function () {
                self.editMode = !self.editMode;
            };

            /**
             * Add a new ingredient to the ingredient list of the recipe.
             */
            self.addIngredient = function () {
                self.recipe.ingredients.push(new Ingredient());
            };

            /**
             * Remove the last ingredient from the ingredient list of the recipe.
             * Minimum length of the ingredient list is one.
             */
            self.removeIngredient = function () {
                if (self.recipe.ingredients.length > 1) {
                    self.recipe.ingredients.pop();
                }
            };

            /**
             * Clear all form fields of a new recipe.
             */
            self.clearRecipe = function () {
                self.recipe = new Recipe();
                self.recipe.ingredients.push(new Ingredient());
            };

            /**
             * Save a new recipe.
             *
             * @param {Object} recipeForm HTML form with the recipe data.
             */
            self.saveRecipe = function (recipeForm) {
                if (recipeForm.$valid) {
                    RecipeService.createRecipe(self.recipe)
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

            /**
             * Delete a recipe.
             */
            self.deleteRecipe = function () {
                ModalService.confirm('Delete recipe?', 'Are you sure you want to delete this recipe?')
                    .then(function () {
                        RecipeService.deleteRecipe(self.recipeId)
                            .then(function () {
                                ToastService.successToast('Recipe deleted!');
                                $state.go('app.recipes');
                            })
                            .catch(function (error) {
                                ToastService.errorToast('Recipe could not be deleted.');
                                console.error(error);
                            })
                    });
            };

            (function () {
                if (self.recipeId) {
                    RecipeService.getIngredient(self.recipeId)
                        .then(function (response) {
                            self.recipe = response.data;
                        })
                        .catch(function () {
                            ToastService.errorToast('Recipe not found.');
                            $state.go('app.recipes');
                        });
                } else {
                    InventoryService.loadInventory()
                        .then(function (response) {
                            self.inventory = response.data;
                        })
                        .catch(function () {
                            ToastService.errorToast('Error fetching inventory.');
                            $state.go('app.recipes');
                        });
                }
            })();
        }
    ]);
})();
