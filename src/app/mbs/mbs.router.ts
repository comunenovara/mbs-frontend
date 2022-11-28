import { Route } from '@angular/router';

import { AssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { AssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';
import { MbsHomeComponent } from './components/home/home.component';
import { MbsTestComponent } from './components/test/test.component';

export const mbsRouter: Route[] = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: MbsHomeComponent,
		children: [
			{
				path: '',
				redirectTo: 'test',
				pathMatch: 'full'
			},
			{
				path: 'test',
				component: MbsTestComponent,
			},
		]
	},
	{
		path: 'asset',
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full'
			},
			{
				path: 'list',
				component: AssetListPageComponent,
			},
			{
				path: 'detail/:id',
				component: AssetDetailPageComponent,
			},
		]
	},
	{
		path: 'operation',
		component: MbsHomeComponent
	},
	

];