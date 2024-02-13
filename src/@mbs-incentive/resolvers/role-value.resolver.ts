import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsRoleValueDto } from '../class/role-value-dto.class';
import { MbsRoleValueResourceService } from '../services/role-value.service';

@Injectable()
export class MbsRoleValueResolver implements Resolve<Observable<MbsRoleValueDto>> {
	constructor(private roleValueResourceService: MbsRoleValueResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.roleValueResourceService.getRoleValueUsingGET(+id);
	}
}