import { Component } from '@angular/core';

import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';


@Component({
    templateUrl: './test.component.html'
})
export class MbsTestComponent  {
    constructor(
        private oauthService: OAuthService,
    ) { }
    
    private configureWithoutDiscovery() {
        this.oauthService.configure(noDiscoveryAuthConfig);
        this.oauthService.tokenValidationHandler = new NullValidationHandler();
    }

    async login() {
        try {
            this.configureWithoutDiscovery();
            console.log("hasValidAccessToken", this.oauthService.hasValidAccessToken());
            this.oauthService.initLoginFlow();
            //await this.oauthService.initLoginFlowInPopup({ width: 600 });
        } catch (e) {
            console.log(e);
        }
    }





    get userName(): string | null {
        const claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        return claims['given_name'];
    }

    get idToken(): string {
        return this.oauthService.getIdToken();
    }

    get accessToken(): string {
        return this.oauthService.getAccessToken();
    }

    refresh() {
        this.oauthService.refreshToken();
    }

}


export const noDiscoveryAuthConfig: AuthConfig = {
    loginUrl: 'https://auth.comune.novara.it/o/authorize/latrin',
    clientId: '2aJ0QTnhqqz7aCnS028piqDF80VPTYRhqfdUIA5N',
    redirectUri: 'http://10.1.20.240/mbs/login/callback',
    scope: 'read write introspection',
    postLogoutRedirectUri: '',
    responseType: 'code',
    showDebugInformation: true,
    /*
    //clientId: 'LBvYyqQNMQLylVTqjTevVw52Bmtem580MWkXLC7Z',
    //redirectUri: 'https://srvwebdev.comune.novara.it/apps/public/sample-app/',
    resource: '',
    rngUrl: '',
    oidc: true,
    requestAccessToken: true,
    options: null,
    issuer: 'https://accounts.google.com',
    clearHashAfterLogin: true,
    tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
    userinfoEndpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
    silentRefreshRedirectUri: 'http://localhost:4200/silent-refresh.html',
    silentRefreshMessagePrefix: '',
    silentRefreshShowIFrame: false,
    silentRefreshTimeout: 20000,
    requireHttps: 'remoteOnly',
    strictDiscoveryDocumentValidation: false,
    silentRefreshIFrameName: 'angular-oauth-oidc-silent-refresh-iframe',
    timeoutFactor: 0.75,
    sessionCheckIntervall: 3000,
    sessionCheckIFrameName: 'angular-oauth-oidc-check-session-iframe',
    disableAtHashCheck: false,
    skipSubjectCheck: false,
    */
};
/*
export const authConfig: AuthConfig = {

    // Url of the Identity Provider
    issuer: 'https://auth.comune.novara.it/',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/index.html',

    // The SPA's id. The SPA is registered with this id at the auth-server
    clientId: 'spa',

    responseType: 'code',
    disableAtHashCheck: true,
    scope: 'read write introspection',
    useSilentRefresh: false,
    showDebugInformation: true,
}
*/