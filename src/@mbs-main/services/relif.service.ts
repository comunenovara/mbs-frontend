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
		return this.http.post<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/", relif);
	}

	updateRelifUsingPUT(relif: MbsRelifDto): Observable<MbsRelifDto> {
		return this.http.put<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/", relif);
	}

	getAllRelifsUsingGET(filters: any): Observable<MbsRelifDto[]> {
		return this.http.get<MbsRelifDto[]>("http://localhost:3000/mbs/main/relifs?" + this.prepareQueryParams(filters).toString());
	}
	
	countRelifsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/relifs/count?" + this.prepareQueryParams(filters).toString());
	}

	getRelifUsingGET(id: number): Observable<MbsRelifDto> {
		return this.http.get<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/" + id);
	}

	deleteRelifUsingDELETE(id: number): Observable<MbsRelifDto> {
		return this.http.delete<MbsRelifDto>("http://localhost:3000/mbs/main/relifs/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}