import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsNominaDto } from '../class/nomina-dto.class';

@Injectable()
export class MbsNominaResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createNominaUsingPOST(nomina: MbsNominaDto): Observable<MbsNominaDto> {
		return this.http.post<MbsNominaDto>(this.basePath + "/nominas/", nomina);
	}

	updateNominaUsingPUT(nomina: MbsNominaDto): Observable<MbsNominaDto> {
		return this.http.put<MbsNominaDto>(this.basePath + "/nominas/", nomina);
	}

	getAllNominasUsingGET(filters: any): Observable<MbsNominaDto[]> {
		return this.http.get<MbsNominaDto[]>(this.basePath + "/nominas?" + this.prepareQueryParams(filters).toString());
	}
	
	countNominasUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/nominas/count?" + this.prepareQueryParams(filters).toString());
	}

	getNominaUsingGET(id: number): Observable<MbsNominaDto> {
		return this.http.get<MbsNominaDto>(this.basePath + "/nominas/" + id);
	}

	deleteNominaUsingDELETE(id: number): Observable<MbsNominaDto> {
		return this.http.delete<MbsNominaDto>(this.basePath + "/nominas/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}