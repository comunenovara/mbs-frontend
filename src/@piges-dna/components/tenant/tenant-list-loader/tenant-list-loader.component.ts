import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { PigesTenantDTO } from '../../../class/tenantDTO.class';
import { PigesTenantResourceService } from '../../../services/tenant.service';

@Component({
    selector: 'piges-tenant-list-loader',
    templateUrl: './tenant-list-loader.component.html',
    styleUrls: ['./tenant-list-loader.component.scss']
})
export class PigesTenantListLoaderComponent extends AgalGenericTable2 {
    constructor(
        private resourceService: PigesTenantResourceService,
        agcs: AgalCommonService,

    ) { super(agcs); }

    protected override async callApi(filters: any) {
        try {
			this.ds = await lastValueFrom(this.resourceService.getAllTenantsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countTenantsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
    }
}
