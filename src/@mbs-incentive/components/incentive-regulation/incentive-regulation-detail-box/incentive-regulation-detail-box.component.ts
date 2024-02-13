import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveRegulationDto } from '../../../class/incentive-regulation-dto.class';

@Component({
	selector: 'mbs-incentive-regulation-detail-box',
	templateUrl: './incentive-regulation-detail-box.component.html',
	styleUrls: ['./incentive-regulation-detail-box.component.scss']
})
export class MbsIncentiveRegulationDetailBoxComponent {

	@Input()
	incentiveRegulation: MbsIncentiveRegulationDto;

	constructor( ) { }
}