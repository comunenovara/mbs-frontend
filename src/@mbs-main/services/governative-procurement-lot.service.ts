import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsGovernativeProcurementLotDto } from '../class/governative-procurement-lot-dto.class';

@Injectable()
export class MbsGovernativeProcurementLotResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createGovernativeProcurementLotUsingPOST(governativeProcurementLot: MbsGovernativeProcurementLotDto): Observable<MbsGovernativeProcurementLotDto> {
		return this.http.post<MbsGovernativeProcurementLotDto>(this.basePath + "/governativeProcurementLots/", governativeProcurementLot);
	}

	updateGovernativeProcurementLotUsingPUT(governativeProcurementLot: MbsGovernativeProcurementLotDto): Observable<MbsGovernativeProcurementLotDto> {
		return this.http.put<MbsGovernativeProcurementLotDto>(this.basePath + "/governativeProcurementLots/", governativeProcurementLot);
	}

	getAllGovernativeProcurementLotsUsingGET(filters: any): Observable<MbsGovernativeProcurementLotDto[]> {
		return this.http.get<MbsGovernativeProcurementLotDto[]>(this.basePath + "/governativeProcurementLots?" + this.prepareQueryParams(filters).toString());
	}
	
	countGovernativeProcurementLotsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/governativeProcurementLots/count?" + this.prepareQueryParams(filters).toString());
	}

	getGovernativeProcurementLotUsingGET(id: number): Observable<MbsGovernativeProcurementLotDto> {
		return this.http.get<MbsGovernativeProcurementLotDto>(this.basePath + "/governativeProcurementLots/" + id);
	}

	deleteGovernativeProcurementLotUsingDELETE(id: number): Observable<MbsGovernativeProcurementLotDto> {
		return this.http.delete<MbsGovernativeProcurementLotDto>(this.basePath + "/governativeProcurementLots/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}