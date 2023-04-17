import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsFaseDto } from '../../../class/fase-dto.class';
import { MbsFaseResourceService } from '../../../services/fase.service';

@Component({
	selector: 'mbs-fase-list-loader',
	templateUrl: './fase-list-loader.component.html',
	styleUrls: ['./fase-list-loader.component.scss']
})
export class MbsFaseListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsFaseResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllFasesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countFasesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "fase") this.loadData();
	}
}
