import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsCalculationMethodDto } from '../../../class/calculation-method-dto.class';
import { MbsCalculationMethodResourceService } from '../../../services/calculation-method.service';

@Component({
	selector: 'mbs-calculation-method-list-loader',
	templateUrl: './calculation-method-list-loader.component.html',
	styleUrls: ['./calculation-method-list-loader.component.scss']
})
export class MbsCalculationMethodListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsCalculationMethodResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllCalculationMethodsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countCalculationMethodsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "calculationMethod") this.loadData();
	}
}
