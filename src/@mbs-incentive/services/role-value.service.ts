import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsRoleValueDto } from '../class/role-value-dto.class';

@Injectable()
export class MbsRoleValueResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createRoleValueUsingPOST(roleValue: MbsRoleValueDto): Observable<MbsRoleValueDto> {
		return this.http.post<MbsRoleValueDto>(this.basePath + "/roleValues/", roleValue);
	}

	updateRoleValueUsingPUT(roleValue: MbsRoleValueDto): Observable<MbsRoleValueDto> {
		return this.http.put<MbsRoleValueDto>(this.basePath + "/roleValues/", roleValue);
	}

	getAllRoleValuesUsingGET(filters: any): Observable<MbsRoleValueDto[]> {
		return this.http.get<MbsRoleValueDto[]>(this.basePath + "/roleValues?" + this.prepareQueryParams(filters).toString());
	}
	
	countRoleValuesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/roleValues/count?" + this.prepareQueryParams(filters).toString());
	}

	getRoleValueUsingGET(id: number): Observable<MbsRoleValueDto> {
		return this.http.get<MbsRoleValueDto>(this.basePath + "/roleValues/" + id);
	}

	deleteRoleValueUsingDELETE(id: number): Observable<MbsRoleValueDto> {
		return this.http.delete<MbsRoleValueDto>(this.basePath + "/roleValues/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}