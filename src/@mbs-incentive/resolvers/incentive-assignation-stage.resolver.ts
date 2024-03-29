import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveAssignationStageDto } from '../class/incentive-assignation-stage-dto.class';
import { MbsIncentiveAssignationStageResourceService } from '../services/incentive-assignation-stage.service';

@Injectable()
export class MbsIncentiveAssignationStageResolver implements Resolve<Observable<MbsIncentiveAssignationStageDto>> {
	constructor(private incentiveAssignationStageResourceService: MbsIncentiveAssignationStageResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveAssignationStageResourceService.getIncentiveAssignationStageUsingGET(+id);
	}
}