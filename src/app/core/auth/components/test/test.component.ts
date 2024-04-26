import { Component, OnInit } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';


@Component({
    templateUrl: './test.component.html'
})
export class MbsTestComponent implements OnInit {
    constructor(
        private oauthService: OAuthService,
    ) { }
    
    ngOnInit(): void {
        this.oauthService.configure(noDiscoveryAuthConfig);
        this.completeLogin();
    }

    userToken: string;

    async startLogin() {
        this.oauthService.initLoginFlow();
        //await this.oauthService.initLoginFlowInPopup({ width: 600 });
    }

    async completeLogin() {
        try {
            let login = await this.oauthService.tryLogin();
            if(login) this.loadUser();
        } catch(e) {}
    }


    loadUser() {
        this.userToken = this.oauthService.getAccessToken();

        console.log("id token", this.oauthService.hasValidIdToken());
        console.log("access token", this.oauthService.hasValidAccessToken());
        console.log("token", this.oauthService.getAccessToken());
    }

    logout() {
        this.oauthService.revokeTokenAndLogout();
    }


}


export const noDiscoveryAuthConfig: AuthConfig = {
    loginUrl: 'https://auth.comune.novara.it/o/authorize',
    tokenEndpoint: 'https://auth.comune.novara.it/o/token/',
    requestAccessToken: true,
    clientId: '2aJ0QTnhqqz7aCnS028piqDF80VPTYRhqfdUIA5N',
    redirectUri: 'http://10.1.20.240/mbs/login/callback',
    scope: 'read write introspection',
    postLogoutRedirectUri: '',
    responseType: 'code',
    showDebugInformation: true,
    oidc: false,
    /*
    //clientId: 'LBvYyqQNMQLylVTqjTevVw52Bmtem580MWkXLC7Z',
    //redirectUri: 'https://srvwebdev.comune.novara.it/apps/public/sample-app/',
    resource: '',
    rngUrl: '',
    
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