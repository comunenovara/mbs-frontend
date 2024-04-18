import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-elaborate-group-display-column',
	templateUrl: './elaborate-group-display-column.component.html',
	styleUrls: ['./elaborate-group-display-column.component.scss']
})
export class MbsElaborateGroupDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}