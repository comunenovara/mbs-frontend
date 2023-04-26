import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsWorkCategoryDto } from '../class/work-category-dto.class';
import { MbsWorkCategoryResourceService } from '../services/work-category.service';

@Injectable()
export class MbsWorkCategoryResolver implements Resolve<Observable<MbsWorkCategoryDto>> {
	constructor(private workCategoryResourceService: MbsWorkCategoryResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.workCategoryResourceService.getWorkCategoryUsingGET(+id);
	}
}