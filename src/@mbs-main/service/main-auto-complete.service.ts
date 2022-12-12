import { Injectable } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { MbsAssetResourceService } from '@mbs-main/services/asset.service';
import { MbsDossierResourceService } from '@mbs-main/services/dossier.service';
import { MbsDossierTypeResourceService } from '@mbs-main/services/dossier-type.service';
import { MbsOperationResourceService } from '@mbs-main/services/operation.service';
import { MbsOperationTypeResourceService } from '@mbs-main/services/operation-type.service';
import { MbsRelifResourceService } from '@mbs-main/services/relif.service';

@Injectable({providedIn: 'root'})
export class MbsMainAutocompleteService {
	constructor(
		private assetResourceService: MbsAssetResourceService,
		private dossierResourceService: MbsDossierResourceService,
		private dossierTypeResourceService: MbsDossierTypeResourceService,
		private operationResourceService: MbsOperationResourceService,
		private operationTypeResourceService: MbsOperationTypeResourceService,
		private relifResourceService: MbsRelifResourceService,
	) { }

	filterAsset(observable: Observable<any>) {
		return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {

                    };
                    return this.assetResourceService.getAllAssetsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
	}

	filterDossier(observable: Observable<any>) {
		return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {

                    };
                    return this.dossierResourceService.getAllDossiersUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
	}

	filterDossierType(observable: Observable<any>) {
		return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {

                    };
                    return this.dossierTypeResourceService.getAllDossierTypesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
	}

	filterOperation(observable: Observable<any>) {
		return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {

                    };
                    return this.operationResourceService.getAllOperationsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
	}

	filterOperationType(observable: Observable<any>) {
		return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {

                    };
                    return this.operationTypeResourceService.getAllOperationTypesUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
	}

	filterRelif(observable: Observable<any>) {
		return observable.pipe(
            startWith(''),
            switchMap((value: string) => {
                if (value && value.length > 0) {
                    let filter = {

                    };
                    return this.relifResourceService.getAllRelifsUsingGET(filter);
                } else {
                    return of([]);
                }
            })
        );
	}

}