import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { PigesAccountDTO } from '../../../class/accountDTO.class';
import { PigesAccountResourceService } from '../../../services/account.service';

@Component({
    selector: 'piges-account-list-loader',
    templateUrl: './account-list-loader.component.html',
    styleUrls: ['./account-list-loader.component.scss']
})
export class PigesAccountListLoaderComponent extends AgalGenericTable2 {
    constructor(
        private resourceService: PigesAccountResourceService,
        agcs: AgalCommonService,

    ) { super(agcs); }

    protected override async callApi(filters: any) {
        try {
			this.ds = await lastValueFrom(this.resourceService.getAllAccountsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countAccountsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
    }
}
