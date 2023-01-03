import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';
import { StalEventerService, StalEvent } from "@stal/eventer";

import { MbsRelifDto } from '../../../class/relif-dto.class';
import { MbsRelifResourceService } from '../../../services/relif.service';

@Component({
	selector: 'mbs-relif-list-loader',
	templateUrl: './relif-list-loader.component.html',
	styleUrls: ['./relif-list-loader.component.scss']
})
export class MbsRelifListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsRelifResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllRelifsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countRelifsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "relif") this.loadData();
	}
}
