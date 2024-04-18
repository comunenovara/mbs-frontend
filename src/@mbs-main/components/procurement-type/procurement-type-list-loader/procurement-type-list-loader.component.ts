import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsProcurementTypeDto } from '../../../class/procurement-type-dto.class';
import { MbsProcurementTypeResourceService } from '../../../services/procurement-type.service';

@Component({
	selector: 'mbs-procurement-type-list-loader',
	templateUrl: './procurement-type-list-loader.component.html',
	styleUrls: ['./procurement-type-list-loader.component.scss']
})
export class MbsProcurementTypeListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsProcurementTypeResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllProcurementTypesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countProcurementTypesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "procurementType") this.loadData();
	}
}
