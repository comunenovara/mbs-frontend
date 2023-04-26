import { Component, Input, OnInit } from '@angular/core';
import { MbsRoleDto } from '../../../class/role-dto.class';

@Component({
	selector: 'mbs-role-detail-box',
	templateUrl: './role-detail-box.component.html',
	styleUrls: ['./role-detail-box.component.scss']
})
export class MbsRoleDetailBoxComponent {

	@Input()
	role: MbsRoleDto;

	constructor( ) { }
}