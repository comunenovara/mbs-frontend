import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsGovernativeProcurementLotDto } from '../class/governative-procurement-lot-dto.class';
import { MbsGovernativeProcurementLotResourceService } from '../services/governative-procurement-lot.service';

@Injectable()
export class MbsGovernativeProcurementLotResolver implements Resolve<Observable<MbsGovernativeProcurementLotDto>> {
	constructor(private governativeProcurementLotResourceService: MbsGovernativeProcurementLotResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.governativeProcurementLotResourceService.getGovernativeProcurementLotUsingGET(+id);
	}
}