/**
 * @class
 * Controller que implementa el formulario administración de empresas
 *
 * @name angular-keycloak-seed.controller#EmpresaFormCtrl
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.controller('EmpresaFormCtrl', ['$scope', 'EmpresaService', '$controller',
    function ($scope, service, $controller) {

        /**
         * Service utilizdo para recuperar los datos y realizar las operaciones.
         * @field
         * @type {Object}
         */
        $scope.service = service;

        /**
         * Url del recurso
         * @field
         * @type {Object}
         */
        $scope.uri = "/empresas/";

        /**
         * Constructor / Entrypoint
         * @constructor
         */
        (function initialize() {
            // se hereda del controller base
            angular.extend(this, $controller('BaseFormCtrl', {
                "$scope": $scope
            }));
        })();
    }
]);
