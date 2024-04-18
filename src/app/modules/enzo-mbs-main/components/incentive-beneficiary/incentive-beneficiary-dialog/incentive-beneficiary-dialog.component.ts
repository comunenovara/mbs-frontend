import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'incentive-beneficiary-dialog',
	templateUrl: 'incentive-beneficiary-dialog.component.html'
})

export class EnzoIncentiveBeneficiaryDialogComponent {
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