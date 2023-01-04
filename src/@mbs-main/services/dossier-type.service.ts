import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsDossierTypeDto } from '../class/dossier-type-dto.class';

@Injectable()
export class MbsDossierTypeResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createDossierTypeUsingPOST(dossierType: MbsDossierTypeDto): Observable<MbsDossierTypeDto> {
		return this.http.post<MbsDossierTypeDto>(this.basePath + "/dossierTypes/", dossierType);
	}

	updateDossierTypeUsingPUT(dossierType: MbsDossierTypeDto): Observable<MbsDossierTypeDto> {
		return this.http.put<MbsDossierTypeDto>(this.basePath + "/dossierTypes/", dossierType);
	}

	getAllDossierTypesUsingGET(filters: any): Observable<MbsDossierTypeDto[]> {
		return this.http.get<MbsDossierTypeDto[]>(this.basePath + "/dossierTypes?" + this.prepareQueryParams(filters).toString());
	}
	
	countDossierTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/dossierTypes/count?" + this.prepareQueryParams(filters).toString());
	}

	getDossierTypeUsingGET(id: number): Observable<MbsDossierTypeDto> {
		return this.http.get<MbsDossierTypeDto>(this.basePath + "/dossierTypes/" + id);
	}

	deleteDossierTypeUsingDELETE(id: number): Observable<MbsDossierTypeDto> {
		return this.http.delete<MbsDossierTypeDto>(this.basePath + "/dossierTypes/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}