import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsEmployeeDto } from '../../../class/employee-dto.class';
import { MbsEmployeeResourceService } from '../../../services/employee.service';

@Component({
	selector: 'mbs-employee-list-loader',
	templateUrl: './employee-list-loader.component.html',
	styleUrls: ['./employee-list-loader.component.scss']
})
export class MbsEmployeeListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsEmployeeResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllEmployeesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countEmployeesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "employee") this.loadData();
	}
}
