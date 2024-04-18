import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveCalculationMethodDto } from '../../../class/incentive-calculation-method-dto.class';
import { MbsIncentiveCalculationMethodResourceService } from '../../../services/incentive-calculation-method.service';

@Component({
	selector: 'mbs-incentive-calculation-method-list-loader',
	templateUrl: './incentive-calculation-method-list-loader.component.html',
	styleUrls: ['./incentive-calculation-method-list-loader.component.scss']
})
export class MbsIncentiveCalculationMethodListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveCalculationMethodResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveCalculationMethodsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveCalculationMethodsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculationMethod") this.loadData();
	}
}
