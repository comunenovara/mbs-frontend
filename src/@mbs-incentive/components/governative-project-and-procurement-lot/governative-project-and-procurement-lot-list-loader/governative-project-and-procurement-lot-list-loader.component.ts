import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsGovernativeProjectAndProcurementLotDto } from '../../../class/governative-project-and-procurement-lot-dto.class';
import { MbsGovernativeProjectAndProcurementLotResourceService } from '../../../services/governative-project-and-procurement-lot.service';

@Component({
	selector: 'mbs-governative-project-and-procurement-lot-list-loader',
	templateUrl: './governative-project-and-procurement-lot-list-loader.component.html',
	styleUrls: ['./governative-project-and-procurement-lot-list-loader.component.scss']
})
export class MbsGovernativeProjectAndProcurementLotListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsGovernativeProjectAndProcurementLotResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllGovernativeProjectAndProcurementLotsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countGovernativeProjectAndProcurementLotsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProjectAndProcurementLot") this.loadData();
	}
}
