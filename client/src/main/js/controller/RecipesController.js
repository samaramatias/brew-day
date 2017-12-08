'use strict';

(function () {
    var recipeModule = angular.module('recipeModule');

    /**
     * Controller of the recipes page.
     */
    recipeModule.controller('RecipesController', ['InventoryService', 'ToastService',
        function (InventoryService, ToastService) {
            var self = this;

            self.recipes = [];

            /**
             * Load recipes from the server.
             */
            self.loadRecipes = function () {
                RecipeService.loadRecipes()
                    .then(function (response) {
                        self.recipes = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Failed to load recipes.');
                    });
            };

            (function () {
                self.loadRecipes();
            })();
        }
    ]);
})();
