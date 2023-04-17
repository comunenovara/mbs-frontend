import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsProgettoDto } from '../../../class/progetto-dto.class';
import { MbsProgettoResourceService } from '../../../services/progetto.service';

@Component({
	selector: 'mbs-progetto-list-loader',
	templateUrl: './progetto-list-loader.component.html',
	styleUrls: ['./progetto-list-loader.component.scss']
})
export class MbsProgettoListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsProgettoResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllProgettosUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countProgettosUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "progetto") this.loadData();
	}
}
