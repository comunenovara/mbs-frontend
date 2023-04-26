import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-work-category-display-column',
	templateUrl: './work-category-display-column.component.html',
	styleUrls: ['./work-category-display-column.component.scss']
})
export class MbsWorkCategoryDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}