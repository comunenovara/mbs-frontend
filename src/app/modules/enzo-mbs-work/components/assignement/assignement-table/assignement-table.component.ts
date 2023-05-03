import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { StalEvent } from "@stal/eventer";
import { MbsAssignementDto, MbsAssignementResourceService, MbsProjectDto, MbsProjectResourceService, MbsRoleDto, MbsRoleResourceService, MbsWorkCategoryDto, MbsWorkCategoryResourceService } from '@mbs-work';

import { EnzoAssignementDialogComponent } from '../assignement-dialog/assignement-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EngeAppCommonService, EngeAppGenericPageComponent } from '@enge/common-app';

@Component({
    selector: 'assignement-table',
    templateUrl: 'assignement-table.component.html',
    styleUrls: ['assignement-table.component.scss']
})

export class AssignementTableComponent extends EngeAppGenericPageComponent {
    @Input() projectDto: MbsProjectDto;

    constructor(
        eacs: EngeAppCommonService,
        private dialogService: DialogService,
        private workCategoryResourceService: MbsWorkCategoryResourceService,
		private roleResourceService: MbsRoleResourceService,
		private assignementResourceService: MbsAssignementResourceService,
    ) { super(eacs); }

    override onLoad() {
		this.loadSidecar();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "project") this.reloadPage();
		if(event.data === "assignement") this.reloadPage();
	}

	override async reloadPage() {
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
			if(assignement.roleId === undefined  || assignement.roleId === null) {
				continue;
			}

			if(this.assignements[assignement.roleId] === undefined) {
				this.assignements[assignement.roleId] = {}
			}

			if(assignement.role.haveWorkCategory) {
				if(assignement.workCategoryId === undefined || assignement.workCategoryId === null) {
					continue;
				}
				this.assignements[assignement.roleId][assignement.workCategoryId] = assignement;
			} else {
				this.assignements[assignement.roleId] = assignement;
			}


			
		}
	}

    createNewAssignementsComplex(project: MbsProjectDto, role: MbsRoleDto, workCategory: MbsWorkCategoryDto | undefined = undefined) {
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
		this.eacs.eventer.launchReloadContent("assignement");
	}



}