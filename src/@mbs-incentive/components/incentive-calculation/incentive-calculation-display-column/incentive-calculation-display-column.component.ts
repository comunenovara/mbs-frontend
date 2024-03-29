import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-calculation-display-column',
	templateUrl: './incentive-calculation-display-column.component.html',
	styleUrls: ['./incentive-calculation-display-column.component.scss']
})
export class MbsIncentiveCalculationDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}