import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-calculation-factor-display-column',
	templateUrl: './calculation-factor-display-column.component.html',
	styleUrls: ['./calculation-factor-display-column.component.scss']
})
export class MbsCalculationFactorDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}