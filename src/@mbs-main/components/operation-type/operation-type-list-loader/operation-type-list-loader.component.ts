import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsOperationTypeDto } from '../../../class/operation-type-dto.class';
import { MbsOperationTypeResourceService } from '../../../services/operation-type.service';

@Component({
	selector: 'mbs-operation-type-list-loader',
	templateUrl: './operation-type-list-loader.component.html',
	styleUrls: ['./operation-type-list-loader.component.scss']
})
export class MbsOperationTypeListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsOperationTypeResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllOperationTypesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countOperationTypesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "operationType") this.loadData();
	}
}
