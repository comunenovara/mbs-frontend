import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveRegulationValueDto } from '../../../class/incentive-regulation-value-dto.class';

@Component({
	selector: 'mbs-incentive-regulation-value-detail-box',
	templateUrl: './incentive-regulation-value-detail-box.component.html',
	styleUrls: ['./incentive-regulation-value-detail-box.component.scss']
})
export class MbsIncentiveRegulationValueDetailBoxComponent {

	@Input()
	incentiveRegulationValue: MbsIncentiveRegulationValueDto;

	constructor( ) { }
}