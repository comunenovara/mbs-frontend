import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsIncentiveRegulationDto } from '../class/incentive-regulation-dto.class';

@Injectable()
export class MbsIncentiveRegulationResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveRegulationUsingPOST(incentiveRegulation: MbsIncentiveRegulationDto): Observable<MbsIncentiveRegulationDto> {
		return this.http.post<MbsIncentiveRegulationDto>(this.basePath + "/incentiveRegulations/", incentiveRegulation);
	}

	updateIncentiveRegulationUsingPUT(incentiveRegulation: MbsIncentiveRegulationDto): Observable<MbsIncentiveRegulationDto> {
		return this.http.put<MbsIncentiveRegulationDto>(this.basePath + "/incentiveRegulations/", incentiveRegulation);
	}

	getAllIncentiveRegulationsUsingGET(filters: any): Observable<MbsIncentiveRegulationDto[]> {
		return this.http.get<MbsIncentiveRegulationDto[]>(this.basePath + "/incentiveRegulations?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveRegulationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveRegulations/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveRegulationUsingGET(id: number): Observable<MbsIncentiveRegulationDto> {
		return this.http.get<MbsIncentiveRegulationDto>(this.basePath + "/incentiveRegulations/" + id);
	}

	deleteIncentiveRegulationUsingDELETE(id: number): Observable<MbsIncentiveRegulationDto> {
		return this.http.delete<MbsIncentiveRegulationDto>(this.basePath + "/incentiveRegulations/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}