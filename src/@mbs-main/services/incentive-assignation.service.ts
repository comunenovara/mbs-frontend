import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveAssignationDto } from '../class/incentive-assignation-dto.class';

@Injectable()
export class MbsIncentiveAssignationResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveAssignationUsingPOST(incentiveAssignation: MbsIncentiveAssignationDto): Observable<MbsIncentiveAssignationDto> {
		return this.http.post<MbsIncentiveAssignationDto>(this.basePath + "/incentiveAssignations/", incentiveAssignation);
	}

	updateIncentiveAssignationUsingPUT(incentiveAssignation: MbsIncentiveAssignationDto): Observable<MbsIncentiveAssignationDto> {
		return this.http.put<MbsIncentiveAssignationDto>(this.basePath + "/incentiveAssignations/", incentiveAssignation);
	}

	getAllIncentiveAssignationsUsingGET(filters: any): Observable<MbsIncentiveAssignationDto[]> {
		return this.http.get<MbsIncentiveAssignationDto[]>(this.basePath + "/incentiveAssignations?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveAssignationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveAssignations/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveAssignationUsingGET(id: number): Observable<MbsIncentiveAssignationDto> {
		return this.http.get<MbsIncentiveAssignationDto>(this.basePath + "/incentiveAssignations/" + id);
	}

	deleteIncentiveAssignationUsingDELETE(id: number): Observable<MbsIncentiveAssignationDto> {
		return this.http.delete<MbsIncentiveAssignationDto>(this.basePath + "/incentiveAssignations/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}