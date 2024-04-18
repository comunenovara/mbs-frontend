import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-calculation-factor-display-column',
	templateUrl: './incentive-calculation-factor-display-column.component.html',
	styleUrls: ['./incentive-calculation-factor-display-column.component.scss']
})
export class MbsIncentiveCalculationFactorDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}