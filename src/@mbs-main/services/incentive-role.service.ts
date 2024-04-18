import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveRoleDto } from '../class/incentive-role-dto.class';

@Injectable()
export class MbsIncentiveRoleResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveRoleUsingPOST(incentiveRole: MbsIncentiveRoleDto): Observable<MbsIncentiveRoleDto> {
		return this.http.post<MbsIncentiveRoleDto>(this.basePath + "/incentiveRoles/", incentiveRole);
	}

	updateIncentiveRoleUsingPUT(incentiveRole: MbsIncentiveRoleDto): Observable<MbsIncentiveRoleDto> {
		return this.http.put<MbsIncentiveRoleDto>(this.basePath + "/incentiveRoles/", incentiveRole);
	}

	getAllIncentiveRolesUsingGET(filters: any): Observable<MbsIncentiveRoleDto[]> {
		return this.http.get<MbsIncentiveRoleDto[]>(this.basePath + "/incentiveRoles?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveRolesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveRoles/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveRoleUsingGET(id: number): Observable<MbsIncentiveRoleDto> {
		return this.http.get<MbsIncentiveRoleDto>(this.basePath + "/incentiveRoles/" + id);
	}

	deleteIncentiveRoleUsingDELETE(id: number): Observable<MbsIncentiveRoleDto> {
		return this.http.delete<MbsIncentiveRoleDto>(this.basePath + "/incentiveRoles/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}