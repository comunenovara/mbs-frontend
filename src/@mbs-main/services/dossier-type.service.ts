import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsDossierTypeDTO } from '../class/dossier-type-dto.class';

@Injectable()
export class MbsDossierTypeResourceService {
	constructor(
		private http: HttpClient,

	) { }

	getDossierTypeUsingGET(id: number): Observable<MbsDossierTypeDTO> {
		return this.http.get<MbsDossierTypeDTO>("url");
	}

	getAllDossierTypesUsingGET(filters: any): Observable<MbsDossierTypeDTO[]> {
		return this.http.get<MbsDossierTypeDTO[]>("url");
	}
	
	countDossierTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("url");
	}
}