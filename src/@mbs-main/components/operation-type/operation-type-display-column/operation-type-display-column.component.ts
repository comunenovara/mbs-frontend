import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-operation-type-display-column',
	templateUrl: './operation-type-display-column.component.html',
	styleUrls: ['./operation-type-display-column.component.scss']
})
export class MbsOperationTypeDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}