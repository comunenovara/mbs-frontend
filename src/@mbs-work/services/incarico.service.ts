import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsIncaricoDto } from '../class/incarico-dto.class';

@Injectable()
export class MbsIncaricoResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncaricoUsingPOST(incarico: MbsIncaricoDto): Observable<MbsIncaricoDto> {
		return this.http.post<MbsIncaricoDto>(this.basePath + "/incaricos/", incarico);
	}

	updateIncaricoUsingPUT(incarico: MbsIncaricoDto): Observable<MbsIncaricoDto> {
		return this.http.put<MbsIncaricoDto>(this.basePath + "/incaricos/", incarico);
	}

	getAllIncaricosUsingGET(filters: any): Observable<MbsIncaricoDto[]> {
		return this.http.get<MbsIncaricoDto[]>(this.basePath + "/incaricos?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncaricosUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incaricos/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncaricoUsingGET(id: number): Observable<MbsIncaricoDto> {
		return this.http.get<MbsIncaricoDto>(this.basePath + "/incaricos/" + id);
	}

	deleteIncaricoUsingDELETE(id: number): Observable<MbsIncaricoDto> {
		return this.http.delete<MbsIncaricoDto>(this.basePath + "/incaricos/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}