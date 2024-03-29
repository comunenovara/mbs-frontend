import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsIncentiveRoleValueDto } from '../class/incentive-role-value-dto.class';

@Injectable()
export class MbsIncentiveRoleValueResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveRoleValueUsingPOST(incentiveRoleValue: MbsIncentiveRoleValueDto): Observable<MbsIncentiveRoleValueDto> {
		return this.http.post<MbsIncentiveRoleValueDto>(this.basePath + "/incentiveRoleValues/", incentiveRoleValue);
	}

	updateIncentiveRoleValueUsingPUT(incentiveRoleValue: MbsIncentiveRoleValueDto): Observable<MbsIncentiveRoleValueDto> {
		return this.http.put<MbsIncentiveRoleValueDto>(this.basePath + "/incentiveRoleValues/", incentiveRoleValue);
	}

	getAllIncentiveRoleValuesUsingGET(filters: any): Observable<MbsIncentiveRoleValueDto[]> {
		return this.http.get<MbsIncentiveRoleValueDto[]>(this.basePath + "/incentiveRoleValues?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveRoleValuesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveRoleValues/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveRoleValueUsingGET(id: number): Observable<MbsIncentiveRoleValueDto> {
		return this.http.get<MbsIncentiveRoleValueDto>(this.basePath + "/incentiveRoleValues/" + id);
	}

	deleteIncentiveRoleValueUsingDELETE(id: number): Observable<MbsIncentiveRoleValueDto> {
		return this.http.delete<MbsIncentiveRoleValueDto>(this.basePath + "/incentiveRoleValues/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}