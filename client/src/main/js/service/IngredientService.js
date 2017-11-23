'use strict';

(function () {
    var ingredientModule = angular.module('ingredientModule');

    /**
     * Service for operations with ingredients.
     */
    ingredientModule.service('IngredientService', ['$rootScope', '$http', 'Ingredient',
        function ($rootScope, $http, Ingredient) {
            var self = this;

            var ingredientApi = $rootScope.apiRoot + '/ingredient';

            self.quantityUnits = {
                'Kilograms': 'KG',
                'Grams': 'G',
                'Milliliters': 'ML',
                'Liters': 'L',
                'Gallons': 'GL'
            };

            /**
             * Load all ingredients from the server.
             *
             * @returns {Promise} Promise with all the ingredients.
             */
            self.loadIngredients = function () {
                return $http.get(ingredientApi)
                    .then(function (response) {
                        var ingredients = response.data;
                        return {
                            data: ingredients.map(function (ingredient) {
                                return new Ingredient(ingredient);
                            })
                        };
                    });
            };
        }
    ]);
})();
