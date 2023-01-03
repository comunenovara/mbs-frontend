import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsDossierTypeDto } from '../../../class/dossier-type-dto.class';
import { MbsDossierTypeResourceService } from '../../../services/dossier-type.service';

@Component({
	selector: 'mbs-dossier-type-list-loader',
	templateUrl: './dossier-type-list-loader.component.html',
	styleUrls: ['./dossier-type-list-loader.component.scss']
})
export class MbsDossierTypeListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsDossierTypeResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllDossierTypesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countDossierTypesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "dossierType") this.loadData();
	}
}
