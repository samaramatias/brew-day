'use strict';

(function () {
    var userModule = angular.module('userModule', []);

    /**
     * Factory for user objects.
     */
    userModule.factory('User', [function () {
        var userMetadata = ['full_name'];

        /**
         * Factory constructor of a user.
         *
         * @param {Object} user User object with the user data.
         * @constructor
         */
        function User(user) {
            this.user_metadata = user.user_metadata || {};
            this.app_metadata = user.app_metadata || {};
            Object.assign(this, user);
        }

        User.prototype.constructor = User;

        /**
         * Create getters and setters for user metadata.
         * @private
         */
        User.prototype._organizeMetadata = function () {
            _.each(userMetadata, function (prop) {
                Object.defineProperty(User.prototype, prop, {
                    get: function () {
                        return this.user_metadata[prop]
                    },
                    set: function (newValue) {
                        this.user_metadata[prop] = newValue
                    }
                });
            });
        };

        User.prototype._organizeMetadata();

        return User;
    }]);
})();
