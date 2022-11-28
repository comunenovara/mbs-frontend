import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsOperationTypeDTO } from '../class/operation-type-dto.class';

@Injectable()
export class MbsOperationTypeResourceService {
	constructor(
		private http: HttpClient,

	) { }

	getOperationTypeUsingGET(id: number): Observable<MbsOperationTypeDTO> {
		return this.http.get<MbsOperationTypeDTO>("url");
	}

	getAllOperationTypesUsingGET(filters: any): Observable<MbsOperationTypeDTO[]> {
		return this.http.get<MbsOperationTypeDTO[]>("url");
	}
	
	countOperationTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("url");
	}
}