/**
 * @class
 * Controller que implementa la lógica del header del portal y maneja la interacción 
 * con la sesión del keycloak
 * 
 * @name angular-keycloak-seed.controller#HeaderCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('HeaderCtrl', ['$scope', '$timeout', 'keycloakLauncher', 'SessionService',
    function ($scope, $timeout, keycloakLauncher, service) {

        /**
         * Contiene la información del usuario logeado en el sistema
         */
        $scope.user = null;

        /**
         * Se encarga de cerrar la sesión del usuario.
         */
        $scope.logout = function () {
            keycloakLauncher.keycloak.logout();
            keycloakLauncher.keycloak = null;
            keycloakLauncher.loggedIn = false;
            $scope.user = null;
        }

        /**
         * Se encarga de verificar si el usuario esta logeado.
         * @returns {boolean} true si esta logeado, false en caso contrario.
         */
        $scope.isLoggedIn = function () {
            return keycloakLauncher.loggedIn;
        }

        /**
         * Se encarga de invocar al login del keycloak
         */
        $scope.login = function () {
            keycloakLauncher.keycloak.login();
        }

        /**
         * Se recupera los datos del usuario logeado y se injecta en la variable user. 
         */
        function initSession() {
            if (!$scope.isLoggedIn()) {
                return;
            }
            getUserInfo();
        }

        /**
         * Se recupera los datos del usuario logeado y se injecta en la variable user. 
         */
        function getUserInfo() {
            keycloakLauncher.keycloak.loadUserInfo()
                .success(function (d) {
                    $scope.user = d;
                    $scope.$apply();
                }).error(function () {
                    Message.error(" user info error");
                });
        }

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            initSession();
            $scope.$watch('user', function () {
                if (!$scope.isLoggedIn()) {
                    initSession();
                }
            });
        })();
}
]);
