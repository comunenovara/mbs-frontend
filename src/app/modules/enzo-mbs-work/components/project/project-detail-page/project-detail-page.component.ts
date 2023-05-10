import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsProjectDto, MbsProjectResourceService} from '@mbs-work';
import { EnzoProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { EnzoAssignementDialogComponent } from "../../assignement/assignement-dialog/assignement-dialog.component";

@Component({
	selector: 'enzo-project-detail-page',
	templateUrl: './project-detail-page.component.html',
	styleUrls: ['./project-detail-page.component.scss']
})
export class EnzoProjectDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsProjectResourceService,
	) { super(eacs, route); }

	projectDto: MbsProjectDto;

	override onLoad() {
		this.projectDto = this.route.snapshot.data['project'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "project") this.reloadPage();
	}

	override async reloadPage() {
		this.projectDto = await lastValueFrom(this.resourceService.getProjectUsingGET(this.id));
	}

	editProject(project: MbsProjectDto) {
		const ref = this.dialogService.open(EnzoProjectDialogComponent, {
			data: { project: project },
			header: 'Update project',
			width: '70%'
		});
	}

	async deleteProject(project: MbsProjectDto) {
		if(project.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteProjectUsingDELETE(project.id));
	}

	createNewAssignement(projectDto: MbsProjectDto) {
		this.dialogService.open(EnzoAssignementDialogComponent, {
			header: 'Create Assignement',
			width: '70%',
			data: {
				project: projectDto
			}
		});
	}

	protected assignementTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../assignement/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected assignementListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected assignementCount: number;

}



