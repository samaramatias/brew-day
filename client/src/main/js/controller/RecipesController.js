'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Controller of the recipes page.
     */
    recipeModule.controller('RecipesController', ['RecipeService', 'ToastService', 'Inventory', 'InventoryService',
        function (RecipeService, ToastService, Inventory, InventoryService) {
            var self = this;

            self.recipes = [];
            self.inventory = new Inventory();

            /**
             * Load recipes from the server.
             */
            self.loadRecipes = function () {
                RecipeService.loadRecipes()
                    .then(function (response) {
                        self.recipes = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Failed to load recipes.');
                    });
            };

            /**
             * Load inventory from the server.
             */
            self.loadInventory = function () {
                InventoryService.loadInventory()
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
             * Check if the user can brew a recipe.
             *
             * @param {Object} recipe Recipe to be checked.
             * @returns {Boolean} True if the user can brew the recipe. False otherwise.
             */
            self.canBrew = function (recipe) {
                return RecipeService.canBrew(recipe, self.inventory);
            };

            (function () {
                self.loadRecipes();
                self.loadInventory();
            })();
        }
    ]);
})();
