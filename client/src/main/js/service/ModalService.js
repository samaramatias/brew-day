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

            /**
             * Open a prompt modal.
             *
             * @param {String} title Title of the modal.
             * @param {String} message Message that will be displayed in the modal.
             * @param {String} placeholder Input placeholder.
             * @returns {Promise} Promise with the modal.
             */
            self.prompt = function (title, message, placeholder) {
                var modal = $mdDialog.prompt()
                    .title(title)
                    .textContent(message)
                    .placeholder(placeholder)
                    .ariaLabel(placeholder)
                    .required(false)
                    .ok('Confirm')
                    .cancel('Cancel');

                return $mdDialog.show(modal);
            };
        }
    ]);
})();
