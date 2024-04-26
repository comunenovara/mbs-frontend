import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth.module';


@Component({
    template: ''
})
export class ConaAuthLoginComponent implements OnInit {
    constructor(
        private oauthService: OAuthService,
    ) { }
    
    ngOnInit(): void {
        this.oauthService.configure(authConfig);
        this.oauthService.initLoginFlow();
    }
}


