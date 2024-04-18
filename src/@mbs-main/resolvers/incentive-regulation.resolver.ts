import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveRegulationDto } from '../class/incentive-regulation-dto.class';
import { MbsIncentiveRegulationResourceService } from '../services/incentive-regulation.service';

@Injectable()
export class MbsIncentiveRegulationResolver implements Resolve<Observable<MbsIncentiveRegulationDto>> {
	constructor(private incentiveRegulationResourceService: MbsIncentiveRegulationResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveRegulationResourceService.getIncentiveRegulationUsingGET(+id);
	}
}