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
	],
})
export class MbsIncentiveLibModule {}