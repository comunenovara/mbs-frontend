import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { MbsAssetDto } from '../../../class/asset-dto.class';
import { MbsAssetResourceService } from '../../../services/asset.service';

@Component({
	selector: 'mbs-asset-list-loader',
	templateUrl: './asset-list-loader.component.html',
	styleUrls: ['./asset-list-loader.component.scss']
})
export class MbsAssetListLoaderComponent extends AgalGenericTable2 {
	constructor(
		private resourceService: MbsAssetResourceService,
		agcs: AgalCommonService,

	) { super(agcs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllAssetsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countAssetsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}
}
