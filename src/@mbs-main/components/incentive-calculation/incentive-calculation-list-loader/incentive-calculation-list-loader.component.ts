import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveCalculationDto } from '../../../class/incentive-calculation-dto.class';
import { MbsIncentiveCalculationResourceService } from '../../../services/incentive-calculation.service';

@Component({
	selector: 'mbs-incentive-calculation-list-loader',
	templateUrl: './incentive-calculation-list-loader.component.html',
	styleUrls: ['./incentive-calculation-list-loader.component.scss']
})
export class MbsIncentiveCalculationListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveCalculationResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveCalculationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveCalculationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculation") this.loadData();
	}
}
