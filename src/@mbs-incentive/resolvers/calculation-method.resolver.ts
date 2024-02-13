import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsCalculationMethodDto } from '../class/calculation-method-dto.class';
import { MbsCalculationMethodResourceService } from '../services/calculation-method.service';

@Injectable()
export class MbsCalculationMethodResolver implements Resolve<Observable<MbsCalculationMethodDto>> {
	constructor(private calculationMethodResourceService: MbsCalculationMethodResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.calculationMethodResourceService.getCalculationMethodUsingGET(+id);
	}
}