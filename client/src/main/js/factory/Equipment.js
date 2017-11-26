'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Factory for equipment objects.
     */
    recipeModule.factory('Equipment', [function () {

        /**
         * Factory constructor of an equipment.
         *
         * @param {Object} equipment Equipment object with the equipment data.
         * @constructor
         */
        function Equipment(equipment) {
            this._id = undefined;
            this.volume = undefined;
            this.unit = undefined;
            Object.assign(this, equipment);
        }

        Equipment.prototype.constructor = Equipment;

        return Equipment;
    }
    ]);
})();
