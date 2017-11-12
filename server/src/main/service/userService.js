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
     * Service that handles all the logic and complex operations that involves the user.
     * This service is also responsible for user caching.
     */
    var UserService = {};

    /**
     * Check if user is cached.
     *
     * @param {Object} user User that will be checked.
     * @returns {Boolean} True if user is cached, false otherwise.
     */
    UserService.isCached = function (user) {
        return _.some(_cache, {value: JSON.stringify(user)});
    };

    /**
     * Add user to the cache.
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
     * Get user from the cache by user ID.
     *
     * @param {String} userId User ID.
     * @returns {Promise} Promise with the user.
     */
    UserService.getUserById = function (userId) {
        return new Promise(function (resolve, reject) {
            if (!_.isEmpty(_idCache[userId])) {
                return resolve(_cacheGet(_idCache, userId));
            }

            return AuthService.getUserById(userId).then(function (response) {
                _cachePut(_idCache, userId, response);
                return response;
            });
        });
    };

    /**
     * Get user from the cache (or from Auth0 in case it's not cached) given its access token.
     *
     * @param {String} accessToken Access token of the user.
     * @returns {Promise} Promise with the user.
     */
    UserService.getUserByAccessToken = function (accessToken) {
        return new Promise(function (resolve, reject) {
            if (_cache[accessToken]) {
                return resolve(JSON.parse(_cacheGet(_cache, accessToken)));
            }

            return AuthService.getUserByAccessToken(accessToken).then(function (response) {
                UserService.cachePut(accessToken, response);
                return response;
            });
        });
    };

    /**
     * Cache cleaner.
     */
    (function () {
        setInterval(function () {
            _cleanCache(_cache);
            _cleanCache(_idCache);
        }, _.THIRTY_MINUTES);
    })();

    module.exports = UserService;
})();
