import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsAssignementDto } from '../class/assignement-dto.class';
import { MbsAssignementResourceService } from '../services/assignement.service';

@Injectable()
export class MbsAssignementResolver implements Resolve<Observable<MbsAssignementDto>> {
	constructor(private assignementResourceService: MbsAssignementResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.assignementResourceService.getAssignementUsingGET(+id);
	}
}