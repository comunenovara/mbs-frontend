import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsTecnicoDto } from '../class/tecnico-dto.class';

@Injectable()
export class MbsTecnicoResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createTecnicoUsingPOST(tecnico: MbsTecnicoDto): Observable<MbsTecnicoDto> {
		return this.http.post<MbsTecnicoDto>(this.basePath + "/tecnicos/", tecnico);
	}

	updateTecnicoUsingPUT(tecnico: MbsTecnicoDto): Observable<MbsTecnicoDto> {
		return this.http.put<MbsTecnicoDto>(this.basePath + "/tecnicos/", tecnico);
	}

	getAllTecnicosUsingGET(filters: any): Observable<MbsTecnicoDto[]> {
		return this.http.get<MbsTecnicoDto[]>(this.basePath + "/tecnicos?" + this.prepareQueryParams(filters).toString());
	}
	
	countTecnicosUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/tecnicos/count?" + this.prepareQueryParams(filters).toString());
	}

	getTecnicoUsingGET(id: number): Observable<MbsTecnicoDto> {
		return this.http.get<MbsTecnicoDto>(this.basePath + "/tecnicos/" + id);
	}

	deleteTecnicoUsingDELETE(id: number): Observable<MbsTecnicoDto> {
		return this.http.delete<MbsTecnicoDto>(this.basePath + "/tecnicos/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}