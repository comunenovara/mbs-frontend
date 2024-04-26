import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

import { conaAuthRoutes } from './auth.route';
import { MbsTestComponent } from './components/test/test.component';
import { CommonModule } from '@angular/common';

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
		MbsTestComponent,
	],
	providers: [ ]
})
export class ConaAuthModule {}