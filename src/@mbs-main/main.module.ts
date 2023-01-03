import { NgModule } from '@angular/core';
import { EngeCommonLibModule } from '@enge/common-lib';

import { MbsMainAutocompleteService } from './service/main-auto-complete.service';

import { MbsAssetListLoaderComponent } from './components/asset/asset-list-loader/asset-list-loader.component';
import { MbsAssetDetailBoxComponent } from './components/asset/asset-detail-box/asset-detail-box.component';
import { MbsAssetDisplayColumnComponent } from './components/asset/asset-display-column/asset-display-column.component';
import { MbsAssetNewUpdateFormComponent } from './components/asset/asset-new-update-form/asset-new-update-form.component';
import { MbsAssetResourceService } from './services/asset.service';
import { MbsAssetResolver } from './resolvers/asset.resolver';

import { MbsDossierListLoaderComponent } from './components/dossier/dossier-list-loader/dossier-list-loader.component';
import { MbsDossierDetailBoxComponent } from './components/dossier/dossier-detail-box/dossier-detail-box.component';
import { MbsDossierDisplayColumnComponent } from './components/dossier/dossier-display-column/dossier-display-column.component';
import { MbsDossierNewUpdateFormComponent } from './components/dossier/dossier-new-update-form/dossier-new-update-form.component';
import { MbsDossierResourceService } from './services/dossier.service';
import { MbsDossierResolver } from './resolvers/dossier.resolver';

import { MbsDossierTypeListLoaderComponent } from './components/dossier-type/dossier-type-list-loader/dossier-type-list-loader.component';
import { MbsDossierTypeDetailBoxComponent } from './components/dossier-type/dossier-type-detail-box/dossier-type-detail-box.component';
import { MbsDossierTypeDisplayColumnComponent } from './components/dossier-type/dossier-type-display-column/dossier-type-display-column.component';
import { MbsDossierTypeNewUpdateFormComponent } from './components/dossier-type/dossier-type-new-update-form/dossier-type-new-update-form.component';
import { MbsDossierTypeResourceService } from './services/dossier-type.service';
import { MbsDossierTypeResolver } from './resolvers/dossier-type.resolver';

import { MbsOperationListLoaderComponent } from './components/operation/operation-list-loader/operation-list-loader.component';
import { MbsOperationDetailBoxComponent } from './components/operation/operation-detail-box/operation-detail-box.component';
import { MbsOperationDisplayColumnComponent } from './components/operation/operation-display-column/operation-display-column.component';
import { MbsOperationNewUpdateFormComponent } from './components/operation/operation-new-update-form/operation-new-update-form.component';
import { MbsOperationResourceService } from './services/operation.service';
import { MbsOperationResolver } from './resolvers/operation.resolver';

import { MbsOperationTypeListLoaderComponent } from './components/operation-type/operation-type-list-loader/operation-type-list-loader.component';
import { MbsOperationTypeDetailBoxComponent } from './components/operation-type/operation-type-detail-box/operation-type-detail-box.component';
import { MbsOperationTypeDisplayColumnComponent } from './components/operation-type/operation-type-display-column/operation-type-display-column.component';
import { MbsOperationTypeNewUpdateFormComponent } from './components/operation-type/operation-type-new-update-form/operation-type-new-update-form.component';
import { MbsOperationTypeResourceService } from './services/operation-type.service';
import { MbsOperationTypeResolver } from './resolvers/operation-type.resolver';

import { MbsRelifListLoaderComponent } from './components/relif/relif-list-loader/relif-list-loader.component';
import { MbsRelifDetailBoxComponent } from './components/relif/relif-detail-box/relif-detail-box.component';
import { MbsRelifDisplayColumnComponent } from './components/relif/relif-display-column/relif-display-column.component';
import { MbsRelifNewUpdateFormComponent } from './components/relif/relif-new-update-form/relif-new-update-form.component';
import { MbsRelifResourceService } from './services/relif.service';
import { MbsRelifResolver } from './resolvers/relif.resolver';



@NgModule({
	imports: [ 
		EngeCommonLibModule,
		
	],
	declarations: [
		MbsAssetListLoaderComponent,
		MbsAssetDetailBoxComponent,
		MbsAssetDisplayColumnComponent,
		MbsAssetNewUpdateFormComponent,
		MbsDossierListLoaderComponent,
		MbsDossierDetailBoxComponent,
		MbsDossierDisplayColumnComponent,
		MbsDossierNewUpdateFormComponent,
		MbsDossierTypeListLoaderComponent,
		MbsDossierTypeDetailBoxComponent,
		MbsDossierTypeDisplayColumnComponent,
		MbsDossierTypeNewUpdateFormComponent,
		MbsOperationListLoaderComponent,
		MbsOperationDetailBoxComponent,
		MbsOperationDisplayColumnComponent,
		MbsOperationNewUpdateFormComponent,
		MbsOperationTypeListLoaderComponent,
		MbsOperationTypeDetailBoxComponent,
		MbsOperationTypeDisplayColumnComponent,
		MbsOperationTypeNewUpdateFormComponent,
		MbsRelifListLoaderComponent,
		MbsRelifDetailBoxComponent,
		MbsRelifDisplayColumnComponent,
		MbsRelifNewUpdateFormComponent,
	],
	providers: [
		MbsMainAutocompleteService,
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
		EngeCommonLibModule,

		MbsAssetListLoaderComponent,
		MbsAssetDetailBoxComponent,
		MbsAssetDisplayColumnComponent,
		MbsAssetNewUpdateFormComponent,
		MbsDossierListLoaderComponent,
		MbsDossierDetailBoxComponent,
		MbsDossierDisplayColumnComponent,
		MbsDossierNewUpdateFormComponent,
		MbsDossierTypeListLoaderComponent,
		MbsDossierTypeDetailBoxComponent,
		MbsDossierTypeDisplayColumnComponent,
		MbsDossierTypeNewUpdateFormComponent,
		MbsOperationListLoaderComponent,
		MbsOperationDetailBoxComponent,
		MbsOperationDisplayColumnComponent,
		MbsOperationNewUpdateFormComponent,
		MbsOperationTypeListLoaderComponent,
		MbsOperationTypeDetailBoxComponent,
		MbsOperationTypeDisplayColumnComponent,
		MbsOperationTypeNewUpdateFormComponent,
		MbsRelifListLoaderComponent,
		MbsRelifDetailBoxComponent,
		MbsRelifDisplayColumnComponent,
		MbsRelifNewUpdateFormComponent,
	],
})
export class MbsMainLibModule {}