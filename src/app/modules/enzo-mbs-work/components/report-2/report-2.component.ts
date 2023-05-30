import { Component } from '@angular/core';
import { StalEvent } from "@stal/eventer";
import { EngeAppGenericPageComponent, EngeAppCommonService } from '@enge/common-app';
import { MbsEmployeeDto, MbsEmployeeResourceService, MbsProjectDto, MbsProjectResourceService } from '@mbs-work';
import { lastValueFrom } from 'rxjs';

@Component({
    templateUrl: 'report-2.component.html',
	styleUrls: ['report-2.component.scss']
})

export class Report2Component extends EngeAppGenericPageComponent {
    constructor(
        eacs: EngeAppCommonService,
        private projectResourceService: MbsProjectResourceService,
        private employeeResourceService: MbsEmployeeResourceService,
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
    employeeDtos: MbsEmployeeDto[];
    async loadContent() {
        this.projectDtos = await lastValueFrom(this.projectResourceService.getAllProjectsUsingGET({}));
        this.employeeDtos = await lastValueFrom(this.employeeResourceService.getAllEmployeesUsingGET({}));
    }
}