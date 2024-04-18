import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveCalculationMethodDto } from '../../../class/incentive-calculation-method-dto.class';

@Component({
	selector: 'mbs-incentive-calculation-method-detail-box',
	templateUrl: './incentive-calculation-method-detail-box.component.html',
	styleUrls: ['./incentive-calculation-method-detail-box.component.scss']
})
export class MbsIncentiveCalculationMethodDetailBoxComponent {

	@Input()
	incentiveCalculationMethod: MbsIncentiveCalculationMethodDto;

	constructor( ) { }
}