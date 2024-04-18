import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveWithheldDto } from '../class/incentive-withheld-dto.class';

@Injectable()
export class MbsIncentiveWithheldResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveWithheldUsingPOST(incentiveWithheld: MbsIncentiveWithheldDto): Observable<MbsIncentiveWithheldDto> {
		return this.http.post<MbsIncentiveWithheldDto>(this.basePath + "/incentiveWithhelds/", incentiveWithheld);
	}

	updateIncentiveWithheldUsingPUT(incentiveWithheld: MbsIncentiveWithheldDto): Observable<MbsIncentiveWithheldDto> {
		return this.http.put<MbsIncentiveWithheldDto>(this.basePath + "/incentiveWithhelds/", incentiveWithheld);
	}

	getAllIncentiveWithheldsUsingGET(filters: any): Observable<MbsIncentiveWithheldDto[]> {
		return this.http.get<MbsIncentiveWithheldDto[]>(this.basePath + "/incentiveWithhelds?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveWithheldsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveWithhelds/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveWithheldUsingGET(id: number): Observable<MbsIncentiveWithheldDto> {
		return this.http.get<MbsIncentiveWithheldDto>(this.basePath + "/incentiveWithhelds/" + id);
	}

	deleteIncentiveWithheldUsingDELETE(id: number): Observable<MbsIncentiveWithheldDto> {
		return this.http.delete<MbsIncentiveWithheldDto>(this.basePath + "/incentiveWithhelds/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}