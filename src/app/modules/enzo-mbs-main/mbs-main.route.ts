import { Route } from '@angular/router';

import { MbsAssetResolver } from '@mbs-main/resolvers/asset.resolver';
import { EnzoAssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';
import { EnzoAssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { MbsDossierResolver } from '@mbs-main/resolvers/dossier.resolver';
import { EnzoDossierListPageComponent } from './components/dossier/dossier-list-page/dossier-list-page.component';
import { EnzoDossierDetailPageComponent } from './components/dossier/dossier-detail-page/dossier-detail-page.component';
import { MbsDossierTypeResolver } from '@mbs-main/resolvers/dossier-type.resolver';
import { EnzoDossierTypeListPageComponent } from './components/dossier-type/dossier-type-list-page/dossier-type-list-page.component';
import { EnzoDossierTypeDetailPageComponent } from './components/dossier-type/dossier-type-detail-page/dossier-type-detail-page.component';
import { MbsOperationResolver } from '@mbs-main/resolvers/operation.resolver';
import { EnzoOperationListPageComponent } from './components/operation/operation-list-page/operation-list-page.component';
import { EnzoOperationDetailPageComponent } from './components/operation/operation-detail-page/operation-detail-page.component';
import { MbsOperationTypeResolver } from '@mbs-main/resolvers/operation-type.resolver';
import { EnzoOperationTypeListPageComponent } from './components/operation-type/operation-type-list-page/operation-type-list-page.component';
import { EnzoOperationTypeDetailPageComponent } from './components/operation-type/operation-type-detail-page/operation-type-detail-page.component';
import { MbsRelifResolver } from '@mbs-main/resolvers/relif.resolver';
import { EnzoRelifListPageComponent } from './components/relif/relif-list-page/relif-list-page.component';
import { EnzoRelifDetailPageComponent } from './components/relif/relif-detail-page/relif-detail-page.component';

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
	
];