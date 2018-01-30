'use strict';

(function () {
    var brewModule = angular.module('brewModule', []);

    /**
     * Factory for brew objects.
     */
    brewModule.factory('Brew', ['Recipe',
        function (Recipe) {

            /**
             * Factory constructor of a brew.
             *
             * @param {Object} brew Brew object with the brew data.
             * @constructor
             */
            function Brew(brew) {
                this._id = undefined;
                this.userId = undefined;
                this.notes = undefined;
                Object.assign(this, brew);

                this.recipe = new Recipe(this.recipe);
            }

            Brew.prototype.constructor = Brew;

            return Brew;
        }
    ]);
})();
