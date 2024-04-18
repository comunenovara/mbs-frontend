import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveRoleAssignationDto } from '../../../class/incentive-role-assignation-dto.class';
import { MbsIncentiveRoleAssignationResourceService } from '../../../services/incentive-role-assignation.service';

@Component({
	selector: 'mbs-incentive-role-assignation-list-loader',
	templateUrl: './incentive-role-assignation-list-loader.component.html',
	styleUrls: ['./incentive-role-assignation-list-loader.component.scss']
})
export class MbsIncentiveRoleAssignationListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveRoleAssignationResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveRoleAssignationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveRoleAssignationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRoleAssignation") this.loadData();
	}
}
