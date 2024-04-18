import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveWithheldDto } from '../class/incentive-withheld-dto.class';
import { MbsIncentiveWithheldResourceService } from '../services/incentive-withheld.service';

@Injectable()
export class MbsIncentiveWithheldResolver implements Resolve<Observable<MbsIncentiveWithheldDto>> {
	constructor(private incentiveWithheldResourceService: MbsIncentiveWithheldResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveWithheldResourceService.getIncentiveWithheldUsingGET(+id);
	}
}