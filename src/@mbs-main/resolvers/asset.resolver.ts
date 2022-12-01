import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsAssetDto } from '../class/asset-dto.class';
import { MbsAssetResourceService } from '../services/asset.service';

@Injectable()
export class MbsAssetResolver implements Resolve<Observable<MbsAssetDto>> {
	constructor(private assetResourceService: MbsAssetResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.assetResourceService.getAssetUsingGET(+id);
	}
}