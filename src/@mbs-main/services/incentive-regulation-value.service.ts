import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveRegulationValueDto } from '../class/incentive-regulation-value-dto.class';

@Injectable()
export class MbsIncentiveRegulationValueResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveRegulationValueUsingPOST(incentiveRegulationValue: MbsIncentiveRegulationValueDto): Observable<MbsIncentiveRegulationValueDto> {
		return this.http.post<MbsIncentiveRegulationValueDto>(this.basePath + "/incentiveRegulationValues/", incentiveRegulationValue);
	}

	updateIncentiveRegulationValueUsingPUT(incentiveRegulationValue: MbsIncentiveRegulationValueDto): Observable<MbsIncentiveRegulationValueDto> {
		return this.http.put<MbsIncentiveRegulationValueDto>(this.basePath + "/incentiveRegulationValues/", incentiveRegulationValue);
	}

	getAllIncentiveRegulationValuesUsingGET(filters: any): Observable<MbsIncentiveRegulationValueDto[]> {
		return this.http.get<MbsIncentiveRegulationValueDto[]>(this.basePath + "/incentiveRegulationValues?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveRegulationValuesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveRegulationValues/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveRegulationValueUsingGET(id: number): Observable<MbsIncentiveRegulationValueDto> {
		return this.http.get<MbsIncentiveRegulationValueDto>(this.basePath + "/incentiveRegulationValues/" + id);
	}

	deleteIncentiveRegulationValueUsingDELETE(id: number): Observable<MbsIncentiveRegulationValueDto> {
		return this.http.delete<MbsIncentiveRegulationValueDto>(this.basePath + "/incentiveRegulationValues/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}