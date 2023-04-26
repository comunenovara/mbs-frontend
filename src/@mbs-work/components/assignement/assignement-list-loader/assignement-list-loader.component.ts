import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsAssignementDto } from '../../../class/assignement-dto.class';
import { MbsAssignementResourceService } from '../../../services/assignement.service';

@Component({
	selector: 'mbs-assignement-list-loader',
	templateUrl: './assignement-list-loader.component.html',
	styleUrls: ['./assignement-list-loader.component.scss']
})
export class MbsAssignementListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsAssignementResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllAssignementsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countAssignementsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "assignement") this.loadData();
	}
}
