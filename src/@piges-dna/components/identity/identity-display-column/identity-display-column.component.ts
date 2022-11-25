import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'piges-identity-display-column',
	templateUrl: './identity-display-column.component.html',
	styleUrls: ['./identity-display-column.component.scss']
})
export class PigesIdentityDisplayColumnComponent {

	@Input() dc: string[];
    @Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}