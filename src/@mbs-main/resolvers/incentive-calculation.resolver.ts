import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveCalculationDto } from '../class/incentive-calculation-dto.class';
import { MbsIncentiveCalculationResourceService } from '../services/incentive-calculation.service';

@Injectable()
export class MbsIncentiveCalculationResolver implements Resolve<Observable<MbsIncentiveCalculationDto>> {
	constructor(private incentiveCalculationResourceService: MbsIncentiveCalculationResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveCalculationResourceService.getIncentiveCalculationUsingGET(+id);
	}
}