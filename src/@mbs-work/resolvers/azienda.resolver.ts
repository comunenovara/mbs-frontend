import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsAziendaDto } from '../class/azienda-dto.class';
import { MbsAziendaResourceService } from '../services/azienda.service';

@Injectable()
export class MbsAziendaResolver implements Resolve<Observable<MbsAziendaDto>> {
	constructor(private aziendaResourceService: MbsAziendaResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.aziendaResourceService.getAziendaUsingGET(+id);
	}
}