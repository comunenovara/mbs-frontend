import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { EngeCommonService, EngeGenericTable } from '@enge/common-lib';
import { StalEventerService, StalEvent } from "@stal/eventer";

import { MbsOperationDto } from '../../../class/operation-dto.class';
import { MbsOperationResourceService } from '../../../services/operation.service';

@Component({
	selector: 'mbs-operation-list-loader',
	templateUrl: './operation-list-loader.component.html',
	styleUrls: ['./operation-list-loader.component.scss']
})
export class MbsOperationListLoaderComponent extends EngeGenericTable {
	constructor(
		private resourceService: MbsOperationResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllOperationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countOperationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "operation") this.loadData();
	}
}
