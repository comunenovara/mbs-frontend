import { Component, OnInit } from '@angular/core';
import { MbsOperationTypeDto } from '@mbs-main';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'operation-type-dialog',
    templateUrl: 'operation-type-dialog.component.html'
})

export class EnzoOperationTypeDialogComponent {
    operationType: MbsOperationTypeDto;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.operationType = this.config.data;
    }

}