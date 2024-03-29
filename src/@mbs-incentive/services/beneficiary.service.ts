import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_INCENTIVE_ENDPOINT } from '../incentive.variables';
import { MbsBeneficiaryDto } from '../class/beneficiary-dto.class';

@Injectable()
export class MbsBeneficiaryResourceService {

	protected basePath = 'http://localhost:3000/mbs/incentive';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_INCENTIVE_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createBeneficiaryUsingPOST(beneficiary: MbsBeneficiaryDto): Observable<MbsBeneficiaryDto> {
		return this.http.post<MbsBeneficiaryDto>(this.basePath + "/beneficiaries/", beneficiary);
	}

	updateBeneficiaryUsingPUT(beneficiary: MbsBeneficiaryDto): Observable<MbsBeneficiaryDto> {
		return this.http.put<MbsBeneficiaryDto>(this.basePath + "/beneficiaries/", beneficiary);
	}

	getAllBeneficiariesUsingGET(filters: any): Observable<MbsBeneficiaryDto[]> {
		return this.http.get<MbsBeneficiaryDto[]>(this.basePath + "/beneficiaries?" + this.prepareQueryParams(filters).toString());
	}
	
	countBeneficiariesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/beneficiaries/count?" + this.prepareQueryParams(filters).toString());
	}

	getBeneficiaryUsingGET(id: number): Observable<MbsBeneficiaryDto> {
		return this.http.get<MbsBeneficiaryDto>(this.basePath + "/beneficiaries/" + id);
	}

	deleteBeneficiaryUsingDELETE(id: number): Observable<MbsBeneficiaryDto> {
		return this.http.delete<MbsBeneficiaryDto>(this.basePath + "/beneficiarys/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}