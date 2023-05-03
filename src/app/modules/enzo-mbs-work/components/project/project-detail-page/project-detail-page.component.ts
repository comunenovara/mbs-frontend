import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent, EngeAppCommonService } from "@enge/common-app";

import { MbsAssignementDto, MbsAssignementResourceService, MbsProjectDto, MbsProjectResourceService, MbsRoleDto, MbsRoleResourceService, MbsWorkCategoryDto, MbsWorkCategoryResourceService} from '@mbs-work';
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
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsProjectResourceService,
		private assignementResourceService: MbsAssignementResourceService,
	) { super(eacs); }

	projectDto: MbsProjectDto;

	override onLoad() {
		this.projectDto = this.eacs.route.snapshot.data['project'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "project") this.reloadPage();
		if(event.data === "assignement") this.reloadPage();
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
			label: "Edit",
			icon: "pi pi-pencil",
			class: "p-button-sm p-button-outlined",
			command: (e: any) => {
				const ref = this.dialogService.open(EnzoAssignementDialogComponent, {
					data: { assignement: { ...e } },
					header: 'Update assignement',
					width: '70%'
				});
			},
			childs: [
				{
					label: "Delete",
					icon: "pi pi-trash",
					command: async (e: any) => {
						await lastValueFrom(this.assignementResourceService.deleteAssignementUsingDELETE(e.item.data.id));
						this.eacs.eventer.launchReloadContent("assignement");
					}
				}
			]
		}
	];
	protected assignementListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected assignementCount: number;

}



