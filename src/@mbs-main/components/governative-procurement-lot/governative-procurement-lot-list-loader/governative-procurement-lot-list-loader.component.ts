import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsGovernativeProcurementLotDto } from '../../../class/governative-procurement-lot-dto.class';
import { MbsGovernativeProcurementLotResourceService } from '../../../services/governative-procurement-lot.service';

@Component({
	selector: 'mbs-governative-procurement-lot-list-loader',
	templateUrl: './governative-procurement-lot-list-loader.component.html',
	styleUrls: ['./governative-procurement-lot-list-loader.component.scss']
})
export class MbsGovernativeProcurementLotListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsGovernativeProcurementLotResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllGovernativeProcurementLotsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countGovernativeProcurementLotsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProcurementLot") this.loadData();
	}
}
