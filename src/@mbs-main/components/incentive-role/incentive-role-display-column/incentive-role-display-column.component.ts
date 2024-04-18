import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-role-display-column',
	templateUrl: './incentive-role-display-column.component.html',
	styleUrls: ['./incentive-role-display-column.component.scss']
})
export class MbsIncentiveRoleDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}