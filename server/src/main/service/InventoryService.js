'use strict';

(function () {
    var mongoose = require('mongoose');
    var UserService = require('./UserService');
    var _ = require('../util/util');
    var Inventory = mongoose.model('Inventory', require('../model/Inventory'));

    /**
     * Service that handles all the logic and complex operations that involves the inventory.
     */
    var InventoryService = {};

    /**
     * Get the inventory of the user requesting it.
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

                return Inventory.findOne(params).lean().exec();
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
     * Update an existing inventory.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} inventoryId ID of the inventory.
     * @param {Object} inventory Inventory to be updated.
     * @returns {Promise} Promise with the updated inventory.
     */
    InventoryService.updateInventory = function (userToken, inventoryId, inventory) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                return InventoryService._getMongooseInventory(user.user_id, inventoryId)
                    .then(function (inventoryDb) {
                        _.copyModel(inventoryDb, inventory);

                        return inventoryDb.save()
                            .then(function (persistedInventory) {
                                return persistedInventory.toObject();
                            });
                    });
            });
    };

    /**
     * Delete an ingredient from the inventory of the user that has the given ID.
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

    /**
     * Private method to retrieve an inventory as a Mongoose object.
     *
     * @param {int} userId ID of the user that has the inventory.
     * @param {int} inventoryId ID of the inventory.
     * @returns {Promise} Promise with the result of the operation.
     * @private
     */
    InventoryService._getMongooseInventory = function (userId, inventoryId) {
        var params = {
            userId: userId,
            _id: inventoryId
        };

        return Inventory.findOne(params).exec();
    };

    module.exports = InventoryService;
})();