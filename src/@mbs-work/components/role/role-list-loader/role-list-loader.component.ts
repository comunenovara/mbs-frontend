import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsRoleDto } from '../../../class/role-dto.class';
import { MbsRoleResourceService } from '../../../services/role.service';

@Component({
	selector: 'mbs-role-list-loader',
	templateUrl: './role-list-loader.component.html',
	styleUrls: ['./role-list-loader.component.scss']
})
export class MbsRoleListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsRoleResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllRolesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countRolesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "role") this.loadData();
	}
}
