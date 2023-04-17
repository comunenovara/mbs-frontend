import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsAziendaDto } from '../../../class/azienda-dto.class';
import { MbsAziendaResourceService } from '../../../services/azienda.service';

@Component({
	selector: 'mbs-azienda-list-loader',
	templateUrl: './azienda-list-loader.component.html',
	styleUrls: ['./azienda-list-loader.component.scss']
})
export class MbsAziendaListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsAziendaResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllAziendasUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countAziendasUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "azienda") this.loadData();
	}
}
