'use strict';

(function () {
    var recipeModule = angular.module('recipeModule', []);

    /**
     * Factory for recipe objects.
     */
    recipeModule.factory('Recipe', ['Ingredient',
        function (Ingredient) {

            /**
             * Factory constructor of a recipe.
             *
             * @param {Object} recipe Recipe object with the recipe data.
             * @constructor
             */
            function Recipe(recipe) {
                this.recipeId = undefined;
                this.userId = undefined;
                this.name = undefined;
                this.equipmentVolume = undefined;
                this.ingredients = [];
                this.creationDate = undefined;
                Object.assign(this, recipe);

                this._organizeIngredients();
            }

            /**
             * Convert list of raw ingredient objects to list of ingredient factory objects.
             * @private
             */
            Recipe.prototype._organizeIngredients = function () {
                this.ingredients.map(function (ingredient) {
                    return new Ingredient(ingredient);
                });
            };

            Recipe.prototype.constructor = Recipe;

            return Recipe;
        }
    ]);
})();
