import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MBS_MAIN_ENDPOINT } from '../main.variables';
import { MbsAssetDto } from '../class/asset-dto.class';

@Injectable()
export class MbsAssetResourceService {

	protected basePath = 'http://localhost:3000/mbs/main';

	constructor(
		private http: HttpClient,
		@Optional() @Inject(MBS_MAIN_ENDPOINT) basePath: string,
		
	) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	createAssetUsingPOST(asset: MbsAssetDto): Observable<MbsAssetDto> {
		return this.http.post<MbsAssetDto>(this.basePath + "/assets/", asset);
	}

	updateAssetUsingPUT(asset: MbsAssetDto): Observable<MbsAssetDto> {
		return this.http.put<MbsAssetDto>(this.basePath + "/assets/", asset);
	}

	getAllAssetsUsingGET(filters: any): Observable<MbsAssetDto[]> {
		return this.http.get<MbsAssetDto[]>(this.basePath + "/assets?" + this.prepareQueryParams(filters).toString());
	}
	
	countAssetsUsingGET(filters: any): Observable<number> {
		return this.http.get<number>(this.basePath + "/assets/count?" + this.prepareQueryParams(filters).toString());
	}

	getAssetUsingGET(id: number): Observable<MbsAssetDto> {
		return this.http.get<MbsAssetDto>(this.basePath + "/assets/" + id);
	}

	deleteAssetUsingDELETE(id: number): Observable<MbsAssetDto> {
		return this.http.delete<MbsAssetDto>(this.basePath + "/assets/" + id + "/delete");
	}

	private prepareQueryParams(filters: any) {
		let params = new URLSearchParams();
		for (let key in filters) {
			params.set(key, filters[key])
		}
		return params;
	}
}