import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsOperationDto } from '../class/operation-dto.class';

@Injectable()
export class MbsOperationResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createOperationUsingPOST(operation: MbsOperationDto): Observable<MbsOperationDto> {
		return this.http.post<MbsOperationDto>("http://localhost:3000/mbs/main/operations/", operation);
	}

	updateOperationUsingPUT(operation: MbsOperationDto): Observable<MbsOperationDto> {
		return this.http.put<MbsOperationDto>("http://localhost:3000/mbs/main/operations/", operation);
	}

	getAllOperationsUsingGET(filters: any): Observable<MbsOperationDto[]> {
		return this.http.get<MbsOperationDto[]>("http://localhost:3000/mbs/main/operations?" + this.prepareQueryParams(filters).toString());
	}
	
	countOperationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/operations/count?" + this.prepareQueryParams(filters).toString());
	}

	getOperationUsingGET(id: number): Observable<MbsOperationDto> {
		return this.http.get<MbsOperationDto>("http://localhost:3000/mbs/main/operations/" + id);
	}

	deleteOperationUsingDELETE(id: number): Observable<MbsOperationDto> {
		return this.http.delete<MbsOperationDto>("http://localhost:3000/mbs/main/operations/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}