import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EngeCommonAppModule } from '@enge/common-app';
import { EngeCommonLibModule } from '@enge/common-lib';

import { enzoMbsAmmRoutes } from './mbs-amm.route';
import { MbsCigNewFormComponent } from './components/cig-new-form/cig-new-form.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsAmmRoutes),
		EngeCommonAppModule,

		EngeCommonLibModule,
		
	],
	declarations: [
		MbsCigNewFormComponent,

	],
	providers: [
		
	]
})
export class EnzoMbsAmmModule {}