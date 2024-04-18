import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-regulation-value-display-column',
	templateUrl: './incentive-regulation-value-display-column.component.html',
	styleUrls: ['./incentive-regulation-value-display-column.component.scss']
})
export class MbsIncentiveRegulationValueDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}