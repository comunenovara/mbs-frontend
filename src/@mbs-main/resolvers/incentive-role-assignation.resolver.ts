import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveRoleAssignationDto } from '../class/incentive-role-assignation-dto.class';
import { MbsIncentiveRoleAssignationResourceService } from '../services/incentive-role-assignation.service';

@Injectable()
export class MbsIncentiveRoleAssignationResolver implements Resolve<Observable<MbsIncentiveRoleAssignationDto>> {
	constructor(private incentiveRoleAssignationResourceService: MbsIncentiveRoleAssignationResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveRoleAssignationResourceService.getIncentiveRoleAssignationUsingGET(+id);
	}
}