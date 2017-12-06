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

    module.exports = InventoryService;
})();
