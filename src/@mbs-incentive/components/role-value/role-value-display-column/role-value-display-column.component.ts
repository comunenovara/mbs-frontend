import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-role-value-display-column',
	templateUrl: './role-value-display-column.component.html',
	styleUrls: ['./role-value-display-column.component.scss']
})
export class MbsRoleValueDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}