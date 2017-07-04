/**
 * @Class
 * Definición del service que se encarga de la comunicación con la capa de servicios 
 * para realizar las operaciones sobre el recurso Empresa.
 *
 * @name gfd.service#UsuarioService
 * @author <a href="mailto:juan.benitez@konecta.com.py">Juan Benitez</a>
 */
app.service('EmpresaService', ['$http', 'BaseService', function ($http, BaseService) {

    return angular.extend({}, BaseService, {
        recurso: "/empresas/",
        /**
         * Se sobrescribe el método base para invocar a la url del recurso paginado.
         * Esto es debido a que se utiliza un json server para simular una api rest.
         * @function
         */
        listar: function (params) {
            return $http.get(App.REST_BASE + "/empresas-paginada/", {
                params: params
            });
        }
    });
}]);
