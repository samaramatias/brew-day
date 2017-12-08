'use strict';

(function () {
    var UserService = require('./UserService');
    var _ = require('../util/util');

    var Ingredient = require('../model/Ingredient');

    /**
     * Service that handles all the logic and complex operations that involves an ingredient.
     */
    var IngredientService = {};

    /**
     * Create a new ingredient and save it in the database.
     *
     * @param {String} userToken Access token of the user.
     * @param {Object} ingreient Ingredient to be saved.
     * @returns {Promise} Promise with the new ingredient.
     */
    IngredientService.createIngredient = function (userToken, ingredient) {
        return UserService.getUserByAccessToken(userToken)
            .then(function () {
                return new Ingredient(ingredient).save()
                    .then(function (persistesIngredient) {
                        return persistesIngredient.toObject();
                    });
            });
    };

    module.exports = IngredientService;
})();