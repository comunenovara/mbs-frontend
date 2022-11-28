import { NgModule } from '@angular/core';
import { AgalCoreModule } from '@agal-core/agal-core.module';

import { MbsAssetListLoaderComponent } from './components/asset/asset-list-loader/asset-list-loader.component';
import { MbsAssetDetailBoxComponent } from './components/asset/asset-detail-box/asset-detail-box.component';
import { MbsAssetDisplayColumnComponent } from './components/asset/asset-display-column/asset-display-column.component';
import { MbsAssetResourceService } from './services/asset.service';
import { MbsAssetResolver } from './resolvers/asset.resolver';

import { MbsDossierListLoaderComponent } from './components/dossier/dossier-list-loader/dossier-list-loader.component';
import { MbsDossierDetailBoxComponent } from './components/dossier/dossier-detail-box/dossier-detail-box.component';
import { MbsDossierDisplayColumnComponent } from './components/dossier/dossier-display-column/dossier-display-column.component';
import { MbsDossierResourceService } from './services/dossier.service';
import { MbsDossierResolver } from './resolvers/dossier.resolver';

import { MbsDossierTypeListLoaderComponent } from './components/dossier-type/dossier-type-list-loader/dossier-type-list-loader.component';
import { MbsDossierTypeDetailBoxComponent } from './components/dossier-type/dossier-type-detail-box/dossier-type-detail-box.component';
import { MbsDossierTypeDisplayColumnComponent } from './components/dossier-type/dossier-type-display-column/dossier-type-display-column.component';
import { MbsDossierTypeResourceService } from './services/dossier-type.service';
import { MbsDossierTypeResolver } from './resolvers/dossier-type.resolver';

import { MbsOperationListLoaderComponent } from './components/operation/operation-list-loader/operation-list-loader.component';
import { MbsOperationDetailBoxComponent } from './components/operation/operation-detail-box/operation-detail-box.component';
import { MbsOperationDisplayColumnComponent } from './components/operation/operation-display-column/operation-display-column.component';
import { MbsOperationResourceService } from './services/operation.service';
import { MbsOperationResolver } from './resolvers/operation.resolver';

import { MbsOperationTypeListLoaderComponent } from './components/operation-type/operation-type-list-loader/operation-type-list-loader.component';
import { MbsOperationTypeDetailBoxComponent } from './components/operation-type/operation-type-detail-box/operation-type-detail-box.component';
import { MbsOperationTypeDisplayColumnComponent } from './components/operation-type/operation-type-display-column/operation-type-display-column.component';
import { MbsOperationTypeResourceService } from './services/operation-type.service';
import { MbsOperationTypeResolver } from './resolvers/operation-type.resolver';

import { MbsRelifListLoaderComponent } from './components/relif/relif-list-loader/relif-list-loader.component';
import { MbsRelifDetailBoxComponent } from './components/relif/relif-detail-box/relif-detail-box.component';
import { MbsRelifDisplayColumnComponent } from './components/relif/relif-display-column/relif-display-column.component';
import { MbsRelifResourceService } from './services/relif.service';
import { MbsRelifResolver } from './resolvers/relif.resolver';


@NgModule({
	imports: [ 
		AgalCoreModule,

	],
	declarations: [
		MbsAssetListLoaderComponent,
		MbsAssetDetailBoxComponent,
		MbsAssetDisplayColumnComponent,
		MbsDossierListLoaderComponent,
		MbsDossierDetailBoxComponent,
		MbsDossierDisplayColumnComponent,
		MbsDossierTypeListLoaderComponent,
		MbsDossierTypeDetailBoxComponent,
		MbsDossierTypeDisplayColumnComponent,
		MbsOperationListLoaderComponent,
		MbsOperationDetailBoxComponent,
		MbsOperationDisplayColumnComponent,
		MbsOperationTypeListLoaderComponent,
		MbsOperationTypeDetailBoxComponent,
		MbsOperationTypeDisplayColumnComponent,
		MbsRelifListLoaderComponent,
		MbsRelifDetailBoxComponent,
		MbsRelifDisplayColumnComponent,
	],
	providers: [
		MbsAssetResourceService,
		MbsAssetResolver,
		MbsDossierResourceService,
		MbsDossierResolver,
		MbsDossierTypeResourceService,
		MbsDossierTypeResolver,
		MbsOperationResourceService,
		MbsOperationResolver,
		MbsOperationTypeResourceService,
		MbsOperationTypeResolver,
		MbsRelifResourceService,
		MbsRelifResolver,
		
	],
	exports: [
		MbsAssetListLoaderComponent,
		MbsAssetDetailBoxComponent,
		MbsAssetDisplayColumnComponent,
		MbsDossierListLoaderComponent,
		MbsDossierDetailBoxComponent,
		MbsDossierDisplayColumnComponent,
		MbsDossierTypeListLoaderComponent,
		MbsDossierTypeDetailBoxComponent,
		MbsDossierTypeDisplayColumnComponent,
		MbsOperationListLoaderComponent,
		MbsOperationDetailBoxComponent,
		MbsOperationDisplayColumnComponent,
		MbsOperationTypeListLoaderComponent,
		MbsOperationTypeDetailBoxComponent,
		MbsOperationTypeDisplayColumnComponent,
		MbsRelifListLoaderComponent,
		MbsRelifDetailBoxComponent,
		MbsRelifDisplayColumnComponent,
	],
})
export class MbsMainModule {}