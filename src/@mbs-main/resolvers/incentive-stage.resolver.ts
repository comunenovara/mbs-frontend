import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveStageDto } from '../class/incentive-stage-dto.class';
import { MbsIncentiveStageResourceService } from '../services/incentive-stage.service';

@Injectable()
export class MbsIncentiveStageResolver implements Resolve<Observable<MbsIncentiveStageDto>> {
	constructor(private incentiveStageResourceService: MbsIncentiveStageResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveStageResourceService.getIncentiveStageUsingGET(+id);
	}
}