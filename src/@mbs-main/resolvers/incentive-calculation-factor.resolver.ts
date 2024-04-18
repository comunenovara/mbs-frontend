import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveCalculationFactorDto } from '../class/incentive-calculation-factor-dto.class';
import { MbsIncentiveCalculationFactorResourceService } from '../services/incentive-calculation-factor.service';

@Injectable()
export class MbsIncentiveCalculationFactorResolver implements Resolve<Observable<MbsIncentiveCalculationFactorDto>> {
	constructor(private incentiveCalculationFactorResourceService: MbsIncentiveCalculationFactorResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveCalculationFactorResourceService.getIncentiveCalculationFactorUsingGET(+id);
	}
}