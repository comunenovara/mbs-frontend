import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'piges-account-display-column',
	templateUrl: './account-display-column.component.html',
	styleUrls: ['./account-display-column.component.scss']
})
export class PigesAccountDisplayColumnComponent {

	@Input() dc: string[];
    @Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}