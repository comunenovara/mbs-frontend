import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsGovernativeProjectDto } from '../class/governative-project-dto.class';

@Injectable()
export class MbsGovernativeProjectResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createGovernativeProjectUsingPOST(governativeProject: MbsGovernativeProjectDto): Observable<MbsGovernativeProjectDto> {
		return this.http.post<MbsGovernativeProjectDto>(this.basePath + "/governativeProjects/", governativeProject);
	}

	updateGovernativeProjectUsingPUT(governativeProject: MbsGovernativeProjectDto): Observable<MbsGovernativeProjectDto> {
		return this.http.put<MbsGovernativeProjectDto>(this.basePath + "/governativeProjects/", governativeProject);
	}

	getAllGovernativeProjectsUsingGET(filters: any): Observable<MbsGovernativeProjectDto[]> {
		return this.http.get<MbsGovernativeProjectDto[]>(this.basePath + "/governativeProjects?" + this.prepareQueryParams(filters).toString());
	}
	
	countGovernativeProjectsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/governativeProjects/count?" + this.prepareQueryParams(filters).toString());
	}

	getGovernativeProjectUsingGET(id: number): Observable<MbsGovernativeProjectDto> {
		return this.http.get<MbsGovernativeProjectDto>(this.basePath + "/governativeProjects/" + id);
	}

	deleteGovernativeProjectUsingDELETE(id: number): Observable<MbsGovernativeProjectDto> {
		return this.http.delete<MbsGovernativeProjectDto>(this.basePath + "/governativeProjects/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}