import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_WORK_ENDPOINT } from '../work.variables';
import { MbsAziendaDto } from '../class/azienda-dto.class';

@Injectable()
export class MbsAziendaResourceService {

	protected basePath = 'http://localhost:3000/mbs/work';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_WORK_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createAziendaUsingPOST(azienda: MbsAziendaDto): Observable<MbsAziendaDto> {
		return this.http.post<MbsAziendaDto>(this.basePath + "/aziendas/", azienda);
	}

	updateAziendaUsingPUT(azienda: MbsAziendaDto): Observable<MbsAziendaDto> {
		return this.http.put<MbsAziendaDto>(this.basePath + "/aziendas/", azienda);
	}

	getAllAziendasUsingGET(filters: any): Observable<MbsAziendaDto[]> {
		return this.http.get<MbsAziendaDto[]>(this.basePath + "/aziendas?" + this.prepareQueryParams(filters).toString());
	}
	
	countAziendasUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/aziendas/count?" + this.prepareQueryParams(filters).toString());
	}

	getAziendaUsingGET(id: number): Observable<MbsAziendaDto> {
		return this.http.get<MbsAziendaDto>(this.basePath + "/aziendas/" + id);
	}

	deleteAziendaUsingDELETE(id: number): Observable<MbsAziendaDto> {
		return this.http.delete<MbsAziendaDto>(this.basePath + "/aziendas/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}