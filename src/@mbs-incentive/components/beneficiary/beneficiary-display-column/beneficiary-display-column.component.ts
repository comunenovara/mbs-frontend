import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-beneficiary-display-column',
	templateUrl: './beneficiary-display-column.component.html',
	styleUrls: ['./beneficiary-display-column.component.scss']
})
export class MbsBeneficiaryDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}