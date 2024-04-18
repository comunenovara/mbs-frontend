import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveRoleDto } from '../class/incentive-role-dto.class';
import { MbsIncentiveRoleResourceService } from '../services/incentive-role.service';

@Injectable()
export class MbsIncentiveRoleResolver implements Resolve<Observable<MbsIncentiveRoleDto>> {
	constructor(private incentiveRoleResourceService: MbsIncentiveRoleResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveRoleResourceService.getIncentiveRoleUsingGET(+id);
	}
}