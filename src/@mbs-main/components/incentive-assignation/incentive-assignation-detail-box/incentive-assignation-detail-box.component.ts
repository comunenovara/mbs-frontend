import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveAssignationDto } from '../../../class/incentive-assignation-dto.class';

@Component({
	selector: 'mbs-incentive-assignation-detail-box',
	templateUrl: './incentive-assignation-detail-box.component.html',
	styleUrls: ['./incentive-assignation-detail-box.component.scss']
})
export class MbsIncentiveAssignationDetailBoxComponent {

	@Input()
	incentiveAssignation: MbsIncentiveAssignationDto;

	constructor( ) { }
}