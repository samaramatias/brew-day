'use strict';

(function () {
    var ingredientModule = angular.module('ingredientModule', []);

    /**
     * Factory for ingredient objects.
     */
    ingredientModule.factory('Ingredient', [function () {

        /**
         * Factory constructor of an ingredient.
         *
         * @param {Object} ingredient Ingredient object with the ingredient data.
         * @constructor
         */
        function Ingredient(ingredient) {
            this._id = undefined;
            this.name = undefined;
            this.quantity = undefined;
            this.unit = undefined;
            Object.assign(this, ingredient);
        }

        Ingredient.prototype.constructor = Ingredient;

        /**
         * Get string representation of an ingredient.
         *
         * @returns {String} String representation of an ingredient.
         */
        Ingredient.prototype.toString = function () {
            return this.quantity + ' ' + this.unit + ' ' + this.name;
        };

        return Ingredient;
    }]);
})();
