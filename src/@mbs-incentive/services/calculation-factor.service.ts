import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsCalculationFactorDto } from '../class/calculation-factor-dto.class';

@Injectable()
export class MbsCalculationFactorResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createCalculationFactorUsingPOST(calculationFactor: MbsCalculationFactorDto): Observable<MbsCalculationFactorDto> {
		return this.http.post<MbsCalculationFactorDto>(this.basePath + "/calculationFactors/", calculationFactor);
	}

	updateCalculationFactorUsingPUT(calculationFactor: MbsCalculationFactorDto): Observable<MbsCalculationFactorDto> {
		return this.http.put<MbsCalculationFactorDto>(this.basePath + "/calculationFactors/", calculationFactor);
	}

	getAllCalculationFactorsUsingGET(filters: any): Observable<MbsCalculationFactorDto[]> {
		return this.http.get<MbsCalculationFactorDto[]>(this.basePath + "/calculationFactors?" + this.prepareQueryParams(filters).toString());
	}
	
	countCalculationFactorsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/calculationFactors/count?" + this.prepareQueryParams(filters).toString());
	}

	getCalculationFactorUsingGET(id: number): Observable<MbsCalculationFactorDto> {
		return this.http.get<MbsCalculationFactorDto>(this.basePath + "/calculationFactors/" + id);
	}

	deleteCalculationFactorUsingDELETE(id: number): Observable<MbsCalculationFactorDto> {
		return this.http.delete<MbsCalculationFactorDto>(this.basePath + "/calculationFactors/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}