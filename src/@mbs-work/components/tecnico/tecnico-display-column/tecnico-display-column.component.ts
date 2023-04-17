import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-tecnico-display-column',
	templateUrl: './tecnico-display-column.component.html',
	styleUrls: ['./tecnico-display-column.component.scss']
})
export class MbsTecnicoDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}