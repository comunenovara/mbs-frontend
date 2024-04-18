import { Component, Input, OnInit } from '@angular/core';
import { MbsIncentiveRoleAssignationDto } from '../../../class/incentive-role-assignation-dto.class';

@Component({
	selector: 'mbs-incentive-role-assignation-detail-box',
	templateUrl: './incentive-role-assignation-detail-box.component.html',
	styleUrls: ['./incentive-role-assignation-detail-box.component.scss']
})
export class MbsIncentiveRoleAssignationDetailBoxComponent {

	@Input()
	incentiveRoleAssignation: MbsIncentiveRoleAssignationDto;

	constructor( ) { }
}