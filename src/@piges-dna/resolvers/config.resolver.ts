import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PigesConfigDTO } from '../class/configDTO.class';
import { PigesConfigResourceService } from '../services/config.service';

@Injectable()
export class PigesConfigResolver implements Resolve<Observable<PigesConfigDTO>> {
    constructor(private configResourceService: PigesConfigResourceService) { }

    resolve(route: ActivatedRouteSnapshot) {
        var id = route.paramMap.get('id');
        if(id === null) throw new Error('Not valid Id');
        return this.configResourceService.getConfigUsingGET(+id);
    }
}