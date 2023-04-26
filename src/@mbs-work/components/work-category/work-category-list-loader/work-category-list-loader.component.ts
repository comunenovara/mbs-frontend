import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { StalEvent } from "@stal/eventer";
import { EngeCommonService, EngeLibGenericTable } from '@enge/common-lib';

import { MbsWorkCategoryDto } from '../../../class/work-category-dto.class';
import { MbsWorkCategoryResourceService } from '../../../services/work-category.service';

@Component({
	selector: 'mbs-work-category-list-loader',
	templateUrl: './work-category-list-loader.component.html',
	styleUrls: ['./work-category-list-loader.component.scss']
})
export class MbsWorkCategoryListLoaderComponent extends EngeLibGenericTable {
	constructor(
		private resourceService: MbsWorkCategoryResourceService,
		ecs: EngeCommonService,

	) { super(ecs); }

	protected override async callApi(filters: any) {
		try {
			this.ds = await lastValueFrom(this.resourceService.getAllWorkCategoriesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countWorkCategoriesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "workCategory") this.loadData();
	}
}
