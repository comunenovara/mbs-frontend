import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsIncentiveAssignationStageDto } from '../class/incentive-assignation-stage-dto.class';

@Injectable()
export class MbsIncentiveAssignationStageResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveAssignationStageUsingPOST(incentiveAssignationStage: MbsIncentiveAssignationStageDto): Observable<MbsIncentiveAssignationStageDto> {
		return this.http.post<MbsIncentiveAssignationStageDto>(this.basePath + "/incentiveAssignationStages/", incentiveAssignationStage);
	}

	updateIncentiveAssignationStageUsingPUT(incentiveAssignationStage: MbsIncentiveAssignationStageDto): Observable<MbsIncentiveAssignationStageDto> {
		return this.http.put<MbsIncentiveAssignationStageDto>(this.basePath + "/incentiveAssignationStages/", incentiveAssignationStage);
	}

	getAllIncentiveAssignationStagesUsingGET(filters: any): Observable<MbsIncentiveAssignationStageDto[]> {
		return this.http.get<MbsIncentiveAssignationStageDto[]>(this.basePath + "/incentiveAssignationStages?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveAssignationStagesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveAssignationStages/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveAssignationStageUsingGET(id: number): Observable<MbsIncentiveAssignationStageDto> {
		return this.http.get<MbsIncentiveAssignationStageDto>(this.basePath + "/incentiveAssignationStages/" + id);
	}

	deleteIncentiveAssignationStageUsingDELETE(id: number): Observable<MbsIncentiveAssignationStageDto> {
		return this.http.delete<MbsIncentiveAssignationStageDto>(this.basePath + "/incentiveAssignationStages/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}