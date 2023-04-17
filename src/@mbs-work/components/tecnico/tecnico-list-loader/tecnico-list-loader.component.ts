import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsTecnicoDto } from '../../../class/tecnico-dto.class';
import { MbsTecnicoResourceService } from '../../../services/tecnico.service';

@Component({
	selector: 'mbs-tecnico-list-loader',
	templateUrl: './tecnico-list-loader.component.html',
	styleUrls: ['./tecnico-list-loader.component.scss']
})
export class MbsTecnicoListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsTecnicoResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllTecnicosUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countTecnicosUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "tecnico") this.loadData();
	}
}
