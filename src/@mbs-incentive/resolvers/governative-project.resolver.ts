import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsGovernativeProjectDto } from '../class/governative-project-dto.class';
import { MbsGovernativeProjectResourceService } from '../services/governative-project.service';

@Injectable()
export class MbsGovernativeProjectResolver implements Resolve<Observable<MbsGovernativeProjectDto>> {
	constructor(private governativeProjectResourceService: MbsGovernativeProjectResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.governativeProjectResourceService.getGovernativeProjectUsingGET(+id);
	}
}