import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PigesOrganizationDTO } from '../class/organizationDTO.class';
import { PigesOrganizationResourceService } from '../services/organization.service';

@Injectable()
export class PigesOrganizationResolver implements Resolve<Observable<PigesOrganizationDTO>> {
    constructor(private organizationResourceService: PigesOrganizationResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id = route.paramMap.get('id');
        if(id === null) throw new Error('Not valid Id');
        return this.organizationResourceService.getOrganizationUsingGET(+id);
    }
}