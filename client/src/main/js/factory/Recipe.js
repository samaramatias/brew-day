'use strict';

(function () {
    var recipeModule = angular.module('recipeModule', []);

    /**
     * Factory for recipe objects.
     */
    recipeModule.factory('Recipe', ['Ingredient', 'Equipment',
        function (Ingredient, Equipment) {

            /**
             * Factory constructor of a recipe.
             *
             * @param {Object} recipe Recipe object with the recipe data.
             * @constructor
             */
            function Recipe(recipe) {
                this._id = undefined;
                this.userId = undefined;
                this.name = undefined;
                this.directions = undefined;
                this.ingredients = [];
                this.creationDate = undefined;
                Object.assign(this, recipe);

                this.equipment = new Equipment(this.equipment);
                this._organizeIngredients();
            }

            Recipe.prototype.constructor = Recipe;

            /**
             * Generate a summary string of all the ingredients of this recipe.
             *
             * @returns {String} Summary of the ingredients.
             */
            Recipe.prototype.getIngredientsSummary = function () {
                var summary = '';

                for (var i = 0; i < this.ingredients.length; i++) {
                    summary += this.ingredients[i].toString();

                    if (i < this.ingredients.length - 1) {
                        summary += ', '
                    }
                }

                return summary;
            };

            /**
             * Convert list of raw ingredient objects to list of ingredient factory objects.
             * @private
             */
            Recipe.prototype._organizeIngredients = function () {
                this.ingredients = this.ingredients.map(function (ingredient) {
                    return new Ingredient(ingredient);
                });
            };

            return Recipe;
        }
    ]);
})();
