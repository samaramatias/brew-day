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
     * Get the invetory of the user requesting it.
     *
     * @param {String} userToken Access token of the user.
     * @returns {Promise} Promise with the inventory.
     */
    InventoryService.getInventory = function (userToken) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Inventory.find(params).lean().exec();
            });
    };

    /**
     * Create a new inventory and save it in the database.
     *
     * @param {String} userToken Access token of the user.
     * @param {Object} inventory Inventory to be saved.
     * @returns {Promise} Promise with the new inventory.
     */
    InventoryService.createInventory = function (userToken, inventory) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                inventory.userId = user.user_id;

                return new Inventory(inventory).save()
                    .then(function (persistedInventory) {
                        return persistedInventory.toObject();
                    });
            });
    };

    /**
     * Delete an ingredient from inventory of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} ingredientId ID of the ingredient from inventory.
     * @returns {Promise} Promise with the result of the operation.
     */
    InventoryService.deleteIngredient = function (userToken, ingredientId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Inventory.findOne(params).exec()
                    .then(function (inventory) {
                        return inventory.ingredients.id(ingredientId).remove()
                            .then(function () {
                                return inventory.save()
                                    .then(function (persistedInventory) {
                                        return persistedInventory.toObject();
                                    });
                            });
                    });
            });
    };

    module.exports = InventoryService;
})();