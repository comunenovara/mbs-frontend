import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EngeCommonAppModule } from '@enge/common-app';
import { EngeCommonLibModule } from '@enge/common-lib';

import { enzoMbsAmmRoutes } from './mbs-amm.route';
import { MbsCigNewFormComponent } from './components/cig-new-form/cig-new-form.component';
import { CreateCigService } from './create-cig.service';

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
		CreateCigService,
		
	]
})
export class EnzoMbsAmmModule {}