import { Injectable } from '@angular/core';
import { Observable, of, startWith, switchMap } from 'rxjs';

import { MbsAssetResourceService } from '@mbs-main/services/asset.service';
import { MbsAssetDto } from '@mbs-main/class/asset-dto.class';
import { MbsRelifResourceService } from '@mbs-main/services/relif.service';
import { MbsRelifDto } from '@mbs-main/class/relif-dto.class';
import { MbsOperationTypeResourceService } from '@mbs-main/services/operation-type.service';
import { MbsOperationTypeDto } from '@mbs-main/class/operation-type-dto.class';
import { MbsOperationResourceService } from '@mbs-main/services/operation.service';
import { MbsOperationDto } from '@mbs-main/class/operation-dto.class';
import { MbsDossierTypeResourceService } from '@mbs-main/services/dossier-type.service';
import { MbsDossierTypeDto } from '@mbs-main/class/dossier-type-dto.class';
import { MbsElaborateGroupResourceService } from '@mbs-main/services/elaborate-group.service';
import { MbsElaborateGroupDto } from '@mbs-main/class/elaborate-group-dto.class';
import { MbsDossierResourceService } from '@mbs-main/services/dossier.service';
import { MbsDossierDto } from '@mbs-main/class/dossier-dto.class';

@Injectable({providedIn: 'root'})
export class MbsMainAutocompleteService {
	constructor(
		private assetResourceService: MbsAssetResourceService,
		private relifResourceService: MbsRelifResourceService,
		private operationTypeResourceService: MbsOperationTypeResourceService,
		private operationResourceService: MbsOperationResourceService,
		private dossierTypeResourceService: MbsDossierTypeResourceService,
		private elaborateGroupResourceService: MbsElaborateGroupResourceService,
		private dossierResourceService: MbsDossierResourceService,
	) { }

	filterAsset(observable: Observable<any>): Observable<MbsAssetDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.assetResourceService.getAllAssetsUsingGET(filter);
		  })
	   );
	}

	displayAsset(selectedElement: any) {
		return selectedElement.description;
	}

	filterRelif(observable: Observable<any>): Observable<MbsRelifDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.relifResourceService.getAllRelifsUsingGET(filter);
		  })
	   );
	}

	displayRelif(selectedElement: any) {
		return selectedElement.description;
	}

	filterOperationType(observable: Observable<any>): Observable<MbsOperationTypeDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.operationTypeResourceService.getAllOperationTypesUsingGET(filter);
		  })
	   );
	}

	displayOperationType(selectedElement: any) {
		return selectedElement.description;
	}

	filterOperation(observable: Observable<any>): Observable<MbsOperationDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.operationResourceService.getAllOperationsUsingGET(filter);
		  })
	   );
	}

	displayOperation(selectedElement: any) {
		return selectedElement.description;
	}

	filterDossierType(observable: Observable<any>): Observable<MbsDossierTypeDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.dossierTypeResourceService.getAllDossierTypesUsingGET(filter);
		  })
	   );
	}

	displayDossierType(selectedElement: any) {
		return selectedElement.description;
	}

	filterElaborateGroup(observable: Observable<any>): Observable<MbsElaborateGroupDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.elaborateGroupResourceService.getAllElaborateGroupsUsingGET(filter);
		  })
	   );
	}

	displayElaborateGroup(selectedElement: any) {
		return selectedElement.description;
	}

	filterDossier(observable: Observable<any>): Observable<MbsDossierDto[]> {
		return observable.pipe(
			startWith(() => ''),
			switchMap((value: string) => {
				let filter: any = {};
				if(value && value.length > 0)  {
					filter.descriptionContains = value;
				};
				return this.dossierResourceService.getAllDossiersUsingGET(filter);
		  })
	   );
	}

	displayDossier(selectedElement: any) {
		return selectedElement.description;
	}

}