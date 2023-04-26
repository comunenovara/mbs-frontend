import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsProjectDto } from '../class/project-dto.class';
import { MbsProjectResourceService } from '../services/project.service';

@Injectable()
export class MbsProjectResolver implements Resolve<Observable<MbsProjectDto>> {
	constructor(private projectResourceService: MbsProjectResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.projectResourceService.getProjectUsingGET(+id);
	}
}