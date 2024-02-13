import { Component, Input, OnInit } from '@angular/core';
import { MbsRoleValueDto } from '../../../class/role-value-dto.class';

@Component({
	selector: 'mbs-role-value-detail-box',
	templateUrl: './role-value-detail-box.component.html',
	styleUrls: ['./role-value-detail-box.component.scss']
})
export class MbsRoleValueDetailBoxComponent {

	@Input()
	roleValue: MbsRoleValueDto;

	constructor( ) { }
}