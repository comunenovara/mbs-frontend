import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsGovernativeProjectAndProcurementLotDto } from '../class/governative-project-and-procurement-lot-dto.class';

@Injectable()
export class MbsGovernativeProjectAndProcurementLotResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createGovernativeProjectAndProcurementLotUsingPOST(governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotDto): Observable<MbsGovernativeProjectAndProcurementLotDto> {
		return this.http.post<MbsGovernativeProjectAndProcurementLotDto>(this.basePath + "/governativeProjectAndProcurementLots/", governativeProjectAndProcurementLot);
	}

	updateGovernativeProjectAndProcurementLotUsingPUT(governativeProjectAndProcurementLot: MbsGovernativeProjectAndProcurementLotDto): Observable<MbsGovernativeProjectAndProcurementLotDto> {
		return this.http.put<MbsGovernativeProjectAndProcurementLotDto>(this.basePath + "/governativeProjectAndProcurementLots/", governativeProjectAndProcurementLot);
	}

	getAllGovernativeProjectAndProcurementLotsUsingGET(filters: any): Observable<MbsGovernativeProjectAndProcurementLotDto[]> {
		return this.http.get<MbsGovernativeProjectAndProcurementLotDto[]>(this.basePath + "/governativeProjectAndProcurementLots?" + this.prepareQueryParams(filters).toString());
	}
	
	countGovernativeProjectAndProcurementLotsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/governativeProjectAndProcurementLots/count?" + this.prepareQueryParams(filters).toString());
	}

	getGovernativeProjectAndProcurementLotUsingGET(id: number): Observable<MbsGovernativeProjectAndProcurementLotDto> {
		return this.http.get<MbsGovernativeProjectAndProcurementLotDto>(this.basePath + "/governativeProjectAndProcurementLots/" + id);
	}

	deleteGovernativeProjectAndProcurementLotUsingDELETE(id: number): Observable<MbsGovernativeProjectAndProcurementLotDto> {
		return this.http.delete<MbsGovernativeProjectAndProcurementLotDto>(this.basePath + "/governativeProjectAndProcurementLots/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}