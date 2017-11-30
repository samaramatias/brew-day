'use strict';

(function () {
    var modalModule = angular.module('modalModule', []);

    /**
     * Service that handles operations with modals.
     */
    modalModule.service('ModalService', ['$mdDialog',
        function ($mdDialog) {
            var self = this;

            /**
             * Open a confirmation modal.
             *
             * @param {String} title Title of the modal.
             * @param {String} message Message that will be displayed in the modal.
             * @returns {Promise} Promise with the modal.
             */
            self.confirm = function (title, message) {
                var modal = $mdDialog.confirm()
                    .title(title)
                    .textContent(message)
                    .multiple(true)
                    .ok('Yes')
                    .cancel('No');

                return $mdDialog.show(modal);
            };
        }
    ]);
})();
