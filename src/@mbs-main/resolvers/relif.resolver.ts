import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsRelifDto } from '../class/relif-dto.class';
import { MbsRelifResourceService } from '../services/relif.service';

@Injectable()
export class MbsRelifResolver implements Resolve<Observable<MbsRelifDto>> {
	constructor(private relifResourceService: MbsRelifResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.relifResourceService.getRelifUsingGET(+id);
	}
}