import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-calculation-value-display-column',
	templateUrl: './incentive-calculation-value-display-column.component.html',
	styleUrls: ['./incentive-calculation-value-display-column.component.scss']
})
export class MbsIncentiveCalculationValueDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}