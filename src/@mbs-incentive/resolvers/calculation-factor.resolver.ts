import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsCalculationFactorDto } from '../class/calculation-factor-dto.class';
import { MbsCalculationFactorResourceService } from '../services/calculation-factor.service';

@Injectable()
export class MbsCalculationFactorResolver implements Resolve<Observable<MbsCalculationFactorDto>> {
	constructor(private calculationFactorResourceService: MbsCalculationFactorResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.calculationFactorResourceService.getCalculationFactorUsingGET(+id);
	}
}