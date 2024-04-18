import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-governative-procurement-lot-display-column',
	templateUrl: './governative-procurement-lot-display-column.component.html',
	styleUrls: ['./governative-procurement-lot-display-column.component.scss']
})
export class MbsGovernativeProcurementLotDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}