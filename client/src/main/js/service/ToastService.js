'use strict';

(function () {
    var toastModule = angular.module('toastModule', []);

    /**
     * Service that handles operations with toasts.
     */
    toastModule.service('ToastService', ['$mdToast',
        function ($mdToast) {
            var self = this;

            var position = 'top right';
            var delay = 4000;

            /**
             * Show a toast to notify an error to the user.
             *
             * @param {String} message Error message.
             */
            self.errorToast = function (message) {
                self._toast(message, 'danger-toast');
            };

            /**
             * Show a toast to notify a successful action to the user.
             *
             * @param {String} message Success message.
             */
            self.successToast = function (message) {
                self._toast(message, 'success-toast');
            };

            /**
             * Show a toast to warn the user about something.
             *
             * @param {String} message Warning message.
             */
            self.warningToast = function (message) {
                self._toast(message, 'warning-toast');
            };

            /**
             * Show a toast of a certain type.
             *
             * @param {String} message Toast message.
             * @param {String} type Type of toast (danger-toast, success-toast, warning-toast).
             * @private
             */
            self._toast = function (message, type) {
                var toast = $mdToast.simple()
                    .textContent(message)
                    .position(position)
                    .hideDelay(delay)
                    .theme(type);
                $mdToast.show(toast);
            };
        }
    ]);
})();
