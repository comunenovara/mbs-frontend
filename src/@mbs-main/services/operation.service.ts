import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsOperationDTO } from '../class/operation-dto.class';

@Injectable()
export class MbsOperationResourceService {
	constructor(
		private http: HttpClient,

	) { }

	getOperationUsingGET(id: number): Observable<MbsOperationDTO> {
		return this.http.get<MbsOperationDTO>("url");
	}

	getAllOperationsUsingGET(filters: any): Observable<MbsOperationDTO[]> {
		return this.http.get<MbsOperationDTO[]>("url");
	}
	
	countOperationsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("url");
	}
}