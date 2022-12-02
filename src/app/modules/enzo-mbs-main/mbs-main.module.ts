import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

import { MbsMainModule } from '@mbs-main/main.module';

import { enzoMbsMainRoutes } from './mbs-main.route';

import { EnzoAssetListPageComponent } from './components/asset/asset-list-page/asset-list-page.component';
import { EnzoAssetDetailPageComponent } from './components/asset/asset-detail-page/asset-detail-page.component';
import { EnzoAssetDialogComponent } from './components/asset/asset-dialog/asset-dialog.component';
import { EnzoDossierListPageComponent } from './components/dossier/dossier-list-page/dossier-list-page.component';
import { EnzoDossierDetailPageComponent } from './components/dossier/dossier-detail-page/dossier-detail-page.component';
import { EnzoDossierDialogComponent } from './components/dossier/dossier-dialog/dossier-dialog.component';
import { EnzoDossierTypeListPageComponent } from './components/dossier-type/dossier-type-list-page/dossier-type-list-page.component';
import { EnzoDossierTypeDetailPageComponent } from './components/dossier-type/dossier-type-detail-page/dossier-type-detail-page.component';
import { EnzoDossierTypeDialogComponent } from './components/dossier-type/dossier-type-dialog/dossier-type-dialog.component';
import { EnzoOperationListPageComponent } from './components/operation/operation-list-page/operation-list-page.component';
import { EnzoOperationDetailPageComponent } from './components/operation/operation-detail-page/operation-detail-page.component';
import { EnzoOperationDialogComponent } from './components/operation/operation-dialog/operation-dialog.component';
import { EnzoOperationTypeListPageComponent } from './components/operation-type/operation-type-list-page/operation-type-list-page.component';
import { EnzoOperationTypeDetailPageComponent } from './components/operation-type/operation-type-detail-page/operation-type-detail-page.component';
import { EnzoOperationTypeDialogComponent } from './components/operation-type/operation-type-dialog/operation-type-dialog.component';
import { EnzoRelifListPageComponent } from './components/relif/relif-list-page/relif-list-page.component';
import { EnzoRelifDetailPageComponent } from './components/relif/relif-detail-page/relif-detail-page.component';
import { EnzoRelifDialogComponent } from './components/relif/relif-dialog/relif-dialog.component';

@NgModule({
	imports: [ 
		CommonModule,
		RouterModule.forChild(enzoMbsMainRoutes),
		MbsMainModule,

		DynamicDialogModule,
		ButtonModule,
		
	],
	declarations: [
		EnzoAssetListPageComponent,
		EnzoAssetDetailPageComponent,
		EnzoAssetDialogComponent,
		
		EnzoDossierListPageComponent,
		EnzoDossierDetailPageComponent,
		EnzoDossierDialogComponent,
		
		EnzoDossierTypeListPageComponent,
		EnzoDossierTypeDetailPageComponent,
		EnzoDossierTypeDialogComponent,
		
		EnzoOperationListPageComponent,
		EnzoOperationDetailPageComponent,
		EnzoOperationDialogComponent,
		
		EnzoOperationTypeListPageComponent,
		EnzoOperationTypeDetailPageComponent,
		EnzoOperationTypeDialogComponent,
		
		EnzoRelifListPageComponent,
		EnzoRelifDetailPageComponent,
		EnzoRelifDialogComponent,
		
	],
	providers: [
		DialogService,
		
	],
})
export class EnzoMbsMainModule {}