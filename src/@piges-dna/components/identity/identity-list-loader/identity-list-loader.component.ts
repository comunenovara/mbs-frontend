import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { PigesIdentityDTO } from '../../../class/identityDTO.class';
import { PigesIdentityResourceService } from '../../../services/identity.service';

@Component({
    selector: 'piges-identity-list-loader',
    templateUrl: './identity-list-loader.component.html',
    styleUrls: ['./identity-list-loader.component.scss']
})
export class PigesIdentityListLoaderComponent extends AgalGenericTable2 {
    constructor(
        private resourceService: PigesIdentityResourceService,
        agcs: AgalCommonService,

    ) { super(agcs); }

    protected override async callApi(filters: any) {
        try {
			this.ds = await lastValueFrom(this.resourceService.getAllIdentitiesUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countIdentitiesUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
    }
}
