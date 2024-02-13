import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsCalculationFactorDto } from '../../../class/calculation-factor-dto.class';
import { MbsCalculationFactorResourceService } from '../../../services/calculation-factor.service';

@Component({
	selector: 'mbs-calculation-factor-list-loader',
	templateUrl: './calculation-factor-list-loader.component.html',
	styleUrls: ['./calculation-factor-list-loader.component.scss']
})
export class MbsCalculationFactorListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsCalculationFactorResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllCalculationFactorsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countCalculationFactorsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "calculationFactor") this.loadData();
	}
}
