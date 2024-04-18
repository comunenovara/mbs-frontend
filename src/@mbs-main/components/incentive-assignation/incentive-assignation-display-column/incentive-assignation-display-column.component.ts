import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-assignation-display-column',
	templateUrl: './incentive-assignation-display-column.component.html',
	styleUrls: ['./incentive-assignation-display-column.component.scss']
})
export class MbsIncentiveAssignationDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}