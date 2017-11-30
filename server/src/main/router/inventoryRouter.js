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
     * GET /api/inventory.
     * Get the user's inventory.
     *
     * @returns {Promise} Promise with the inventory.
     */
    inventoryRouter.get(['', '/'], function (req, res) {
        // TODO: Implement this. US4 and US5.
        return res.status(_.OK).json({});
    });

    module.exports = inventoryRouter;
})();
