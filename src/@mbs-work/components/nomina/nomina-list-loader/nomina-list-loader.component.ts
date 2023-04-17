import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsNominaDto } from '../../../class/nomina-dto.class';
import { MbsNominaResourceService } from '../../../services/nomina.service';

@Component({
	selector: 'mbs-nomina-list-loader',
	templateUrl: './nomina-list-loader.component.html',
	styleUrls: ['./nomina-list-loader.component.scss']
})
export class MbsNominaListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsNominaResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllNominasUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countNominasUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "nomina") this.loadData();
	}
}
