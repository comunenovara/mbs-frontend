import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService } from '@mbs-main';
import { Observable } from 'rxjs';

@Injectable()
export class MbsIncentiveRegulationParentResolver implements Resolve<Observable<MbsIncentiveRegulationDto>> {
	constructor(private incentiveRegulationResourceService: MbsIncentiveRegulationResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		if(!route.parent) throw new Error('Not valid parent');
		var id = route.parent.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveRegulationResourceService.getIncentiveRegulationUsingGET(+id);
	}
}