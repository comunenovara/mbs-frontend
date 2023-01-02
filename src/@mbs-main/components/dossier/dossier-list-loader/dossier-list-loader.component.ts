import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';
import { StalEventerService, StalEvent } from "@stal/eventer";

import { MbsDossierDto } from '../../../class/dossier-dto.class';
import { MbsDossierResourceService } from '../../../services/dossier.service';

@Component({
	selector: 'mbs-dossier-list-loader',
	templateUrl: './dossier-list-loader.component.html',
	styleUrls: ['./dossier-list-loader.component.scss']
})
export class MbsDossierListLoaderComponent extends AgalGenericTable2 {
	constructor(
		private resourceService: MbsDossierResourceService,
		agcs: AgalCommonService,

	) { super(agcs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllDossiersUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countDossiersUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "dossier") this.loadData();
	}
}
