import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsProgettoDto } from '../class/progetto-dto.class';
import { MbsProgettoResourceService } from '../services/progetto.service';

@Injectable()
export class MbsProgettoResolver implements Resolve<Observable<MbsProgettoDto>> {
	constructor(private progettoResourceService: MbsProgettoResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.progettoResourceService.getProgettoUsingGET(+id);
	}
}