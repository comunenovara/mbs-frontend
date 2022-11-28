import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsDossierDTO } from '../class/dossier-dto.class';

@Injectable()
export class MbsDossierResourceService {
	constructor(
		private http: HttpClient,

	) { }

	getDossierUsingGET(id: number): Observable<MbsDossierDTO> {
		return this.http.get<MbsDossierDTO>("url");
	}

	getAllDossiersUsingGET(filters: any): Observable<MbsDossierDTO[]> {
		return this.http.get<MbsDossierDTO[]>("url");
	}
	
	countDossiersUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("url");
	}
}