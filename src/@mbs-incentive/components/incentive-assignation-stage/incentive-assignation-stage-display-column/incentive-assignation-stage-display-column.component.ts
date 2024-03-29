import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'mbs-incentive-assignation-stage-display-column',
	templateUrl: './incentive-assignation-stage-display-column.component.html',
	styleUrls: ['./incentive-assignation-stage-display-column.component.scss']
})
export class MbsIncentiveAssignationStageDisplayColumnComponent {

	@Input() dc: string[];
	@Output() dcChange = new EventEmitter<string[]>();

	constructor() { }

	cambia(dc: string[]) {
		this.dc = dc;
		this.dcChange.emit(this.dc);
	}
}