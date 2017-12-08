'use strict';

(function () {
    var inventoryModule = angular.module('inventoryModule', []);

    /**
     * Factory for inventory objects.
     */
    inventoryModule.factory('Inventory', ['Ingredient',
        function (Ingredient) {

            /**
             * Factory constructor of an inventory.
             *
             * @param {Object} inventory Inventory object with the inventory data.
             * @constructor
             */
            function Inventory(inventory) {
                this._id = undefined;
                this.ingredients = [];
                Object.assign(this, inventory);

                this._organizeIngredients();

            }
            Inventory.prototype.constructor = Inventory;

            /**
             * Generate a summary string of all the ingredients of this inventory.
             *
             * @returns {String} Summary of the ingredients.
             */
            Inventory.prototype.getIngredientsSummary = function () {
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
            Inventory.prototype._organizeIngredients = function () {
                this.ingredients = this.ingredients.map(function (ingredient) {
                    return new Ingredient(ingredient);
                });
            };

            return Inventory;
        }
    ]);
})();
