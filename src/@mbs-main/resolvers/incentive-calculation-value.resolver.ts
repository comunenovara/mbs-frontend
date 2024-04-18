import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveCalculationValueDto } from '../class/incentive-calculation-value-dto.class';
import { MbsIncentiveCalculationValueResourceService } from '../services/incentive-calculation-value.service';

@Injectable()
export class MbsIncentiveCalculationValueResolver implements Resolve<Observable<MbsIncentiveCalculationValueDto>> {
	constructor(private incentiveCalculationValueResourceService: MbsIncentiveCalculationValueResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveCalculationValueResourceService.getIncentiveCalculationValueUsingGET(+id);
	}
}