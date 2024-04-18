import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveRoleDto } from '../../../class/incentive-role-dto.class';
import { MbsIncentiveRoleResourceService } from '../../../services/incentive-role.service';

@Component({
	selector: 'mbs-incentive-role-list-loader',
	templateUrl: './incentive-role-list-loader.component.html',
	styleUrls: ['./incentive-role-list-loader.component.scss']
})
export class MbsIncentiveRoleListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveRoleResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveRolesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveRolesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRole") this.loadData();
	}
}
