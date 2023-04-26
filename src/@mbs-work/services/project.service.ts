import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsProjectDto } from '../class/project-dto.class';

@Injectable()
export class MbsProjectResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createProjectUsingPOST(project: MbsProjectDto): Observable<MbsProjectDto> {
		return this.http.post<MbsProjectDto>(this.basePath + "/projects/", project);
	}

	updateProjectUsingPUT(project: MbsProjectDto): Observable<MbsProjectDto> {
		return this.http.put<MbsProjectDto>(this.basePath + "/projects/", project);
	}

	getAllProjectsUsingGET(filters: any): Observable<MbsProjectDto[]> {
		return this.http.get<MbsProjectDto[]>(this.basePath + "/projects?" + this.prepareQueryParams(filters).toString());
	}
	
	countProjectsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/projects/count?" + this.prepareQueryParams(filters).toString());
	}

	getProjectUsingGET(id: number): Observable<MbsProjectDto> {
		return this.http.get<MbsProjectDto>(this.basePath + "/projects/" + id);
	}

	deleteProjectUsingDELETE(id: number): Observable<MbsProjectDto> {
		return this.http.delete<MbsProjectDto>(this.basePath + "/projects/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}