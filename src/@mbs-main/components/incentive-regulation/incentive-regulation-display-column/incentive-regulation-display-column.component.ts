import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-regulation-display-column',
	templateUrl: './incentive-regulation-display-column.component.html',
	styleUrls: ['./incentive-regulation-display-column.component.scss']
})
export class MbsIncentiveRegulationDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}