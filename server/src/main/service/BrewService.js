'use strict';

(function () {
    var mongoose = require('mongoose');
    var UserService = require('./UserService');
    var InventoryService = require('./InventoryService');
    var _ = require('../util/util');
    var Brew = mongoose.model('Brew', require('../model/Brew'));
    var Ingredient = mongoose.model('Ingredient', require('../model/Ingredient'));

    /**
     * Service that handles all the logic and complex operations that involves a brew.
     */
    var BrewService = {};

    /**
     * Get the list of all brews of the user requesting them.
     *
     * @param {String} userToken Access token of the user.
     * @returns {Promise} Promise with the list of brews.
     */
    BrewService.getBrews = function (userToken) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Brew.find(params).lean().exec();
            });
    };

    /**
     * Get a brew of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} brewId ID of the brew.
     * @returns {Promise} Promise with the brew.
     */
    BrewService.getBrew = function (userToken, brewId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: brewId
                };
                // TODO remove the console.log
                return Brew.findOne(params).lean().exec();
            });
    };

    /**
     * Create a new brew and save it in the database.
     *
     * @param {String} userToken Access token of the user.
     * @param {Object} brew Brew to be saved.
     * @returns {Promise} Promise with the new brew.
     */
    BrewService.createBrew = function (userToken, brew) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                brew.userId = user.user_id;
                
                return InventoryService.getInventory(userToken)
                    .then(function (inventory) {
                        var error = BrewService._validateCreate(brew, inventory);

                        if (error) {
                            return Promise.reject(error);
                        }

                        return BrewService._updateIngredients(brew, inventory, userToken)
                            .then(function () {
                                return new Brew(brew).save()
                                    .then(function (persistedBrew) {
                                        return persistedBrew.toObject();
                                    });
                            });
                    });
            });
    };

    /**
     * Update an existing brew.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} brewId ID of the brew.
     * @param {Object} brew Brew to be updated.
     * @returns {Promise} Promise with the updated brew.
     */
    BrewService.updateBrew = function (userToken, brewId, brew) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                return BrewService._getMongooseBrew(user.user_id, brewId)
                    .then(function (brewDb) {
                        var error = BrewService._validateUpdate(brew, brewDb);

                        if (error) {
                            return Promise.reject(error);
                        }

                        _.copyModel(brewDb, brew);

                        return brewDb.save()
                            .then(function (persistedBrew) {
                                return persistedBrew.toObject();
                            });
                    });
            });
    };

    /**
     * Delete a brew of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} brewId ID of the brew.
     * @returns {Promise} Promise with the result of the operation.
     */
    BrewService.deleteBrew = function (userToken, brewId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: brewId
                };

                return Brew.remove(params).exec();
            });
    };

    /**
     * Validate a create operation.
     *
     * @param {Object} brew Brew to be created.
     * @param {Object} inventory Inventory of the user.
     * @returns {String} Error message, if there is one.
     * @private
     */
    BrewService._validateCreate = function (brew, inventory) {
        var error = '';

        if (!BrewService._canBrew(brew.recipe, inventory)) {
            error = 'Missing ingredients to brew recipe';
        }

        return error;
    };

    /**
     * Validate an update operation.
     *
     * @param {Object} brew Brew to be updated.
     * @param {Object} brewDb Brew that is saved on the db (not updated yet).
     * @returns {String} Error message, if there is one.
     * @private
     */
    BrewService._validateUpdate = function (brew, brewDb) {
        var error = '';

        if (brew.userId !== brewDb.userId) {
            error = 'Field userId can not be changed';
        } else if (brew.recipe._id.toString() !== brewDb.recipe._id.toString()) {
            error = 'Field recipe can not be changed';
        }

        return error;
    };

    /**
     * Check if the user can brew a recipe.
     *
     * @param {Object} recipe Recipe to be checked.
     * @param {Object} inventory Inventory with all the ingredients.
     * @returns {Boolean} True if the user can brew the recipe. False otherwise.
     */
    BrewService._canBrew = function (recipe, inventory) {
        for (var i = 0; i < recipe.ingredients.length; i++) {
            if (!InventoryService.hasIngredient(recipe.ingredients[i], inventory)) {
                return false;
            }
        }
        return true;
    };

    /**
     * Update the quantity of the ingredients in the inventory after brewing a recipe.
     *
     * @param {Object} brew Brew that is being created.
     * @param {Object} inventory Inventory with all the ingredients.
     * @param {String} userToken Access token of the user.
     * @returns {Promise} Promise with the result of the operation.
     * @private
     */
    BrewService._updateIngredients = function (brew, inventory, userToken) {
        _.each(brew.recipe.ingredients, function (ingredient) {
            _.each(inventory.ingredients, function (invIngredient) {
                ingredient = new Ingredient(ingredient);

                if (invIngredient.name === ingredient.name) {
                    var ingQuantity = ingredient.getQuantityInUnit(invIngredient.unit);
                    invIngredient.quantity = (invIngredient.quantity - ingQuantity).toFixed(2);
                }
            });
        });

        return InventoryService.updateInventory(userToken, inventory._id, inventory);
    };

    /**
     * Private method to retrieve a brew as a Mongoose object.
     *
     * @param {String} userId ID of the user that has the brew.
     * @param {int} brewId ID of the brew.
     * @returns {Promise} Promise with the result of the operation.
     * @private
     */
    BrewService._getMongooseBrew = function (userId, brewId) {
        var params = {
            userId: userId,
            _id: brewId
        };

        return Brew.findOne(params).exec();
    };

    module.exports = BrewService;
})();
