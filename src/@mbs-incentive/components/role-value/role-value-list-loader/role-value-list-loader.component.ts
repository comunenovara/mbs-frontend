import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsRoleValueDto } from '../../../class/role-value-dto.class';
import { MbsRoleValueResourceService } from '../../../services/role-value.service';

@Component({
	selector: 'mbs-role-value-list-loader',
	templateUrl: './role-value-list-loader.component.html',
	styleUrls: ['./role-value-list-loader.component.scss']
})
export class MbsRoleValueListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsRoleValueResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllRoleValuesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countRoleValuesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "roleValue") this.loadData();
	}
}
