import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsProgettoDto } from '../class/progetto-dto.class';

@Injectable()
export class MbsProgettoResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createProgettoUsingPOST(progetto: MbsProgettoDto): Observable<MbsProgettoDto> {
		return this.http.post<MbsProgettoDto>(this.basePath + "/progettos/", progetto);
	}

	updateProgettoUsingPUT(progetto: MbsProgettoDto): Observable<MbsProgettoDto> {
		return this.http.put<MbsProgettoDto>(this.basePath + "/progettos/", progetto);
	}

	getAllProgettosUsingGET(filters: any): Observable<MbsProgettoDto[]> {
		return this.http.get<MbsProgettoDto[]>(this.basePath + "/progettos?" + this.prepareQueryParams(filters).toString());
	}
	
	countProgettosUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/progettos/count?" + this.prepareQueryParams(filters).toString());
	}

	getProgettoUsingGET(id: number): Observable<MbsProgettoDto> {
		return this.http.get<MbsProgettoDto>(this.basePath + "/progettos/" + id);
	}

	deleteProgettoUsingDELETE(id: number): Observable<MbsProgettoDto> {
		return this.http.delete<MbsProgettoDto>(this.basePath + "/progettos/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}