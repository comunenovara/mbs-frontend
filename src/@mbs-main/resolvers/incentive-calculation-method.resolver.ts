import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveCalculationMethodDto } from '../class/incentive-calculation-method-dto.class';
import { MbsIncentiveCalculationMethodResourceService } from '../services/incentive-calculation-method.service';

@Injectable()
export class MbsIncentiveCalculationMethodResolver implements Resolve<Observable<MbsIncentiveCalculationMethodDto>> {
	constructor(private incentiveCalculationMethodResourceService: MbsIncentiveCalculationMethodResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveCalculationMethodResourceService.getIncentiveCalculationMethodUsingGET(+id);
	}
}