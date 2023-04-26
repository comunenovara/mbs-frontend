import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsRoleDto } from '../class/role-dto.class';

@Injectable()
export class MbsRoleResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createRoleUsingPOST(role: MbsRoleDto): Observable<MbsRoleDto> {
		return this.http.post<MbsRoleDto>(this.basePath + "/roles/", role);
	}

	updateRoleUsingPUT(role: MbsRoleDto): Observable<MbsRoleDto> {
		return this.http.put<MbsRoleDto>(this.basePath + "/roles/", role);
	}

	getAllRolesUsingGET(filters: any): Observable<MbsRoleDto[]> {
		return this.http.get<MbsRoleDto[]>(this.basePath + "/roles?" + this.prepareQueryParams(filters).toString());
	}
	
	countRolesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/roles/count?" + this.prepareQueryParams(filters).toString());
	}

	getRoleUsingGET(id: number): Observable<MbsRoleDto> {
		return this.http.get<MbsRoleDto>(this.basePath + "/roles/" + id);
	}

	deleteRoleUsingDELETE(id: number): Observable<MbsRoleDto> {
		return this.http.delete<MbsRoleDto>(this.basePath + "/roles/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}