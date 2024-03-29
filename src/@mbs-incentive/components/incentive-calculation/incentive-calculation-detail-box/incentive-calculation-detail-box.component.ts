import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveCalculationDto } from '../../../class/incentive-calculation-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-detail-box',
	templateUrl: './incentive-calculation-detail-box.component.html',
	styleUrls: ['./incentive-calculation-detail-box.component.scss']
})
export class MbsIncentiveCalculationDetailBoxComponent {

	@Input()
	incentiveCalculation: MbsIncentiveCalculationDto;

	constructor( ) { }
}