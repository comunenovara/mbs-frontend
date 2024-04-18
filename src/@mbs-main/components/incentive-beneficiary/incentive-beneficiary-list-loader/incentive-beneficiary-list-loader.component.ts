import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsIncentiveBeneficiaryDto } from '../../../class/incentive-beneficiary-dto.class';
import { MbsIncentiveBeneficiaryResourceService } from '../../../services/incentive-beneficiary.service';

@Component({
	selector: 'mbs-incentive-beneficiary-list-loader',
	templateUrl: './incentive-beneficiary-list-loader.component.html',
	styleUrls: ['./incentive-beneficiary-list-loader.component.scss']
})
export class MbsIncentiveBeneficiaryListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsIncentiveBeneficiaryResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllIncentiveBeneficiariesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIncentiveBeneficiariesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveBeneficiary") this.loadData();
	}
}
