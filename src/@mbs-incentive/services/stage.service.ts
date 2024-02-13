import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsStageDto } from '../class/stage-dto.class';

@Injectable()
export class MbsStageResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createStageUsingPOST(stage: MbsStageDto): Observable<MbsStageDto> {
		return this.http.post<MbsStageDto>(this.basePath + "/stages/", stage);
	}

	updateStageUsingPUT(stage: MbsStageDto): Observable<MbsStageDto> {
		return this.http.put<MbsStageDto>(this.basePath + "/stages/", stage);
	}

	getAllStagesUsingGET(filters: any): Observable<MbsStageDto[]> {
		return this.http.get<MbsStageDto[]>(this.basePath + "/stages?" + this.prepareQueryParams(filters).toString());
	}
	
	countStagesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/stages/count?" + this.prepareQueryParams(filters).toString());
	}

	getStageUsingGET(id: number): Observable<MbsStageDto> {
		return this.http.get<MbsStageDto>(this.basePath + "/stages/" + id);
	}

	deleteStageUsingDELETE(id: number): Observable<MbsStageDto> {
		return this.http.delete<MbsStageDto>(this.basePath + "/stages/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}