import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsWithheldDto } from '../../../class/withheld-dto.class';
import { MbsWithheldResourceService } from '../../../services/withheld.service';

@Component({
	selector: 'mbs-withheld-list-loader',
	templateUrl: './withheld-list-loader.component.html',
	styleUrls: ['./withheld-list-loader.component.scss']
})
export class MbsWithheldListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsWithheldResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllWithheldsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countWithheldsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "withheld") this.loadData();
	}
}
