import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

import { MbsMainModule } from '@mbs-main/main.module';

//import { EnzoSharedModule } from 'app/shared/shared.module';
import { enzoMbsMainRoutes } from './mbs-main.route';

import { EnzoAssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';
import { EnzoAssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { EnzoDossierListPageComponent } from './components/dossier/dossier-list-page/dossier-list-page.component';
import { EnzoDossierDetailPageComponent } from './components/dossier/dossier-detail-page/dossier-detail-page.component';
import { EnzoDossierTypeListPageComponent } from './components/dossier-type/dossier-type-list-page/dossier-type-list-page.component';
import { EnzoDossierTypeDetailPageComponent } from './components/dossier-type/dossier-type-detail-page/dossier-type-detail-page.component';
import { EnzoOperationListPageComponent } from './components/operation/operation-list-page/operation-list-page.component';
import { EnzoOperationDetailPageComponent } from './components/operation/operation-detail-page/operation-detail-page.component';
import { EnzoOperationTypeListPageComponent } from './components/operation-type/operation-type-list-page/operation-type-list-page.component';
import { EnzoOperationTypeDetailPageComponent } from './components/operation-type/operation-type-detail-page/operation-type-detail-page.component';
import { EnzoRelifListPageComponent } from './components/relif/relif-list-page/relif-list-page.component';
import { EnzoRelifDetailPageComponent } from './components/relif/relif-detail-page/relif-detail-page.component';

@NgModule({
	imports: [ 
		CommonModule,
		RouterModule.forChild(enzoMbsMainRoutes),
		MbsMainModule,

		//EnzoSharedModule,
	],
	declarations: [
		EnzoAssetListPageComponent,
		EnzoAssetDetailPageComponent,
		EnzoDossierListPageComponent,
		EnzoDossierDetailPageComponent,
		EnzoDossierTypeListPageComponent,
		EnzoDossierTypeDetailPageComponent,
		EnzoOperationListPageComponent,
		EnzoOperationDetailPageComponent,
		EnzoOperationTypeListPageComponent,
		EnzoOperationTypeDetailPageComponent,
		EnzoRelifListPageComponent,
		EnzoRelifDetailPageComponent,
	],
	providers: [
		
	],
})
export class EnzoMbsMainModule {}