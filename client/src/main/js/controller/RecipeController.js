'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Controller of the recipe page.
     */
    recipeModule.controller('RecipeController', ['$q', '$state', '$stateParams', 'RecipeService', 'Recipe', 'InventoryService', 'Inventory', 'Ingredient', 'Brew', 'BrewService', 'ToastService', 'ModalService',
        function ($q, $state, $stateParams, RecipeService, Recipe, InventoryService, Inventory, Ingredient, Brew, BrewService, ToastService, ModalService) {
            var self = this;

            self.recipe = new Recipe();
            self.recipe.ingredients.push(new Ingredient());
            self.inventory = new Inventory();
            self.recipeId = $stateParams.recipeId;
            self.editMode = false;
            self.oldRecipe = undefined;
            self.missingIngredients = [];

            self.volumeUnits = RecipeService.volumeUnits;
            self.readableVolumeUnits = _.keys(self.volumeUnits);

            self.quantityUnits = InventoryService.quantityUnits;
            self.readableQuantityUnits = _.keys(self.quantityUnits);

            /**
             * Enter or exit the edit mode of a recipe.
             */
            self.toggleEditMode = function () {
                self.editMode = !self.editMode;

                if (self.editMode) {
                    self.oldRecipe = angular.copy(self.recipe);
                } else {
                    self.recipe = angular.copy(self.oldRecipe);
                }
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
                    if (self.editMode) {
                        RecipeService.updateRecipe(self.recipe)
                            .then(function () {
                                ToastService.successToast('Recipe edited!');
                                $state.go('app.recipes');
                            })
                            .catch(function (error) {
                                ToastService.errorToast('Recipe could not be edited.');
                                console.error(error);
                            });
                    } else {
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

            /**
             * Load recipe from the server.
             *
             * @param {Number} recipeId ID of the recipe to be loaded.
             * @returns {Promise} Promise with the recipe.
             */
            self.loadRecipe = function (recipeId) {
                return RecipeService.loadRecipe(recipeId)
                    .then(function (response) {
                        self.recipe = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Recipe not found.');
                        $state.go('app.recipes');
                    });
            };

            /**
             * Load inventory from the server.
             * @returns {Promise} Promise with the inventory.
             */
            self.loadInventory = function () {
                return InventoryService.loadInventory()
                    .then(function (response) {
                        if (response.data._id) {
                            self.inventory = response.data;
                        }
                    })
                    .catch(function () {
                        ToastService.errorToast('Error fetching inventory.');
                        $state.go('app.recipes');
                    });
            };

            /**
             * Check if the user can brew a recipe.
             *
             * @param {Object} recipe Recipe to be checked.
             * @returns {Boolean} True if the user can brew the recipe. False otherwise.
             */
            self.canBrew = function (recipe) {
                return RecipeService.canBrew(recipe, self.inventory);
            };

            /**
             * Get list of missing ingredients needed to brew a given recipe.
             *
             * @param {Object} recipe Recipe that one wants to brew.
             */
            self.getMissingIngredients = function (recipe) {
                self.missingIngredients = angular.copy(recipe.ingredients);

                _.each(recipe.ingredients, function (ingredient) {
                    _.each(self.inventory.ingredients, function (invIngredient) {
                        if (invIngredient.name === ingredient.name) {
                            var found = false;
                            var availableQuantity = invIngredient.getQuantityInUnit(ingredient.unit);
                            var missingQuantity = (ingredient.quantity - availableQuantity).toFixed(2);

                            _.each(self.missingIngredients, function (missingIngredient) {
                                if (missingIngredient.name === ingredient.name) {
                                    missingIngredient.quantity = missingQuantity;
                                    found = true;
                                    return;
                                }
                            });

                            if (!found) {
                                self.missingIngredients.push(new Ingredient({
                                    name: ingredient.name,
                                    quantity: missingQuantity,
                                    unit: ingredient.unit
                                }));
                            }
                        }
                    });
                });

                _.remove(self.missingIngredients, function (missingIngredient) {
                    return missingIngredient.quantity <= 0;
                });
            };

            /**
             * Brew a recipe.
             *
             * @param {Object} recipe Recipe to be brewed.
             */
            self.brew = function (recipe) {
                var modalPromise = ModalService.prompt('Brew Notes', 'Any notes for this brew?', 'Notes...');

                modalPromise
                    .then(function (notes) {
                        var brew = new Brew();
                        brew.recipe = recipe;
                        brew.notes = notes;

                        BrewService.createBrew(brew)
                            .then(function () {
                                ToastService.successToast('Recipe brewed!');
                            })
                            .catch(function () {
                                ToastService.errorToast('Error brewing recipe.');
                            });
                    });
            };

            (function () {
                var promises = [];
                promises.push(self.loadInventory());

                if (self.recipeId) {
                    promises.push(self.loadRecipe(self.recipeId));

                    $q.all(promises)
                        .then(function () {
                            self.getMissingIngredients(self.recipe);
                        });
                }
            })();
        }
    ]);
})();
