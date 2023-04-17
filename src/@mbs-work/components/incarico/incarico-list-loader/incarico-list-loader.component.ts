import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncaricoDto } from '../../../class/incarico-dto.class';
import { MbsIncaricoResourceService } from '../../../services/incarico.service';

@Component({
	selector: 'mbs-incarico-list-loader',
	templateUrl: './incarico-list-loader.component.html',
	styleUrls: ['./incarico-list-loader.component.scss']
})
export class MbsIncaricoListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncaricoResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncaricosUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncaricosUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incarico") this.loadData();
	}
}
