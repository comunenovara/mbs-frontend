import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsRelifDto } from '../class/relif-dto.class';

@Injectable()
export class MbsRelifResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createRelifUsingPOST(relif: MbsRelifDto): Observable<MbsRelifDto> {
		return this.http.get<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/");
	}

	updateRelifUsingPUT(relif: MbsRelifDto): Observable<MbsRelifDto> {
		return this.http.get<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/");
	}

	getAllRelifsUsingGET(filters: any): Observable<MbsRelifDto[]> {
		return this.http.get<MbsRelifDto[]>("http://localhost:3000/mbs/main/relifs/");
	}
	
	countRelifsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/relifs/");
	}

	getRelifUsingGET(id: number): Observable<MbsRelifDto> {
		return this.http.get<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/"+id);
	}

	deleteRelifUsingDELETE(id: number): Observable<MbsRelifDto> {
		return this.http.get<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/"+id+"/delete");
	}
}