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
		return this.http.post<MbsAssetDto>("http://localhost:3000/mbs/main/assets/", asset);
	}

	updateAssetUsingPUT(asset: MbsAssetDto): Observable<MbsAssetDto> {
		return this.http.put<MbsAssetDto>("http://localhost:3000/mbs/main/assets/", asset);
	}

	getAllAssetsUsingGET(filters: any): Observable<MbsAssetDto[]> {
		return this.http.get<MbsAssetDto[]>("http://localhost:3000/mbs/main/assets?" + this.prepareQueryParams(filters).toString());
	}
	
	countAssetsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>("http://localhost:3000/mbs/main/assets?" + this.prepareQueryParams(filters).toString());
	}

	getAssetUsingGET(id: number): Observable<MbsAssetDto> {
		return this.http.get<MbsAssetDto>("http://localhost:3000/mbs/main/assets/" + id);
	}

	deleteAssetUsingDELETE(id: number): Observable<MbsAssetDto> {
		return this.http.delete<MbsAssetDto>("http://localhost:3000/mbs/main/assets/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}