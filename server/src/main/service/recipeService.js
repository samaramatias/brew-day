'use strict';

(function () {
    var AuthService = require('./authService');
    var _ = require('../util/util');

    var _cache = {};
    var _idCache = {};

    /**
     * Return an element from the cache.
     *
     * @param {Object} cache Cache that holds the element.
     * @param {String} key Key to the requested element.
     * @returns {*} Cache value.
     * @private
     */
    function _cacheGet(cache, key) {
        cache[key].touched = Date.now();
        return cache[key].value;
    }

    /**
     * Put an element in the cache.
     *
     * @param {Object} cache Cache that will store the element.
     * @param {String} key Key to the element that will be stored.
     * @param {*} value Value of the element.
     * @private
     */
    function _cachePut(cache, key, value) {
        cache[key] = {
            value: value,
            touched: Date.now()
        };
    }

    /**
     * Remove elements from the cache that have not been accessed recently.
     *
     * @param {Object} cache Cache that is storing the elements.
     * @private
     */
    function _cleanCache(cache) {
        _.each(cache, function (element, key) {
            if (element.touched + _.THIRTY_MINUTES < Date.now()) {
                delete cache[key];
            }
        });
    }

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
     * @param {String} accessToken Access token of the user.
     * @param {Object} user User to add to the cache.
     */
    UserService.cachePut = function (accessToken, user) {
        if (!_.isEmpty(accessToken) && !_.isEmpty(user)) {
            var userString = JSON.stringify(user);
            var oldAccessToken = _.findKey(_cache, {value: userString});

            if (oldAccessToken) {
                delete _cache[oldAccessToken];
            }

            _cachePut(_cache, accessToken, userString);
            _cachePut(_idCache, user.user_id, user);
        }
    };

    /**
     * Get recipe from the cache by recipe ID.
     *
     * @param {String} recipeId Recipe ID.
     * @returns {Promise} Promise with the recipe.
     */
    UserService.getRecipeById = function (userId) {
        return new Promise(function (resolve, reject) {
            if (!_.isEmpty(_idCache[urecipeId])) {
                return resolve(_cacheGet(_idCache, urecipeId));
            }

            return AuthService.getUserById(urecipeId).then(function (response) {
                _cachePut(_idCache, urecipeId, response);
                return response;
            });
        });
    };

    module.exports = RecipeService;
})();
