import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-beneficiary-display-column',
	templateUrl: './incentive-beneficiary-display-column.component.html',
	styleUrls: ['./incentive-beneficiary-display-column.component.scss']
})
export class MbsIncentiveBeneficiaryDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}