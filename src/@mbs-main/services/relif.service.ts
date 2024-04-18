import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsRelifDto } from '../class/relif-dto.class';

@Injectable()
export class MbsRelifResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createRelifUsingPOST(relif: MbsRelifDto): Observable<MbsRelifDto> {
		return this.http.post<MbsRelifDto>(this.basePath + "/relifs/", relif);
	}

	updateRelifUsingPUT(relif: MbsRelifDto): Observable<MbsRelifDto> {
		return this.http.put<MbsRelifDto>(this.basePath + "/relifs/", relif);
	}

	getAllRelifsUsingGET(filters: any): Observable<MbsRelifDto[]> {
		return this.http.get<MbsRelifDto[]>(this.basePath + "/relifs?" + this.prepareQueryParams(filters).toString());
	}
	
	countRelifsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/relifs/count?" + this.prepareQueryParams(filters).toString());
	}

	getRelifUsingGET(id: number): Observable<MbsRelifDto> {
		return this.http.get<MbsRelifDto>(this.basePath + "/relifs/" + id);
	}

	deleteRelifUsingDELETE(id: number): Observable<MbsRelifDto> {
		return this.http.delete<MbsRelifDto>(this.basePath + "/relifs/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}