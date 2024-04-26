import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';

import { conaAuthRoutes } from './auth.route';

import { ConaAuthLoginComponent } from './components/login/login.component';
import { ConaAuthLoginCallbackComponent } from './components/callback/callback.component';
import { MbsTestComponent } from './components/test/test.component';

export const authConfig: AuthConfig = {
    loginUrl: 'https://auth.comune.novara.it/o/authorize',
    tokenEndpoint: 'https://auth.comune.novara.it/o/token/',
    requestAccessToken: true,

    clientId: '2aJ0QTnhqqz7aCnS028piqDF80VPTYRhqfdUIA5N',
    redirectUri: 'http://10.1.20.240/mbs/login/callback',
    responseType: 'code',
    postLogoutRedirectUri: '',
    scope: 'read write introspection',
    oidc: false,
    
    showDebugInformation: false,
};

@NgModule({
	imports: [ 
		CommonModule,
		RouterModule.forChild(conaAuthRoutes),

		OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:3000/'],
                sendAccessToken: true
            },
        }),
		
	],
	declarations: [
		ConaAuthLoginComponent,
		ConaAuthLoginCallbackComponent,
		MbsTestComponent,
	],
	providers: [ ]
})
export class ConaAuthModule {}