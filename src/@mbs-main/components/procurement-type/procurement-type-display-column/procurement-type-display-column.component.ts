import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-procurement-type-display-column',
	templateUrl: './procurement-type-display-column.component.html',
	styleUrls: ['./procurement-type-display-column.component.scss']
})
export class MbsProcurementTypeDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}