import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PigesIdentityDTO } from '../class/identityDTO.class';
import { PigesIdentityResourceService } from '../services/identity.service';

@Injectable()
export class PigesIdentityResolver implements Resolve<Observable<PigesIdentityDTO>> {
    constructor(private identityResourceService: PigesIdentityResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id = route.paramMap.get('id');
        if(id === null) throw new Error('Not valid Id');
        return this.identityResourceService.getIdentityUsingGET(+id);
    }
}