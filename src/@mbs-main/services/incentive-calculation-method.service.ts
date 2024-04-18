import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveCalculationMethodDto } from '../class/incentive-calculation-method-dto.class';

@Injectable()
export class MbsIncentiveCalculationMethodResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveCalculationMethodUsingPOST(incentiveCalculationMethod: MbsIncentiveCalculationMethodDto): Observable<MbsIncentiveCalculationMethodDto> {
		return this.http.post<MbsIncentiveCalculationMethodDto>(this.basePath + "/incentiveCalculationMethods/", incentiveCalculationMethod);
	}

	updateIncentiveCalculationMethodUsingPUT(incentiveCalculationMethod: MbsIncentiveCalculationMethodDto): Observable<MbsIncentiveCalculationMethodDto> {
		return this.http.put<MbsIncentiveCalculationMethodDto>(this.basePath + "/incentiveCalculationMethods/", incentiveCalculationMethod);
	}

	getAllIncentiveCalculationMethodsUsingGET(filters: any): Observable<MbsIncentiveCalculationMethodDto[]> {
		return this.http.get<MbsIncentiveCalculationMethodDto[]>(this.basePath + "/incentiveCalculationMethods?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveCalculationMethodsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveCalculationMethods/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveCalculationMethodUsingGET(id: number): Observable<MbsIncentiveCalculationMethodDto> {
		return this.http.get<MbsIncentiveCalculationMethodDto>(this.basePath + "/incentiveCalculationMethods/" + id);
	}

	deleteIncentiveCalculationMethodUsingDELETE(id: number): Observable<MbsIncentiveCalculationMethodDto> {
		return this.http.delete<MbsIncentiveCalculationMethodDto>(this.basePath + "/incentiveCalculationMethods/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}