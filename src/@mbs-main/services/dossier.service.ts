import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsDossierDto } from '../class/dossier-dto.class';

@Injectable()
export class MbsDossierResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createDossierUsingPOST(dossier: MbsDossierDto): Observable<MbsDossierDto> {
		return this.http.post<MbsDossierDto>("http://localhost:3000/mbs/main/dossiers/", dossier);
	}

	updateDossierUsingPUT(dossier: MbsDossierDto): Observable<MbsDossierDto> {
		return this.http.put<MbsDossierDto>("http://localhost:3000/mbs/main/dossiers/", dossier);
	}

	getAllDossiersUsingGET(filters: any): Observable<MbsDossierDto[]> {
		return this.http.get<MbsDossierDto[]>("http://localhost:3000/mbs/main/dossiers?" + this.prepareQueryParams(filters).toString());
	}
	
	countDossiersUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/dossiers?" + this.prepareQueryParams(filters).toString());
	}

	getDossierUsingGET(id: number): Observable<MbsDossierDto> {
		return this.http.get<MbsDossierDto>("http://localhost:3000/mbs/main/dossiers/" + id);
	}

	deleteDossierUsingDELETE(id: number): Observable<MbsDossierDto> {
		return this.http.delete<MbsDossierDto>("http://localhost:3000/mbs/main/dossiers/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}