'use strict';

(function () {
    var brewModule = angular.module('brewModule');

    /**
     * Controller of the brew page.
     */
    brewModule.controller('BrewController', ['$stateParams', '$state', 'BrewService', 'Brew', 'ToastService', 'ModalService',
        function ($stateParams, $state, BrewService, Brew, ToastService, ModalService) {
            var self = this;

            self.brew = new Brew();
            self.brewId = $stateParams.brewId;
            self.editMode = false;
            self.oldBrew = undefined;

            /**
             * Enter or exit the edit mode of a brew.
             */
            self.toggleEditMode = function () {
                self.editMode = !self.editMode;

                if (self.editMode) {
                    self.oldBrew = angular.copy(self.brew);
                } else {
                    self.brew = angular.copy(self.oldBrew);
                }
            };

            /**
             * Delete a brew.
             */
            self.deleteBrew = function () {
                ModalService.confirm('Delete brew?', 'Are you sure you want to delete this brew?')
                    .then(function () {
                        BrewService.deleteBrew(self.brewId)
                            .then(function () {
                                ToastService.successToast('Brew deleted!');
                                $state.go('app.brews');
                            })
                            .catch(function (error) {
                                ToastService.errorToast('Brew could not be deleted.');
                                console.error(error);
                            })
                    });
            };

            /**
             * Update a brew.
             *
             * @param {Object} brewForm HTML form with the brew data.
             */
            self.updateBrew = function (brewForm) {
                if (brewForm.$valid) {
                    BrewService.updateBrew(self.brew)
                        .then(function () {
                            ToastService.successToast('Brew edited!');
                            $state.go('app.brews');
                        })
                        .catch(function (error) {
                            ToastService.errorToast('Brew could not be edited.');
                            console.error(error);
                        });
                }
            };

            /**
             * Load brew from the server.
             *
             * @param {Number} brewId ID of the brew to be loaded.
             */
            self.loadBrew = function (brewId) {
                return BrewService.loadBrew(brewId)
                    .then(function (response) {
                        self.brew = response.data;
                    })
                    .catch(function () {
                        ToastService.errorToast('Brew not found.');
                        $state.go('app.recipes');
                    });
            };

            (function () {
                self.loadBrew(self.brewId);
            })();
        }
    ]);
})();
