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
            'auth0',
            'auth0.lock',
            'angular-storage',
            'angular-jwt',
            'angular-loading-bar',
            'appModule',
            'recipeModule',
            'loginModule',
            'authModule',
            'userModule',
            'mainToolbarModule',
            'sideMenuModule',
            'toastModule'
        ]
    );

    brewDayApp.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', '$mdThemingProvider',
        function ($urlRouterProvider, $stateProvider, $locationProvider, $mdThemingProvider) {
            $urlRouterProvider.otherwise('/app/');

            $stateProvider
                .state('app', {
                    abstract: true,
                    url: '/app',
                    templateUrl: '/view/app.html',
                    controller: 'AppController as appCtrl',
                    resolve: {
                        authCheck: ['auth', '$state',
                            function (auth, $state) {
                                if (!auth.isAuthenticated) {
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
                })
                .state('app.recipes', {
                    url: '/recipes',
                    templateUrl: '/view/recipes.html',
                    controller: 'RecipesController as recipesCtrl'
                });

            $locationProvider.html5Mode(true);

            $mdThemingProvider.theme('danger-toast');
            $mdThemingProvider.theme('success-toast');
            $mdThemingProvider.theme('warning-toast');
        }
    ]);

    brewDayApp.run(['$rootScope', function ($rootScope) {
        $rootScope.apiRoot = '/api';
    }]);
})();
