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
            'newRecipeModule',
            'recipesModule',
            'loginModule',
            'authModule',
            'userModule',
            'mainToolbarModule',
            'sideMenuModule'
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
                        authCheck: ['auth', '$state',
                            function (auth, $state) {
                                if (!auth.isAuthenticated) {
                                    $state.go('app.login');
                                } else {
                                    $state.go('app.recipe');
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
                .state('app.recipe', {
                    url: '/recipe',
                    templateUrl: '/view/recipes.html'
                })

                .state('app.newRecipe', {
                    url: '/newRecipe',
                    templateUrl: '/view/newRecipe.html',
                });

            $locationProvider.html5Mode(true);
        }
    ]);

    brewDayApp.run(['$rootScope', function ($rootScope) {
        $rootScope.apiRoot = '/api';
    }]);
})();
