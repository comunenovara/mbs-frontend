import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsDossierDto } from '../class/dossier-dto.class';

@Injectable()
export class MbsDossierResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createDossierUsingPOST(dossier: MbsDossierDto): Observable<MbsDossierDto> {
		return this.http.post<MbsDossierDto>(this.basePath + "/dossiers/", dossier);
	}

	updateDossierUsingPUT(dossier: MbsDossierDto): Observable<MbsDossierDto> {
		return this.http.put<MbsDossierDto>(this.basePath + "/dossiers/", dossier);
	}

	getAllDossiersUsingGET(filters: any): Observable<MbsDossierDto[]> {
		return this.http.get<MbsDossierDto[]>(this.basePath + "/dossiers?" + this.prepareQueryParams(filters).toString());
	}
	
	countDossiersUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/dossiers/count?" + this.prepareQueryParams(filters).toString());
	}

	getDossierUsingGET(id: number): Observable<MbsDossierDto> {
		return this.http.get<MbsDossierDto>(this.basePath + "/dossiers/" + id);
	}

	deleteDossierUsingDELETE(id: number): Observable<MbsDossierDto> {
		return this.http.delete<MbsDossierDto>(this.basePath + "/dossiers/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}