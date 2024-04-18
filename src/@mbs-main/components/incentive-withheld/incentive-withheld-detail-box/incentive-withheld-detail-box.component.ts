import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveWithheldDto } from '../../../class/incentive-withheld-dto.class';

@Component({
	selector: 'mbs-incentive-withheld-detail-box',
	templateUrl: './incentive-withheld-detail-box.component.html',
	styleUrls: ['./incentive-withheld-detail-box.component.scss']
})
export class MbsIncentiveWithheldDetailBoxComponent {

	@Input()
	incentiveWithheld: MbsIncentiveWithheldDto;

	constructor( ) { }
}