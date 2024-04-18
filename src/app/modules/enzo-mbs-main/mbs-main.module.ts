import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MbsMainLibModule, MBS_MAIN_ENDPOINT } from '@mbs-main';
import { EngeCommonAppModule } from '@enge/common-app';

import { enzoMbsMainRoutes } from './mbs-main.route';

import { EnzoAssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';
import { EnzoAssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { EnzoAssetDialogComponent } from './components/asset/asset-dialog/asset-dialog.component';
import { EnzoRelifListPageComponent } from './components/relif/relif-list-page/relif-list-page.component';
import { EnzoRelifDetailPageComponent } from './components/relif/relif-detail-page/relif-detail-page.component';
import { EnzoRelifDialogComponent } from './components/relif/relif-dialog/relif-dialog.component';
import { EnzoOperationTypeListPageComponent } from './components/operation-type/operation-type-list-page/operation-type-list-page.component';
import { EnzoOperationTypeDetailPageComponent } from './components/operation-type/operation-type-detail-page/operation-type-detail-page.component';
import { EnzoOperationTypeDialogComponent } from './components/operation-type/operation-type-dialog/operation-type-dialog.component';
import { EnzoOperationListPageComponent } from './components/operation/operation-list-page/operation-list-page.component';
import { EnzoOperationDetailPageComponent } from './components/operation/operation-detail-page/operation-detail-page.component';
import { EnzoOperationDialogComponent } from './components/operation/operation-dialog/operation-dialog.component';
import { EnzoDossierTypeListPageComponent } from './components/dossier-type/dossier-type-list-page/dossier-type-list-page.component';
import { EnzoDossierTypeDetailPageComponent } from './components/dossier-type/dossier-type-detail-page/dossier-type-detail-page.component';
import { EnzoDossierTypeDialogComponent } from './components/dossier-type/dossier-type-dialog/dossier-type-dialog.component';
import { EnzoElaborateGroupListPageComponent } from './components/elaborate-group/elaborate-group-list-page/elaborate-group-list-page.component';
import { EnzoElaborateGroupDetailPageComponent } from './components/elaborate-group/elaborate-group-detail-page/elaborate-group-detail-page.component';
import { EnzoElaborateGroupDialogComponent } from './components/elaborate-group/elaborate-group-dialog/elaborate-group-dialog.component';
import { EnzoDossierListPageComponent } from './components/dossier/dossier-list-page/dossier-list-page.component';
import { EnzoDossierDetailPageComponent } from './components/dossier/dossier-detail-page/dossier-detail-page.component';
import { EnzoDossierDialogComponent } from './components/dossier/dossier-dialog/dossier-dialog.component';
import { EnzoProcurementTypeListPageComponent } from './components/procurement-type/procurement-type-list-page/procurement-type-list-page.component';
import { EnzoProcurementTypeDetailPageComponent } from './components/procurement-type/procurement-type-detail-page/procurement-type-detail-page.component';
import { EnzoProcurementTypeDialogComponent } from './components/procurement-type/procurement-type-dialog/procurement-type-dialog.component';
import { EnzoGovernativeProjectListPageComponent } from './components/governative-project/governative-project-list-page/governative-project-list-page.component';
import { EnzoGovernativeProjectDetailPageComponent } from './components/governative-project/governative-project-detail-page/governative-project-detail-page.component';
import { EnzoGovernativeProjectDialogComponent } from './components/governative-project/governative-project-dialog/governative-project-dialog.component';
import { EnzoGovernativeProcurementLotListPageComponent } from './components/governative-procurement-lot/governative-procurement-lot-list-page/governative-procurement-lot-list-page.component';
import { EnzoGovernativeProcurementLotDetailPageComponent } from './components/governative-procurement-lot/governative-procurement-lot-detail-page/governative-procurement-lot-detail-page.component';
import { EnzoGovernativeProcurementLotDialogComponent } from './components/governative-procurement-lot/governative-procurement-lot-dialog/governative-procurement-lot-dialog.component';
import { EnzoGovernativeProjectProcurementLotListPageComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-list-page/governative-project-procurement-lot-list-page.component';
import { EnzoGovernativeProjectProcurementLotDetailPageComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-detail-page/governative-project-procurement-lot-detail-page.component';
import { EnzoGovernativeProjectProcurementLotDialogComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-dialog/governative-project-procurement-lot-dialog.component';
import { EnzoIncentiveBeneficiaryListPageComponent } from './components/incentive-beneficiary/incentive-beneficiary-list-page/incentive-beneficiary-list-page.component';
import { EnzoIncentiveBeneficiaryDetailPageComponent } from './components/incentive-beneficiary/incentive-beneficiary-detail-page/incentive-beneficiary-detail-page.component';
import { EnzoIncentiveBeneficiaryDialogComponent } from './components/incentive-beneficiary/incentive-beneficiary-dialog/incentive-beneficiary-dialog.component';
import { EnzoIncentiveRegulationListPageComponent } from './components/incentive-regulation/incentive-regulation-list-page/incentive-regulation-list-page.component';
import { EnzoIncentiveRegulationDetailPageComponent } from './components/incentive-regulation/incentive-regulation-detail-page/incentive-regulation-detail-page.component';
import { EnzoIncentiveRegulationDialogComponent } from './components/incentive-regulation/incentive-regulation-dialog/incentive-regulation-dialog.component';
import { EnzoIncentiveWithheldListPageComponent } from './components/incentive-withheld/incentive-withheld-list-page/incentive-withheld-list-page.component';
import { EnzoIncentiveWithheldDetailPageComponent } from './components/incentive-withheld/incentive-withheld-detail-page/incentive-withheld-detail-page.component';
import { EnzoIncentiveWithheldDialogComponent } from './components/incentive-withheld/incentive-withheld-dialog/incentive-withheld-dialog.component';
import { EnzoIncentiveCalculationMethodListPageComponent } from './components/incentive-calculation-method/incentive-calculation-method-list-page/incentive-calculation-method-list-page.component';
import { EnzoIncentiveCalculationMethodDetailPageComponent } from './components/incentive-calculation-method/incentive-calculation-method-detail-page/incentive-calculation-method-detail-page.component';
import { EnzoIncentiveCalculationMethodDialogComponent } from './components/incentive-calculation-method/incentive-calculation-method-dialog/incentive-calculation-method-dialog.component';
import { EnzoIncentiveCalculationFactorListPageComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-list-page/incentive-calculation-factor-list-page.component';
import { EnzoIncentiveCalculationFactorDetailPageComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-detail-page/incentive-calculation-factor-detail-page.component';
import { EnzoIncentiveCalculationFactorDialogComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-dialog/incentive-calculation-factor-dialog.component';
import { EnzoIncentiveStageListPageComponent } from './components/incentive-stage/incentive-stage-list-page/incentive-stage-list-page.component';
import { EnzoIncentiveStageDetailPageComponent } from './components/incentive-stage/incentive-stage-detail-page/incentive-stage-detail-page.component';
import { EnzoIncentiveStageDialogComponent } from './components/incentive-stage/incentive-stage-dialog/incentive-stage-dialog.component';
import { EnzoIncentiveRoleListPageComponent } from './components/incentive-role/incentive-role-list-page/incentive-role-list-page.component';
import { EnzoIncentiveRoleDetailPageComponent } from './components/incentive-role/incentive-role-detail-page/incentive-role-detail-page.component';
import { EnzoIncentiveRoleDialogComponent } from './components/incentive-role/incentive-role-dialog/incentive-role-dialog.component';
import { EnzoIncentiveRegulationValueListPageComponent } from './components/incentive-regulation-value/incentive-regulation-value-list-page/incentive-regulation-value-list-page.component';
import { EnzoIncentiveRegulationValueDetailPageComponent } from './components/incentive-regulation-value/incentive-regulation-value-detail-page/incentive-regulation-value-detail-page.component';
import { EnzoIncentiveRegulationValueDialogComponent } from './components/incentive-regulation-value/incentive-regulation-value-dialog/incentive-regulation-value-dialog.component';
import { EnzoIncentiveCalculationListPageComponent } from './components/incentive-calculation/incentive-calculation-list-page/incentive-calculation-list-page.component';
import { EnzoIncentiveCalculationDetailPageComponent } from './components/incentive-calculation/incentive-calculation-detail-page/incentive-calculation-detail-page.component';
import { EnzoIncentiveCalculationDialogComponent } from './components/incentive-calculation/incentive-calculation-dialog/incentive-calculation-dialog.component';
import { EnzoIncentiveRoleAssignationListPageComponent } from './components/incentive-role-assignation/incentive-role-assignation-list-page/incentive-role-assignation-list-page.component';
import { EnzoIncentiveRoleAssignationDetailPageComponent } from './components/incentive-role-assignation/incentive-role-assignation-detail-page/incentive-role-assignation-detail-page.component';
import { EnzoIncentiveRoleAssignationDialogComponent } from './components/incentive-role-assignation/incentive-role-assignation-dialog/incentive-role-assignation-dialog.component';
import { EnzoIncentiveCalculationValueListPageComponent } from './components/incentive-calculation-value/incentive-calculation-value-list-page/incentive-calculation-value-list-page.component';
import { EnzoIncentiveCalculationValueDetailPageComponent } from './components/incentive-calculation-value/incentive-calculation-value-detail-page/incentive-calculation-value-detail-page.component';
import { EnzoIncentiveCalculationValueDialogComponent } from './components/incentive-calculation-value/incentive-calculation-value-dialog/incentive-calculation-value-dialog.component';
import { EnzoIncentiveAssignationListPageComponent } from './components/incentive-assignation/incentive-assignation-list-page/incentive-assignation-list-page.component';
import { EnzoIncentiveAssignationDetailPageComponent } from './components/incentive-assignation/incentive-assignation-detail-page/incentive-assignation-detail-page.component';
import { EnzoIncentiveAssignationDialogComponent } from './components/incentive-assignation/incentive-assignation-dialog/incentive-assignation-dialog.component';

@NgModule({
	imports: [ 
		RouterModule.forChild(enzoMbsMainRoutes),
		MbsMainLibModule,
		EngeCommonAppModule,

	],
	declarations: [
		EnzoAssetListPageComponent,
		EnzoAssetDetailPageComponent,
		EnzoAssetDialogComponent,
		
		EnzoRelifListPageComponent,
		EnzoRelifDetailPageComponent,
		EnzoRelifDialogComponent,
		
		EnzoOperationTypeListPageComponent,
		EnzoOperationTypeDetailPageComponent,
		EnzoOperationTypeDialogComponent,
		
		EnzoOperationListPageComponent,
		EnzoOperationDetailPageComponent,
		EnzoOperationDialogComponent,
		
		EnzoDossierTypeListPageComponent,
		EnzoDossierTypeDetailPageComponent,
		EnzoDossierTypeDialogComponent,
		
		EnzoElaborateGroupListPageComponent,
		EnzoElaborateGroupDetailPageComponent,
		EnzoElaborateGroupDialogComponent,
		
		EnzoDossierListPageComponent,
		EnzoDossierDetailPageComponent,
		EnzoDossierDialogComponent,
		
		EnzoProcurementTypeListPageComponent,
		EnzoProcurementTypeDetailPageComponent,
		EnzoProcurementTypeDialogComponent,
		
		EnzoGovernativeProjectListPageComponent,
		EnzoGovernativeProjectDetailPageComponent,
		EnzoGovernativeProjectDialogComponent,
		
		EnzoGovernativeProcurementLotListPageComponent,
		EnzoGovernativeProcurementLotDetailPageComponent,
		EnzoGovernativeProcurementLotDialogComponent,
		
		EnzoGovernativeProjectProcurementLotListPageComponent,
		EnzoGovernativeProjectProcurementLotDetailPageComponent,
		EnzoGovernativeProjectProcurementLotDialogComponent,
		
		EnzoIncentiveBeneficiaryListPageComponent,
		EnzoIncentiveBeneficiaryDetailPageComponent,
		EnzoIncentiveBeneficiaryDialogComponent,
		
		EnzoIncentiveRegulationListPageComponent,
		EnzoIncentiveRegulationDetailPageComponent,
		EnzoIncentiveRegulationDialogComponent,
		
		EnzoIncentiveWithheldListPageComponent,
		EnzoIncentiveWithheldDetailPageComponent,
		EnzoIncentiveWithheldDialogComponent,
		
		EnzoIncentiveCalculationMethodListPageComponent,
		EnzoIncentiveCalculationMethodDetailPageComponent,
		EnzoIncentiveCalculationMethodDialogComponent,
		
		EnzoIncentiveCalculationFactorListPageComponent,
		EnzoIncentiveCalculationFactorDetailPageComponent,
		EnzoIncentiveCalculationFactorDialogComponent,
		
		EnzoIncentiveStageListPageComponent,
		EnzoIncentiveStageDetailPageComponent,
		EnzoIncentiveStageDialogComponent,
		
		EnzoIncentiveRoleListPageComponent,
		EnzoIncentiveRoleDetailPageComponent,
		EnzoIncentiveRoleDialogComponent,
		
		EnzoIncentiveRegulationValueListPageComponent,
		EnzoIncentiveRegulationValueDetailPageComponent,
		EnzoIncentiveRegulationValueDialogComponent,
		
		EnzoIncentiveCalculationListPageComponent,
		EnzoIncentiveCalculationDetailPageComponent,
		EnzoIncentiveCalculationDialogComponent,
		
		EnzoIncentiveRoleAssignationListPageComponent,
		EnzoIncentiveRoleAssignationDetailPageComponent,
		EnzoIncentiveRoleAssignationDialogComponent,
		
		EnzoIncentiveCalculationValueListPageComponent,
		EnzoIncentiveCalculationValueDetailPageComponent,
		EnzoIncentiveCalculationValueDialogComponent,
		
		EnzoIncentiveAssignationListPageComponent,
		EnzoIncentiveAssignationDetailPageComponent,
		EnzoIncentiveAssignationDialogComponent,
		
	],
	providers: [
		{
			provide: MBS_MAIN_ENDPOINT,
			useValue: 'http://localhost:3000/mbs/main'
		}
	]
})
export class EnzoMbsMainModule {}