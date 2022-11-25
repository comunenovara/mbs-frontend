import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PigesTenantDTO } from '../class/tenantDTO.class';
import { PigesTenantResourceService } from '../services/tenant.service';

@Injectable()
export class PigesTenantResolver implements Resolve<Observable<PigesTenantDTO>> {
    constructor(private tenantResourceService: PigesTenantResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id = route.paramMap.get('id');
        if(id === null) throw new Error('Not valid Id');
        return this.tenantResourceService.getTenantUsingGET(+id);
    }
}