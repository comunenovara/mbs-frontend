import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-calculation-method-display-column',
	templateUrl: './calculation-method-display-column.component.html',
	styleUrls: ['./calculation-method-display-column.component.scss']
})
export class MbsCalculationMethodDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}