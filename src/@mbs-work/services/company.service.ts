import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsCompanyDto } from '../class/company-dto.class';

@Injectable()
export class MbsCompanyResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createCompanyUsingPOST(company: MbsCompanyDto): Observable<MbsCompanyDto> {
		return this.http.post<MbsCompanyDto>(this.basePath + "/companys/", company);
	}

	updateCompanyUsingPUT(company: MbsCompanyDto): Observable<MbsCompanyDto> {
		return this.http.put<MbsCompanyDto>(this.basePath + "/companys/", company);
	}

	getAllCompaniesUsingGET(filters: any): Observable<MbsCompanyDto[]> {
		return this.http.get<MbsCompanyDto[]>(this.basePath + "/companys?" + this.prepareQueryParams(filters).toString());
	}
	
	countCompaniesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/companys/count?" + this.prepareQueryParams(filters).toString());
	}

	getCompanyUsingGET(id: number): Observable<MbsCompanyDto> {
		return this.http.get<MbsCompanyDto>(this.basePath + "/companys/" + id);
	}

	deleteCompanyUsingDELETE(id: number): Observable<MbsCompanyDto> {
		return this.http.delete<MbsCompanyDto>(this.basePath + "/companys/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}