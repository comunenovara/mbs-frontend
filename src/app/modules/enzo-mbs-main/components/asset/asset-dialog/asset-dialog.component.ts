import { Component, OnInit } from '@angular/core';
import { MbsAssetDto } from '@mbs-main';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'asset-dialog',
    templateUrl: 'asset-dialog.component.html'
})

export class EnzoAssetDialogComponent {
    asset: MbsAssetDto;

    constructor(
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {
        this.asset = this.config.data;
    }

}