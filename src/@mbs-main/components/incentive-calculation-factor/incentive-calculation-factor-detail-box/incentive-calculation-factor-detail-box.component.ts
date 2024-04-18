import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveCalculationFactorDto } from '../../../class/incentive-calculation-factor-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-factor-detail-box',
	templateUrl: './incentive-calculation-factor-detail-box.component.html',
	styleUrls: ['./incentive-calculation-factor-detail-box.component.scss']
})
export class MbsIncentiveCalculationFactorDetailBoxComponent {

	@Input()
	incentiveCalculationFactor: MbsIncentiveCalculationFactorDto;

	constructor( ) { }
}