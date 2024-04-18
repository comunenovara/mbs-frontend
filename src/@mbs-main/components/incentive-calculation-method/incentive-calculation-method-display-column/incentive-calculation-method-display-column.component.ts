import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-calculation-method-display-column',
	templateUrl: './incentive-calculation-method-display-column.component.html',
	styleUrls: ['./incentive-calculation-method-display-column.component.scss']
})
export class MbsIncentiveCalculationMethodDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}