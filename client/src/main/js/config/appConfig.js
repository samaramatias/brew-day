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
            'ingredientModule',
            'inventoryModule',
            'brewModule',
            'loginModule',
            'authModule',
            'userModule',
            'mainToolbarModule',
            'sideMenuModule',
            'toastModule',
            'modalModule'
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
                })
                .state('app.recipe', {
                    url: '/recipe',
                    templateUrl: '/view/recipe.html',
                    controller: 'RecipeController as recipeCtrl'
                })
                .state('app.recipeId', {
                    url: '/recipe/:recipeId',
                    templateUrl: '/view/recipe.html',
                    controller: 'RecipeController as recipeCtrl'
                })
                .state('app.inventory', {
                    url: '/inventory',
                    templateUrl: '/view/inventory.html',
                    controller: 'InventoryController as inventoryCtrl'
                })
                .state('app.brews', {
                    url: '/brews',
                    templateUrl: '/view/brews.html',
                    controller: 'BrewsController as brewsCtrl'
                })
                .state('app.brewId', {
                    url: '/brew/:brewId',
                    templateUrl: '/view/brew.html',
                    controller: 'BrewController as brewCtrl'
                })
                .state('app.should-brew', {
                    url: '/should-brew',
                    templateUrl: '/view/should-brew.html',
                    controller: 'ShouldBrewController as shouldBCtrl'
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
