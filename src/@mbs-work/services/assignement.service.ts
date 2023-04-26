import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsAssignementDto } from '../class/assignement-dto.class';

@Injectable()
export class MbsAssignementResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createAssignementUsingPOST(assignement: MbsAssignementDto): Observable<MbsAssignementDto> {
		return this.http.post<MbsAssignementDto>(this.basePath + "/assignements/", assignement);
	}

	updateAssignementUsingPUT(assignement: MbsAssignementDto): Observable<MbsAssignementDto> {
		return this.http.put<MbsAssignementDto>(this.basePath + "/assignements/", assignement);
	}

	getAllAssignementsUsingGET(filters: any): Observable<MbsAssignementDto[]> {
		return this.http.get<MbsAssignementDto[]>(this.basePath + "/assignements?" + this.prepareQueryParams(filters).toString());
	}
	
	countAssignementsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/assignements/count?" + this.prepareQueryParams(filters).toString());
	}

	getAssignementUsingGET(id: number): Observable<MbsAssignementDto> {
		return this.http.get<MbsAssignementDto>(this.basePath + "/assignements/" + id);
	}

	deleteAssignementUsingDELETE(id: number): Observable<MbsAssignementDto> {
		return this.http.delete<MbsAssignementDto>(this.basePath + "/assignements/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}