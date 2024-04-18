import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsIncentiveBeneficiaryDto } from '../class/incentive-beneficiary-dto.class';

@Injectable()
export class MbsIncentiveBeneficiaryResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createIncentiveBeneficiaryUsingPOST(incentiveBeneficiary: MbsIncentiveBeneficiaryDto): Observable<MbsIncentiveBeneficiaryDto> {
		return this.http.post<MbsIncentiveBeneficiaryDto>(this.basePath + "/incentiveBeneficiaries/", incentiveBeneficiary);
	}

	updateIncentiveBeneficiaryUsingPUT(incentiveBeneficiary: MbsIncentiveBeneficiaryDto): Observable<MbsIncentiveBeneficiaryDto> {
		return this.http.put<MbsIncentiveBeneficiaryDto>(this.basePath + "/incentiveBeneficiaries/", incentiveBeneficiary);
	}

	getAllIncentiveBeneficiariesUsingGET(filters: any): Observable<MbsIncentiveBeneficiaryDto[]> {
		return this.http.get<MbsIncentiveBeneficiaryDto[]>(this.basePath + "/incentiveBeneficiaries?" + this.prepareQueryParams(filters).toString());
	}
	
	countIncentiveBeneficiariesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/incentiveBeneficiaries/count?" + this.prepareQueryParams(filters).toString());
	}

	getIncentiveBeneficiaryUsingGET(id: number): Observable<MbsIncentiveBeneficiaryDto> {
		return this.http.get<MbsIncentiveBeneficiaryDto>(this.basePath + "/incentiveBeneficiaries/" + id);
	}

	deleteIncentiveBeneficiaryUsingDELETE(id: number): Observable<MbsIncentiveBeneficiaryDto> {
		return this.http.delete<MbsIncentiveBeneficiaryDto>(this.basePath + "/incentiveBeneficiarys/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}