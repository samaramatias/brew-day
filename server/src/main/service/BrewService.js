'use strict';

(function () {
    var mongoose = require('mongoose');
    var UserService = require('./UserService');
    var _ = require('../util/util');
    var Brew = mongoose.model('Brew', require('../model/Brew'));

    /**
     * Service that handles all the logic and complex operations that involves a brew.
     */
    var BrewService = {};

    /**
     * Get the list of all brews of the user requesting them.
     *
     * @param {String} userToken Access token of the user.
     * @returns {Promise} Promise with the list of brews.
     */
    BrewService.getBrews = function (userToken) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id
                };

                return Brew.find(params).lean().exec();
            });
    };

    /**
     * Get a brew of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} brewId ID of the brew.
     * @returns {Promise} Promise with the brew.
     */
    BrewService.getBrew = function (userToken, brewId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: brewId
                };

                return Brew.findOne(params).lean().exec();
            });
    };

    /**
     * Create a new brew and save it in the database.
     *
     * @param {String} userToken Access token of the user.
     * @param {Object} brew Brew to be saved.
     * @returns {Promise} Promise with the new brew.
     */
    BrewService.createBrew = function (userToken, brew) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                brew.userId = user.user_id;

                return new Brew(brew).save()
                    .then(function (persistedBrew) {
                        return persistedBrew.toObject();
                    });
            });
    };

    /**
     * Update an existing brew.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} brewId ID of the brew.
     * @param {Object} brew Brew to be updated.
     * @returns {Promise} Promise with the updated brew.
     */
    BrewService.updateBrew = function (userToken, brewId, brew) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                return BrewService._getMongooseBrew(user.user_id, brewId)
                    .then(function (brewDb) {
                        var error = BrewService._validateUpdate(brew, brewDb);

                        if (error) {
                            return $q.reject(error);
                        }

                        _.copyModel(brewDb, brew);

                        return brewDb.save()
                            .then(function (persistedBrew) {
                                return persistedBrew.toObject();
                            });
                    });
            });
    };

    /**
     * Delete a brew of the user that has the given ID.
     *
     * @param {String} userToken Access token of the user.
     * @param {int} brewId ID of the brew.
     * @returns {Promise} Promise with the result of the operation.
     */
    BrewService.deleteBrew = function (userToken, brewId) {
        return UserService.getUserByAccessToken(userToken)
            .then(function (user) {
                var params = {
                    userId: user.user_id,
                    _id: brewId
                };

                return Brew.remove(params).exec();
            });
    };

    /**
     * Validate an update operation.
     *
     * @param {Object} brew Brew to be updated.
     * @param {Object} brewDb Brew that is saved on the db (not updated yet).
     * @returns {String} Error message, if there is one.
     * @private
     */
    BrewService._validateUpdate = function (brew, brewDb) {
        var error = '';

        if (brew.userId !== brewDb.userId) {
            error = 'Field userId can not be changed';
        } else if (brew.recipe !== brewDb.recipe) {
            error = 'Field recipe can not be changed';
        }

        return error;
    };

    /**
     * Private method to retrieve a brew as a Mongoose object.
     *
     * @param {String} userId ID of the user that has the brew.
     * @param {int} brewId ID of the brew.
     * @returns {Promise} Promise with the result of the operation.
     * @private
     */
    BrewService._getMongooseBrew = function (userId, brewId) {
        var params = {
            userId: userId,
            _id: brewId
        };

        return Brew.findOne(params).exec();
    };

    module.exports = BrewService;
})();
