import { Component, OnInit } from '@angular/core';
import { MbsRelifDto } from '@mbs-main';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'relif-dialog',
    templateUrl: 'relif-dialog.component.html'
})

export class EnzoRelifDialogComponent {
    relif: MbsRelifDto;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.relif = this.config.data;
    }

}