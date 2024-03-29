import { NgModule } from '@angular/core';

import { EngeCommonLibModule } from '@enge/common-lib';

import { MbsIncentiveAutocompleteService } from './service/incentive-auto-complete.service';

import { MbsProcurementTypeListLoaderComponent } from './components/procurement-type/procurement-type-list-loader/procurement-type-list-loader.component';
import { MbsProcurementTypeDetailBoxComponent } from './components/procurement-type/procurement-type-detail-box/procurement-type-detail-box.component';
import { MbsProcurementTypeDisplayColumnComponent } from './components/procurement-type/procurement-type-display-column/procurement-type-display-column.component';
import { MbsProcurementTypeNewUpdateFormComponent } from './components/procurement-type/procurement-type-new-update-form/procurement-type-new-update-form.component';
import { MbsProcurementTypeResourceService } from './services/procurement-type.service';
import { MbsProcurementTypeResolver } from './resolvers/procurement-type.resolver';

import { MbsIncentiveRegulationListLoaderComponent } from './components/incentive-regulation/incentive-regulation-list-loader/incentive-regulation-list-loader.component';
import { MbsIncentiveRegulationDetailBoxComponent } from './components/incentive-regulation/incentive-regulation-detail-box/incentive-regulation-detail-box.component';
import { MbsIncentiveRegulationDisplayColumnComponent } from './components/incentive-regulation/incentive-regulation-display-column/incentive-regulation-display-column.component';
import { MbsIncentiveRegulationNewUpdateFormComponent } from './components/incentive-regulation/incentive-regulation-new-update-form/incentive-regulation-new-update-form.component';
import { MbsIncentiveRegulationResourceService } from './services/incentive-regulation.service';
import { MbsIncentiveRegulationResolver } from './resolvers/incentive-regulation.resolver';

import { MbsCalculationMethodListLoaderComponent } from './components/calculation-method/calculation-method-list-loader/calculation-method-list-loader.component';
import { MbsCalculationMethodDetailBoxComponent } from './components/calculation-method/calculation-method-detail-box/calculation-method-detail-box.component';
import { MbsCalculationMethodDisplayColumnComponent } from './components/calculation-method/calculation-method-display-column/calculation-method-display-column.component';
import { MbsCalculationMethodNewUpdateFormComponent } from './components/calculation-method/calculation-method-new-update-form/calculation-method-new-update-form.component';
import { MbsCalculationMethodResourceService } from './services/calculation-method.service';
import { MbsCalculationMethodResolver } from './resolvers/calculation-method.resolver';

import { MbsCalculationFactorListLoaderComponent } from './components/calculation-factor/calculation-factor-list-loader/calculation-factor-list-loader.component';
import { MbsCalculationFactorDetailBoxComponent } from './components/calculation-factor/calculation-factor-detail-box/calculation-factor-detail-box.component';
import { MbsCalculationFactorDisplayColumnComponent } from './components/calculation-factor/calculation-factor-display-column/calculation-factor-display-column.component';
import { MbsCalculationFactorNewUpdateFormComponent } from './components/calculation-factor/calculation-factor-new-update-form/calculation-factor-new-update-form.component';
import { MbsCalculationFactorResourceService } from './services/calculation-factor.service';
import { MbsCalculationFactorResolver } from './resolvers/calculation-factor.resolver';

import { MbsWithheldListLoaderComponent } from './components/withheld/withheld-list-loader/withheld-list-loader.component';
import { MbsWithheldDetailBoxComponent } from './components/withheld/withheld-detail-box/withheld-detail-box.component';
import { MbsWithheldDisplayColumnComponent } from './components/withheld/withheld-display-column/withheld-display-column.component';
import { MbsWithheldNewUpdateFormComponent } from './components/withheld/withheld-new-update-form/withheld-new-update-form.component';
import { MbsWithheldResourceService } from './services/withheld.service';
import { MbsWithheldResolver } from './resolvers/withheld.resolver';

import { MbsStageListLoaderComponent } from './components/stage/stage-list-loader/stage-list-loader.component';
import { MbsStageDetailBoxComponent } from './components/stage/stage-detail-box/stage-detail-box.component';
import { MbsStageDisplayColumnComponent } from './components/stage/stage-display-column/stage-display-column.component';
import { MbsStageNewUpdateFormComponent } from './components/stage/stage-new-update-form/stage-new-update-form.component';
import { MbsStageResourceService } from './services/stage.service';
import { MbsStageResolver } from './resolvers/stage.resolver';

import { MbsRoleListLoaderComponent } from './components/role/role-list-loader/role-list-loader.component';
import { MbsRoleDetailBoxComponent } from './components/role/role-detail-box/role-detail-box.component';
import { MbsRoleDisplayColumnComponent } from './components/role/role-display-column/role-display-column.component';
import { MbsRoleNewUpdateFormComponent } from './components/role/role-new-update-form/role-new-update-form.component';
import { MbsRoleResourceService } from './services/role.service';
import { MbsRoleResolver } from './resolvers/role.resolver';

import { MbsRoleValueListLoaderComponent } from './components/role-value/role-value-list-loader/role-value-list-loader.component';
import { MbsRoleValueDetailBoxComponent } from './components/role-value/role-value-detail-box/role-value-detail-box.component';
import { MbsRoleValueDisplayColumnComponent } from './components/role-value/role-value-display-column/role-value-display-column.component';
import { MbsRoleValueNewUpdateFormComponent } from './components/role-value/role-value-new-update-form/role-value-new-update-form.component';
import { MbsRoleValueResourceService } from './services/role-value.service';
import { MbsRoleValueResolver } from './resolvers/role-value.resolver';

import { MbsGovernativeProcurementLotListLoaderComponent } from './components/governative-procurement-lot/governative-procurement-lot-list-loader/governative-procurement-lot-list-loader.component';
import { MbsGovernativeProcurementLotDetailBoxComponent } from './components/governative-procurement-lot/governative-procurement-lot-detail-box/governative-procurement-lot-detail-box.component';
import { MbsGovernativeProcurementLotDisplayColumnComponent } from './components/governative-procurement-lot/governative-procurement-lot-display-column/governative-procurement-lot-display-column.component';
import { MbsGovernativeProcurementLotNewUpdateFormComponent } from './components/governative-procurement-lot/governative-procurement-lot-new-update-form/governative-procurement-lot-new-update-form.component';
import { MbsGovernativeProcurementLotResourceService } from './services/governative-procurement-lot.service';
import { MbsGovernativeProcurementLotResolver } from './resolvers/governative-procurement-lot.resolver';

import { MbsIncentiveCalculationListLoaderComponent } from './components/incentive-calculation/incentive-calculation-list-loader/incentive-calculation-list-loader.component';
import { MbsIncentiveCalculationDetailBoxComponent } from './components/incentive-calculation/incentive-calculation-detail-box/incentive-calculation-detail-box.component';
import { MbsIncentiveCalculationDisplayColumnComponent } from './components/incentive-calculation/incentive-calculation-display-column/incentive-calculation-display-column.component';
import { MbsIncentiveCalculationNewUpdateFormComponent } from './components/incentive-calculation/incentive-calculation-new-update-form/incentive-calculation-new-update-form.component';
import { MbsIncentiveCalculationResourceService } from './services/incentive-calculation.service';
import { MbsIncentiveCalculationResolver } from './resolvers/incentive-calculation.resolver';

import { MbsBeneficiaryListLoaderComponent } from './components/beneficiary/beneficiary-list-loader/beneficiary-list-loader.component';
import { MbsBeneficiaryDetailBoxComponent } from './components/beneficiary/beneficiary-detail-box/beneficiary-detail-box.component';
import { MbsBeneficiaryDisplayColumnComponent } from './components/beneficiary/beneficiary-display-column/beneficiary-display-column.component';
import { MbsBeneficiaryNewUpdateFormComponent } from './components/beneficiary/beneficiary-new-update-form/beneficiary-new-update-form.component';
import { MbsBeneficiaryResourceService } from './services/beneficiary.service';
import { MbsBeneficiaryResolver } from './resolvers/beneficiary.resolver';

import { MbsIncentiveRoleValueListLoaderComponent } from './components/incentive-role-value/incentive-role-value-list-loader/incentive-role-value-list-loader.component';
import { MbsIncentiveRoleValueDetailBoxComponent } from './components/incentive-role-value/incentive-role-value-detail-box/incentive-role-value-detail-box.component';
import { MbsIncentiveRoleValueDisplayColumnComponent } from './components/incentive-role-value/incentive-role-value-display-column/incentive-role-value-display-column.component';
import { MbsIncentiveRoleValueNewUpdateFormComponent } from './components/incentive-role-value/incentive-role-value-new-update-form/incentive-role-value-new-update-form.component';
import { MbsIncentiveRoleValueResourceService } from './services/incentive-role-value.service';
import { MbsIncentiveRoleValueResolver } from './resolvers/incentive-role-value.resolver';

import { MbsIncentiveAssignationRoleListLoaderComponent } from './components/incentive-assignation-role/incentive-assignation-role-list-loader/incentive-assignation-role-list-loader.component';
import { MbsIncentiveAssignationRoleDetailBoxComponent } from './components/incentive-assignation-role/incentive-assignation-role-detail-box/incentive-assignation-role-detail-box.component';
import { MbsIncentiveAssignationRoleDisplayColumnComponent } from './components/incentive-assignation-role/incentive-assignation-role-display-column/incentive-assignation-role-display-column.component';
import { MbsIncentiveAssignationRoleNewUpdateFormComponent } from './components/incentive-assignation-role/incentive-assignation-role-new-update-form/incentive-assignation-role-new-update-form.component';
import { MbsIncentiveAssignationRoleResourceService } from './services/incentive-assignation-role.service';
import { MbsIncentiveAssignationRoleResolver } from './resolvers/incentive-assignation-role.resolver';

import { MbsIncentiveAssignationStageListLoaderComponent } from './components/incentive-assignation-stage/incentive-assignation-stage-list-loader/incentive-assignation-stage-list-loader.component';
import { MbsIncentiveAssignationStageDetailBoxComponent } from './components/incentive-assignation-stage/incentive-assignation-stage-detail-box/incentive-assignation-stage-detail-box.component';
import { MbsIncentiveAssignationStageDisplayColumnComponent } from './components/incentive-assignation-stage/incentive-assignation-stage-display-column/incentive-assignation-stage-display-column.component';
import { MbsIncentiveAssignationStageNewUpdateFormComponent } from './components/incentive-assignation-stage/incentive-assignation-stage-new-update-form/incentive-assignation-stage-new-update-form.component';
import { MbsIncentiveAssignationStageResourceService } from './services/incentive-assignation-stage.service';
import { MbsIncentiveAssignationStageResolver } from './resolvers/incentive-assignation-stage.resolver';

import { MbsGovernativeProjectListLoaderComponent } from './components/governative-project/governative-project-list-loader/governative-project-list-loader.component';
import { MbsGovernativeProjectDetailBoxComponent } from './components/governative-project/governative-project-detail-box/governative-project-detail-box.component';
import { MbsGovernativeProjectDisplayColumnComponent } from './components/governative-project/governative-project-display-column/governative-project-display-column.component';
import { MbsGovernativeProjectNewUpdateFormComponent } from './components/governative-project/governative-project-new-update-form/governative-project-new-update-form.component';
import { MbsGovernativeProjectResourceService } from './services/governative-project.service';
import { MbsGovernativeProjectResolver } from './resolvers/governative-project.resolver';

import { MbsGovernativeProjectAndProcurementLotListLoaderComponent } from './components/governative-project-and-procurement-lot/governative-project-and-procurement-lot-list-loader/governative-project-and-procurement-lot-list-loader.component';
import { MbsGovernativeProjectAndProcurementLotDetailBoxComponent } from './components/governative-project-and-procurement-lot/governative-project-and-procurement-lot-detail-box/governative-project-and-procurement-lot-detail-box.component';
import { MbsGovernativeProjectAndProcurementLotDisplayColumnComponent } from './components/governative-project-and-procurement-lot/governative-project-and-procurement-lot-display-column/governative-project-and-procurement-lot-display-column.component';
import { MbsGovernativeProjectAndProcurementLotNewUpdateFormComponent } from './components/governative-project-and-procurement-lot/governative-project-and-procurement-lot-new-update-form/governative-project-and-procurement-lot-new-update-form.component';
import { MbsGovernativeProjectAndProcurementLotResourceService } from './services/governative-project-and-procurement-lot.service';
import { MbsGovernativeProjectAndProcurementLotResolver } from './resolvers/governative-project-and-procurement-lot.resolver';


@NgModule({
	imports: [ 
		EngeCommonLibModule,
		
	],
	declarations: [
		MbsProcurementTypeListLoaderComponent,
		MbsProcurementTypeDetailBoxComponent,
		MbsProcurementTypeDisplayColumnComponent,
		MbsProcurementTypeNewUpdateFormComponent,
		MbsIncentiveRegulationListLoaderComponent,
		MbsIncentiveRegulationDetailBoxComponent,
		MbsIncentiveRegulationDisplayColumnComponent,
		MbsIncentiveRegulationNewUpdateFormComponent,
		MbsCalculationMethodListLoaderComponent,
		MbsCalculationMethodDetailBoxComponent,
		MbsCalculationMethodDisplayColumnComponent,
		MbsCalculationMethodNewUpdateFormComponent,
		MbsCalculationFactorListLoaderComponent,
		MbsCalculationFactorDetailBoxComponent,
		MbsCalculationFactorDisplayColumnComponent,
		MbsCalculationFactorNewUpdateFormComponent,
		MbsWithheldListLoaderComponent,
		MbsWithheldDetailBoxComponent,
		MbsWithheldDisplayColumnComponent,
		MbsWithheldNewUpdateFormComponent,
		MbsStageListLoaderComponent,
		MbsStageDetailBoxComponent,
		MbsStageDisplayColumnComponent,
		MbsStageNewUpdateFormComponent,
		MbsRoleListLoaderComponent,
		MbsRoleDetailBoxComponent,
		MbsRoleDisplayColumnComponent,
		MbsRoleNewUpdateFormComponent,
		MbsRoleValueListLoaderComponent,
		MbsRoleValueDetailBoxComponent,
		MbsRoleValueDisplayColumnComponent,
		MbsRoleValueNewUpdateFormComponent,
		MbsGovernativeProcurementLotListLoaderComponent,
		MbsGovernativeProcurementLotDetailBoxComponent,
		MbsGovernativeProcurementLotDisplayColumnComponent,
		MbsGovernativeProcurementLotNewUpdateFormComponent,
		MbsIncentiveCalculationListLoaderComponent,
		MbsIncentiveCalculationDetailBoxComponent,
		MbsIncentiveCalculationDisplayColumnComponent,
		MbsIncentiveCalculationNewUpdateFormComponent,
		MbsBeneficiaryListLoaderComponent,
		MbsBeneficiaryDetailBoxComponent,
		MbsBeneficiaryDisplayColumnComponent,
		MbsBeneficiaryNewUpdateFormComponent,
		MbsIncentiveRoleValueListLoaderComponent,
		MbsIncentiveRoleValueDetailBoxComponent,
		MbsIncentiveRoleValueDisplayColumnComponent,
		MbsIncentiveRoleValueNewUpdateFormComponent,
		MbsIncentiveAssignationRoleListLoaderComponent,
		MbsIncentiveAssignationRoleDetailBoxComponent,
		MbsIncentiveAssignationRoleDisplayColumnComponent,
		MbsIncentiveAssignationRoleNewUpdateFormComponent,
		MbsIncentiveAssignationStageListLoaderComponent,
		MbsIncentiveAssignationStageDetailBoxComponent,
		MbsIncentiveAssignationStageDisplayColumnComponent,
		MbsIncentiveAssignationStageNewUpdateFormComponent,
		MbsGovernativeProjectListLoaderComponent,
		MbsGovernativeProjectDetailBoxComponent,
		MbsGovernativeProjectDisplayColumnComponent,
		MbsGovernativeProjectNewUpdateFormComponent,
		MbsGovernativeProjectAndProcurementLotListLoaderComponent,
		MbsGovernativeProjectAndProcurementLotDetailBoxComponent,
		MbsGovernativeProjectAndProcurementLotDisplayColumnComponent,
		MbsGovernativeProjectAndProcurementLotNewUpdateFormComponent,
	],
	providers: [
		MbsIncentiveAutocompleteService,
		MbsProcurementTypeResourceService,
		MbsProcurementTypeResolver,
		MbsIncentiveRegulationResourceService,
		MbsIncentiveRegulationResolver,
		MbsCalculationMethodResourceService,
		MbsCalculationMethodResolver,
		MbsCalculationFactorResourceService,
		MbsCalculationFactorResolver,
		MbsWithheldResourceService,
		MbsWithheldResolver,
		MbsStageResourceService,
		MbsStageResolver,
		MbsRoleResourceService,
		MbsRoleResolver,
		MbsRoleValueResourceService,
		MbsRoleValueResolver,
		MbsGovernativeProcurementLotResourceService,
		MbsGovernativeProcurementLotResolver,
		MbsIncentiveCalculationResourceService,
		MbsIncentiveCalculationResolver,
		MbsBeneficiaryResourceService,
		MbsBeneficiaryResolver,
		MbsIncentiveRoleValueResourceService,
		MbsIncentiveRoleValueResolver,
		MbsIncentiveAssignationRoleResourceService,
		MbsIncentiveAssignationRoleResolver,
		MbsIncentiveAssignationStageResourceService,
		MbsIncentiveAssignationStageResolver,
		MbsGovernativeProjectResourceService,
		MbsGovernativeProjectResolver,
		MbsGovernativeProjectAndProcurementLotResourceService,
		MbsGovernativeProjectAndProcurementLotResolver,
		
	],
	exports: [
		MbsProcurementTypeListLoaderComponent,
		MbsProcurementTypeDetailBoxComponent,
		MbsProcurementTypeDisplayColumnComponent,
		MbsProcurementTypeNewUpdateFormComponent,
		MbsIncentiveRegulationListLoaderComponent,
		MbsIncentiveRegulationDetailBoxComponent,
		MbsIncentiveRegulationDisplayColumnComponent,
		MbsIncentiveRegulationNewUpdateFormComponent,
		MbsCalculationMethodListLoaderComponent,
		MbsCalculationMethodDetailBoxComponent,
		MbsCalculationMethodDisplayColumnComponent,
		MbsCalculationMethodNewUpdateFormComponent,
		MbsCalculationFactorListLoaderComponent,
		MbsCalculationFactorDetailBoxComponent,
		MbsCalculationFactorDisplayColumnComponent,
		MbsCalculationFactorNewUpdateFormComponent,
		MbsWithheldListLoaderComponent,
		MbsWithheldDetailBoxComponent,
		MbsWithheldDisplayColumnComponent,
		MbsWithheldNewUpdateFormComponent,
		MbsStageListLoaderComponent,
		MbsStageDetailBoxComponent,
		MbsStageDisplayColumnComponent,
		MbsStageNewUpdateFormComponent,
		MbsRoleListLoaderComponent,
		MbsRoleDetailBoxComponent,
		MbsRoleDisplayColumnComponent,
		MbsRoleNewUpdateFormComponent,
		MbsRoleValueListLoaderComponent,
		MbsRoleValueDetailBoxComponent,
		MbsRoleValueDisplayColumnComponent,
		MbsRoleValueNewUpdateFormComponent,
		MbsGovernativeProcurementLotListLoaderComponent,
		MbsGovernativeProcurementLotDetailBoxComponent,
		MbsGovernativeProcurementLotDisplayColumnComponent,
		MbsGovernativeProcurementLotNewUpdateFormComponent,
		MbsIncentiveCalculationListLoaderComponent,
		MbsIncentiveCalculationDetailBoxComponent,
		MbsIncentiveCalculationDisplayColumnComponent,
		MbsIncentiveCalculationNewUpdateFormComponent,
		MbsBeneficiaryListLoaderComponent,
		MbsBeneficiaryDetailBoxComponent,
		MbsBeneficiaryDisplayColumnComponent,
		MbsBeneficiaryNewUpdateFormComponent,
		MbsIncentiveRoleValueListLoaderComponent,
		MbsIncentiveRoleValueDetailBoxComponent,
		MbsIncentiveRoleValueDisplayColumnComponent,
		MbsIncentiveRoleValueNewUpdateFormComponent,
		MbsIncentiveAssignationRoleListLoaderComponent,
		MbsIncentiveAssignationRoleDetailBoxComponent,
		MbsIncentiveAssignationRoleDisplayColumnComponent,
		MbsIncentiveAssignationRoleNewUpdateFormComponent,
		MbsIncentiveAssignationStageListLoaderComponent,
		MbsIncentiveAssignationStageDetailBoxComponent,
		MbsIncentiveAssignationStageDisplayColumnComponent,
		MbsIncentiveAssignationStageNewUpdateFormComponent,
		MbsGovernativeProjectListLoaderComponent,
		MbsGovernativeProjectDetailBoxComponent,
		MbsGovernativeProjectDisplayColumnComponent,
		MbsGovernativeProjectNewUpdateFormComponent,
		MbsGovernativeProjectAndProcurementLotListLoaderComponent,
		MbsGovernativeProjectAndProcurementLotDetailBoxComponent,
		MbsGovernativeProjectAndProcurementLotDisplayColumnComponent,
		MbsGovernativeProjectAndProcurementLotNewUpdateFormComponent,
	],
})
export class MbsIncentiveLibModule {}