import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsTecnicoDto } from '../class/tecnico-dto.class';
import { MbsTecnicoResourceService } from '../services/tecnico.service';

@Injectable()
export class MbsTecnicoResolver implements Resolve<Observable<MbsTecnicoDto>> {
	constructor(private tecnicoResourceService: MbsTecnicoResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.tecnicoResourceService.getTecnicoUsingGET(+id);
	}
}