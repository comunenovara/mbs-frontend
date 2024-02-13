import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsWithheldDto } from '../class/withheld-dto.class';

@Injectable()
export class MbsWithheldResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createWithheldUsingPOST(withheld: MbsWithheldDto): Observable<MbsWithheldDto> {
		return this.http.post<MbsWithheldDto>(this.basePath + "/withhelds/", withheld);
	}

	updateWithheldUsingPUT(withheld: MbsWithheldDto): Observable<MbsWithheldDto> {
		return this.http.put<MbsWithheldDto>(this.basePath + "/withhelds/", withheld);
	}

	getAllWithheldsUsingGET(filters: any): Observable<MbsWithheldDto[]> {
		return this.http.get<MbsWithheldDto[]>(this.basePath + "/withhelds?" + this.prepareQueryParams(filters).toString());
	}
	
	countWithheldsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/withhelds/count?" + this.prepareQueryParams(filters).toString());
	}

	getWithheldUsingGET(id: number): Observable<MbsWithheldDto> {
		return this.http.get<MbsWithheldDto>(this.basePath + "/withhelds/" + id);
	}

	deleteWithheldUsingDELETE(id: number): Observable<MbsWithheldDto> {
		return this.http.delete<MbsWithheldDto>(this.basePath + "/withhelds/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}