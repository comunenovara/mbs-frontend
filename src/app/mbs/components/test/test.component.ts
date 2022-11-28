import { Component, OnInit } from '@angular/core';
import { TabManagerService } from '@tabler/services/tab-manager.service';

@Component({
    templateUrl: 'test.component.html'
})

export class MbsTestComponent implements OnInit {
    constructor(
        public tabManagerService: TabManagerService,
    ) { }

    ngOnInit() { }
}