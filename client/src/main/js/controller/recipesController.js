'use strict';

(function () {
    var newRecipeModule = angular.module('recipesModule', ['ngMaterial', 'ngMessages']);

    /**
     * Controller of the recipes page.
     */

    newRecipeModule.controller('recipesCtrl', ['$scope',
        function ($scope) {

            $scope.recipes = [];

            // após a integração com o back
            // var loadRecipes = function () {
            //     $http({
            //         method: 'GET',
            //         url: 'http://localhost:3412/recipe'
            //     }).then(function (success){
            //         $scope.recipes = success.data;
            //     },function (error){
            //         console.log(error);
            //     });
            // };

            var loadRecipes = function () {
                $scope.recipes = [{ "recipe_id":"1",
                                    "user_id":"1",
                                    "name":"RECEITANOME",
                                    "equipment_volume":234,
                                    "directions":"1. Do something",
                                    "data":"2017-11-13T14:14:58.950Z",
                                    "ingredients":[{"name":"Water",
                                                    "quantity":3,
                                                    "unit":"litros"}]},
                                    {"recipe_id":"3",
                                    "user_id":"133",
                                    "name":"RECEITANOME3",
                                    "equipment_volume":234,
                                    "directions":"1. Do something",
                                    "data":"2017-11-13T14:14:58.950Z",
                                    "ingredients":[{"name":"Water",
                                        "quantity":3,
                                        "unit":"litros"}]},
                                    {"recipe_id":"2",
                                    "user_id":"242",
                                    "name":"RECEITANOME2",
                                    "equipment_volume":234,
                                    "directions":"1. Do something",
                                    "data":"2017-11-13T14:14:58.950Z",
                                    "ingredients":[{"name":"Water",
                                        "quantity":3,
                                        "unit":"litros"}]}];
            };

            loadRecipes();
        }
    ]);
})();