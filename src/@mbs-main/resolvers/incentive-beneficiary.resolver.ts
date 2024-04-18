import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MbsIncentiveBeneficiaryDto } from '../class/incentive-beneficiary-dto.class';
import { MbsIncentiveBeneficiaryResourceService } from '../services/incentive-beneficiary.service';

@Injectable()
export class MbsIncentiveBeneficiaryResolver implements Resolve<Observable<MbsIncentiveBeneficiaryDto>> {
	constructor(private incentiveBeneficiaryResourceService: MbsIncentiveBeneficiaryResourceService) { }

	resolve(route: ActivatedRouteSnapshot) {
		var id = route.paramMap.get('id');
		if(id === null) throw new Error('Not valid Id');
		return this.incentiveBeneficiaryResourceService.getIncentiveBeneficiaryUsingGET(+id);
	}
}