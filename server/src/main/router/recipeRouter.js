'use strict';

(function () {
    var express = require('express');
    var _ = require('../util/util');

    var RecipeService = require('../service/RecipeService');

    /**
     * Router used to access the recipe entity.
     * URL: /api/recipe
     */
    var recipeRouter = express.Router();

    /**
     * GET /api/recipe.
     * Get the list of all recipes of the user requesting them.
     *
     * @returns {Promise} Promise with the list of recipes.
     */
    recipeRouter.get(['', '/'], function (req, res) {
        return RecipeService.getRecipes(_.getToken(req))
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * GET /api/recipe/:recipeId.
     * Get the recipe that has the given ID.
     *
     * @returns {Promise} Promise with the recipe.
     */
    recipeRouter.get('/:recipeId', function (req, res) {
        return RecipeService.getRecipe(_.getToken(req), req.params.recipeId)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * POST /api/recipe.
     * Create a new recipe.
     *
     * @returns {Promise} Promise with the new recipe.
     */
    recipeRouter.post(['', '/'], function (req, res) {
        return RecipeService.createRecipe(_.getToken(req), req.body)
            .then(function (response) {
                return res.status(_.CREATED).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * PUT /api/recipe/:recipeId
     * Update an existing recipe.
     *
     * @returns {Promise} Promise with the updated recipe.
     */
    recipeRouter.put('/:recipeId', function (req, res) {
        return RecipeService.updateRecipe(_.getToken(req), req.params.recipeId, req.body)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    /**
     * DELETE /api/recipe/:recipeId
     * Delete the recipe that has the given ID.
     *
     * @returns {Promise} Promise with the result of the operation.
     */
    recipeRouter.delete('/:recipeId', function (req, res) {
        return RecipeService.deleteRecipe(_.getToken(req), req.params.recipeId)
            .then(function (response) {
                return res.status(_.OK).json(response);
            })
            .catch(function (error) {
                return res.status(error.status || _.BAD_REQUEST).json(error.message || error);
            });
    });

    module.exports = recipeRouter;
})();

