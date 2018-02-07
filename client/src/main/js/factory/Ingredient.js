'use strict';

(function () {
    var ingredientModule = angular.module('ingredientModule', []);

    /**
     * Factory for ingredient objects.
     */
    ingredientModule.factory('Ingredient', [function () {

        var normalizedMultipliers = {
            'G': 0.001,
            'ML': 0.001,
            'L': 1,
            'GL': 3.785,
            'KG': 1
        };

        var gramsMultipliers = {
            'G': 1,
            'ML': 1,
            'L': 0.001,
            'GL': 0.0002642,
            'KG': 0.001
        };

        var millilitersMultipliers = {
            'G': 1,
            'ML': 1,
            'L': 0.001,
            'GL': 0.0002642,
            'KG': 0.001
        };

        var litersMultipliers = {
            'G': 1000,
            'ML': 1000,
            'L': 1,
            'GL': 0.2642,
            'KG': 1
        };

        var gallonsMultipliers = {
            'G': 3785.412,
            'ML': 3785.412,
            'L': 3.785,
            'GL': 1,
            'KG': 3.785
        };

        var kilogramsMultipliers = {
            'G': 1000,
            'ML': 1000,
            'L': 1,
            'GL': 0.2642,
            'KG': 1
        };

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
         * Get normalized quantity by converting it to Kilograms.
         *
         * @returns {Number} Normalized quantity in Kilograms.
         */
        Ingredient.prototype.getNormalQuantity = function () {
            return this.quantity * normalizedMultipliers[this.unit];
        };

        /**
         * Convert quantity to desired unit.
         *
         * @param {String} unit Unit of conversion.
         * @returns {Number} Quantity converted to desired unit.
         */
        Ingredient.prototype.getQuantityInUnit = function (unit) {
            if (this.unit === 'G') {
                return this.quantity * gramsMultipliers[unit];
            } else if (this.unit === 'ML') {
                return this.quantity * millilitersMultipliers[unit];
            } else if (this.unit === 'L') {
                return this.quantity * litersMultipliers[unit];
            } else if (this.unit === 'GL') {
                return this.quantity * gallonsMultipliers[unit];
            } else if (this.unit === 'KG') {
                return this.quantity * kilogramsMultipliers[unit];
            }
        };

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
