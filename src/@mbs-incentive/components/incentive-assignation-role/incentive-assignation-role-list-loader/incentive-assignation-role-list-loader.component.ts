import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveAssignationRoleDto } from '../../../class/incentive-assignation-role-dto.class';
import { MbsIncentiveAssignationRoleResourceService } from '../../../services/incentive-assignation-role.service';

@Component({
	selector: 'mbs-incentive-assignation-role-list-loader',
	templateUrl: './incentive-assignation-role-list-loader.component.html',
	styleUrls: ['./incentive-assignation-role-list-loader.component.scss']
})
export class MbsIncentiveAssignationRoleListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveAssignationRoleResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveAssignationRolesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveAssignationRolesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveAssignationRole") this.loadData();
	}
}
