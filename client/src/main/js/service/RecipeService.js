'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Service for operations with recipes.
     */
    recipeModule.service('RecipeService', ['$rootScope', '$http', 'Recipe',
        function ($rootScope, $http, Recipe) {
            var self = this;

            var recipeApi = $rootScope.apiRoot + '/recipe';

            /**
             * Load all recipes from the server.
             *
             * @returns {Promise} Promise with all the recipes.
             */
            self.loadRecipes = function () {
                return $http.get(recipeApi)
                    .then(function (response) {
                        var recipes = response.data;
                        return {
                            data: recipes.map(function (recipe) {
                                return new Recipe(recipe);
                            })
                        };
                    });
            };
        }
    ]);
})();
