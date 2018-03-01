'use strict';

(function () {
    var express = require('express');
    var _ = require('../util/util');

    var BrewService = require('../service/BrewService');

    /**
     * Router used to access the brew entity.
     * URL: /api/brew
     */
    var brewRouter = express.Router();

    /**
     * GET /api/brew.
     * Get the list of all brews of the user requesting them.
     *
     * @returns {Promise} Promise with the list of brews.
     */
    brewRouter.get(['', '/'], function (req, res) {
        return BrewService.getBrews(_.getToken(req))
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * GET /api/brew/:brewId.
     * Get the brew that has the given ID.
     *
     * @returns {Promise} Promise with the brew.
     */
    brewRouter.get('/:brewId', function (req, res) {
        return BrewService.getBrew(_.getToken(req), req.params.brewId)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * POST /api/brew.
     * Create a new brew.
     *
     * @returns {Promise} Promise with the new brew.
     */
    brewRouter.post(['', '/'], function (req, res) {
        return BrewService.createBrew(_.getToken(req), req.body)
            .then(function (response) {
                return res.status(_.CREATED).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * PUT /api/brew/:brewId
     * Update an existing brew. Only brew notes can be updated.
     *
     * @returns {Promise} Promise with the updated brew.
     */
    brewRouter.put('/:brewId', function (req, res) {
        return BrewService.updateBrew(_.getToken(req), req.params.brewId, req.body)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * DELETE /api/brew/:brewId
     * Delete the brew that has the given ID.
     *
     * @returns {Promise} Promise with the result of the operation.
     */
    brewRouter.delete('/:brewId', function (req, res) {
        return BrewService.deleteBrew(_.getToken(req), req.params.brewId)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    module.exports = brewRouter;
})();

