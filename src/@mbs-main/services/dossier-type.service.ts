import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsDossierTypeDto } from '../class/dossier-type-dto.class';

@Injectable()
export class MbsDossierTypeResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createDossierTypeUsingPOST(dossierType: MbsDossierTypeDto): Observable<MbsDossierTypeDto> {
		return this.http.post<MbsDossierTypeDto>("http://localhost:3000/mbs/main/dossierTypes/", dossierType);
	}

	updateDossierTypeUsingPUT(dossierType: MbsDossierTypeDto): Observable<MbsDossierTypeDto> {
		return this.http.put<MbsDossierTypeDto>("http://localhost:3000/mbs/main/dossierTypes/", dossierType);
	}

	getAllDossierTypesUsingGET(filters: any): Observable<MbsDossierTypeDto[]> {
		return this.http.get<MbsDossierTypeDto[]>("http://localhost:3000/mbs/main/dossierTypes?" + this.prepareQueryParams(filters).toString());
	}
	
	countDossierTypesUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/dossierTypes/count?" + this.prepareQueryParams(filters).toString());
	}

	getDossierTypeUsingGET(id: number): Observable<MbsDossierTypeDto> {
		return this.http.get<MbsDossierTypeDto>("http://localhost:3000/mbs/main/dossierTypes/" + id);
	}

	deleteDossierTypeUsingDELETE(id: number): Observable<MbsDossierTypeDto> {
		return this.http.delete<MbsDossierTypeDto>("http://localhost:3000/mbs/main/dossierTypes/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}