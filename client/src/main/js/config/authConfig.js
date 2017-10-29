'use strict';

(function () {
    var brewDayApp = angular.module('brewDayApp');

    brewDayApp.config(['$urlRouterProvider', '$provide', 'angularAuth0Provider', '$httpProvider', 'jwtInterceptorProvider', 'jwtOptionsProvider',
        function ($urlRouterProvider, $provide, angularAuth0Provider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
            angularAuth0Provider.init({
                domain: AUTH0_DOMAIN,
                clientID: AUTH0_CLIENT_ID
            });
        }
    ]);
})();
