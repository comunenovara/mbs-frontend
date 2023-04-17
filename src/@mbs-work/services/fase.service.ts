import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsFaseDto } from '../class/fase-dto.class';

@Injectable()
export class MbsFaseResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createFaseUsingPOST(fase: MbsFaseDto): Observable<MbsFaseDto> {
		return this.http.post<MbsFaseDto>(this.basePath + "/fases/", fase);
	}

	updateFaseUsingPUT(fase: MbsFaseDto): Observable<MbsFaseDto> {
		return this.http.put<MbsFaseDto>(this.basePath + "/fases/", fase);
	}

	getAllFasesUsingGET(filters: any): Observable<MbsFaseDto[]> {
		return this.http.get<MbsFaseDto[]>(this.basePath + "/fases?" + this.prepareQueryParams(filters).toString());
	}
	
	countFasesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/fases/count?" + this.prepareQueryParams(filters).toString());
	}

	getFaseUsingGET(id: number): Observable<MbsFaseDto> {
		return this.http.get<MbsFaseDto>(this.basePath + "/fases/" + id);
	}

	deleteFaseUsingDELETE(id: number): Observable<MbsFaseDto> {
		return this.http.delete<MbsFaseDto>(this.basePath + "/fases/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}