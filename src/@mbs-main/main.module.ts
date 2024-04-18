import { NgModule } from '@angular/core';

import { EngeCommonLibModule } from '@enge/common-lib';

import { MbsMainAutocompleteService } from './service/main-auto-complete.service';

import { MbsAssetListLoaderComponent } from './components/asset/asset-list-loader/asset-list-loader.component';
import { MbsAssetDetailBoxComponent } from './components/asset/asset-detail-box/asset-detail-box.component';
import { MbsAssetDisplayColumnComponent } from './components/asset/asset-display-column/asset-display-column.component';
import { MbsAssetNewUpdateFormComponent } from './components/asset/asset-new-update-form/asset-new-update-form.component';
import { MbsAssetResourceService } from './services/asset.service';
import { MbsAssetResolver } from './resolvers/asset.resolver';

import { MbsRelifListLoaderComponent } from './components/relif/relif-list-loader/relif-list-loader.component';
import { MbsRelifDetailBoxComponent } from './components/relif/relif-detail-box/relif-detail-box.component';
import { MbsRelifDisplayColumnComponent } from './components/relif/relif-display-column/relif-display-column.component';
import { MbsRelifNewUpdateFormComponent } from './components/relif/relif-new-update-form/relif-new-update-form.component';
import { MbsRelifResourceService } from './services/relif.service';
import { MbsRelifResolver } from './resolvers/relif.resolver';

import { MbsOperationTypeListLoaderComponent } from './components/operation-type/operation-type-list-loader/operation-type-list-loader.component';
import { MbsOperationTypeDetailBoxComponent } from './components/operation-type/operation-type-detail-box/operation-type-detail-box.component';
import { MbsOperationTypeDisplayColumnComponent } from './components/operation-type/operation-type-display-column/operation-type-display-column.component';
import { MbsOperationTypeNewUpdateFormComponent } from './components/operation-type/operation-type-new-update-form/operation-type-new-update-form.component';
import { MbsOperationTypeResourceService } from './services/operation-type.service';
import { MbsOperationTypeResolver } from './resolvers/operation-type.resolver';

import { MbsOperationListLoaderComponent } from './components/operation/operation-list-loader/operation-list-loader.component';
import { MbsOperationDetailBoxComponent } from './components/operation/operation-detail-box/operation-detail-box.component';
import { MbsOperationDisplayColumnComponent } from './components/operation/operation-display-column/operation-display-column.component';
import { MbsOperationNewUpdateFormComponent } from './components/operation/operation-new-update-form/operation-new-update-form.component';
import { MbsOperationResourceService } from './services/operation.service';
import { MbsOperationResolver } from './resolvers/operation.resolver';

import { MbsDossierTypeListLoaderComponent } from './components/dossier-type/dossier-type-list-loader/dossier-type-list-loader.component';
import { MbsDossierTypeDetailBoxComponent } from './components/dossier-type/dossier-type-detail-box/dossier-type-detail-box.component';
import { MbsDossierTypeDisplayColumnComponent } from './components/dossier-type/dossier-type-display-column/dossier-type-display-column.component';
import { MbsDossierTypeNewUpdateFormComponent } from './components/dossier-type/dossier-type-new-update-form/dossier-type-new-update-form.component';
import { MbsDossierTypeResourceService } from './services/dossier-type.service';
import { MbsDossierTypeResolver } from './resolvers/dossier-type.resolver';

import { MbsElaborateGroupListLoaderComponent } from './components/elaborate-group/elaborate-group-list-loader/elaborate-group-list-loader.component';
import { MbsElaborateGroupDetailBoxComponent } from './components/elaborate-group/elaborate-group-detail-box/elaborate-group-detail-box.component';
import { MbsElaborateGroupDisplayColumnComponent } from './components/elaborate-group/elaborate-group-display-column/elaborate-group-display-column.component';
import { MbsElaborateGroupNewUpdateFormComponent } from './components/elaborate-group/elaborate-group-new-update-form/elaborate-group-new-update-form.component';
import { MbsElaborateGroupResourceService } from './services/elaborate-group.service';
import { MbsElaborateGroupResolver } from './resolvers/elaborate-group.resolver';

import { MbsDossierListLoaderComponent } from './components/dossier/dossier-list-loader/dossier-list-loader.component';
import { MbsDossierDetailBoxComponent } from './components/dossier/dossier-detail-box/dossier-detail-box.component';
import { MbsDossierDisplayColumnComponent } from './components/dossier/dossier-display-column/dossier-display-column.component';
import { MbsDossierNewUpdateFormComponent } from './components/dossier/dossier-new-update-form/dossier-new-update-form.component';
import { MbsDossierResourceService } from './services/dossier.service';
import { MbsDossierResolver } from './resolvers/dossier.resolver';

import { MbsProcurementTypeListLoaderComponent } from './components/procurement-type/procurement-type-list-loader/procurement-type-list-loader.component';
import { MbsProcurementTypeDetailBoxComponent } from './components/procurement-type/procurement-type-detail-box/procurement-type-detail-box.component';
import { MbsProcurementTypeDisplayColumnComponent } from './components/procurement-type/procurement-type-display-column/procurement-type-display-column.component';
import { MbsProcurementTypeNewUpdateFormComponent } from './components/procurement-type/procurement-type-new-update-form/procurement-type-new-update-form.component';
import { MbsProcurementTypeResourceService } from './services/procurement-type.service';
import { MbsProcurementTypeResolver } from './resolvers/procurement-type.resolver';

import { MbsGovernativeProjectListLoaderComponent } from './components/governative-project/governative-project-list-loader/governative-project-list-loader.component';
import { MbsGovernativeProjectDetailBoxComponent } from './components/governative-project/governative-project-detail-box/governative-project-detail-box.component';
import { MbsGovernativeProjectDisplayColumnComponent } from './components/governative-project/governative-project-display-column/governative-project-display-column.component';
import { MbsGovernativeProjectNewUpdateFormComponent } from './components/governative-project/governative-project-new-update-form/governative-project-new-update-form.component';
import { MbsGovernativeProjectResourceService } from './services/governative-project.service';
import { MbsGovernativeProjectResolver } from './resolvers/governative-project.resolver';

import { MbsGovernativeProcurementLotListLoaderComponent } from './components/governative-procurement-lot/governative-procurement-lot-list-loader/governative-procurement-lot-list-loader.component';
import { MbsGovernativeProcurementLotDetailBoxComponent } from './components/governative-procurement-lot/governative-procurement-lot-detail-box/governative-procurement-lot-detail-box.component';
import { MbsGovernativeProcurementLotDisplayColumnComponent } from './components/governative-procurement-lot/governative-procurement-lot-display-column/governative-procurement-lot-display-column.component';
import { MbsGovernativeProcurementLotNewUpdateFormComponent } from './components/governative-procurement-lot/governative-procurement-lot-new-update-form/governative-procurement-lot-new-update-form.component';
import { MbsGovernativeProcurementLotResourceService } from './services/governative-procurement-lot.service';
import { MbsGovernativeProcurementLotResolver } from './resolvers/governative-procurement-lot.resolver';

import { MbsGovernativeProjectProcurementLotListLoaderComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-list-loader/governative-project-procurement-lot-list-loader.component';
import { MbsGovernativeProjectProcurementLotDetailBoxComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-detail-box/governative-project-procurement-lot-detail-box.component';
import { MbsGovernativeProjectProcurementLotDisplayColumnComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-display-column/governative-project-procurement-lot-display-column.component';
import { MbsGovernativeProjectProcurementLotNewUpdateFormComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-new-update-form/governative-project-procurement-lot-new-update-form.component';
import { MbsGovernativeProjectProcurementLotResourceService } from './services/governative-project-procurement-lot.service';
import { MbsGovernativeProjectProcurementLotResolver } from './resolvers/governative-project-procurement-lot.resolver';

import { MbsIncentiveBeneficiaryListLoaderComponent } from './components/incentive-beneficiary/incentive-beneficiary-list-loader/incentive-beneficiary-list-loader.component';
import { MbsIncentiveBeneficiaryDetailBoxComponent } from './components/incentive-beneficiary/incentive-beneficiary-detail-box/incentive-beneficiary-detail-box.component';
import { MbsIncentiveBeneficiaryDisplayColumnComponent } from './components/incentive-beneficiary/incentive-beneficiary-display-column/incentive-beneficiary-display-column.component';
import { MbsIncentiveBeneficiaryNewUpdateFormComponent } from './components/incentive-beneficiary/incentive-beneficiary-new-update-form/incentive-beneficiary-new-update-form.component';
import { MbsIncentiveBeneficiaryResourceService } from './services/incentive-beneficiary.service';
import { MbsIncentiveBeneficiaryResolver } from './resolvers/incentive-beneficiary.resolver';

import { MbsIncentiveRegulationListLoaderComponent } from './components/incentive-regulation/incentive-regulation-list-loader/incentive-regulation-list-loader.component';
import { MbsIncentiveRegulationDetailBoxComponent } from './components/incentive-regulation/incentive-regulation-detail-box/incentive-regulation-detail-box.component';
import { MbsIncentiveRegulationDisplayColumnComponent } from './components/incentive-regulation/incentive-regulation-display-column/incentive-regulation-display-column.component';
import { MbsIncentiveRegulationNewUpdateFormComponent } from './components/incentive-regulation/incentive-regulation-new-update-form/incentive-regulation-new-update-form.component';
import { MbsIncentiveRegulationResourceService } from './services/incentive-regulation.service';
import { MbsIncentiveRegulationResolver } from './resolvers/incentive-regulation.resolver';

import { MbsIncentiveWithheldListLoaderComponent } from './components/incentive-withheld/incentive-withheld-list-loader/incentive-withheld-list-loader.component';
import { MbsIncentiveWithheldDetailBoxComponent } from './components/incentive-withheld/incentive-withheld-detail-box/incentive-withheld-detail-box.component';
import { MbsIncentiveWithheldDisplayColumnComponent } from './components/incentive-withheld/incentive-withheld-display-column/incentive-withheld-display-column.component';
import { MbsIncentiveWithheldNewUpdateFormComponent } from './components/incentive-withheld/incentive-withheld-new-update-form/incentive-withheld-new-update-form.component';
import { MbsIncentiveWithheldResourceService } from './services/incentive-withheld.service';
import { MbsIncentiveWithheldResolver } from './resolvers/incentive-withheld.resolver';

import { MbsIncentiveCalculationMethodListLoaderComponent } from './components/incentive-calculation-method/incentive-calculation-method-list-loader/incentive-calculation-method-list-loader.component';
import { MbsIncentiveCalculationMethodDetailBoxComponent } from './components/incentive-calculation-method/incentive-calculation-method-detail-box/incentive-calculation-method-detail-box.component';
import { MbsIncentiveCalculationMethodDisplayColumnComponent } from './components/incentive-calculation-method/incentive-calculation-method-display-column/incentive-calculation-method-display-column.component';
import { MbsIncentiveCalculationMethodNewUpdateFormComponent } from './components/incentive-calculation-method/incentive-calculation-method-new-update-form/incentive-calculation-method-new-update-form.component';
import { MbsIncentiveCalculationMethodResourceService } from './services/incentive-calculation-method.service';
import { MbsIncentiveCalculationMethodResolver } from './resolvers/incentive-calculation-method.resolver';

import { MbsIncentiveCalculationFactorListLoaderComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-list-loader/incentive-calculation-factor-list-loader.component';
import { MbsIncentiveCalculationFactorDetailBoxComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-detail-box/incentive-calculation-factor-detail-box.component';
import { MbsIncentiveCalculationFactorDisplayColumnComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-display-column/incentive-calculation-factor-display-column.component';
import { MbsIncentiveCalculationFactorNewUpdateFormComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-new-update-form/incentive-calculation-factor-new-update-form.component';
import { MbsIncentiveCalculationFactorResourceService } from './services/incentive-calculation-factor.service';
import { MbsIncentiveCalculationFactorResolver } from './resolvers/incentive-calculation-factor.resolver';

import { MbsIncentiveStageListLoaderComponent } from './components/incentive-stage/incentive-stage-list-loader/incentive-stage-list-loader.component';
import { MbsIncentiveStageDetailBoxComponent } from './components/incentive-stage/incentive-stage-detail-box/incentive-stage-detail-box.component';
import { MbsIncentiveStageDisplayColumnComponent } from './components/incentive-stage/incentive-stage-display-column/incentive-stage-display-column.component';
import { MbsIncentiveStageNewUpdateFormComponent } from './components/incentive-stage/incentive-stage-new-update-form/incentive-stage-new-update-form.component';
import { MbsIncentiveStageResourceService } from './services/incentive-stage.service';
import { MbsIncentiveStageResolver } from './resolvers/incentive-stage.resolver';

import { MbsIncentiveRoleListLoaderComponent } from './components/incentive-role/incentive-role-list-loader/incentive-role-list-loader.component';
import { MbsIncentiveRoleDetailBoxComponent } from './components/incentive-role/incentive-role-detail-box/incentive-role-detail-box.component';
import { MbsIncentiveRoleDisplayColumnComponent } from './components/incentive-role/incentive-role-display-column/incentive-role-display-column.component';
import { MbsIncentiveRoleNewUpdateFormComponent } from './components/incentive-role/incentive-role-new-update-form/incentive-role-new-update-form.component';
import { MbsIncentiveRoleResourceService } from './services/incentive-role.service';
import { MbsIncentiveRoleResolver } from './resolvers/incentive-role.resolver';

import { MbsIncentiveRegulationValueListLoaderComponent } from './components/incentive-regulation-value/incentive-regulation-value-list-loader/incentive-regulation-value-list-loader.component';
import { MbsIncentiveRegulationValueDetailBoxComponent } from './components/incentive-regulation-value/incentive-regulation-value-detail-box/incentive-regulation-value-detail-box.component';
import { MbsIncentiveRegulationValueDisplayColumnComponent } from './components/incentive-regulation-value/incentive-regulation-value-display-column/incentive-regulation-value-display-column.component';
import { MbsIncentiveRegulationValueNewUpdateFormComponent } from './components/incentive-regulation-value/incentive-regulation-value-new-update-form/incentive-regulation-value-new-update-form.component';
import { MbsIncentiveRegulationValueResourceService } from './services/incentive-regulation-value.service';
import { MbsIncentiveRegulationValueResolver } from './resolvers/incentive-regulation-value.resolver';

import { MbsIncentiveCalculationListLoaderComponent } from './components/incentive-calculation/incentive-calculation-list-loader/incentive-calculation-list-loader.component';
import { MbsIncentiveCalculationDetailBoxComponent } from './components/incentive-calculation/incentive-calculation-detail-box/incentive-calculation-detail-box.component';
import { MbsIncentiveCalculationDisplayColumnComponent } from './components/incentive-calculation/incentive-calculation-display-column/incentive-calculation-display-column.component';
import { MbsIncentiveCalculationNewUpdateFormComponent } from './components/incentive-calculation/incentive-calculation-new-update-form/incentive-calculation-new-update-form.component';
import { MbsIncentiveCalculationResourceService } from './services/incentive-calculation.service';
import { MbsIncentiveCalculationResolver } from './resolvers/incentive-calculation.resolver';

import { MbsIncentiveRoleAssignationListLoaderComponent } from './components/incentive-role-assignation/incentive-role-assignation-list-loader/incentive-role-assignation-list-loader.component';
import { MbsIncentiveRoleAssignationDetailBoxComponent } from './components/incentive-role-assignation/incentive-role-assignation-detail-box/incentive-role-assignation-detail-box.component';
import { MbsIncentiveRoleAssignationDisplayColumnComponent } from './components/incentive-role-assignation/incentive-role-assignation-display-column/incentive-role-assignation-display-column.component';
import { MbsIncentiveRoleAssignationNewUpdateFormComponent } from './components/incentive-role-assignation/incentive-role-assignation-new-update-form/incentive-role-assignation-new-update-form.component';
import { MbsIncentiveRoleAssignationResourceService } from './services/incentive-role-assignation.service';
import { MbsIncentiveRoleAssignationResolver } from './resolvers/incentive-role-assignation.resolver';

import { MbsIncentiveCalculationValueListLoaderComponent } from './components/incentive-calculation-value/incentive-calculation-value-list-loader/incentive-calculation-value-list-loader.component';
import { MbsIncentiveCalculationValueDetailBoxComponent } from './components/incentive-calculation-value/incentive-calculation-value-detail-box/incentive-calculation-value-detail-box.component';
import { MbsIncentiveCalculationValueDisplayColumnComponent } from './components/incentive-calculation-value/incentive-calculation-value-display-column/incentive-calculation-value-display-column.component';
import { MbsIncentiveCalculationValueNewUpdateFormComponent } from './components/incentive-calculation-value/incentive-calculation-value-new-update-form/incentive-calculation-value-new-update-form.component';
import { MbsIncentiveCalculationValueResourceService } from './services/incentive-calculation-value.service';
import { MbsIncentiveCalculationValueResolver } from './resolvers/incentive-calculation-value.resolver';

import { MbsIncentiveAssignationListLoaderComponent } from './components/incentive-assignation/incentive-assignation-list-loader/incentive-assignation-list-loader.component';
import { MbsIncentiveAssignationDetailBoxComponent } from './components/incentive-assignation/incentive-assignation-detail-box/incentive-assignation-detail-box.component';
import { MbsIncentiveAssignationDisplayColumnComponent } from './components/incentive-assignation/incentive-assignation-display-column/incentive-assignation-display-column.component';
import { MbsIncentiveAssignationNewUpdateFormComponent } from './components/incentive-assignation/incentive-assignation-new-update-form/incentive-assignation-new-update-form.component';
import { MbsIncentiveAssignationResourceService } from './services/incentive-assignation.service';
import { MbsIncentiveAssignationResolver } from './resolvers/incentive-assignation.resolver';


@NgModule({
	imports: [ 
		EngeCommonLibModule,
		
	],
	declarations: [
		MbsAssetListLoaderComponent,
		MbsAssetDetailBoxComponent,
		MbsAssetDisplayColumnComponent,
		MbsAssetNewUpdateFormComponent,
		MbsRelifListLoaderComponent,
		MbsRelifDetailBoxComponent,
		MbsRelifDisplayColumnComponent,
		MbsRelifNewUpdateFormComponent,
		MbsOperationTypeListLoaderComponent,
		MbsOperationTypeDetailBoxComponent,
		MbsOperationTypeDisplayColumnComponent,
		MbsOperationTypeNewUpdateFormComponent,
		MbsOperationListLoaderComponent,
		MbsOperationDetailBoxComponent,
		MbsOperationDisplayColumnComponent,
		MbsOperationNewUpdateFormComponent,
		MbsDossierTypeListLoaderComponent,
		MbsDossierTypeDetailBoxComponent,
		MbsDossierTypeDisplayColumnComponent,
		MbsDossierTypeNewUpdateFormComponent,
		MbsElaborateGroupListLoaderComponent,
		MbsElaborateGroupDetailBoxComponent,
		MbsElaborateGroupDisplayColumnComponent,
		MbsElaborateGroupNewUpdateFormComponent,
		MbsDossierListLoaderComponent,
		MbsDossierDetailBoxComponent,
		MbsDossierDisplayColumnComponent,
		MbsDossierNewUpdateFormComponent,
		MbsProcurementTypeListLoaderComponent,
		MbsProcurementTypeDetailBoxComponent,
		MbsProcurementTypeDisplayColumnComponent,
		MbsProcurementTypeNewUpdateFormComponent,
		MbsGovernativeProjectListLoaderComponent,
		MbsGovernativeProjectDetailBoxComponent,
		MbsGovernativeProjectDisplayColumnComponent,
		MbsGovernativeProjectNewUpdateFormComponent,
		MbsGovernativeProcurementLotListLoaderComponent,
		MbsGovernativeProcurementLotDetailBoxComponent,
		MbsGovernativeProcurementLotDisplayColumnComponent,
		MbsGovernativeProcurementLotNewUpdateFormComponent,
		MbsGovernativeProjectProcurementLotListLoaderComponent,
		MbsGovernativeProjectProcurementLotDetailBoxComponent,
		MbsGovernativeProjectProcurementLotDisplayColumnComponent,
		MbsGovernativeProjectProcurementLotNewUpdateFormComponent,
		MbsIncentiveBeneficiaryListLoaderComponent,
		MbsIncentiveBeneficiaryDetailBoxComponent,
		MbsIncentiveBeneficiaryDisplayColumnComponent,
		MbsIncentiveBeneficiaryNewUpdateFormComponent,
		MbsIncentiveRegulationListLoaderComponent,
		MbsIncentiveRegulationDetailBoxComponent,
		MbsIncentiveRegulationDisplayColumnComponent,
		MbsIncentiveRegulationNewUpdateFormComponent,
		MbsIncentiveWithheldListLoaderComponent,
		MbsIncentiveWithheldDetailBoxComponent,
		MbsIncentiveWithheldDisplayColumnComponent,
		MbsIncentiveWithheldNewUpdateFormComponent,
		MbsIncentiveCalculationMethodListLoaderComponent,
		MbsIncentiveCalculationMethodDetailBoxComponent,
		MbsIncentiveCalculationMethodDisplayColumnComponent,
		MbsIncentiveCalculationMethodNewUpdateFormComponent,
		MbsIncentiveCalculationFactorListLoaderComponent,
		MbsIncentiveCalculationFactorDetailBoxComponent,
		MbsIncentiveCalculationFactorDisplayColumnComponent,
		MbsIncentiveCalculationFactorNewUpdateFormComponent,
		MbsIncentiveStageListLoaderComponent,
		MbsIncentiveStageDetailBoxComponent,
		MbsIncentiveStageDisplayColumnComponent,
		MbsIncentiveStageNewUpdateFormComponent,
		MbsIncentiveRoleListLoaderComponent,
		MbsIncentiveRoleDetailBoxComponent,
		MbsIncentiveRoleDisplayColumnComponent,
		MbsIncentiveRoleNewUpdateFormComponent,
		MbsIncentiveRegulationValueListLoaderComponent,
		MbsIncentiveRegulationValueDetailBoxComponent,
		MbsIncentiveRegulationValueDisplayColumnComponent,
		MbsIncentiveRegulationValueNewUpdateFormComponent,
		MbsIncentiveCalculationListLoaderComponent,
		MbsIncentiveCalculationDetailBoxComponent,
		MbsIncentiveCalculationDisplayColumnComponent,
		MbsIncentiveCalculationNewUpdateFormComponent,
		MbsIncentiveRoleAssignationListLoaderComponent,
		MbsIncentiveRoleAssignationDetailBoxComponent,
		MbsIncentiveRoleAssignationDisplayColumnComponent,
		MbsIncentiveRoleAssignationNewUpdateFormComponent,
		MbsIncentiveCalculationValueListLoaderComponent,
		MbsIncentiveCalculationValueDetailBoxComponent,
		MbsIncentiveCalculationValueDisplayColumnComponent,
		MbsIncentiveCalculationValueNewUpdateFormComponent,
		MbsIncentiveAssignationListLoaderComponent,
		MbsIncentiveAssignationDetailBoxComponent,
		MbsIncentiveAssignationDisplayColumnComponent,
		MbsIncentiveAssignationNewUpdateFormComponent,
	],
	providers: [
		MbsMainAutocompleteService,
		MbsAssetResourceService,
		MbsAssetResolver,
		MbsRelifResourceService,
		MbsRelifResolver,
		MbsOperationTypeResourceService,
		MbsOperationTypeResolver,
		MbsOperationResourceService,
		MbsOperationResolver,
		MbsDossierTypeResourceService,
		MbsDossierTypeResolver,
		MbsElaborateGroupResourceService,
		MbsElaborateGroupResolver,
		MbsDossierResourceService,
		MbsDossierResolver,
		MbsProcurementTypeResourceService,
		MbsProcurementTypeResolver,
		MbsGovernativeProjectResourceService,
		MbsGovernativeProjectResolver,
		MbsGovernativeProcurementLotResourceService,
		MbsGovernativeProcurementLotResolver,
		MbsGovernativeProjectProcurementLotResourceService,
		MbsGovernativeProjectProcurementLotResolver,
		MbsIncentiveBeneficiaryResourceService,
		MbsIncentiveBeneficiaryResolver,
		MbsIncentiveRegulationResourceService,
		MbsIncentiveRegulationResolver,
		MbsIncentiveWithheldResourceService,
		MbsIncentiveWithheldResolver,
		MbsIncentiveCalculationMethodResourceService,
		MbsIncentiveCalculationMethodResolver,
		MbsIncentiveCalculationFactorResourceService,
		MbsIncentiveCalculationFactorResolver,
		MbsIncentiveStageResourceService,
		MbsIncentiveStageResolver,
		MbsIncentiveRoleResourceService,
		MbsIncentiveRoleResolver,
		MbsIncentiveRegulationValueResourceService,
		MbsIncentiveRegulationValueResolver,
		MbsIncentiveCalculationResourceService,
		MbsIncentiveCalculationResolver,
		MbsIncentiveRoleAssignationResourceService,
		MbsIncentiveRoleAssignationResolver,
		MbsIncentiveCalculationValueResourceService,
		MbsIncentiveCalculationValueResolver,
		MbsIncentiveAssignationResourceService,
		MbsIncentiveAssignationResolver,
		
	],
	exports: [
		MbsAssetListLoaderComponent,
		MbsAssetDetailBoxComponent,
		MbsAssetDisplayColumnComponent,
		MbsAssetNewUpdateFormComponent,
		MbsRelifListLoaderComponent,
		MbsRelifDetailBoxComponent,
		MbsRelifDisplayColumnComponent,
		MbsRelifNewUpdateFormComponent,
		MbsOperationTypeListLoaderComponent,
		MbsOperationTypeDetailBoxComponent,
		MbsOperationTypeDisplayColumnComponent,
		MbsOperationTypeNewUpdateFormComponent,
		MbsOperationListLoaderComponent,
		MbsOperationDetailBoxComponent,
		MbsOperationDisplayColumnComponent,
		MbsOperationNewUpdateFormComponent,
		MbsDossierTypeListLoaderComponent,
		MbsDossierTypeDetailBoxComponent,
		MbsDossierTypeDisplayColumnComponent,
		MbsDossierTypeNewUpdateFormComponent,
		MbsElaborateGroupListLoaderComponent,
		MbsElaborateGroupDetailBoxComponent,
		MbsElaborateGroupDisplayColumnComponent,
		MbsElaborateGroupNewUpdateFormComponent,
		MbsDossierListLoaderComponent,
		MbsDossierDetailBoxComponent,
		MbsDossierDisplayColumnComponent,
		MbsDossierNewUpdateFormComponent,
		MbsProcurementTypeListLoaderComponent,
		MbsProcurementTypeDetailBoxComponent,
		MbsProcurementTypeDisplayColumnComponent,
		MbsProcurementTypeNewUpdateFormComponent,
		MbsGovernativeProjectListLoaderComponent,
		MbsGovernativeProjectDetailBoxComponent,
		MbsGovernativeProjectDisplayColumnComponent,
		MbsGovernativeProjectNewUpdateFormComponent,
		MbsGovernativeProcurementLotListLoaderComponent,
		MbsGovernativeProcurementLotDetailBoxComponent,
		MbsGovernativeProcurementLotDisplayColumnComponent,
		MbsGovernativeProcurementLotNewUpdateFormComponent,
		MbsGovernativeProjectProcurementLotListLoaderComponent,
		MbsGovernativeProjectProcurementLotDetailBoxComponent,
		MbsGovernativeProjectProcurementLotDisplayColumnComponent,
		MbsGovernativeProjectProcurementLotNewUpdateFormComponent,
		MbsIncentiveBeneficiaryListLoaderComponent,
		MbsIncentiveBeneficiaryDetailBoxComponent,
		MbsIncentiveBeneficiaryDisplayColumnComponent,
		MbsIncentiveBeneficiaryNewUpdateFormComponent,
		MbsIncentiveRegulationListLoaderComponent,
		MbsIncentiveRegulationDetailBoxComponent,
		MbsIncentiveRegulationDisplayColumnComponent,
		MbsIncentiveRegulationNewUpdateFormComponent,
		MbsIncentiveWithheldListLoaderComponent,
		MbsIncentiveWithheldDetailBoxComponent,
		MbsIncentiveWithheldDisplayColumnComponent,
		MbsIncentiveWithheldNewUpdateFormComponent,
		MbsIncentiveCalculationMethodListLoaderComponent,
		MbsIncentiveCalculationMethodDetailBoxComponent,
		MbsIncentiveCalculationMethodDisplayColumnComponent,
		MbsIncentiveCalculationMethodNewUpdateFormComponent,
		MbsIncentiveCalculationFactorListLoaderComponent,
		MbsIncentiveCalculationFactorDetailBoxComponent,
		MbsIncentiveCalculationFactorDisplayColumnComponent,
		MbsIncentiveCalculationFactorNewUpdateFormComponent,
		MbsIncentiveStageListLoaderComponent,
		MbsIncentiveStageDetailBoxComponent,
		MbsIncentiveStageDisplayColumnComponent,
		MbsIncentiveStageNewUpdateFormComponent,
		MbsIncentiveRoleListLoaderComponent,
		MbsIncentiveRoleDetailBoxComponent,
		MbsIncentiveRoleDisplayColumnComponent,
		MbsIncentiveRoleNewUpdateFormComponent,
		MbsIncentiveRegulationValueListLoaderComponent,
		MbsIncentiveRegulationValueDetailBoxComponent,
		MbsIncentiveRegulationValueDisplayColumnComponent,
		MbsIncentiveRegulationValueNewUpdateFormComponent,
		MbsIncentiveCalculationListLoaderComponent,
		MbsIncentiveCalculationDetailBoxComponent,
		MbsIncentiveCalculationDisplayColumnComponent,
		MbsIncentiveCalculationNewUpdateFormComponent,
		MbsIncentiveRoleAssignationListLoaderComponent,
		MbsIncentiveRoleAssignationDetailBoxComponent,
		MbsIncentiveRoleAssignationDisplayColumnComponent,
		MbsIncentiveRoleAssignationNewUpdateFormComponent,
		MbsIncentiveCalculationValueListLoaderComponent,
		MbsIncentiveCalculationValueDetailBoxComponent,
		MbsIncentiveCalculationValueDisplayColumnComponent,
		MbsIncentiveCalculationValueNewUpdateFormComponent,
		MbsIncentiveAssignationListLoaderComponent,
		MbsIncentiveAssignationDetailBoxComponent,
		MbsIncentiveAssignationDisplayColumnComponent,
		MbsIncentiveAssignationNewUpdateFormComponent,
	],
})
export class MbsMainLibModule {}