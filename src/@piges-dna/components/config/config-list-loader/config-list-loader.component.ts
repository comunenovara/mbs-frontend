import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { PigesConfigDTO } from '../../../class/configDTO.class';
import { PigesConfigResourceService } from '../../../services/config.service';

@Component({
    selector: 'piges-config-list-loader',
    templateUrl: './config-list-loader.component.html',
    styleUrls: ['./config-list-loader.component.scss']
})
export class PigesConfigListLoaderComponent extends AgalGenericTable2 {
    constructor(
        private resourceService: PigesConfigResourceService,
        agcs: AgalCommonService,

    ) { super(agcs); }

    protected override async callApi(filters: any) {
        try {
			this.ds = await lastValueFrom(this.resourceService.getAllConfigsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countConfigsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
    }
}
