import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsCompanyDto } from '../class/company-dto.class';
import { MbsCompanyResourceService } from '../services/company.service';

@Injectable()
export class MbsCompanyResolver implements Resolve<Observable<MbsCompanyDto>> {
	constructor(private companyResourceService: MbsCompanyResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.companyResourceService.getCompanyUsingGET(+id);
	}
}