import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'piges-organization-display-column',
	templateUrl: './organization-display-column.component.html',
	styleUrls: ['./organization-display-column.component.scss']
})
export class PigesOrganizationDisplayColumnComponent {

	@Input() dc: string[];
    @Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}