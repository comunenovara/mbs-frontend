import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsAssetResourceService } from '../../../services/asset.service';

@Component({
	selector: 'mbs-asset-list-loader',
	templateUrl: './asset-list-loader.component.html',
	styleUrls: ['./asset-list-loader.component.scss']
})
export class MbsAssetListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsAssetResourceService,
		ecs: EngeCommonService,
	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllAssetsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countAssetsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "asset") this.loadData();
	}
}
