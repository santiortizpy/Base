/**
 * @class
 * @name angular-keycloak-seed.keycloak#keycloakLauncher
 * @author <a href = "mailto:maximiliano.baez@konecta.com.py">Maximiliano Báez</a>
 */
app.provider('keycloakLauncher', function keycloakLauncherProvider() {
    this.keycloak = {};
    this.loggedIn = false;
    this.logoutUrl = "/";

    this.$get = function () {
        var keycloak = this.keycloak;
        var loggedIn = this.loggedIn;
        //var logoutUrl
        return {
            keycloak: keycloak,
            loggedIn: loggedIn,
            logoutUrl: this.logoutUrl
        };
    };
});
