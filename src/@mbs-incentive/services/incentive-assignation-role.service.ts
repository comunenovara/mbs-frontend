import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsIncentiveAssignationRoleDto } from '../class/incentive-assignation-role-dto.class';

@Injectable()
export class MbsIncentiveAssignationRoleResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveAssignationRoleUsingPOST(incentiveAssignationRole: MbsIncentiveAssignationRoleDto): Observable<MbsIncentiveAssignationRoleDto> {
		return this.http.post<MbsIncentiveAssignationRoleDto>(this.basePath + "/incentiveAssignationRoles/", incentiveAssignationRole);
	}

	updateIncentiveAssignationRoleUsingPUT(incentiveAssignationRole: MbsIncentiveAssignationRoleDto): Observable<MbsIncentiveAssignationRoleDto> {
		return this.http.put<MbsIncentiveAssignationRoleDto>(this.basePath + "/incentiveAssignationRoles/", incentiveAssignationRole);
	}

	getAllIncentiveAssignationRolesUsingGET(filters: any): Observable<MbsIncentiveAssignationRoleDto[]> {
		return this.http.get<MbsIncentiveAssignationRoleDto[]>(this.basePath + "/incentiveAssignationRoles?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveAssignationRolesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveAssignationRoles/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveAssignationRoleUsingGET(id: number): Observable<MbsIncentiveAssignationRoleDto> {
		return this.http.get<MbsIncentiveAssignationRoleDto>(this.basePath + "/incentiveAssignationRoles/" + id);
	}

	deleteIncentiveAssignationRoleUsingDELETE(id: number): Observable<MbsIncentiveAssignationRoleDto> {
		return this.http.delete<MbsIncentiveAssignationRoleDto>(this.basePath + "/incentiveAssignationRoles/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}