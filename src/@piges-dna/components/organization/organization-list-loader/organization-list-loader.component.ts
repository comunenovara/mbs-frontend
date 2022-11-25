import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { PigesOrganizationDTO } from '../../../class/organizationDTO.class';
import { PigesOrganizationResourceService } from '../../../services/organization.service';

@Component({
    selector: 'piges-organization-list-loader',
    templateUrl: './organization-list-loader.component.html',
    styleUrls: ['./organization-list-loader.component.scss']
})
export class PigesOrganizationListLoaderComponent extends AgalGenericTable2 {
    constructor(
        private resourceService: PigesOrganizationResourceService,
        agcs: AgalCommonService,

    ) { super(agcs); }

    protected override async callApi(filters: any) {
        try {
			this.ds = await lastValueFrom(this.resourceService.getAllOrganizationsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countOrganizationsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
    }
}
