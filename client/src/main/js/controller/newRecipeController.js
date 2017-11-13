'use strict';

(function () {
    var newRecipeModule = angular.module('newRecipeModule', ['ngMaterial', 'ngMessages']);

    /**
     * Controller of the new recipe page.
     */

    newRecipeModule.controller('newRecipeCtrl', ['$scope',
        function ($scope) {

            $scope.ingredients = [];

            $scope.recipes = [];

            $scope.addRecipe = function (recipe) {
                recipe.data = new Date();

                recipe.ingredients = $scope.ingredients;

                // remover após integração com o back
                $scope.recipes.push(angular.copy(recipe));

                delete $scope.recipe;
                $scope.ingredients = [];

                // $http({
                //     method: 'POST',
                //     url: 'http://localhost:3412/recipe',
                //     data: recipe
                // }).then(function (success){
                //     delete $scope.recipe;
                //     $scope.ingredients = [];
                //     //ir para página de receitas
                // },function (error){
                //     console.log(error);
                // });
            }

            $scope.addIngredient = function (ingredient) {
                if (ingredient.name != null && ingredient.quantity != null && ingredient.unit != null) {
                    $scope.ingredients.push(angular.copy(ingredient));

                    delete $scope.ingredient;
                }
            };

            $scope.removeIngredient = function () {
                $scope.ingredients.pop();
            };
        }
    ]);
})();


