import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-role-assignation-display-column',
	templateUrl: './incentive-role-assignation-display-column.component.html',
	styleUrls: ['./incentive-role-assignation-display-column.component.scss']
})
export class MbsIncentiveRoleAssignationDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}