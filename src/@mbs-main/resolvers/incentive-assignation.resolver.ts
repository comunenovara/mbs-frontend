import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveAssignationDto } from '../class/incentive-assignation-dto.class';
import { MbsIncentiveAssignationResourceService } from '../services/incentive-assignation.service';

@Injectable()
export class MbsIncentiveAssignationResolver implements Resolve<Observable<MbsIncentiveAssignationDto>> {
	constructor(private incentiveAssignationResourceService: MbsIncentiveAssignationResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveAssignationResourceService.getIncentiveAssignationUsingGET(+id);
	}
}