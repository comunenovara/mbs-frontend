import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-role-value-display-column',
	templateUrl: './incentive-role-value-display-column.component.html',
	styleUrls: ['./incentive-role-value-display-column.component.scss']
})
export class MbsIncentiveRoleValueDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}