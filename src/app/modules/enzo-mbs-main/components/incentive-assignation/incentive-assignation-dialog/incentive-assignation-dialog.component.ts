import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'incentive-assignation-dialog',
	templateUrl: 'incentive-assignation-dialog.component.html'
})

export class EnzoIncentiveAssignationDialogComponent {
	protected data: any = { };

	constructor(
		public ref: DynamicDialogRef,
		public config: DynamicDialogConfig
	) {
		if(this.config.data !== undefined) {
			this.data = this.config.data;
		}
	}

}