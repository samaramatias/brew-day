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

             /**
             * Creates a new ingredient.
             *
             * @param ingredient Ingredient to be created.
             * @return {Promise} Promise with the created ingredient.
             */
            function createIngredient(ingredient) {
                return $http.post(ingredientApi, ingredient)
                    .then(function(response) {
                        return {
                            data: new Ingredient(response.data)
                        }
                    });
            }
        }
    ]);
})();
