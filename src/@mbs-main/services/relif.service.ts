import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsRelifDTO } from '../class/relif-dto.class';

@Injectable()
export class MbsRelifResourceService {
	constructor(
		private http: HttpClient,

	) { }

	getRelifUsingGET(id: number): Observable<MbsRelifDTO> {
		return this.http.get<MbsRelifDTO>("url");
	}

	getAllRelifsUsingGET(filters: any): Observable<MbsRelifDTO[]> {
		return this.http.get<MbsRelifDTO[]>("url");
	}
	
	countRelifsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("url");
	}
}