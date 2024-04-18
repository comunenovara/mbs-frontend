import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsOperationTypeDto } from '../class/operation-type-dto.class';

@Injectable()
export class MbsOperationTypeResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createOperationTypeUsingPOST(operationType: MbsOperationTypeDto): Observable<MbsOperationTypeDto> {
		return this.http.post<MbsOperationTypeDto>(this.basePath + "/operationTypes/", operationType);
	}

	updateOperationTypeUsingPUT(operationType: MbsOperationTypeDto): Observable<MbsOperationTypeDto> {
		return this.http.put<MbsOperationTypeDto>(this.basePath + "/operationTypes/", operationType);
	}

	getAllOperationTypesUsingGET(filters: any): Observable<MbsOperationTypeDto[]> {
		return this.http.get<MbsOperationTypeDto[]>(this.basePath + "/operationTypes?" + this.prepareQueryParams(filters).toString());
	}
	
	countOperationTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/operationTypes/count?" + this.prepareQueryParams(filters).toString());
	}

	getOperationTypeUsingGET(id: number): Observable<MbsOperationTypeDto> {
		return this.http.get<MbsOperationTypeDto>(this.basePath + "/operationTypes/" + id);
	}

	deleteOperationTypeUsingDELETE(id: number): Observable<MbsOperationTypeDto> {
		return this.http.delete<MbsOperationTypeDto>(this.basePath + "/operationTypes/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}