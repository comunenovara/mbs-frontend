import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsProcurementTypeDto } from '../class/procurement-type-dto.class';
import { MbsProcurementTypeResourceService } from '../services/procurement-type.service';

@Injectable()
export class MbsProcurementTypeResolver implements Resolve<Observable<MbsProcurementTypeDto>> {
	constructor(private procurementTypeResourceService: MbsProcurementTypeResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.procurementTypeResourceService.getProcurementTypeUsingGET(+id);
	}
}