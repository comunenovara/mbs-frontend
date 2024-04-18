import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveRoleDto } from '../../../class/incentive-role-dto.class';

@Component({
	selector: 'mbs-incentive-role-detail-box',
	templateUrl: './incentive-role-detail-box.component.html',
	styleUrls: ['./incentive-role-detail-box.component.scss']
})
export class MbsIncentiveRoleDetailBoxComponent {

	@Input()
	incentiveRole: MbsIncentiveRoleDto;

	constructor( ) { }
}