import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsRoleDto } from '../class/role-dto.class';
import { MbsRoleResourceService } from '../services/role.service';

@Injectable()
export class MbsRoleResolver implements Resolve<Observable<MbsRoleDto>> {
	constructor(private roleResourceService: MbsRoleResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.roleResourceService.getRoleUsingGET(+id);
	}
}