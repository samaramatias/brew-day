'use strict';

(function () {
    var AuthService = require('./authService');
    var _ = require('../util/util');
    var Recipe = mongoose.model('Recipe');

    var _cache = {};
    var _idCache = {};
 
    /**
     * Service that handles all the logic and complex operations that involves the recipe.
     * This service is also responsible for recipe caching.
     */
    var RecipeService = {};

    /**
     * Check if recipe is cached.
     *
     * @param {Object} recipe Recipe that will be checked.
     * @returns {Boolean} True if user is cached, false otherwise.
     */
    UserService.isCached = function (recipe) {
        return _.some(_cache, {value: JSON.stringify(recipe)});
    };

    /**
     * Add recipe to the cache.
     * 
     * @param {Object} recipe Recipe to add to the cache.
     */
    UserService.cachePut = function (recipe) {
        if (!_.isEmpty(accessToken) && !_.isEmpty(recipe)) {
            var recipeString = JSON.stringify(recipe);
            var oldRecipeCache = _.findKey(_cache, {value: recipeString});

            if (oldRecipeCache) {
                delete _cache[oldRecipeCache];
            }

            _cachePut(_idCache, recipe.recipe_id, recipe);
        }
    };

    /**
     * Get recipe from the cache by recipe ID.
     *
     * @param {String} recipeId Recipe ID.
     * @returns {Promise} Promise with the recipe.
     */
    RecipeService.getRecipeById = (recipeId) => {
        return new Promise(function (resolve, reject) {
            if (!_.isEmpty(_idCache[recipeId])) {
                return resolve(_cacheGet(_idCache, recipeId));
            }

            Recipe.findOne(recipeId, function(error, response){
                if (error) { 
                    console.log("error");
                    return res.sendStatus(401);
                 } 
                 response = (!_.isObject(response)) ? JSON.parse(response) : response;
                 RecipeService.cachePut(response);
                 return response;
            });
        });
    };

    /**
    * Persists a recipe in the database.
    *
    * @param   {Recipe} recipe  Recipe to persist.
    * @returns {Promise.<Object>} Resolved promise with persisted recipe.
    * @private
    */
    RecipeService.persistRecipe = recipe => new Promise(
        (resolve, reject) => recipe.save(
            (err, resultado) => (err) ? reject(err) : resolve(resultado.toObject())
        )
    );

    module.exports = RecipeService;
})();
