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
     * GET /api/inventory/ingredient.
     * Get the list of all ingredients from a user's inventory.
     *
     * @returns {Promise} Promise with the list of ingredients.
     */
    inventoryRouter.get('/ingredient', function (req, res) {
        // TODO: Implement this. US4 and US5.
        return res.status(_.OK).json({});
    });

    module.exports = inventoryRouter;
})();

