import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { MbsOperationTypeDTO } from '../../../class/operation-type-dto.class';
import { MbsOperationTypeResourceService } from '../../../services/operation-type.service';

@Component({
	selector: 'mbs-operation-type-list-loader',
	templateUrl: './operation-type-list-loader.component.html',
	styleUrls: ['./operation-type-list-loader.component.scss']
})
export class MbsOperationTypeListLoaderComponent extends AgalGenericTable2 {
	constructor(
		private resourceService: MbsOperationTypeResourceService,
		agcs: AgalCommonService,

	) { super(agcs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllOperationTypesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countOperationTypesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}
}
