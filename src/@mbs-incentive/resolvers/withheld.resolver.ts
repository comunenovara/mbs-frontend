import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsWithheldDto } from '../class/withheld-dto.class';
import { MbsWithheldResourceService } from '../services/withheld.service';

@Injectable()
export class MbsWithheldResolver implements Resolve<Observable<MbsWithheldDto>> {
	constructor(private withheldResourceService: MbsWithheldResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.withheldResourceService.getWithheldUsingGET(+id);
	}
}