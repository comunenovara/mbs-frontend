import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsProjectDto } from '../../../class/project-dto.class';
import { MbsProjectResourceService } from '../../../services/project.service';

@Component({
	selector: 'mbs-project-list-loader',
	templateUrl: './project-list-loader.component.html',
	styleUrls: ['./project-list-loader.component.scss']
})
export class MbsProjectListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsProjectResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllProjectsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countProjectsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "project") this.loadData();
	}
}
