import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsGovernativeProjectProcurementLotDto } from '../class/governative-project-procurement-lot-dto.class';

@Injectable()
export class MbsGovernativeProjectProcurementLotResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createGovernativeProjectProcurementLotUsingPOST(governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotDto): Observable<MbsGovernativeProjectProcurementLotDto> {
		return this.http.post<MbsGovernativeProjectProcurementLotDto>(this.basePath + "/governativeProjectProcurementLots/", governativeProjectProcurementLot);
	}

	updateGovernativeProjectProcurementLotUsingPUT(governativeProjectProcurementLot: MbsGovernativeProjectProcurementLotDto): Observable<MbsGovernativeProjectProcurementLotDto> {
		return this.http.put<MbsGovernativeProjectProcurementLotDto>(this.basePath + "/governativeProjectProcurementLots/", governativeProjectProcurementLot);
	}

	getAllGovernativeProjectProcurementLotsUsingGET(filters: any): Observable<MbsGovernativeProjectProcurementLotDto[]> {
		return this.http.get<MbsGovernativeProjectProcurementLotDto[]>(this.basePath + "/governativeProjectProcurementLots?" + this.prepareQueryParams(filters).toString());
	}
	
	countGovernativeProjectProcurementLotsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/governativeProjectProcurementLots/count?" + this.prepareQueryParams(filters).toString());
	}

	getGovernativeProjectProcurementLotUsingGET(id: number): Observable<MbsGovernativeProjectProcurementLotDto> {
		return this.http.get<MbsGovernativeProjectProcurementLotDto>(this.basePath + "/governativeProjectProcurementLots/" + id);
	}

	deleteGovernativeProjectProcurementLotUsingDELETE(id: number): Observable<MbsGovernativeProjectProcurementLotDto> {
		return this.http.delete<MbsGovernativeProjectProcurementLotDto>(this.basePath + "/governativeProjectProcurementLots/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}