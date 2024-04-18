import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveRoleAssignationDto } from '../class/incentive-role-assignation-dto.class';

@Injectable()
export class MbsIncentiveRoleAssignationResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveRoleAssignationUsingPOST(incentiveRoleAssignation: MbsIncentiveRoleAssignationDto): Observable<MbsIncentiveRoleAssignationDto> {
		return this.http.post<MbsIncentiveRoleAssignationDto>(this.basePath + "/incentiveRoleAssignations/", incentiveRoleAssignation);
	}

	updateIncentiveRoleAssignationUsingPUT(incentiveRoleAssignation: MbsIncentiveRoleAssignationDto): Observable<MbsIncentiveRoleAssignationDto> {
		return this.http.put<MbsIncentiveRoleAssignationDto>(this.basePath + "/incentiveRoleAssignations/", incentiveRoleAssignation);
	}

	getAllIncentiveRoleAssignationsUsingGET(filters: any): Observable<MbsIncentiveRoleAssignationDto[]> {
		return this.http.get<MbsIncentiveRoleAssignationDto[]>(this.basePath + "/incentiveRoleAssignations?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveRoleAssignationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveRoleAssignations/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveRoleAssignationUsingGET(id: number): Observable<MbsIncentiveRoleAssignationDto> {
		return this.http.get<MbsIncentiveRoleAssignationDto>(this.basePath + "/incentiveRoleAssignations/" + id);
	}

	deleteIncentiveRoleAssignationUsingDELETE(id: number): Observable<MbsIncentiveRoleAssignationDto> {
		return this.http.delete<MbsIncentiveRoleAssignationDto>(this.basePath + "/incentiveRoleAssignations/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}