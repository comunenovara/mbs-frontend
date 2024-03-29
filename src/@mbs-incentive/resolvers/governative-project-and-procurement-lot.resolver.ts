import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsGovernativeProjectAndProcurementLotDto } from '../class/governative-project-and-procurement-lot-dto.class';
import { MbsGovernativeProjectAndProcurementLotResourceService } from '../services/governative-project-and-procurement-lot.service';

@Injectable()
export class MbsGovernativeProjectAndProcurementLotResolver implements Resolve<Observable<MbsGovernativeProjectAndProcurementLotDto>> {
	constructor(private governativeProjectAndProcurementLotResourceService: MbsGovernativeProjectAndProcurementLotResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.governativeProjectAndProcurementLotResourceService.getGovernativeProjectAndProcurementLotUsingGET(+id);
	}
}