/*
 * Se configuran las rutas de la aplicación
 */
app.config(['$routeProvider', '$httpProvider', 'keycloakLauncherProvider',
    function ($routeProvider, $httpProvider, keycloakLauncherProvider) {
        /*
         * Se registran los interceptors de keycloak.
         */
        $httpProvider.interceptors.push('errorInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
        /*
         * Route resolver que se utiliza para restringir las páginas que necesitan 
         * que el usuario este logeado en el sistema para acceder a al misma. 
         */
        var resolve = {
            init: ['keycloakLauncher', '$location', function (keycloakLauncher, $location) {
                if (!keycloakLauncher.loggedIn) {
                    $location.url("/");
                }
            }]
        };

        /*
         * Route resolver que se utiliza para evitar que se accedan a páginas de caracter público
         * cuando el usuario está logeado.
         */
        var publicResolve = {
            init: ['keycloakLauncher', '$location', function (keycloakLauncher, $location) {
                if (keycloakLauncher.loggedIn) {
                    $location.url("/dashboard");
                }
            }]
        };

        /*
         * Se definen las rutas de la aplicación
         */
        $routeProvider
            .when('/', {
                templateUrl: 'partials/public-partial.html',
                resolve: publicResolve
            })
            .when('/dashboard', {
                templateUrl: 'partials/dashboard-partial.html',
                resolve: resolve
            })
            .when('/empresas/', {
                templateUrl: 'partials/empresas/empresa-list-partial.html',
                controller: 'EmpresaListCtrl',
                resolve: resolve
            })
            .when('/empresas/crear', {
                templateUrl: 'partials/empresas/empresa-form-partial.html',
                controller: 'EmpresaFormCtrl',
                resolve: resolve
            })
            .when('/empresas/:id/editar', {
                templateUrl: 'partials/empresas/empresa-form-partial.html',
                controller: 'EmpresaFormCtrl',
                resolve: resolve
            })
            .when('/empresas/:id/ver', {
                templateUrl: 'partials/empresas/empresa-view-partial.html',
                controller: 'EmpresaViewCtrl',
                resolve: resolve
            })
            //finaly
            .otherwise({
                redirectTo: '/dashboard'
            });
}]);


/**
 * Se configura para que google analytis que trackee las páginas visitadas.
 */
app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    // initialise google analytics
    //$window.ga('create', 'UA-XXXXXXXX-X', 'auto');
    // track pageview on state change
    $rootScope.$on('$routeChangeStart', function (event) {
        //$window.ga('send', 'pageview', $location.path());
    });
}]);
