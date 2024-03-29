import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveRoleValueDto } from '../../../class/incentive-role-value-dto.class';
import { MbsIncentiveRoleValueResourceService } from '../../../services/incentive-role-value.service';

@Component({
	selector: 'mbs-incentive-role-value-list-loader',
	templateUrl: './incentive-role-value-list-loader.component.html',
	styleUrls: ['./incentive-role-value-list-loader.component.scss']
})
export class MbsIncentiveRoleValueListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveRoleValueResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveRoleValuesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveRoleValuesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRoleValue") this.loadData();
	}
}
