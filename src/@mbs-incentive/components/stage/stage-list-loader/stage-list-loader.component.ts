import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsStageDto } from '../../../class/stage-dto.class';
import { MbsStageResourceService } from '../../../services/stage.service';

@Component({
	selector: 'mbs-stage-list-loader',
	templateUrl: './stage-list-loader.component.html',
	styleUrls: ['./stage-list-loader.component.scss']
})
export class MbsStageListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsStageResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllStagesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countStagesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "stage") this.loadData();
	}
}
