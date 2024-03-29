import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-governative-project-and-procurement-lot-display-column',
	templateUrl: './governative-project-and-procurement-lot-display-column.component.html',
	styleUrls: ['./governative-project-and-procurement-lot-display-column.component.scss']
})
export class MbsGovernativeProjectAndProcurementLotDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}