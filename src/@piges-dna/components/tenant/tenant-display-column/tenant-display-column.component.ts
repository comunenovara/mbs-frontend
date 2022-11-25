import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'piges-tenant-display-column',
	templateUrl: './tenant-display-column.component.html',
	styleUrls: ['./tenant-display-column.component.scss']
})
export class PigesTenantDisplayColumnComponent {

	@Input() dc: string[];
    @Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}