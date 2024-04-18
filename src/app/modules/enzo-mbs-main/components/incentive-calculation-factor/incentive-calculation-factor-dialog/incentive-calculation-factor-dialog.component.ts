import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'incentive-calculation-factor-dialog',
	templateUrl: 'incentive-calculation-factor-dialog.component.html'
})

export class EnzoIncentiveCalculationFactorDialogComponent {
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