import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';
import { AgalEvent } from '@agal-core/modules/eventer/services/eventer.service';

import { MbsDossierTypeDto } from '../../../class/dossier-type-dto.class';
import { MbsDossierTypeResourceService } from '../../../services/dossier-type.service';

@Component({
	selector: 'mbs-dossier-type-list-loader',
	templateUrl: './dossier-type-list-loader.component.html',
	styleUrls: ['./dossier-type-list-loader.component.scss']
})
export class MbsDossierTypeListLoaderComponent extends AgalGenericTable2 {
	constructor(
		private resourceService: MbsDossierTypeResourceService,
		agcs: AgalCommonService,

	) { super(agcs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllDossierTypesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countDossierTypesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: AgalEvent) {
		if(event.data === "dossierType") this.loadData();
	}
}
