import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveAssignationDto } from '../../../class/incentive-assignation-dto.class';
import { MbsIncentiveAssignationResourceService } from '../../../services/incentive-assignation.service';

@Component({
	selector: 'mbs-incentive-assignation-list-loader',
	templateUrl: './incentive-assignation-list-loader.component.html',
	styleUrls: ['./incentive-assignation-list-loader.component.scss']
})
export class MbsIncentiveAssignationListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveAssignationResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveAssignationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveAssignationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveAssignation") this.loadData();
	}
}
