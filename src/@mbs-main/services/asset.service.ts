import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsAssetDTO } from '../class/asset-dto.class';

@Injectable()
export class MbsAssetResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createAssetUsingPOST(asset: MbsAssetDTO): Observable<MbsAssetDTO> {
		return this.http.get<MbsAssetDTO>("http://localhost:3000/mbs/assets/");
	}

	updateAssetUsingPUT(asset: MbsAssetDTO): Observable<MbsAssetDTO> {
		return this.http.get<MbsAssetDTO>("http://localhost:3000/mbs/assets/");
	}

	deleteAssetUsingDELETE(id: number): Observable<MbsAssetDTO> {
		return this.http.delete<MbsAssetDTO>("http://localhost:3000/mbs/assets/"+id+"/delete");
	}

	getAllAssetsUsingGET(filters: any): Observable<MbsAssetDTO[]> {
		return this.http.get<MbsAssetDTO[]>("http://localhost:3000/mbs/assets");
	}
	
	countAssetsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/assets/count");
	}

	getAssetUsingGET(id: number): Observable<MbsAssetDTO> {
		return this.http.get<MbsAssetDTO>("http://localhost:3000/mbs/assets/"+id);
	}
}