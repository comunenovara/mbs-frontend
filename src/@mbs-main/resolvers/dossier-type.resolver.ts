import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsDossierTypeDTO } from '../class/dossier-type-dto.class';
import { MbsDossierTypeResourceService } from '../services/dossier-type.service';

@Injectable()
export class MbsDossierTypeResolver implements Resolve<Observable<MbsDossierTypeDTO>> {
	constructor(private dossierTypeResourceService: MbsDossierTypeResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.dossierTypeResourceService.getDossierTypeUsingGET(+id);
	}
}