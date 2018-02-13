'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Controller of the recipes page.
     */
    recipeModule.controller('RecipesController', ['$q', '$state', 'RecipeService', 'ToastService', 'Inventory', 'InventoryService', 'Brew', 'BrewService', 'ModalService',
        function ($q, $state, RecipeService, ToastService, Inventory, InventoryService, Brew, BrewService, ModalService) {
            var self = this;

            self.recipes = [];
            self.inventory = new Inventory();
            self.brewableRecipes = [];
            self.volumeUnits = RecipeService.volumeUnits;
            self.whatShouldIBrew = undefined;

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
                                $state.go('app.recipes');
                            })
                            .catch(function () {
                                ToastService.errorToast('Error brewing recipe.');
                            });
                    });
            };

            /**
             * Load recipes from the server.
             * @returns {Promise} Promise with the recipes.
             */
            self.loadRecipes = function () {
                return RecipeService.loadRecipes()
                    .then(function (response) {
                        self.recipes = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Failed to load recipes.');
                    });
            };

            /**
             * Load brewable recipes from availables recipes.
             */
            self.loadBrewableRecipes = function () {
                _.each(self.recipes, function (recipe) {
                    if (self.canBrew(recipe)) {
                        self.brewableRecipes.push(recipe);
                    }
                });

                if (self.brewableRecipes.length > 0) {
                    self.findWhatShouldIBrew();
                }

                console.log(self.whatShouldIBrew);
            };

            /**
             * Finds the perfect brew from the ordering of the brewables recipes,
             * finding the recipe with the highest of equipment volume, in case
             * of ties, returns the recipe that minimizes the use of ingredients.
             */
            self.findWhatShouldIBrew = function () {
                self.brewableRecipes.sort(self.compareByEquipmentVolume);
                var filteredBrewableRecipes = self.filterBrewableRecipesByMaxVolume();

                if(filteredBrewableRecipes.length > 1) {
                    filteredBrewableRecipes.sort(self.compareByIngredientsAmounts);
                }

                self.whatShouldIBrew = filteredBrewableRecipes[0];
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
                        ToastService.errorToast('Failed to load inventory.');
                    });
            };

            /**
             * Comparator to compare two recipes based in their volume.
             *
             * @param recipe Recipe.
             * @param recipe Recipe.
             * @returns {number} used to compare two recipes.
             */
            self.compareByEquipmentVolume = function (recipeA, recipeB) {
                var recipeVolumeA = self.getVolumeInLitres(recipeA.equipment);
                var recipeVolumeB = self.getVolumeInLitres(recipeB.equipment);

                if (recipeVolumeA < recipeVolumeB)
                    return 1;
                if (recipeVolumeA > recipeVolumeB)
                    return -1;
                return 0;
            }

            /**
             * Comparator to compare two recipes based in their ingredients cost.
             *
             * @param recipe Recipe.
             * @param recipe Recipe.
             * @returns {number} used to compare two recipes.
             */
            self.compareByIngredientsAmounts = function (recipeA, recipeB) {
                var recipeCostA = RecipeService.recipeCost(recipeA);
                var recipeCostB = RecipeService.recipeCost(recipeB);

                if (recipeCostA > recipeCostB)
                    return 1;
                if (recipeCostA < recipeCostB)
                    return -1;
                return 0;
            }

            /**
             * Converts a volume of gallons to liter
             */
            self.getVolumeInLitres = function (equipment) {
                if(equipment.unit ===  self.volumeUnits.Gallons) {
                    return equipment.volume * 3.78541;
                } else {
                    return equipment.volume;
                }
            };

            /**
             * Filter from the list of candidates for brew all the recipes
             * whose equipment volume is less than that of the recipe whose
             * volume is the largest.
             *
             * @returns {Recipes}
             */
            self.filterBrewableRecipesByMaxVolume = function () {
                var maxVolume = self.brewableRecipes[0].equipment.volume;
                var filteredBrewableRecipes = [];

                _.each(self.brewableRecipes, function (recipe) {
                    if (recipe.equipment.volume == maxVolume) {
                        filteredBrewableRecipes.push(recipe);
                    }
                });

                return filteredBrewableRecipes;
            };

            (function () {
                var promises = [];
                promises.push(self.loadRecipes());
                promises.push(self.loadInventory());

                $q.all(promises)
                    .then(function () {
                        self.loadBrewableRecipes();
                    });
            })();
        }
    ]);
})();
