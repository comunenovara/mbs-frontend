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
	
];