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
     * Get the invetory of the user requesting it.
     *
     * @returns {Promise} Promise with the inventory.
     */
    inventoryRouter.get(['', '/'], function (req, res) {
        return InventoryService.getInventory(_.getToken(req))
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

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

    /**
     * PUT /api/inventory/:inventoryId
     * Update an existing inventory.
     *
     * @returns {Promise} Promise with the updated inventory.
     */
    inventoryRouter.put('/:inventoryId', function (req, res) {
        return InventoryService.updateInventory(_.getToken(req), req.params.inventoryId, req.body)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * DELETE /api/inventory/ingredients/:ingredientId
     * Delete the ingredient from inventory that has the given ID.
     *
     * @returns {Promise} Promise with the result of the operation.
     */
    inventoryRouter.delete('/ingredients/:ingredientId', function (req, res) {
        return InventoryService.deleteIngredient(_.getToken(req), req.params.ingredientId)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    module.exports = inventoryRouter;
})();