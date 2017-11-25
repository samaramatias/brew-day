'use strict';

(function () {
    var recipeModule = angular.module('recipeModule', []);

    /**
     * Factory for recipe objects.
     */
    recipeModule.factory('Recipe', [function () {
        var self = this;

        var recipeMetadata = ['full_name'];

        /**
         * Factory constructor of a recipe.
         *
         * @param {Object} recipe Recipe object with the recipe data.
         * @constructor
         */
        function Recipe(recipe) {
            self.recipeMetadata = recipe.recipeMetadata || {};
            self.appMetadata = recipe.appMetadata || {};
            Object.assign(this, recipe);
        }

        /**
         * Create getters and setters for recipe metadata.
         */
        Recipe.prototype.organizeMetadata = function () {
            _.each(recipeMetadata, function (prop) {
                Recipe.prototype.__defineGetter__(prop, function () {
                    return self.recipeMetadata[prop];
                });

                Recipe.prototype.__defineSetter__(prop, function (value) {
                    self.recipeMetadata[prop] = value;
                });
            });
        };

        Recipe.prototype.constructor = Recipe;

        Recipe.prototype.organizeMetadata();

        return Recipe;
    }]);
})();
