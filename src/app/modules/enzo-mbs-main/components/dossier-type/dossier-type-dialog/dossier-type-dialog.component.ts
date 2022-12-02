import { Component, OnInit } from '@angular/core';
import { MbsDossierTypeDto } from '@mbs-main';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'dossier-type-dialog',
    templateUrl: 'dossier-type-dialog.component.html'
})

export class EnzoDossierTypeDialogComponent {
    dossierType: MbsDossierTypeDto;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.dossierType = this.config.data;
    }

}