import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsNominaDto } from '../class/nomina-dto.class';
import { MbsNominaResourceService } from '../services/nomina.service';

@Injectable()
export class MbsNominaResolver implements Resolve<Observable<MbsNominaDto>> {
	constructor(private nominaResourceService: MbsNominaResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.nominaResourceService.getNominaUsingGET(+id);
	}
}