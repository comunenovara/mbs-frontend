import { Component, OnInit } from '@angular/core';
import { MbsOperationDto } from '@mbs-main';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'operation-dialog',
    templateUrl: 'operation-dialog.component.html'
})

export class EnzoOperationDialogComponent {
    operation: MbsOperationDto;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.operation = this.config.data;
    }

}