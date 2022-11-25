import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TabManagerService } from '../tabler/services/tab-manager.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        private tabManagerService: TabManagerService,
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.tabManagerService.start();
    }
}
