import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { OAuthModule } from 'angular-oauth2-oidc';

import { EngeCommonAppModule } from '@enge/common-app';
import { EngeCommonLibModule } from '@enge/common-lib';

import { enzoMbsAmmRoutes } from './mbs-amm.route';
import { CreateCigService } from './create-cig.service';

import { MbsCigNewFormComponent } from './components/cig-new-form/cig-new-form.component';
//import { MbsTestComponent } from './components/test/test.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsAmmRoutes),

		EngeCommonAppModule,
		EngeCommonLibModule,

		/*
		OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://localhost:3000/'],
                sendAccessToken: true
            },
        }),
		*/
		
	],
	declarations: [
		MbsCigNewFormComponent,
//		MbsTestComponent,
		
	],
	providers: [
		CreateCigService,
		
	]
})
export class EnzoMbsAmmModule {}