import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsGovernativeProjectProcurementLotDto } from '../class/governative-project-procurement-lot-dto.class';
import { MbsGovernativeProjectProcurementLotResourceService } from '../services/governative-project-procurement-lot.service';

@Injectable()
export class MbsGovernativeProjectProcurementLotResolver implements Resolve<Observable<MbsGovernativeProjectProcurementLotDto>> {
	constructor(private governativeProjectProcurementLotResourceService: MbsGovernativeProjectProcurementLotResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.governativeProjectProcurementLotResourceService.getGovernativeProjectProcurementLotUsingGET(+id);
	}
}