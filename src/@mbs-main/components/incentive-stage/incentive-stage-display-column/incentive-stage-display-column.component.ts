import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-stage-display-column',
	templateUrl: './incentive-stage-display-column.component.html',
	styleUrls: ['./incentive-stage-display-column.component.scss']
})
export class MbsIncentiveStageDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}