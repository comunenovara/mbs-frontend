import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsGovernativeProjectProcurementLotDto } from '../../../class/governative-project-procurement-lot-dto.class';
import { MbsGovernativeProjectProcurementLotResourceService } from '../../../services/governative-project-procurement-lot.service';

@Component({
	selector: 'mbs-governative-project-procurement-lot-list-loader',
	templateUrl: './governative-project-procurement-lot-list-loader.component.html',
	styleUrls: ['./governative-project-procurement-lot-list-loader.component.scss']
})
export class MbsGovernativeProjectProcurementLotListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsGovernativeProjectProcurementLotResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllGovernativeProjectProcurementLotsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countGovernativeProjectProcurementLotsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProjectProcurementLot") this.loadData();
	}
}
