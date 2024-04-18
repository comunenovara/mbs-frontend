import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsElaborateGroupDto } from '../../../class/elaborate-group-dto.class';
import { MbsElaborateGroupResourceService } from '../../../services/elaborate-group.service';

@Component({
	selector: 'mbs-elaborate-group-list-loader',
	templateUrl: './elaborate-group-list-loader.component.html',
	styleUrls: ['./elaborate-group-list-loader.component.scss']
})
export class MbsElaborateGroupListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsElaborateGroupResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllElaborateGroupsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countElaborateGroupsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "elaborateGroup") this.loadData();
	}
}
