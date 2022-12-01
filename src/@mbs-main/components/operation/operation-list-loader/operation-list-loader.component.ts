import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { MbsOperationDto } from '../../../class/operation-dto.class';
import { MbsOperationResourceService } from '../../../services/operation.service';

@Component({
	selector: 'mbs-operation-list-loader',
	templateUrl: './operation-list-loader.component.html',
	styleUrls: ['./operation-list-loader.component.scss']
})
export class MbsOperationListLoaderComponent extends AgalGenericTable2 {
	constructor(
		private resourceService: MbsOperationResourceService,
		agcs: AgalCommonService,

	) { super(agcs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllOperationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countOperationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}
}
