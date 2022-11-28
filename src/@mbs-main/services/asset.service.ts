import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsAssetDTO } from '../class/asset-dto.class';

@Injectable()
export class MbsAssetResourceService {
	constructor(
		private http: HttpClient,

	) { }

	getAssetUsingGET(id: number): Observable<MbsAssetDTO> {
		return this.http.get<MbsAssetDTO>("url");
	}

	getAllAssetsUsingGET(filters: any): Observable<MbsAssetDTO[]> {

		console.log("loooot");



		return this.http.get<MbsAssetDTO[]>("url");
	}
	
	countAssetsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("url");
	}
}