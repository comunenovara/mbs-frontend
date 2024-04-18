import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-dossier-type-display-column',
	templateUrl: './dossier-type-display-column.component.html',
	styleUrls: ['./dossier-type-display-column.component.scss']
})
export class MbsDossierTypeDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}