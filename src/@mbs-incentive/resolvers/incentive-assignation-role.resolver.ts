import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveAssignationRoleDto } from '../class/incentive-assignation-role-dto.class';
import { MbsIncentiveAssignationRoleResourceService } from '../services/incentive-assignation-role.service';

@Injectable()
export class MbsIncentiveAssignationRoleResolver implements Resolve<Observable<MbsIncentiveAssignationRoleDto>> {
	constructor(private incentiveAssignationRoleResourceService: MbsIncentiveAssignationRoleResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveAssignationRoleResourceService.getIncentiveAssignationRoleUsingGET(+id);
	}
}