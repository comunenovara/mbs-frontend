import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveCalculationValueDto } from '../class/incentive-calculation-value-dto.class';

@Injectable()
export class MbsIncentiveCalculationValueResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveCalculationValueUsingPOST(incentiveCalculationValue: MbsIncentiveCalculationValueDto): Observable<MbsIncentiveCalculationValueDto> {
		return this.http.post<MbsIncentiveCalculationValueDto>(this.basePath + "/incentiveCalculationValues/", incentiveCalculationValue);
	}

	updateIncentiveCalculationValueUsingPUT(incentiveCalculationValue: MbsIncentiveCalculationValueDto): Observable<MbsIncentiveCalculationValueDto> {
		return this.http.put<MbsIncentiveCalculationValueDto>(this.basePath + "/incentiveCalculationValues/", incentiveCalculationValue);
	}

	getAllIncentiveCalculationValuesUsingGET(filters: any): Observable<MbsIncentiveCalculationValueDto[]> {
		return this.http.get<MbsIncentiveCalculationValueDto[]>(this.basePath + "/incentiveCalculationValues?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveCalculationValuesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveCalculationValues/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveCalculationValueUsingGET(id: number): Observable<MbsIncentiveCalculationValueDto> {
		return this.http.get<MbsIncentiveCalculationValueDto>(this.basePath + "/incentiveCalculationValues/" + id);
	}

	deleteIncentiveCalculationValueUsingDELETE(id: number): Observable<MbsIncentiveCalculationValueDto> {
		return this.http.delete<MbsIncentiveCalculationValueDto>(this.basePath + "/incentiveCalculationValues/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}