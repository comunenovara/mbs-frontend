import { Route } from '@angular/router';

import { MbsProcurementTypeResolver } from '@mbs-incentive/resolvers/procurement-type.resolver';
import { EnzoProcurementTypeListPageComponent } from './components/procurement-type/procurement-type-list-page/procurement-type-list-page.component';
import { EnzoProcurementTypeDetailPageComponent } from './components/procurement-type/procurement-type-detail-page/procurement-type-detail-page.component';
import { MbsIncentiveRegulationResolver } from '@mbs-incentive/resolvers/incentive-regulation.resolver';
import { EnzoIncentiveRegulationListPageComponent } from './components/incentive-regulation/incentive-regulation-list-page/incentive-regulation-list-page.component';
import { EnzoIncentiveRegulationDetailPageComponent } from './components/incentive-regulation/incentive-regulation-detail-page/incentive-regulation-detail-page.component';
import { MbsCalculationMethodResolver } from '@mbs-incentive/resolvers/calculation-method.resolver';
import { EnzoCalculationMethodListPageComponent } from './components/calculation-method/calculation-method-list-page/calculation-method-list-page.component';
import { EnzoCalculationMethodDetailPageComponent } from './components/calculation-method/calculation-method-detail-page/calculation-method-detail-page.component';
import { MbsCalculationFactorResolver } from '@mbs-incentive/resolvers/calculation-factor.resolver';
import { EnzoCalculationFactorListPageComponent } from './components/calculation-factor/calculation-factor-list-page/calculation-factor-list-page.component';
import { EnzoCalculationFactorDetailPageComponent } from './components/calculation-factor/calculation-factor-detail-page/calculation-factor-detail-page.component';
import { MbsWithheldResolver } from '@mbs-incentive/resolvers/withheld.resolver';
import { EnzoWithheldListPageComponent } from './components/withheld/withheld-list-page/withheld-list-page.component';
import { EnzoWithheldDetailPageComponent } from './components/withheld/withheld-detail-page/withheld-detail-page.component';
import { MbsStageResolver } from '@mbs-incentive/resolvers/stage.resolver';
import { EnzoStageListPageComponent } from './components/stage/stage-list-page/stage-list-page.component';
import { EnzoStageDetailPageComponent } from './components/stage/stage-detail-page/stage-detail-page.component';
import { MbsRoleResolver } from '@mbs-incentive/resolvers/role.resolver';
import { EnzoRoleListPageComponent } from './components/role/role-list-page/role-list-page.component';
import { EnzoRoleDetailPageComponent } from './components/role/role-detail-page/role-detail-page.component';
import { MbsRoleValueResolver } from '@mbs-incentive/resolvers/role-value.resolver';
import { EnzoRoleValueListPageComponent } from './components/role-value/role-value-list-page/role-value-list-page.component';
import { EnzoRoleValueDetailPageComponent } from './components/role-value/role-value-detail-page/role-value-detail-page.component';
import { MbsGovernativeProcurementLotResolver } from '@mbs-incentive/resolvers/governative-procurement-lot.resolver';
import { EnzoGovernativeProcurementLotListPageComponent } from './components/governative-procurement-lot/governative-procurement-lot-list-page/governative-procurement-lot-list-page.component';
import { EnzoGovernativeProcurementLotDetailPageComponent } from './components/governative-procurement-lot/governative-procurement-lot-detail-page/governative-procurement-lot-detail-page.component';
import { MbsIncentiveCalculationResolver } from '@mbs-incentive/resolvers/incentive-calculation.resolver';
import { EnzoIncentiveCalculationListPageComponent } from './components/incentive-calculation/incentive-calculation-list-page/incentive-calculation-list-page.component';
import { EnzoIncentiveCalculationDetailPageComponent } from './components/incentive-calculation/incentive-calculation-detail-page/incentive-calculation-detail-page.component';
import { MbsBeneficiaryResolver } from '@mbs-incentive/resolvers/beneficiary.resolver';
import { EnzoBeneficiaryListPageComponent } from './components/beneficiary/beneficiary-list-page/beneficiary-list-page.component';
import { EnzoBeneficiaryDetailPageComponent } from './components/beneficiary/beneficiary-detail-page/beneficiary-detail-page.component';
import { MbsIncentiveRoleValueResolver } from '@mbs-incentive/resolvers/incentive-role-value.resolver';
import { EnzoIncentiveRoleValueListPageComponent } from './components/incentive-role-value/incentive-role-value-list-page/incentive-role-value-list-page.component';
import { EnzoIncentiveRoleValueDetailPageComponent } from './components/incentive-role-value/incentive-role-value-detail-page/incentive-role-value-detail-page.component';
import { MbsIncentiveAssignationRoleResolver } from '@mbs-incentive/resolvers/incentive-assignation-role.resolver';
import { EnzoIncentiveAssignationRoleListPageComponent } from './components/incentive-assignation-role/incentive-assignation-role-list-page/incentive-assignation-role-list-page.component';
import { EnzoIncentiveAssignationRoleDetailPageComponent } from './components/incentive-assignation-role/incentive-assignation-role-detail-page/incentive-assignation-role-detail-page.component';
import { MbsIncentiveAssignationStageResolver } from '@mbs-incentive/resolvers/incentive-assignation-stage.resolver';
import { EnzoIncentiveAssignationStageListPageComponent } from './components/incentive-assignation-stage/incentive-assignation-stage-list-page/incentive-assignation-stage-list-page.component';
import { EnzoIncentiveAssignationStageDetailPageComponent } from './components/incentive-assignation-stage/incentive-assignation-stage-detail-page/incentive-assignation-stage-detail-page.component';
import { MbsGovernativeProjectResolver } from '@mbs-incentive/resolvers/governative-project.resolver';
import { EnzoGovernativeProjectListPageComponent } from './components/governative-project/governative-project-list-page/governative-project-list-page.component';
import { EnzoGovernativeProjectDetailPageComponent } from './components/governative-project/governative-project-detail-page/governative-project-detail-page.component';
import { MbsGovernativeProjectAndProcurementLotResolver } from '@mbs-incentive/resolvers/governative-project-and-procurement-lot.resolver';
import { EnzoGovernativeProjectAndProcurementLotListPageComponent } from './components/governative-project-and-procurement-lot/governative-project-and-procurement-lot-list-page/governative-project-and-procurement-lot-list-page.component';
import { EnzoGovernativeProjectAndProcurementLotDetailPageComponent } from './components/governative-project-and-procurement-lot/governative-project-and-procurement-lot-detail-page/governative-project-and-procurement-lot-detail-page.component';

export const enzoMbsIncentiveRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'incentive-regulation'
	},
	{
		path: 'procurement-type',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoProcurementTypeListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoProcurementTypeDetailPageComponent,
				resolve: {
					procurementType: MbsProcurementTypeResolver,
				},
			},
		]
	},
	{
		path: 'incentive-regulation',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveRegulationListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveRegulationDetailPageComponent,
				resolve: {
					incentiveRegulation: MbsIncentiveRegulationResolver,
				},
			},
		]
	},
	{
		path: 'calculation-method',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoCalculationMethodListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoCalculationMethodDetailPageComponent,
				resolve: {
					calculationMethod: MbsCalculationMethodResolver,
				},
			},
		]
	},
	{
		path: 'calculation-factor',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoCalculationFactorListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoCalculationFactorDetailPageComponent,
				resolve: {
					calculationFactor: MbsCalculationFactorResolver,
				},
			},
		]
	},
	{
		path: 'withheld',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoWithheldListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoWithheldDetailPageComponent,
				resolve: {
					withheld: MbsWithheldResolver,
				},
			},
		]
	},
	{
		path: 'stage',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoStageListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoStageDetailPageComponent,
				resolve: {
					stage: MbsStageResolver,
				},
			},
		]
	},
	{
		path: 'role',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoRoleListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoRoleDetailPageComponent,
				resolve: {
					role: MbsRoleResolver,
				},
			},
		]
	},
	{
		path: 'role-value',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoRoleValueListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoRoleValueDetailPageComponent,
				resolve: {
					roleValue: MbsRoleValueResolver,
				},
			},
		]
	},
	{
		path: 'governative-procurement-lot',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoGovernativeProcurementLotListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoGovernativeProcurementLotDetailPageComponent,
				resolve: {
					governativeProcurementLot: MbsGovernativeProcurementLotResolver,
				},
			},
		]
	},
	{
		path: 'incentive-calculation',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveCalculationListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveCalculationDetailPageComponent,
				resolve: {
					incentiveCalculation: MbsIncentiveCalculationResolver,
				},
			},
		]
	},
	{
		path: 'beneficiary',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoBeneficiaryListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoBeneficiaryDetailPageComponent,
				resolve: {
					beneficiary: MbsBeneficiaryResolver,
				},
			},
		]
	},
	{
		path: 'incentive-role-value',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveRoleValueListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveRoleValueDetailPageComponent,
				resolve: {
					incentiveRoleValue: MbsIncentiveRoleValueResolver,
				},
			},
		]
	},
	{
		path: 'incentive-assignation-role',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveAssignationRoleListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveAssignationRoleDetailPageComponent,
				resolve: {
					incentiveAssignationRole: MbsIncentiveAssignationRoleResolver,
				},
			},
		]
	},
	{
		path: 'incentive-assignation-stage',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveAssignationStageListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveAssignationStageDetailPageComponent,
				resolve: {
					incentiveAssignationStage: MbsIncentiveAssignationStageResolver,
				},
			},
		]
	},
	{
		path: 'governative-project',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoGovernativeProjectListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoGovernativeProjectDetailPageComponent,
				resolve: {
					governativeProject: MbsGovernativeProjectResolver,
				},
			},
		]
	},
	{
		path: 'governative-project-and-procurement-lot',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoGovernativeProjectAndProcurementLotListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoGovernativeProjectAndProcurementLotDetailPageComponent,
				resolve: {
					governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotResolver,
				},
			},
		]
	},
	
];