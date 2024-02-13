import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MbsIncentiveLibModule, MBS_INCENTIVE_ENDPOINT } from '@mbs-incentive';
import { EngeCommonAppModule } from '@enge/common-app';

import { enzoMbsIncentiveRoutes } from './mbs-incentive.route';

import { EnzoProcurementTypeListPageComponent } from './components/procurement-type/procurement-type-list-page/procurement-type-list-page.component';
import { EnzoProcurementTypeDetailPageComponent } from './components/procurement-type/procurement-type-detail-page/procurement-type-detail-page.component';
import { EnzoProcurementTypeDialogComponent } from './components/procurement-type/procurement-type-dialog/procurement-type-dialog.component';
import { EnzoIncentiveRegulationListPageComponent } from './components/incentive-regulation/incentive-regulation-list-page/incentive-regulation-list-page.component';
import { EnzoIncentiveRegulationDetailPageComponent } from './components/incentive-regulation/incentive-regulation-detail-page/incentive-regulation-detail-page.component';
import { EnzoIncentiveRegulationDialogComponent } from './components/incentive-regulation/incentive-regulation-dialog/incentive-regulation-dialog.component';
import { EnzoCalculationMethodListPageComponent } from './components/calculation-method/calculation-method-list-page/calculation-method-list-page.component';
import { EnzoCalculationMethodDetailPageComponent } from './components/calculation-method/calculation-method-detail-page/calculation-method-detail-page.component';
import { EnzoCalculationMethodDialogComponent } from './components/calculation-method/calculation-method-dialog/calculation-method-dialog.component';
import { EnzoCalculationFactorListPageComponent } from './components/calculation-factor/calculation-factor-list-page/calculation-factor-list-page.component';
import { EnzoCalculationFactorDetailPageComponent } from './components/calculation-factor/calculation-factor-detail-page/calculation-factor-detail-page.component';
import { EnzoCalculationFactorDialogComponent } from './components/calculation-factor/calculation-factor-dialog/calculation-factor-dialog.component';
import { EnzoWithheldListPageComponent } from './components/withheld/withheld-list-page/withheld-list-page.component';
import { EnzoWithheldDetailPageComponent } from './components/withheld/withheld-detail-page/withheld-detail-page.component';
import { EnzoWithheldDialogComponent } from './components/withheld/withheld-dialog/withheld-dialog.component';
import { EnzoStageListPageComponent } from './components/stage/stage-list-page/stage-list-page.component';
import { EnzoStageDetailPageComponent } from './components/stage/stage-detail-page/stage-detail-page.component';
import { EnzoStageDialogComponent } from './components/stage/stage-dialog/stage-dialog.component';
import { EnzoRoleListPageComponent } from './components/role/role-list-page/role-list-page.component';
import { EnzoRoleDetailPageComponent } from './components/role/role-detail-page/role-detail-page.component';
import { EnzoRoleDialogComponent } from './components/role/role-dialog/role-dialog.component';
import { EnzoRoleValueListPageComponent } from './components/role-value/role-value-list-page/role-value-list-page.component';
import { EnzoRoleValueDetailPageComponent } from './components/role-value/role-value-detail-page/role-value-detail-page.component';
import { EnzoRoleValueDialogComponent } from './components/role-value/role-value-dialog/role-value-dialog.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsIncentiveRoutes),
		MbsIncentiveLibModule,
		EngeCommonAppModule,

	],
	declarations: [
		EnzoProcurementTypeListPageComponent,
		EnzoProcurementTypeDetailPageComponent,
		EnzoProcurementTypeDialogComponent,
		
		EnzoIncentiveRegulationListPageComponent,
		EnzoIncentiveRegulationDetailPageComponent,
		EnzoIncentiveRegulationDialogComponent,
		
		EnzoCalculationMethodListPageComponent,
		EnzoCalculationMethodDetailPageComponent,
		EnzoCalculationMethodDialogComponent,
		
		EnzoCalculationFactorListPageComponent,
		EnzoCalculationFactorDetailPageComponent,
		EnzoCalculationFactorDialogComponent,
		
		EnzoWithheldListPageComponent,
		EnzoWithheldDetailPageComponent,
		EnzoWithheldDialogComponent,
		
		EnzoStageListPageComponent,
		EnzoStageDetailPageComponent,
		EnzoStageDialogComponent,
		
		EnzoRoleListPageComponent,
		EnzoRoleDetailPageComponent,
		EnzoRoleDialogComponent,
		
		EnzoRoleValueListPageComponent,
		EnzoRoleValueDetailPageComponent,
		EnzoRoleValueDialogComponent,
		
	],
	providers: [
		{
			provide: MBS_INCENTIVE_ENDPOINT,
			useValue: 'http://localhost:3000/mbs/incentive'
		}
	]
})
export class EnzoMbsIncentiveModule {}