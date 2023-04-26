import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsWorkCategoryDto } from '../class/work-category-dto.class';

@Injectable()
export class MbsWorkCategoryResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createWorkCategoryUsingPOST(workCategory: MbsWorkCategoryDto): Observable<MbsWorkCategoryDto> {
		return this.http.post<MbsWorkCategoryDto>(this.basePath + "/workCategories/", workCategory);
	}

	updateWorkCategoryUsingPUT(workCategory: MbsWorkCategoryDto): Observable<MbsWorkCategoryDto> {
		return this.http.put<MbsWorkCategoryDto>(this.basePath + "/workCategories/", workCategory);
	}

	getAllWorkCategoriesUsingGET(filters: any): Observable<MbsWorkCategoryDto[]> {
		return this.http.get<MbsWorkCategoryDto[]>(this.basePath + "/workCategories?" + this.prepareQueryParams(filters).toString());
	}
	
	countWorkCategoriesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/workCategories/count?" + this.prepareQueryParams(filters).toString());
	}

	getWorkCategoryUsingGET(id: number): Observable<MbsWorkCategoryDto> {
		return this.http.get<MbsWorkCategoryDto>(this.basePath + "/workCategories/" + id);
	}

	deleteWorkCategoryUsingDELETE(id: number): Observable<MbsWorkCategoryDto> {
		return this.http.delete<MbsWorkCategoryDto>(this.basePath + "/workCategorys/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}