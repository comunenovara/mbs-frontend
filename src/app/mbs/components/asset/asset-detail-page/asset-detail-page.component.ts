import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'asset-detail-page.component.html',
    styleUrls: ['asset-detail-page.component.scss']
})

export class AssetDetailPageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
    ) { }

    id: number | undefined;

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
    }
}