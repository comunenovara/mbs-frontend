import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveWithheldDto } from '../../../class/incentive-withheld-dto.class';
import { MbsIncentiveWithheldResourceService } from '../../../services/incentive-withheld.service';

@Component({
	selector: 'mbs-incentive-withheld-list-loader',
	templateUrl: './incentive-withheld-list-loader.component.html',
	styleUrls: ['./incentive-withheld-list-loader.component.scss']
})
export class MbsIncentiveWithheldListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveWithheldResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveWithheldsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveWithheldsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveWithheld") this.loadData();
	}
}
