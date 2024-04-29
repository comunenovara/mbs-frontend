import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { conaAuthConfig } from '../../auth.module';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    templateUrl: 'callback.component.html'
})
export class ConaAuthLoginCallbackComponent {
    constructor(
        private oauthService: OAuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.oauthService.configure(conaAuthConfig);
        this.completeLogin();
    }
    
    step: number = 1
    errors: string[] = [];

    async completeLogin() {
        try {
            if(this.route.snapshot.queryParams['error']) {
                this.errors.push("Error in login process: " + this.route.snapshot.queryParams['error']);
                this.step = 2
                return;
            }

            if(!this.route.snapshot.queryParams['code']) 
                this.errors.push("Invalid code param");
            if(!this.route.snapshot.queryParams['state']) 
                this.errors.push("Invalid state param");

            if(this.errors.length > 0) {
                this.step = 2
                return;
            }
            
            this.step = 3

            let login = await this.oauthService.tryLogin();
            if(!login) throw new Error('Login error');

            let accessToken = this.oauthService.getAccessToken();
            if(!accessToken) throw new Error('Token error');

            this.step = 5
            console.log(login, accessToken);
            // Gestire se era presente qualche linkd i redirect salvato
            setTimeout(()=>{
                this.router.navigateByUrl("/auth/me");
            }, 1000)
        } catch(e) {
            this.step = 4
        }
    }
}