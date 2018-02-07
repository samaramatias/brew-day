'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Service for operations with recipes.
     */
    recipeModule.service('RecipeService', ['$rootScope', '$http', 'Recipe', 'InventoryService',
        function ($rootScope, $http, Recipe, InventoryService) {
            var self = this;

            var recipeApi = $rootScope.apiRoot + '/recipe';

            self.volumeUnits = {
                'Liters': 'L',
                'Gallons': 'GL'
            };

            /**
             * Check if the user can brew a recipe.
             *
             * @param {Object} recipe Recipe to be checked.
             * @param {Object} inventory Inventory with all the ingredients.
             * @returns {Boolean} True if the user can brew the recipe. False otherwise.
             */
            self.canBrew = function (recipe, inventory) {
                for (var i = 0; i < recipe.ingredients.length; i++) {
                    if (!InventoryService.hasIngredient(recipe.ingredients[i], inventory)) {
                        return false;
                    }
                }
                return true;
            };

            /**
             * Load all recipes from the server.
             *
             * @returns {Promise} Promise with all the recipes.
             */
            self.loadRecipes = function () {
                return $http.get(recipeApi)
                    .then(function (response) {
                        var recipes = response.data;
                        return {
                            data: recipes.map(function (recipe) {
                                return new Recipe(recipe);
                            })
                        };
                    });
            };

            /**
             * Load a recipe from the server.
             *
             * @param {int} recipeId ID of the recipe.
             * @returns {Promise} Promise with the recipe.
             */
            self.loadRecipe = function (recipeId) {
                return $http.get(recipeApi + '/' + recipeId)
                    .then(function (response) {
                        return {
                            data: new Recipe(response.data)
                        };
                    });
            };

            /**
             * Create a new recipe.
             *
             * @param {Object} recipe Recipe to be created.
             * @returns {Promise} Promise with the created recipe.
             */
            self.createRecipe = function (recipe) {
                return $http.post(recipeApi, recipe)
                    .then(function (response) {
                        return {
                            data: new Recipe(response.data)
                        }
                    });
            };

            /**
             * Update an existing recipe.
             *
             * @param {Object} recipe Recipe to be updated.
             * @returns {Promise} Promise with the updated recipe.
             */
            self.updateRecipe = function (recipe) {
                return $http.put(recipeApi + '/' + recipe._id, recipe)
                    .then(function (response) {
                        return {
                            data: new Recipe(response.data)
                        }
                    });
            };

            /**
             * Delete a recipe.
             *
             * @param {int} recipeId ID of the recipe.
             * @returns {Promise} Promise with the result of the operation.
             */
            self.deleteRecipe = function (recipeId) {
                return $http.delete(recipeApi + '/' + recipeId);
            };
        }
    ]);
})();
