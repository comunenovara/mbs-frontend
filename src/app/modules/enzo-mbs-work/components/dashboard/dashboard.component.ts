import { Component } from '@angular/core';
import { StalEvent } from "@stal/eventer";
import { EngeAppGenericPageComponent, EngeAppCommonService } from '@enge/common-app';
import { MbsProjectDto, MbsProjectResourceService } from '@mbs-work';
import { lastValueFrom } from 'rxjs';

@Component({
    templateUrl: 'dashboard.component.html',
	styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent extends EngeAppGenericPageComponent {
    constructor(
        eacs: EngeAppCommonService,
        private projectResourceService: MbsProjectResourceService,
    ) { super(eacs); }

    override onLoad() {
        this.loadContent();
    }

    protected override reloadFromEvent(event: StalEvent) {
        if (event.data === "project") this.reloadPage();
        if (event.data === "assignement") this.reloadPage();
    }

    override async reloadPage() {
        this.loadContent();
    }

    projectDtos: MbsProjectDto[];
    async loadContent() {
        this.projectDtos = await lastValueFrom(this.projectResourceService.getAllProjectsUsingGET({}));
    }
}