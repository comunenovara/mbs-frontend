import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { MbsRelifDTO } from '../../../class/relif-dto.class';
import { MbsRelifResourceService } from '../../../services/relif.service';

@Component({
	selector: 'mbs-relif-list-loader',
	templateUrl: './relif-list-loader.component.html',
	styleUrls: ['./relif-list-loader.component.scss']
})
export class MbsRelifListLoaderComponent extends AgalGenericTable2 {
	constructor(
		private resourceService: MbsRelifResourceService,
		agcs: AgalCommonService,

	) { super(agcs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllRelifsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countRelifsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}
}
