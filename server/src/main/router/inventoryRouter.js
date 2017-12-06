'use strict';

(function () {
    var express = require('express');
    var _ = require('../util/util');

    /**
     * Router used to access the inventory entity.
     * URL: /api/inventory
     */
    var inventoryRouter = express.Router();

    /**
     * POST /api/inventory.
     * Create a new inventory.
     *
     * @returns {Promise} Promise with the new inventory.
     */
    inventoryRouter.post(['', '/'], function (req, res) {
        return InventoryService.createInventory(_.getToken(req), req.body)
            .then(function (response) {
                return res.status(_.CREATED).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    module.exports = inventoryRouter;
})();

