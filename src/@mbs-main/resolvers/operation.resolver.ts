import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsOperationDto } from '../class/operation-dto.class';
import { MbsOperationResourceService } from '../services/operation.service';

@Injectable()
export class MbsOperationResolver implements Resolve<Observable<MbsOperationDto>> {
	constructor(private operationResourceService: MbsOperationResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.operationResourceService.getOperationUsingGET(+id);
	}
}