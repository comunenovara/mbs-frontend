import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveRegulationValueDto } from '../class/incentive-regulation-value-dto.class';
import { MbsIncentiveRegulationValueResourceService } from '../services/incentive-regulation-value.service';

@Injectable()
export class MbsIncentiveRegulationValueResolver implements Resolve<Observable<MbsIncentiveRegulationValueDto>> {
	constructor(private incentiveRegulationValueResourceService: MbsIncentiveRegulationValueResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveRegulationValueResourceService.getIncentiveRegulationValueUsingGET(+id);
	}
}