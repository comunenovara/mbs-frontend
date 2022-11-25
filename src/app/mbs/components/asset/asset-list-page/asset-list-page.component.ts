import { Component, OnInit } from '@angular/core';
import { TabManagerService } from 'tabler/services/tab-manager.service';

@Component({
    templateUrl: 'asset-list-page.component.html',
    styleUrls: ['asset-list-page.component.scss']
})

export class AssetListPageComponent implements OnInit {
    constructor(
        public tabManagerService: TabManagerService,
    ) { }

    ngOnInit() { }
}