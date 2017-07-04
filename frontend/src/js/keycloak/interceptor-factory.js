/**
 * @class
 * Interceptor que se encarga de configurar los headers para los request. Añade
 * el header Autorization con el valor del access token del keycloak.
 * 
 * @name angular-keycloak-seed.keycloak#authInterceptor
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.factory('authInterceptor', function ($q, keycloakLauncher) {
    return {
        request: function (config) {
            var deferred = $q.defer();
            var keycloak = keycloakLauncher.keycloak;
            if (keycloak && keycloak.token) {
                keycloak.updateToken(5)
                    .success(function () {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'Bearer ' + keycloak.token;
                        deferred.resolve(config);
                    }).error(function () {
                        deferred.reject('Failed to refresh token');
                    });
            } else {
                return config;
            }
            return deferred.promise;
        }
    };
});

/**
 *@class
 * Interceptor que se encarga de manejar los errores de las peticiones
 * http.
 * 
 * @name angular-keycloak-seed.keycloak#errorInterceptor
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.factory('errorInterceptor', function ($q, keycloakLauncher) {
    return function (promise) {
        return promise.then(function (response) {
            return response;
        }, function (response) {
            if (response.status == 401) {
                console.log('session timeout?');
                keycloakLauncher.keycloak.logout();
            } else if (response.status == 403) {
                alert("Forbidden");
            } else if (response.status == 404) {
                alert("Not found");
            } else if (response.status) {
                if (response.data && response.data.errorMessage) {
                    alert(response.data.errorMessage);
                } else {
                    alert("An unexpected server error has occurred");
                }
            }
            return $q.reject(response);
        });
    };
});
