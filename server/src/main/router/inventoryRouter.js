'use strict';

(function () {
    var express = require('express');
    var _ = require('../util/util');
    var InventoryService = require('../service/InventoryService');

    /**
     * Router used to access the inventory entity.
     * URL: /api/inventory
     */
    var inventoryRouter = express.Router();

    /**
     * GET /api/inventory.
     * Get the user's inventory.
     *
     * @returns {Promise} Promise with the inventory.
     */
    inventoryRouter.get(['', '/'], function (req, res) {
        // TODO: Implement this. US4 and US5.
        return res.status(_.OK).json({});
    });

    /**
     * PUT /api/inventory/:ingredientId.
     * Update an existing ingredient.
     *
     * @returns {Promise} Promise with the updated ingredient.
     */
    inventoryRouter.put('/:ingredientId', function (req, res) {
        return InventoryService.updateIngredient(_.getToken(req), req.params.ingredientId, ingredient.body)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });


    module.exports = inventoryRouter;
})();

