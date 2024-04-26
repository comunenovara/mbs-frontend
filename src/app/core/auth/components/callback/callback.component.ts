import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../auth.module';


@Component({
    template: ''
})
export class ConaAuthLoginCallbackComponent implements OnInit {
    constructor(
        private oauthService: OAuthService,
    ) { }
    
    ngOnInit(): void {
        this.oauthService.configure(authConfig);
        this.completeLogin();
    }

    userToken: string;

    async completeLogin() {
        try {
            let login = await this.oauthService.tryLogin();
            if(login) this.loadUser();
        } catch(e) {}
    }


    loadUser() {
        this.userToken = this.oauthService.getAccessToken();
        //redirect
    }
}