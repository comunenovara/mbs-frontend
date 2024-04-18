import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveCalculationFactorDto } from '../class/incentive-calculation-factor-dto.class';

@Injectable()
export class MbsIncentiveCalculationFactorResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveCalculationFactorUsingPOST(incentiveCalculationFactor: MbsIncentiveCalculationFactorDto): Observable<MbsIncentiveCalculationFactorDto> {
		return this.http.post<MbsIncentiveCalculationFactorDto>(this.basePath + "/incentiveCalculationFactors/", incentiveCalculationFactor);
	}

	updateIncentiveCalculationFactorUsingPUT(incentiveCalculationFactor: MbsIncentiveCalculationFactorDto): Observable<MbsIncentiveCalculationFactorDto> {
		return this.http.put<MbsIncentiveCalculationFactorDto>(this.basePath + "/incentiveCalculationFactors/", incentiveCalculationFactor);
	}

	getAllIncentiveCalculationFactorsUsingGET(filters: any): Observable<MbsIncentiveCalculationFactorDto[]> {
		return this.http.get<MbsIncentiveCalculationFactorDto[]>(this.basePath + "/incentiveCalculationFactors?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveCalculationFactorsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveCalculationFactors/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveCalculationFactorUsingGET(id: number): Observable<MbsIncentiveCalculationFactorDto> {
		return this.http.get<MbsIncentiveCalculationFactorDto>(this.basePath + "/incentiveCalculationFactors/" + id);
	}

	deleteIncentiveCalculationFactorUsingDELETE(id: number): Observable<MbsIncentiveCalculationFactorDto> {
		return this.http.delete<MbsIncentiveCalculationFactorDto>(this.basePath + "/incentiveCalculationFactors/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}