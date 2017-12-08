'use strict';

(function () {
    var UserService = require('./UserService');
    var _ = require('../util/util');

    var Inventory = require('../model/Inventory');

    /**
     * Service that handles all the logic and complex operations that involves the inventory.
     */
    var InventoryService = {};

    /**
     * Get the list of all recipes of the user requesting them.
     *
     * @param {String} userToken Access token of the user.
     * @returns {Promise} Promise with the list of recipes.
     */
    InventoryService.getInventory= function (userToken) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Recipe.find(params).lean().exec();
            });
    };

    /**
     * Get a recipe of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} recipeId ID of the recipe.
     * @returns {Promise} Promise with the recipe.
     */
     InventoryService.getInventory = function (userToken, recipeId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: recipeId
                };

                return Inventory.findOne(params).lean().exec();
            });
    };

    /**
     * Create a new recipe and save it in the database.
     *
     * @param {String} userToken Access token of the user.
     * @param {Object} recipe Recipe to be saved.
     * @returns {Promise} Promise with the new recipe.
     */
    InventoryService.createInventory= function (userToken, recipe) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                recipe.userId = user.user_id;

                return new Inventory(inventory).save()
                    .then(function (persistedRecipe) {
                        return persistedRecipe.toObject();
                    });
            });
    };

    /**
     * Delete a recipe of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} recipeId ID of the recipe.
     * @returns {Promise} Promise with the result of the operation.
     */
    //InventoryService.deleteInventory = function (userToken, recipeId) {
      //  return UserService.getUserByAccessToken(userToken)
        //    .then(function (user) {
          //      var params = {
         //           userId: user.user_id,
           //         _id: recipeId
             //   };

              //  return Inventory.remove(params).exec();
            //});
    //};

    module.exports = InventoryService;
})();
