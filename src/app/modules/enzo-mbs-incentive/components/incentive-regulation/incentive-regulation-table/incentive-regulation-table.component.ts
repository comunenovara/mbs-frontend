import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { StalEvent } from "@stal/eventer";
import { EngeAppCommonService, EngeAppGenericPageComponent } from '@enge/common-app';
import { MbsIncentiveRegulationDto, MbsRoleDto, MbsRoleResourceService, MbsRoleValueDto, MbsRoleValueResourceService, MbsStageDto, MbsStageResourceService } from '@mbs-incentive';
import { EnzoRoleValueDialogComponent } from '../../role-value/role-value-dialog/role-value-dialog.component';

@Component({
	selector: 'mbs-ir-table',
	templateUrl: 'incentive-regulation-table.component.html',
	styleUrls: ['./incentive-regulation-table.component.scss']
})

export class MbsIncentireRegulationComponent extends EngeAppGenericPageComponent {
	@Input() regulation: MbsIncentiveRegulationDto;

	constructor(
		eacs: EngeAppCommonService,
		private stageResourceService: MbsStageResourceService,
		private roleResourceService: MbsRoleResourceService,
		private roleValueResourceService: MbsRoleValueResourceService,
		private dialogService: DialogService,
	) { super(eacs); }

	override onLoad() {
		this.loadTable();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "role") this.reloadPage();
		if(event.data === "stage") this.reloadPage();
		if(event.data === "roleValue") this.reloadPage();
	}

	override async reloadPage() {
		this.loadTable();
	}

	protected stages: MbsStageDto[] = [];
	protected roles: MbsRoleDto[] = [];

	protected valueMatrix: any = {};

	async loadTable() {
		this.stages = await lastValueFrom(this.stageResourceService.getAllStagesUsingGET({
			regulationIdEquals: this.regulation.id
		}));
		this.roles = await lastValueFrom(this.roleResourceService.getAllRolesUsingGET({
			regulationIdEquals: this.regulation.id
		}));
		
		let values: MbsRoleValueDto[] = await lastValueFrom(this.roleValueResourceService.getAllRoleValuesUsingGET({
			'role.regulationIdEquals': this.regulation.id
		}));

		this.valueMatrix = {};
		for(let value of values) {
			if(value.roleId === undefined || value.roleId === null) continue;
			if(value.stageId === undefined || value.stageId === null) continue;

			if(this.valueMatrix[value.roleId] === undefined) this.valueMatrix[value.roleId] = {};
			if(this.valueMatrix[value.roleId][value.stageId] === undefined) this.valueMatrix[value.roleId][value.stageId] = {};

			this.valueMatrix[value.roleId][value.stageId] = value;
		}
	}

	createNewRoleValue(stage: MbsStageDto, role: MbsRoleDto) {
		this.dialogService.open(EnzoRoleValueDialogComponent, {
			header: 'Aggiungi valore',
			width: '70%',
			data: {
				stage: stage,
				role: role
			}
		});
	}

	updateRoleValue(stage: MbsStageDto, role: MbsRoleDto, roleValue: MbsRoleValueDto) {
		this.dialogService.open(EnzoRoleValueDialogComponent, {
			header: 'Aggiungi valore',
			width: '70%',
			data: {
				stage: stage,
				role: role,
				roleValue: roleValue
			}
		});
	}

	async deleteRoleValue(roleValue: MbsRoleValueDto) {
		if(roleValue.id === undefined) return;
		await lastValueFrom(this.roleValueResourceService.deleteRoleValueUsingDELETE(roleValue.id));
		this.eacs.eventer.launchReloadContent("roleValue");
	}
}