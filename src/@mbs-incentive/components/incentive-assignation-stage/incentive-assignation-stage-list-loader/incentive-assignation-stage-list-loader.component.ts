import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveAssignationStageDto } from '../../../class/incentive-assignation-stage-dto.class';
import { MbsIncentiveAssignationStageResourceService } from '../../../services/incentive-assignation-stage.service';

@Component({
	selector: 'mbs-incentive-assignation-stage-list-loader',
	templateUrl: './incentive-assignation-stage-list-loader.component.html',
	styleUrls: ['./incentive-assignation-stage-list-loader.component.scss']
})
export class MbsIncentiveAssignationStageListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveAssignationStageResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveAssignationStagesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveAssignationStagesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveAssignationStage") this.loadData();
	}
}
