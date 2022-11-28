import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { MegaMenuModule } from 'primeng/megamenu';

import { MbsMainModule } from '@mbs-main/main.module'; 

import { AssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { AssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';

import { MbsHomeComponent } from './components/home/home.component';
import { MbsTestComponent } from './components/test/test.component';
import { mbsRouter } from './mbs.router';

@NgModule({
	imports: [
		RouterModule.forChild(mbsRouter),

		MegaMenuModule,

		MbsMainModule,

	],
	providers: [

	],
	declarations: [
		MbsHomeComponent,
		MbsTestComponent,

		AssetListPageComponent,
		AssetDetailPageComponent,


	],
	exports: [

	],
})
export class MbsModule { }
