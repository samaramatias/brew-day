'use strict';

(function () {
    var brewDayApp = angular.module('brewDayApp',
        [
            'ui.router',
            'ui.mask',
            'ngAnimate',
            'ngAria',
            'ngMaterial',
            'ngMessages',
            'ngSanitize',
            'auth0.auth0',
            'auth0.lock',
            'angular-storage',
            'angular-jwt',
            'angular-loading-bar',

            'appModule',
            'loginModule'
        ]
    );

    brewDayApp.config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
        function ($urlRouterProvider, $stateProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/app/');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: '/view/app.html',
                    controller: 'AppController as appCtrl',
                    resolve: {
                        authCheck: ['angularAuth0', '$state',
                            function (angularAuth0, $state) {
                                if (!angularAuth0.isAuthenticated) {
                                    $state.go('app.login');
                                }
                            }
                        ]
                    }
                })
                .state('app.login', {
                    url: '/',
                    templateUrl: '/view/login.html',
                    controller: 'LoginController as loginCtrl'
                });

            $locationProvider.html5Mode(true);
        }
    ]);
})();
