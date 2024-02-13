import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsProcurementTypeDto } from '../class/procurement-type-dto.class';

@Injectable()
export class MbsProcurementTypeResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createProcurementTypeUsingPOST(procurementType: MbsProcurementTypeDto): Observable<MbsProcurementTypeDto> {
		return this.http.post<MbsProcurementTypeDto>(this.basePath + "/procurementTypes/", procurementType);
	}

	updateProcurementTypeUsingPUT(procurementType: MbsProcurementTypeDto): Observable<MbsProcurementTypeDto> {
		return this.http.put<MbsProcurementTypeDto>(this.basePath + "/procurementTypes/", procurementType);
	}

	getAllProcurementTypesUsingGET(filters: any): Observable<MbsProcurementTypeDto[]> {
		return this.http.get<MbsProcurementTypeDto[]>(this.basePath + "/procurementTypes?" + this.prepareQueryParams(filters).toString());
	}
	
	countProcurementTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/procurementTypes/count?" + this.prepareQueryParams(filters).toString());
	}

	getProcurementTypeUsingGET(id: number): Observable<MbsProcurementTypeDto> {
		return this.http.get<MbsProcurementTypeDto>(this.basePath + "/procurementTypes/" + id);
	}

	deleteProcurementTypeUsingDELETE(id: number): Observable<MbsProcurementTypeDto> {
		return this.http.delete<MbsProcurementTypeDto>(this.basePath + "/procurementTypes/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}