import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsDossierDTO } from '../class/dossier-dto.class';
import { MbsDossierResourceService } from '../services/dossier.service';

@Injectable()
export class MbsDossierResolver implements Resolve<Observable<MbsDossierDTO>> {
	constructor(private dossierResourceService: MbsDossierResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.dossierResourceService.getDossierUsingGET(+id);
	}
}