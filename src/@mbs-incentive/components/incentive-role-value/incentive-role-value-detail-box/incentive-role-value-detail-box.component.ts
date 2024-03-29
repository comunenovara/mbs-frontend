import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveRoleValueDto } from '../../../class/incentive-role-value-dto.class';

@Component({
	selector: 'mbs-incentive-role-value-detail-box',
	templateUrl: './incentive-role-value-detail-box.component.html',
	styleUrls: ['./incentive-role-value-detail-box.component.scss']
})
export class MbsIncentiveRoleValueDetailBoxComponent {

	@Input()
	incentiveRoleValue: MbsIncentiveRoleValueDto;

	constructor( ) { }
}