import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsFaseDto } from '../class/fase-dto.class';
import { MbsFaseResourceService } from '../services/fase.service';

@Injectable()
export class MbsFaseResolver implements Resolve<Observable<MbsFaseDto>> {
	constructor(private faseResourceService: MbsFaseResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.faseResourceService.getFaseUsingGET(+id);
	}
}