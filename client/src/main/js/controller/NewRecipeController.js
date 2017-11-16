'use strict';

(function () {
    var newRecipeModule = angular.module('recipeModule');

    /**
     * Controller of the new recipe page.
     */
    newRecipeModule.controller('NewRecipeController',
        [function () {
            var self = this;

            self.ingredients = [];

            self.recipes = [];

            /**
             * Add a new recipe into database.
             *
             * @param {Object} recipe Recipe object with the recipe data.
             */
            self.addRecipe = function (recipe) {
                recipe.data = new Date();
                recipe.ingredients = self.ingredients;

                // remover após integração com o back
                self.recipes.push(angular.copy(recipe));
                delete self.recipe;
                self.ingredients = [];

                // adicionar $http nos parâmetros
                
                $http({
                    method: 'POST',
                    url: 'http://localhost:8080/recipe',
                    data: recipe
                }).then(function (success){
                    delete self.recipe;
                    self.ingredients = [];
                    //ir para página de receitas
                },function (error){
                    console.log(error);
                });
            };

            /**
             * Add a new ingredient into the ingredients list.
             *
             * @param {Object} ingredient Ingredient object with the ingredient data.
             */
            self.addIngredient = function (ingredient) {
                if(!(_.isUndefined(ingredient.name) || _.isUndefined(ingredient.quantity) || _.isUndefined(ingredient.unit))){
                    self.ingredients.push(angular.copy(ingredient));

                    delete self.ingredient;
                }
            };

            /**
             * Remove the last ingredient from the ingredients list.
             */
            self.removeIngredient = function () {
                self.ingredients.pop();
            };
        }
    ]);
})();