import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-governative-project-display-column',
	templateUrl: './governative-project-display-column.component.html',
	styleUrls: ['./governative-project-display-column.component.scss']
})
export class MbsGovernativeProjectDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}