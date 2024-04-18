import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveRegulationValueDto } from '../../../class/incentive-regulation-value-dto.class';
import { MbsIncentiveRegulationValueResourceService } from '../../../services/incentive-regulation-value.service';

@Component({
	selector: 'mbs-incentive-regulation-value-list-loader',
	templateUrl: './incentive-regulation-value-list-loader.component.html',
	styleUrls: ['./incentive-regulation-value-list-loader.component.scss']
})
export class MbsIncentiveRegulationValueListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveRegulationValueResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveRegulationValuesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveRegulationValuesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulationValue") this.loadData();
	}
}
