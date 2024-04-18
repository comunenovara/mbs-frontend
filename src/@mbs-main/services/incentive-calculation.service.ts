import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveCalculationDto } from '../class/incentive-calculation-dto.class';

@Injectable()
export class MbsIncentiveCalculationResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveCalculationUsingPOST(incentiveCalculation: MbsIncentiveCalculationDto): Observable<MbsIncentiveCalculationDto> {
		return this.http.post<MbsIncentiveCalculationDto>(this.basePath + "/incentiveCalculations/", incentiveCalculation);
	}

	updateIncentiveCalculationUsingPUT(incentiveCalculation: MbsIncentiveCalculationDto): Observable<MbsIncentiveCalculationDto> {
		return this.http.put<MbsIncentiveCalculationDto>(this.basePath + "/incentiveCalculations/", incentiveCalculation);
	}

	getAllIncentiveCalculationsUsingGET(filters: any): Observable<MbsIncentiveCalculationDto[]> {
		return this.http.get<MbsIncentiveCalculationDto[]>(this.basePath + "/incentiveCalculations?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveCalculationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveCalculations/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveCalculationUsingGET(id: number): Observable<MbsIncentiveCalculationDto> {
		return this.http.get<MbsIncentiveCalculationDto>(this.basePath + "/incentiveCalculations/" + id);
	}

	deleteIncentiveCalculationUsingDELETE(id: number): Observable<MbsIncentiveCalculationDto> {
		return this.http.delete<MbsIncentiveCalculationDto>(this.basePath + "/incentiveCalculations/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}