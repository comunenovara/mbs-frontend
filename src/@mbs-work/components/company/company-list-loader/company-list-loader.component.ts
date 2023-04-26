import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsCompanyDto } from '../../../class/company-dto.class';
import { MbsCompanyResourceService } from '../../../services/company.service';

@Component({
	selector: 'mbs-company-list-loader',
	templateUrl: './company-list-loader.component.html',
	styleUrls: ['./company-list-loader.component.scss']
})
export class MbsCompanyListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsCompanyResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllCompaniesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countCompaniesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "company") this.loadData();
	}
}
