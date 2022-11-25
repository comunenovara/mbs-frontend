import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'piges-config-display-column',
	templateUrl: './config-display-column.component.html',
	styleUrls: ['./config-display-column.component.scss']
})
export class PigesConfigDisplayColumnComponent {

	@Input() dc: string[];
    @Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}