import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppGenericDetailPageComponent } from "@enge/common-app";

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
		route: ActivatedRoute,
		router: Router,
		eventer: StalEventerService,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsProjectResourceService,
		private workCategoryResourceService: MbsWorkCategoryResourceService,
		private roleResourceService: MbsRoleResourceService,
		private assignementResourceService: MbsAssignementResourceService,
	) { super(route, router, eventer); }

	projectDto: MbsProjectDto;

	override onLoad() {
		this.projectDto = this.route.snapshot.data['project'];
		this.loadSidecar();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "project") this.reloadPage();
		if(event.data === "assignement") this.reloadPage();
	}

	override async reloadPage() {
		this.projectDto = await lastValueFrom(this.resourceService.getProjectUsingGET(this.id));
		this.loadSidecar();
	}

	workCategoryDtos: MbsWorkCategoryDto[];
	roleDtos: MbsRoleDto[];
	
	assignements: any = {};

	async loadSidecar() {
		this.workCategoryDtos = await lastValueFrom(this.workCategoryResourceService.getAllWorkCategoriesUsingGET({}));
		this.roleDtos = await lastValueFrom(this.roleResourceService.getAllRolesUsingGET({}));
		
		let  assignementDtos = await lastValueFrom(this.assignementResourceService.getAllAssignementsUsingGET({
			projectIdEquals: this.projectDto.id
		}));

		this.assignements = {};
		for(let assignement of assignementDtos) {
			if(assignement.workCategoryId === undefined || assignement.workCategoryId === null || assignement.roleId === undefined  || assignement.roleId === null) {
				continue;
			}

			if(this.assignements[assignement.workCategoryId] === undefined) {
				this.assignements[assignement.workCategoryId] = {}
			}

			this.assignements[assignement.workCategoryId][assignement.roleId] = assignement;
		}

		/*
		this.incaricoDtos = await lastValueFrom(this.incaricoResourceService.getAllIncaricosUsingGET({}));
		this.faseDtos = await lastValueFrom(this.faseResourceService.getAllFasesUsingGET({}));

		let nominaDtos = await lastValueFrom(this.nominaResourceService.getAllNominasUsingGET({
			progettoIdEquals: this.progettoDto.id
		}));

		this.nomine = {};
		for(let nomina of nominaDtos) {
			if(nomina.faseId === undefined || nomina.faseId === null || nomina.incaricoId === undefined  || nomina.incaricoId === null) {
				continue;
			}

			if(this.nomine[nomina.faseId] === undefined) {
				this.nomine[nomina.faseId] = {}
			}

			this.nomine[nomina.faseId][nomina.incaricoId] = nomina;
		}
		*/
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
						this.eventer.launchReloadContent("assignement");
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

	createNewAssignementsComplex(project: MbsProjectDto, workCategory: MbsWorkCategoryDto, role: MbsRoleDto) {
		this.dialogService.open(EnzoAssignementDialogComponent, {
			header: 'Create Nomina',
			width: '70%',
			data: {
				project: project,
				workCategory: workCategory,
				role: role
			}
		});
	}

	async deleteAssignement(assignement: MbsAssignementDto) {
		if(assignement.id === undefined) return;
		await lastValueFrom(this.assignementResourceService.deleteAssignementUsingDELETE(assignement.id));
		this.reloadPage();
	}


}



