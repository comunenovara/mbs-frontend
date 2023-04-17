import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncaricoDto } from '../class/incarico-dto.class';
import { MbsIncaricoResourceService } from '../services/incarico.service';

@Injectable()
export class MbsIncaricoResolver implements Resolve<Observable<MbsIncaricoDto>> {
	constructor(private incaricoResourceService: MbsIncaricoResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incaricoResourceService.getIncaricoUsingGET(+id);
	}
}