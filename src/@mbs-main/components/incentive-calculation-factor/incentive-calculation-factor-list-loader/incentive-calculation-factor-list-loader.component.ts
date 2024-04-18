import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveCalculationFactorDto } from '../../../class/incentive-calculation-factor-dto.class';
import { MbsIncentiveCalculationFactorResourceService } from '../../../services/incentive-calculation-factor.service';

@Component({
	selector: 'mbs-incentive-calculation-factor-list-loader',
	templateUrl: './incentive-calculation-factor-list-loader.component.html',
	styleUrls: ['./incentive-calculation-factor-list-loader.component.scss']
})
export class MbsIncentiveCalculationFactorListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveCalculationFactorResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveCalculationFactorsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveCalculationFactorsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculationFactor") this.loadData();
	}
}
