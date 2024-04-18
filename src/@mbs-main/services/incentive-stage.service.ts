import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveStageDto } from '../class/incentive-stage-dto.class';

@Injectable()
export class MbsIncentiveStageResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveStageUsingPOST(incentiveStage: MbsIncentiveStageDto): Observable<MbsIncentiveStageDto> {
		return this.http.post<MbsIncentiveStageDto>(this.basePath + "/incentiveStages/", incentiveStage);
	}

	updateIncentiveStageUsingPUT(incentiveStage: MbsIncentiveStageDto): Observable<MbsIncentiveStageDto> {
		return this.http.put<MbsIncentiveStageDto>(this.basePath + "/incentiveStages/", incentiveStage);
	}

	getAllIncentiveStagesUsingGET(filters: any): Observable<MbsIncentiveStageDto[]> {
		return this.http.get<MbsIncentiveStageDto[]>(this.basePath + "/incentiveStages?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveStagesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveStages/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveStageUsingGET(id: number): Observable<MbsIncentiveStageDto> {
		return this.http.get<MbsIncentiveStageDto>(this.basePath + "/incentiveStages/" + id);
	}

	deleteIncentiveStageUsingDELETE(id: number): Observable<MbsIncentiveStageDto> {
		return this.http.delete<MbsIncentiveStageDto>(this.basePath + "/incentiveStages/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}