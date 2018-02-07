'use strict';

(function () {
    var brewModule = angular.module('brewModule');

    /**
     * Service for operations with brews.
     */
    brewModule.service('BrewService', ['$rootScope', '$http', 'Brew',
        function ($rootScope, $http, Brew) {
            var self = this;

            var brewApi = $rootScope.apiRoot + '/brew';

            /**
             * Load all brews from the server.
             *
             * @returns {Promise} Promise with all the brews.
             */
            self.loadBrews = function () {
                return $http.get(brewApi)
                    .then(function (response) {
                        var brews = response.data;
                        return {
                            data: brews.map(function (brew) {
                                return new Brew(brew);
                            })
                        };
                    });
            };

            /**
             * Load a brew from the server.
             *
             * @param {int} brewId ID of the brew.
             * @returns {Promise} Promise with the brew.
             */
            self.loadBrew = function (brewId) {
                return $http.get(brewApi + '/' + brewId)
                    .then(function (response) {
                        return {
                            data: new Brew(response.data)
                        };
                    });
            };

            /**
             * Create a new brew.
             *
             * @param {Object} brew Brew to be created.
             * @returns {Promise} Promise with the created brew.
             */
            self.createBrew = function (brew) {
                return $http.post(brewApi, brew)
                    .then(function (response) {
                        return {
                            data: new Brew(response.data)
                        }
                    });
            };

            /**
             * Update an existing brew.
             *
             * @param {Object} brew Brew to be updated.
             * @returns {Promise} Promise with the updated brew.
             */
            self.updateBrew = function (brew) {
                return $http.put(brewApi + '/' + brew._id, brew)
                    .then(function (response) {
                        return {
                            data: new Brew(response.data)
                        }
                    });
            };

            /**
             * Delete a brew.
             *
             * @param {int} brewId ID of the brew.
             * @returns {Promise} Promise with the result of the operation.
             */
            self.deleteBrew = function (brewId) {
                return $http.delete(brewApi + '/' + brewId);
            };
        }
    ]);
})();
