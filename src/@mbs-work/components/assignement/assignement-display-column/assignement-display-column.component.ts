import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-assignement-display-column',
	templateUrl: './assignement-display-column.component.html',
	styleUrls: ['./assignement-display-column.component.scss']
})
export class MbsAssignementDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}