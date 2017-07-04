/**
 * Se encarga de registrar e inicializar la aplicación y el mecanismo de seguirdad.
 * 
 */
angular.element(document).ready(function ($http) {
    App.keycloakLauncher = {
        loggedIn: false
    };
    App.keycloakLauncher.keycloak = new Keycloak('./data/keycloak.json');
    App.keycloakLauncher.keycloak.init({
            onLoad: 'check-sso'
        })
        .success(function () {
            App.keycloakLauncher.loggedIn = App.keycloakLauncher.keycloak.authenticated;
            app.factory('keycloakLauncher', function () {
                return App.keycloakLauncher;
            });
            // se registra la aplicación
            angular.bootstrap(document, [App.MODULE_NAME]);

        }).error(function () {
            window.location.reload();
        });
});
