'use strict';

(function () {
    var userModule = angular.module('userModule', []);

    /**
     * Factory for user objects.
     */
    userModule.factory('User', [function () {
        var self = this;

        var userMetadata = ['full_name'];

        /**
         * Factory constructor of a user.
         *
         * @param {Object} user User object with the user data.
         * @constructor
         */
        function User(user) {
            self.user_metadata = user.user_metadata || {};
            self.app_metadata = user.app_metadata || {};
            Object.assign(this, user);
        }

        /**
         * Create getters and setters for user metadata.
         */
        User.prototype.organizeMetadata = function () {
            _.each(userMetadata, function (prop) {
                User.prototype.__defineGetter__(prop, function () {
                    return self.user_metadata[prop];
                });

                User.prototype.__defineSetter__(prop, function (value) {
                    self.user_metadata[prop] = value;
                });
            });
        };

        User.prototype.constructor = User;

        User.prototype.organizeMetadata();

        return User;
    }]);
})();
