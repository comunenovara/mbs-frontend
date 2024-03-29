import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveRoleValueDto } from '../class/incentive-role-value-dto.class';
import { MbsIncentiveRoleValueResourceService } from '../services/incentive-role-value.service';

@Injectable()
export class MbsIncentiveRoleValueResolver implements Resolve<Observable<MbsIncentiveRoleValueDto>> {
	constructor(private incentiveRoleValueResourceService: MbsIncentiveRoleValueResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveRoleValueResourceService.getIncentiveRoleValueUsingGET(+id);
	}
}