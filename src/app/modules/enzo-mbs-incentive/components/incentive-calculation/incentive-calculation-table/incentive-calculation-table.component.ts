import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

import { DialogService } from 'primeng/dynamicdialog';

import { StalEventerService, StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { MbsIncentiveAssignationRoleDto, MbsIncentiveAssignationRoleResourceService, MbsIncentiveAssignationStageDto, MbsIncentiveAssignationStageResourceService, MbsIncentiveCalculationDto, MbsIncentiveCalculationResourceService, MbsIncentiveRoleValueDto, MbsIncentiveRoleValueResourceService, MbsRoleDto, MbsRoleResourceService, MbsRoleValueDto, MbsRoleValueResourceService, MbsStageDto, MbsStageResourceService } from '@mbs-incentive';
import { EnzoIncentiveCalculationDialogComponent } from '../incentive-calculation-dialog/incentive-calculation-dialog.component';
import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from '@enge/common-app';
import { EnzoIncentiveRoleValueDialogComponent } from '../../incentive-role-value/incentive-role-value-dialog/incentive-role-value-dialog.component';
import { EnzoIncentiveAssignationStageDialogComponent } from '../../incentive-assignation-stage/incentive-assignation-stage-dialog/incentive-assignation-stage-dialog.component';

@Component({
	selector: 'enzo-incentive-calculation-table',
	templateUrl: './incentive-calculation-table.component.html',
	styleUrls: ['./incentive-calculation-table.component.scss']
})
export class EnzoIncentiveCalculationTableComponent extends EngeAppGenericDetailPageComponent {
	@Input() incentiveCalculation: MbsIncentiveCalculationDto;

	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		private dialogService: DialogService,
		//public tabManagerService: TabManagerService,
		private stageResourceService: MbsStageResourceService,
		private roleValueResourceService: MbsRoleValueResourceService,
		private incentiveAssignationRoleResourceService: MbsIncentiveAssignationRoleResourceService,
		private incentiveRoleValueResourceService: MbsIncentiveRoleValueResourceService,
		private incentiveAssignationStageResourceService: MbsIncentiveAssignationStageResourceService,
		private roleResourceService: MbsRoleResourceService,
		private incentiveCalculationResourceService: MbsIncentiveCalculationResourceService,
	) { super(eacs, route); }

	
	override onLoad() {
		this.loadTable();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRoleValue") this.reloadPage();
	}

	override async reloadPage() {
		this.loadTable();
	}

	stages: MbsStageDto[];

	rolesByStage: any = {};
	assignationsByRole: any = {};
	incetiveRoleValueByRoleValue: any = {};
	assignationStagesByRoleValue: any = {};


	async loadTable() {
		this.stages = await lastValueFrom(this.stageResourceService.getAllStagesUsingGET({"regulationIdEquals": this.incentiveCalculation.regulationId}));

		this.rolesByStage = {};
		let roleValues = await lastValueFrom(this.roleValueResourceService.getAllRoleValuesUsingGET({"stage.regulationIdEquals": this.incentiveCalculation.regulationId}));
		for(let roleValue of roleValues) {
			if(!roleValue.stageId) continue
			if(!roleValue.role) continue

			if(!this.rolesByStage[roleValue.stageId])
				this.rolesByStage[roleValue.stageId] = []

			this.rolesByStage[roleValue.stageId].push(roleValue);
		}


		this.assignationsByRole = {};
		let incentiveAssignationRoles: MbsIncentiveAssignationRoleDto[] = await lastValueFrom(this.incentiveAssignationRoleResourceService.getAllIncentiveAssignationRolesUsingGET({"procurementLotIdEquals": this.incentiveCalculation.procurementId}));
		for(let incentiveAssignationRole of incentiveAssignationRoles) {
			if(!incentiveAssignationRole.assignationRoleId) continue

			if(!this.assignationsByRole[incentiveAssignationRole.assignationRoleId])
				this.assignationsByRole[incentiveAssignationRole.assignationRoleId] = []

			this.assignationsByRole[incentiveAssignationRole.assignationRoleId].push(incentiveAssignationRole);
		}


		this.incetiveRoleValueByRoleValue = {};
		let incentiveRoleValues: MbsIncentiveRoleValueDto[] = await lastValueFrom(this.incentiveRoleValueResourceService.getAllIncentiveRoleValuesUsingGET({"incentiveCalculationIdEquals": this.incentiveCalculation.id}));
		for(let incentiveRoleValue of incentiveRoleValues) {
			if(!incentiveRoleValue.roleValueId) continue

			if(!this.incetiveRoleValueByRoleValue[incentiveRoleValue.roleValueId])
				this.incetiveRoleValueByRoleValue[incentiveRoleValue.roleValueId] = []

			this.incetiveRoleValueByRoleValue[incentiveRoleValue.roleValueId].push(incentiveRoleValue);
		}


		this.assignationStagesByRoleValue = {};
		let incentiveAssignationStages: MbsIncentiveAssignationStageDto[] = await lastValueFrom(this.incentiveAssignationStageResourceService.getAllIncentiveAssignationStagesUsingGET({"assignationRoleValue.incentiveCalculationIdEquals": this.incentiveCalculation.id}));
		for(let incentiveAssignationStage of incentiveAssignationStages) {
			if(!incentiveAssignationStage.assignationRoleValueId) continue

			if(!this.assignationStagesByRoleValue[incentiveAssignationStage.assignationRoleValueId])
				this.assignationStagesByRoleValue[incentiveAssignationStage.assignationRoleValueId] = []

			this.assignationStagesByRoleValue[incentiveAssignationStage.assignationRoleValueId].push(incentiveAssignationStage);
		}


	}



	createNewIncentiveRoleValue(incentiveCalculation: MbsIncentiveCalculationDto, roleValue: MbsRoleValueDto) {
		this.dialogService.open(EnzoIncentiveRoleValueDialogComponent, {
			header: 'Create IncentiveRoleValue',
			width: '70%',
			data: {
				incentiveCalculation: incentiveCalculation,
				roleValue: roleValue
			}
		});
	}

	createNewIncentiveAssignationStage(incentiveAssignationRole: MbsIncentiveAssignationRoleDto, roleValue: MbsRoleValueDto) {
		this.dialogService.open(EnzoIncentiveAssignationStageDialogComponent, {
			header: 'Aggiungi valore',
			width: '70%',
			data: {
				assignationRole: incentiveAssignationRole,
				assignationRoleValue: roleValue
			}
		});
	}
}