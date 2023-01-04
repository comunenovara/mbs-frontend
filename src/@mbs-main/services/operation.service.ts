import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsOperationDto } from '../class/operation-dto.class';

@Injectable()
export class MbsOperationResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createOperationUsingPOST(operation: MbsOperationDto): Observable<MbsOperationDto> {
		return this.http.post<MbsOperationDto>(this.basePath + "/operations/", operation);
	}

	updateOperationUsingPUT(operation: MbsOperationDto): Observable<MbsOperationDto> {
		return this.http.put<MbsOperationDto>(this.basePath + "/operations/", operation);
	}

	getAllOperationsUsingGET(filters: any): Observable<MbsOperationDto[]> {
		return this.http.get<MbsOperationDto[]>(this.basePath + "/operations?" + this.prepareQueryParams(filters).toString());
	}
	
	countOperationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/operations/count?" + this.prepareQueryParams(filters).toString());
	}

	getOperationUsingGET(id: number): Observable<MbsOperationDto> {
		return this.http.get<MbsOperationDto>(this.basePath + "/operations/" + id);
	}

	deleteOperationUsingDELETE(id: number): Observable<MbsOperationDto> {
		return this.http.delete<MbsOperationDto>(this.basePath + "/operations/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}