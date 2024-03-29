import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveAssignationRoleDto } from '../../../class/incentive-assignation-role-dto.class';

@Component({
	selector: 'mbs-incentive-assignation-role-detail-box',
	templateUrl: './incentive-assignation-role-detail-box.component.html',
	styleUrls: ['./incentive-assignation-role-detail-box.component.scss']
})
export class MbsIncentiveAssignationRoleDetailBoxComponent {

	@Input()
	incentiveAssignationRole: MbsIncentiveAssignationRoleDto;

	constructor( ) { }
}