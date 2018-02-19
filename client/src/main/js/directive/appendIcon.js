'use strict';

(function () {
    var appendIconModule = angular.module('appendIconModule', []);

    /**
     * Directive that appends icons to autocomplete fields.
     */
    appendIconModule.directive('appendIcon', ['$timeout', '$compile', function ($timeout, $compile) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var self = this;

                $timeout(function () {
                    var container = angular.element(elem[0].querySelector('md-input-container'));
                    container.addClass('md-icon-left');
                    var icon = $compile('<md-icon class="material-icons">' + attrs[self.name] + '</md-icon>')(scope);
                    container.append(icon);
                });
            }
        }
    }]);
})();
