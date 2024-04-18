import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveBeneficiaryDto } from '../../../class/incentive-beneficiary-dto.class';

@Component({
	selector: 'mbs-incentive-beneficiary-detail-box',
	templateUrl: './incentive-beneficiary-detail-box.component.html',
	styleUrls: ['./incentive-beneficiary-detail-box.component.scss']
})
export class MbsIncentiveBeneficiaryDetailBoxComponent {

	@Input()
	incentiveBeneficiary: MbsIncentiveBeneficiaryDto;

	constructor( ) { }
}