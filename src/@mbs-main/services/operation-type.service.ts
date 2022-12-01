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
		return this.http.get<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/");
	}

	updateOperationTypeUsingPUT(operationType: MbsOperationTypeDto): Observable<MbsOperationTypeDto> {
		return this.http.get<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/");
	}

	getAllOperationTypesUsingGET(filters: any): Observable<MbsOperationTypeDto[]> {
		return this.http.get<MbsOperationTypeDto[]>("http://localhost:3000/mbs/main/operationTypes/");
	}
	
	countOperationTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/operationTypes/");
	}

	getOperationTypeUsingGET(id: number): Observable<MbsOperationTypeDto> {
		return this.http.get<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/"+id);
	}

	deleteOperationTypeUsingDELETE(id: number): Observable<MbsOperationTypeDto> {
		return this.http.get<MbsOperationTypeDto>("http://localhost:3000/mbs/main/operationTypes/"+id+"/delete");
	}
}