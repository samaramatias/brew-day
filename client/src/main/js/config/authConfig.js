'use strict';

(function () {
    var brewDayApp = angular.module('brewDayApp');

    brewDayApp.config(['$urlRouterProvider', '$provide', 'authProvider', '$httpProvider', 'jwtInterceptorProvider', 'jwtOptionsProvider',
        function ($urlRouterProvider, $provide, authProvider, $httpProvider, jwtInterceptorProvider, jwtOptionsProvider) {
            authProvider.init({
                domain: AUTH0_DOMAIN,
                clientID: AUTH0_CLIENT_ID
            });

            jwtOptionsProvider.config({
                whiteListeDomains: ['localhost', 'brewday.fun'],
                tokenGetter: function () {
                    var token = localStorage.getItem('idToken');
                    return token ? token.toString().replace(/"/g, '') : undefined;
                }
            });

            /**
             * Interceptor to redirect user when a request responds with Unauthorized 401.
             */
            $provide.factory('redirect', ['$q', '$injector', 'store', function ($q, $injector, store) {
                return {
                    responseError: function (rejection) {
                        if (rejection.status === 401) {
                            $injector.get('auth').signout();
                            store.remove('user');
                            store.remove('idToken');
                            store.remove('accessToken');
                            $injector.get('$state').go('app.login');
                        }
                        return rejection;
                    }
                };
            }]);

            /**
             * Interceptor to send the access token of the user to the server.
             */
            $provide.factory('APIInterceptor', ['store', function (store) {
                return {
                    request: function (config) {
                        var accessToken = store.get('accessToken');

                        if (accessToken) {
                            config.headers.access_token = accessToken;
                        }

                        return config;
                    }
                };
            }]);

            $httpProvider.interceptors.push('jwtInterceptor');
            $httpProvider.interceptors.push('redirect');
            $httpProvider.interceptors.push('APIInterceptor');
        }
    ]);

    /**
     * Reauthenticate the user if the token still exists and it's not expired.
     */
    brewDayApp.run(['auth', 'store', 'jwtHelper', function (auth, store, jwtHelper) {
        var token = store.get('idToken');

        if (token && !jwtHelper.isTokenExpired(token) && !auth.isAuthenticated) {
            auth.authenticate(store.get('user'), token);
        }
    }]);
})();
