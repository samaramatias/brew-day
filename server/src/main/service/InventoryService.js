'use strict';

(function () {
    var UserService = require('./UserService');
    var _ = require('../util/util');

    var Ingredient = require('../model/Recipe');

    /**
     * Service that handles all the logic and complex operations that involves the recipe.
     */
    var InventoryService = {};

    /**
     * Get the list of all recipes of the user requesting them.
     *
     * @param {String} userToken Access token of the user.
     * @returns {Promise} Promise with the list of recipes.
     */
    InventoryService.updateIngredient = function (userToken) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Ingredient.find(params).lean().exec();
            });
    };

    /**
     * Get an ingredient of the user that has the given ID.
     *
     * @param {String} userToken    Access token of the user.
     * @param {int} ingredientId    ID of the ingredient.
     * @returns {Promise}           Promise with the ingredient.
     */
    InventoryService.getIngredient = function (userToken, ingredientId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: ingredientId
                };

                return Ingredient.findOne(params).lean().exec();
            });
    };


    /**
     * Update an existing ingredient in user's inventory.
     *
     * @param {String} userToken    Access token of the user.
     * @param {int} ingredientId    ID of the Ingredient.
     * @param {Object} ingredient   Ingredient to be updated.
     * @returns {Promise}           Promise with the updated recipe.
     */
    InventoryService.updateIngredient = function (userToken, ingredientId, ingredient) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                return IngredientService._getMongooseIngredient(user.user_id, ingredientId)
                    .then(function (ingredientDb) {
                        updateModel(ingredientDb, ingredient);

                        return ingredientDb.save()
                            .then(function (persistentIngredient) {
                                return persistentIngredient.toObject();
                            });
                    });

            });
    };

    /**
     * Private method to retrieve an ingredient as a Mongoose object.
     *
     * @param userId        ID of the user that has the recipe.
     * @param ingredientId  ID of the ingredient.
     * @returns {Promise}   Promise with the result of the operation.
     * @private
     */
    InventoryService._getMongooseIngredient = function (userId, ingredientId) {
        var params = {
            userId: userId,
            _id: ingredientId
        };

        return Ingredient.findOne(params).exec();
    };

    module.exports = InventoryService;
})();