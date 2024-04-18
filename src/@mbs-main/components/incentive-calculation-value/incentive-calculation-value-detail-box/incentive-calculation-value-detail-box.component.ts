import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveCalculationValueDto } from '../../../class/incentive-calculation-value-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-value-detail-box',
	templateUrl: './incentive-calculation-value-detail-box.component.html',
	styleUrls: ['./incentive-calculation-value-detail-box.component.scss']
})
export class MbsIncentiveCalculationValueDetailBoxComponent {

	@Input()
	incentiveCalculationValue: MbsIncentiveCalculationValueDto;

	constructor( ) { }
}