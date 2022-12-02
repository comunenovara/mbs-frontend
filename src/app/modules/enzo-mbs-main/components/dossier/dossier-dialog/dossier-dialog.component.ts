import { Component, OnInit } from '@angular/core';
import { MbsDossierDto } from '@mbs-main';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'dossier-dialog',
    templateUrl: 'dossier-dialog.component.html'
})

export class EnzoDossierDialogComponent {
    dossier: MbsDossierDto;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.dossier = this.config.data;
    }

}