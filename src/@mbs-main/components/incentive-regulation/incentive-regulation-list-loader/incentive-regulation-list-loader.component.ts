import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveRegulationDto } from '../../../class/incentive-regulation-dto.class';
import { MbsIncentiveRegulationResourceService } from '../../../services/incentive-regulation.service';

@Component({
	selector: 'mbs-incentive-regulation-list-loader',
	templateUrl: './incentive-regulation-list-loader.component.html',
	styleUrls: ['./incentive-regulation-list-loader.component.scss']
})
export class MbsIncentiveRegulationListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveRegulationResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveRegulationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveRegulationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulation") this.loadData();
	}
}
