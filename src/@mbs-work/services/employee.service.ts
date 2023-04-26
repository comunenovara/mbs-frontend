import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsEmployeeDto } from '../class/employee-dto.class';

@Injectable()
export class MbsEmployeeResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createEmployeeUsingPOST(employee: MbsEmployeeDto): Observable<MbsEmployeeDto> {
		return this.http.post<MbsEmployeeDto>(this.basePath + "/employees/", employee);
	}

	updateEmployeeUsingPUT(employee: MbsEmployeeDto): Observable<MbsEmployeeDto> {
		return this.http.put<MbsEmployeeDto>(this.basePath + "/employees/", employee);
	}

	getAllEmployeesUsingGET(filters: any): Observable<MbsEmployeeDto[]> {
		return this.http.get<MbsEmployeeDto[]>(this.basePath + "/employees?" + this.prepareQueryParams(filters).toString());
	}
	
	countEmployeesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/employees/count?" + this.prepareQueryParams(filters).toString());
	}

	getEmployeeUsingGET(id: number): Observable<MbsEmployeeDto> {
		return this.http.get<MbsEmployeeDto>(this.basePath + "/employees/" + id);
	}

	deleteEmployeeUsingDELETE(id: number): Observable<MbsEmployeeDto> {
		return this.http.delete<MbsEmployeeDto>(this.basePath + "/employees/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}