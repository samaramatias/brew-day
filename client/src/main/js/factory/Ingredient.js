'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Factory for ingredient objects.
     */
    recipeModule.factory('Ingredient', [function () {

        /**
         * Factory constructor of an ingredient.
         *
         * @param {Object} ingredient Ingredient object with the ingredient data.
         * @constructor
         */
        function Ingredient(ingredient) {
            this.ingredientId = undefined;
            this.name = undefined;
            this.quantity = undefined;
            this.unit = undefined;
            Object.assign(this, ingredient);
        }

        Ingredient.prototype.constructor = Ingredient;

        return Ingredient;
    }]);
})();
