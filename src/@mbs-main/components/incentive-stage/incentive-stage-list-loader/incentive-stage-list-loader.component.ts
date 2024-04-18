import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveStageDto } from '../../../class/incentive-stage-dto.class';
import { MbsIncentiveStageResourceService } from '../../../services/incentive-stage.service';

@Component({
	selector: 'mbs-incentive-stage-list-loader',
	templateUrl: './incentive-stage-list-loader.component.html',
	styleUrls: ['./incentive-stage-list-loader.component.scss']
})
export class MbsIncentiveStageListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveStageResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveStagesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveStagesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveStage") this.loadData();
	}
}
