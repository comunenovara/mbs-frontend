import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsBeneficiaryDto } from '../class/beneficiary-dto.class';
import { MbsBeneficiaryResourceService } from '../services/beneficiary.service';

@Injectable()
export class MbsBeneficiaryResolver implements Resolve<Observable<MbsBeneficiaryDto>> {
	constructor(private beneficiaryResourceService: MbsBeneficiaryResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.beneficiaryResourceService.getBeneficiaryUsingGET(+id);
	}
}