import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsElaborateGroupDto } from '../class/elaborate-group-dto.class';
import { MbsElaborateGroupResourceService } from '../services/elaborate-group.service';

@Injectable()
export class MbsElaborateGroupResolver implements Resolve<Observable<MbsElaborateGroupDto>> {
	constructor(private elaborateGroupResourceService: MbsElaborateGroupResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.elaborateGroupResourceService.getElaborateGroupUsingGET(+id);
	}
}