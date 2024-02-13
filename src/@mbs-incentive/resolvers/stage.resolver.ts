import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsStageDto } from '../class/stage-dto.class';
import { MbsStageResourceService } from '../services/stage.service';

@Injectable()
export class MbsStageResolver implements Resolve<Observable<MbsStageDto>> {
	constructor(private stageResourceService: MbsStageResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.stageResourceService.getStageUsingGET(+id);
	}
}