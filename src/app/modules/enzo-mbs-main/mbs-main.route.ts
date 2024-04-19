import { Route } from '@angular/router';

import { MbsAssetResolver } from '@mbs-main/resolvers/asset.resolver';
import { EnzoAssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';
import { EnzoAssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { MbsRelifResolver } from '@mbs-main/resolvers/relif.resolver';
import { EnzoRelifListPageComponent } from './components/relif/relif-list-page/relif-list-page.component';
import { EnzoRelifDetailPageComponent } from './components/relif/relif-detail-page/relif-detail-page.component';
import { MbsOperationTypeResolver } from '@mbs-main/resolvers/operation-type.resolver';
import { EnzoOperationTypeListPageComponent } from './components/operation-type/operation-type-list-page/operation-type-list-page.component';
import { EnzoOperationTypeDetailPageComponent } from './components/operation-type/operation-type-detail-page/operation-type-detail-page.component';
import { MbsOperationResolver } from '@mbs-main/resolvers/operation.resolver';
import { EnzoOperationListPageComponent } from './components/operation/operation-list-page/operation-list-page.component';
import { EnzoOperationDetailPageComponent } from './components/operation/operation-detail-page/operation-detail-page.component';
import { MbsDossierTypeResolver } from '@mbs-main/resolvers/dossier-type.resolver';
import { EnzoDossierTypeListPageComponent } from './components/dossier-type/dossier-type-list-page/dossier-type-list-page.component';
import { EnzoDossierTypeDetailPageComponent } from './components/dossier-type/dossier-type-detail-page/dossier-type-detail-page.component';
import { MbsElaborateGroupResolver } from '@mbs-main/resolvers/elaborate-group.resolver';
import { EnzoElaborateGroupListPageComponent } from './components/elaborate-group/elaborate-group-list-page/elaborate-group-list-page.component';
import { EnzoElaborateGroupDetailPageComponent } from './components/elaborate-group/elaborate-group-detail-page/elaborate-group-detail-page.component';
import { MbsDossierResolver } from '@mbs-main/resolvers/dossier.resolver';
import { EnzoDossierListPageComponent } from './components/dossier/dossier-list-page/dossier-list-page.component';
import { EnzoDossierDetailPageComponent } from './components/dossier/dossier-detail-page/dossier-detail-page.component';
import { MbsProcurementTypeResolver } from '@mbs-main/resolvers/procurement-type.resolver';
import { EnzoProcurementTypeListPageComponent } from './components/procurement-type/procurement-type-list-page/procurement-type-list-page.component';
import { EnzoProcurementTypeDetailPageComponent } from './components/procurement-type/procurement-type-detail-page/procurement-type-detail-page.component';
import { MbsGovernativeProjectResolver } from '@mbs-main/resolvers/governative-project.resolver';
import { EnzoGovernativeProjectListPageComponent } from './components/governative-project/governative-project-list-page/governative-project-list-page.component';
import { EnzoGovernativeProjectDetailPageComponent } from './components/governative-project/governative-project-detail-page/governative-project-detail-page.component';
import { MbsGovernativeProcurementLotResolver } from '@mbs-main/resolvers/governative-procurement-lot.resolver';
import { EnzoGovernativeProcurementLotListPageComponent } from './components/governative-procurement-lot/governative-procurement-lot-list-page/governative-procurement-lot-list-page.component';
import { EnzoGovernativeProcurementLotDetailPageComponent } from './components/governative-procurement-lot/governative-procurement-lot-detail-page/governative-procurement-lot-detail-page.component';
import { MbsGovernativeProjectProcurementLotResolver } from '@mbs-main/resolvers/governative-project-procurement-lot.resolver';
import { EnzoGovernativeProjectProcurementLotListPageComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-list-page/governative-project-procurement-lot-list-page.component';
import { EnzoGovernativeProjectProcurementLotDetailPageComponent } from './components/governative-project-procurement-lot/governative-project-procurement-lot-detail-page/governative-project-procurement-lot-detail-page.component';
import { MbsIncentiveBeneficiaryResolver } from '@mbs-main/resolvers/incentive-beneficiary.resolver';
import { EnzoIncentiveBeneficiaryListPageComponent } from './components/incentive-beneficiary/incentive-beneficiary-list-page/incentive-beneficiary-list-page.component';
import { EnzoIncentiveBeneficiaryDetailPageComponent } from './components/incentive-beneficiary/incentive-beneficiary-detail-page/incentive-beneficiary-detail-page.component';
import { MbsIncentiveRegulationResolver } from '@mbs-main/resolvers/incentive-regulation.resolver';
import { EnzoIncentiveRegulationListPageComponent } from './components/incentive-regulation/incentive-regulation-list-page/incentive-regulation-list-page.component';
import { EnzoIncentiveRegulationDetailPageComponent } from './components/incentive-regulation/incentive-regulation-detail-page/incentive-regulation-detail-page.component';
import { MbsIncentiveWithheldResolver } from '@mbs-main/resolvers/incentive-withheld.resolver';
import { EnzoIncentiveWithheldListPageComponent } from './components/incentive-withheld/incentive-withheld-list-page/incentive-withheld-list-page.component';
import { EnzoIncentiveWithheldDetailPageComponent } from './components/incentive-withheld/incentive-withheld-detail-page/incentive-withheld-detail-page.component';
import { MbsIncentiveCalculationMethodResolver } from '@mbs-main/resolvers/incentive-calculation-method.resolver';
import { EnzoIncentiveCalculationMethodListPageComponent } from './components/incentive-calculation-method/incentive-calculation-method-list-page/incentive-calculation-method-list-page.component';
import { EnzoIncentiveCalculationMethodDetailPageComponent } from './components/incentive-calculation-method/incentive-calculation-method-detail-page/incentive-calculation-method-detail-page.component';
import { MbsIncentiveCalculationFactorResolver } from '@mbs-main/resolvers/incentive-calculation-factor.resolver';
import { EnzoIncentiveCalculationFactorListPageComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-list-page/incentive-calculation-factor-list-page.component';
import { EnzoIncentiveCalculationFactorDetailPageComponent } from './components/incentive-calculation-factor/incentive-calculation-factor-detail-page/incentive-calculation-factor-detail-page.component';
import { MbsIncentiveStageResolver } from '@mbs-main/resolvers/incentive-stage.resolver';
import { EnzoIncentiveStageListPageComponent } from './components/incentive-stage/incentive-stage-list-page/incentive-stage-list-page.component';
import { EnzoIncentiveStageDetailPageComponent } from './components/incentive-stage/incentive-stage-detail-page/incentive-stage-detail-page.component';
import { MbsIncentiveRoleResolver } from '@mbs-main/resolvers/incentive-role.resolver';
import { EnzoIncentiveRoleListPageComponent } from './components/incentive-role/incentive-role-list-page/incentive-role-list-page.component';
import { EnzoIncentiveRoleDetailPageComponent } from './components/incentive-role/incentive-role-detail-page/incentive-role-detail-page.component';
import { MbsIncentiveRegulationValueResolver } from '@mbs-main/resolvers/incentive-regulation-value.resolver';
import { EnzoIncentiveRegulationValueListPageComponent } from './components/incentive-regulation-value/incentive-regulation-value-list-page/incentive-regulation-value-list-page.component';
import { EnzoIncentiveRegulationValueDetailPageComponent } from './components/incentive-regulation-value/incentive-regulation-value-detail-page/incentive-regulation-value-detail-page.component';
import { MbsIncentiveCalculationResolver } from '@mbs-main/resolvers/incentive-calculation.resolver';
import { EnzoIncentiveCalculationListPageComponent } from './components/incentive-calculation/incentive-calculation-list-page/incentive-calculation-list-page.component';
import { EnzoIncentiveCalculationDetailPageComponent } from './components/incentive-calculation/incentive-calculation-detail-page/incentive-calculation-detail-page.component';
import { MbsIncentiveRoleAssignationResolver } from '@mbs-main/resolvers/incentive-role-assignation.resolver';
import { EnzoIncentiveRoleAssignationListPageComponent } from './components/incentive-role-assignation/incentive-role-assignation-list-page/incentive-role-assignation-list-page.component';
import { EnzoIncentiveRoleAssignationDetailPageComponent } from './components/incentive-role-assignation/incentive-role-assignation-detail-page/incentive-role-assignation-detail-page.component';
import { MbsIncentiveCalculationValueResolver } from '@mbs-main/resolvers/incentive-calculation-value.resolver';
import { EnzoIncentiveCalculationValueListPageComponent } from './components/incentive-calculation-value/incentive-calculation-value-list-page/incentive-calculation-value-list-page.component';
import { EnzoIncentiveCalculationValueDetailPageComponent } from './components/incentive-calculation-value/incentive-calculation-value-detail-page/incentive-calculation-value-detail-page.component';
import { MbsIncentiveAssignationResolver } from '@mbs-main/resolvers/incentive-assignation.resolver';
import { EnzoIncentiveAssignationListPageComponent } from './components/incentive-assignation/incentive-assignation-list-page/incentive-assignation-list-page.component';
import { EnzoIncentiveAssignationDetailPageComponent } from './components/incentive-assignation/incentive-assignation-detail-page/incentive-assignation-detail-page.component';

export const enzoMbsMainRoutes: Route[] = [
	{
		path: '', 
		pathMatch : 'full',
		redirectTo: 'asset'
	},
	{
		path: 'asset',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoAssetListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoAssetDetailPageComponent,
				resolve: {
					asset: MbsAssetResolver,
				},
			},
		]
	},
	{
		path: 'relif',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoRelifListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoRelifDetailPageComponent,
				resolve: {
					relif: MbsRelifResolver,
				},
			},
		]
	},
	{
		path: 'operation-type',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoOperationTypeListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoOperationTypeDetailPageComponent,
				resolve: {
					operationType: MbsOperationTypeResolver,
				},
			},
		]
	},
	{
		path: 'operation',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoOperationListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoOperationDetailPageComponent,
				resolve: {
					operation: MbsOperationResolver,
				},
			},
		]
	},
	{
		path: 'dossier-type',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoDossierTypeListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoDossierTypeDetailPageComponent,
				resolve: {
					dossierType: MbsDossierTypeResolver,
				},
			},
		]
	},
	{
		path: 'elaborate-group',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoElaborateGroupListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoElaborateGroupDetailPageComponent,
				resolve: {
					elaborateGroup: MbsElaborateGroupResolver,
				},
			},
		]
	},
	{
		path: 'dossier',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoDossierListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoDossierDetailPageComponent,
				resolve: {
					dossier: MbsDossierResolver,
				},
			},
		]
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
		path: 'governative-project-procurement-lot',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoGovernativeProjectProcurementLotListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoGovernativeProjectProcurementLotDetailPageComponent,
				resolve: {
					governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotResolver,
				},
			},
		]
	},
	{
		path: 'incentive-beneficiary',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveBeneficiaryListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveBeneficiaryDetailPageComponent,
				resolve: {
					incentiveBeneficiary: MbsIncentiveBeneficiaryResolver,
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
				loadChildren: () => import('./components/incentive-regulation/incentive-regulation-configuration/incentive-regulation-configuration.module').then(m => m.EnzoMbsIncentiveRegulationConfiguratorModule)
			},
		]
	},
	{
		path: 'incentive-withheld',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveWithheldListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveWithheldDetailPageComponent,
				resolve: {
					incentiveWithheld: MbsIncentiveWithheldResolver,
				},
			},
		]
	},
	{
		path: 'incentive-calculation-method',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveCalculationMethodListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveCalculationMethodDetailPageComponent,
				resolve: {
					incentiveCalculationMethod: MbsIncentiveCalculationMethodResolver,
				},
			},
		]
	},
	{
		path: 'incentive-calculation-factor',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveCalculationFactorListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveCalculationFactorDetailPageComponent,
				resolve: {
					incentiveCalculationFactor: MbsIncentiveCalculationFactorResolver,
				},
			},
		]
	},
	{
		path: 'incentive-stage',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveStageListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveStageDetailPageComponent,
				resolve: {
					incentiveStage: MbsIncentiveStageResolver,
				},
			},
		]
	},
	{
		path: 'incentive-role',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveRoleListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveRoleDetailPageComponent,
				resolve: {
					incentiveRole: MbsIncentiveRoleResolver,
				},
			},
		]
	},
	{
		path: 'incentive-regulation-value',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveRegulationValueListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveRegulationValueDetailPageComponent,
				resolve: {
					incentiveRegulationValue: MbsIncentiveRegulationValueResolver,
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
		path: 'incentive-role-assignation',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveRoleAssignationListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveRoleAssignationDetailPageComponent,
				resolve: {
					incentiveRoleAssignation: MbsIncentiveRoleAssignationResolver,
				},
			},
		]
	},
	{
		path: 'incentive-calculation-value',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveCalculationValueListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveCalculationValueDetailPageComponent,
				resolve: {
					incentiveCalculationValue: MbsIncentiveCalculationValueResolver,
				},
			},
		]
	},
	{
		path: 'incentive-assignation',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full',
			},
			{
				path: 'list', 
				component: EnzoIncentiveAssignationListPageComponent,
			},
			{
				path: 'detail/:id', 
				component: EnzoIncentiveAssignationDetailPageComponent,
				resolve: {
					incentiveAssignation: MbsIncentiveAssignationResolver,
				},
			},
		]
	},
	
];