import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsOperationTypeDTO } from '../class/operation-type-dto.class';
import { MbsOperationTypeResourceService } from '../services/operation-type.service';

@Injectable()
export class MbsOperationTypeResolver implements Resolve<Observable<MbsOperationTypeDTO>> {
	constructor(private operationTypeResourceService: MbsOperationTypeResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.operationTypeResourceService.getOperationTypeUsingGET(+id);
	}
}