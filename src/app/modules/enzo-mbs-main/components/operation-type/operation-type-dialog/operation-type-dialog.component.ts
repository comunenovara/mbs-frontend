import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
	selector: 'operation-type-dialog',
	templateUrl: 'operation-type-dialog.component.html'
})

export class EnzoOperationTypeDialogComponent {
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