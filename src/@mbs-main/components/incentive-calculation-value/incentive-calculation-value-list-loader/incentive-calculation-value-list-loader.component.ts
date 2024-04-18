import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveCalculationValueDto } from '../../../class/incentive-calculation-value-dto.class';
import { MbsIncentiveCalculationValueResourceService } from '../../../services/incentive-calculation-value.service';

@Component({
	selector: 'mbs-incentive-calculation-value-list-loader',
	templateUrl: './incentive-calculation-value-list-loader.component.html',
	styleUrls: ['./incentive-calculation-value-list-loader.component.scss']
})
export class MbsIncentiveCalculationValueListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveCalculationValueResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveCalculationValuesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveCalculationValuesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculationValue") this.loadData();
	}
}
