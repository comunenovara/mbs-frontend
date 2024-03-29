import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsBeneficiaryDto } from '../../../class/beneficiary-dto.class';
import { MbsBeneficiaryResourceService } from '../../../services/beneficiary.service';

@Component({
	selector: 'mbs-beneficiary-list-loader',
	templateUrl: './beneficiary-list-loader.component.html',
	styleUrls: ['./beneficiary-list-loader.component.scss']
})
export class MbsBeneficiaryListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsBeneficiaryResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllBeneficiariesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countBeneficiariesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "beneficiary") this.loadData();
	}
}
