import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MbsAssetDto } from '../class/asset-dto.class';

@Injectable()
export class MbsAssetResourceService {
	constructor(
		private http: HttpClient,

	) { }

	createAssetUsingPOST(asset: MbsAssetDto): Observable<MbsAssetDto> {
		return this.http.get<MbsAssetDto>("http://localhost:3000/mbs/main/assets/");
	}

	updateAssetUsingPUT(asset: MbsAssetDto): Observable<MbsAssetDto> {
		return this.http.get<MbsAssetDto>("http://localhost:3000/mbs/main/assets/");
	}

	getAllAssetsUsingGET(filters: any): Observable<MbsAssetDto[]> {
		return this.http.get<MbsAssetDto[]>("http://localhost:3000/mbs/main/assets/");
	}
	
	countAssetsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/assets/");
	}

	getAssetUsingGET(id: number): Observable<MbsAssetDto> {
		return this.http.get<MbsAssetDto>("http://localhost:3000/mbs/main/assets/"+id);
	}

	deleteAssetUsingDELETE(id: number): Observable<MbsAssetDto> {
		return this.http.get<MbsAssetDto>("http://localhost:3000/mbs/main/assets/"+id+"/delete");
	}
}