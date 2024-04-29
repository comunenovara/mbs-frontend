import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

import { conaAuthConfig } from '../auth.module';

@Injectable({providedIn: 'root'})
export class ConaAuthService {
	constructor(
        private oauthService: OAuthService,
    ) {
        this.oauthService.configure(conaAuthConfig);
    }

}