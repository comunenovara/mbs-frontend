import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsOperationTypeDto } from '../class/operation-type-dto.class';

@Injectable()
export class MbsOperationTypeResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createOperationTypeUsingPOST(operationType: MbsOperationTypeDto): Observable<MbsOperationTypeDto> {
		return this.http.post<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/", operationType);
	}

	updateOperationTypeUsingPUT(operationType: MbsOperationTypeDto): Observable<MbsOperationTypeDto> {
		return this.http.put<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/", operationType);
	}

	getAllOperationTypesUsingGET(filters: any): Observable<MbsOperationTypeDto[]> {
		return this.http.get<MbsOperationTypeDto[]>("http://localhost:3000/mbs/main/operationTypes?" + this.prepareQueryParams(filters).toString());
	}
	
	countOperationTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/operationTypes/count?" + this.prepareQueryParams(filters).toString());
	}

	getOperationTypeUsingGET(id: number): Observable<MbsOperationTypeDto> {
		return this.http.get<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/" + id);
	}

	deleteOperationTypeUsingDELETE(id: number): Observable<MbsOperationTypeDto> {
		return this.http.delete<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}