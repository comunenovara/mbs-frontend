import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PigesAccountDTO } from '../class/accountDTO.class';
import { PigesAccountResourceService } from '../services/account.service';

@Injectable()
export class PigesAccountResolver implements Resolve<Observable<PigesAccountDTO>> {
    constructor(private accountResourceService: PigesAccountResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id = route.paramMap.get('id');
        if(id === null) throw new Error('Not valid Id');
        return this.accountResourceService.getAccountUsingGET(+id);
    }
}