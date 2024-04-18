import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsGovernativeProjectDto } from '../../../class/governative-project-dto.class';
import { MbsGovernativeProjectResourceService } from '../../../services/governative-project.service';

@Component({
	selector: 'mbs-governative-project-list-loader',
	templateUrl: './governative-project-list-loader.component.html',
	styleUrls: ['./governative-project-list-loader.component.scss']
})
export class MbsGovernativeProjectListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsGovernativeProjectResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllGovernativeProjectsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countGovernativeProjectsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "governativeProject") this.loadData();
	}
}
