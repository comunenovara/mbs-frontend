import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsCalculationMethodDto } from '../class/calculation-method-dto.class';

@Injectable()
export class MbsCalculationMethodResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createCalculationMethodUsingPOST(calculationMethod: MbsCalculationMethodDto): Observable<MbsCalculationMethodDto> {
		return this.http.post<MbsCalculationMethodDto>(this.basePath + "/calculationMethods/", calculationMethod);
	}

	updateCalculationMethodUsingPUT(calculationMethod: MbsCalculationMethodDto): Observable<MbsCalculationMethodDto> {
		return this.http.put<MbsCalculationMethodDto>(this.basePath + "/calculationMethods/", calculationMethod);
	}

	getAllCalculationMethodsUsingGET(filters: any): Observable<MbsCalculationMethodDto[]> {
		return this.http.get<MbsCalculationMethodDto[]>(this.basePath + "/calculationMethods?" + this.prepareQueryParams(filters).toString());
	}
	
	countCalculationMethodsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/calculationMethods/count?" + this.prepareQueryParams(filters).toString());
	}

	getCalculationMethodUsingGET(id: number): Observable<MbsCalculationMethodDto> {
		return this.http.get<MbsCalculationMethodDto>(this.basePath + "/calculationMethods/" + id);
	}

	deleteCalculationMethodUsingDELETE(id: number): Observable<MbsCalculationMethodDto> {
		return this.http.delete<MbsCalculationMethodDto>(this.basePath + "/calculationMethods/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}