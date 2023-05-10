import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsElaborateGroupDto } from '../class/elaborate-group-dto.class';

@Injectable()
export class MbsElaborateGroupResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createElaborateGroupUsingPOST(elaborateGroup: MbsElaborateGroupDto): Observable<MbsElaborateGroupDto> {
		return this.http.post<MbsElaborateGroupDto>(this.basePath + "/elaborateGroups/", elaborateGroup);
	}

	updateElaborateGroupUsingPUT(elaborateGroup: MbsElaborateGroupDto): Observable<MbsElaborateGroupDto> {
		return this.http.put<MbsElaborateGroupDto>(this.basePath + "/elaborateGroups/", elaborateGroup);
	}

	getAllElaborateGroupsUsingGET(filters: any): Observable<MbsElaborateGroupDto[]> {
		return this.http.get<MbsElaborateGroupDto[]>(this.basePath + "/elaborateGroups?" + this.prepareQueryParams(filters).toString());
	}
	
	countElaborateGroupsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/elaborateGroups/count?" + this.prepareQueryParams(filters).toString());
	}

	getElaborateGroupUsingGET(id: number): Observable<MbsElaborateGroupDto> {
		return this.http.get<MbsElaborateGroupDto>(this.basePath + "/elaborateGroups/" + id);
	}

	deleteElaborateGroupUsingDELETE(id: number): Observable<MbsElaborateGroupDto> {
		return this.http.delete<MbsElaborateGroupDto>(this.basePath + "/elaborateGroups/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}