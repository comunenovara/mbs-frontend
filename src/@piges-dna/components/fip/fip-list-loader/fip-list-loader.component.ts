import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { AgalCommonService } from '@agal-core/services/common.service';
import { AgalGenericTable2 } from '@agal-core/components/agal-generic-table2';

import { PigesFipDTO } from '../../../class/fipDTO.class';
import { PigesFipResourceService } from '../../../services/fip.service';

@Component({
    selector: 'piges-fip-list-loader',
    templateUrl: './fip-list-loader.component.html',
    styleUrls: ['./fip-list-loader.component.scss']
})
export class PigesFipListLoaderComponent extends AgalGenericTable2 {
    constructor(
        private resourceService: PigesFipResourceService,
        agcs: AgalCommonService,

    ) { super(agcs); }

    protected override async callApi(filters: any) {
        try {
			this.ds = await lastValueFrom(this.resourceService.getAllFipsUsingGET(filters));
			this.totalRecords = await lastValueFrom(this.resourceService.countFipsUsingGET(filters));
		} catch(e) {
			console.log(e);
		}
    }
}
