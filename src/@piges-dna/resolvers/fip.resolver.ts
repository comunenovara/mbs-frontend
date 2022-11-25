import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PigesFipDTO } from '../class/fipDTO.class';
import { PigesFipResourceService } from '../services/fip.service';

@Injectable()
export class PigesFipResolver implements Resolve<Observable<PigesFipDTO>> {
    constructor(private fipResourceService: PigesFipResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id = route.paramMap.get('id');
        if(id === null) throw new Error('Not valid Id');
        return this.fipResourceService.getFipUsingGET(+id);
    }
}