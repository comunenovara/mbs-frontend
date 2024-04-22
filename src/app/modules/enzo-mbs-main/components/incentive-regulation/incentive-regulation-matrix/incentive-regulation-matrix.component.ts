import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { StalEvent } from "@stal/eventer";
import { EngeAppCommonService, EngeAppGenericPageComponent } from '@enge/common-app';
import { MbsIncentiveRegulationDto, MbsIncentiveRoleDto, MbsIncentiveRoleResourceService, MbsIncentiveRegulationValueDto, MbsIncentiveStageDto, MbsIncentiveStageResourceService, MbsIncentiveRegulationValueResourceService, MbsProcurementTypeDto } from '@mbs-main';
import { EnzoIncentiveRegulationValueDialogComponent } from '../../incentive-regulation-value/incentive-regulation-value-dialog/incentive-regulation-value-dialog.component';

@Component({
	selector: 'enzo-incentive-regulation-matrix',
	templateUrl: 'incentive-regulation-matrix.component.html',
	styleUrls: ['./incentive-regulation-matrix.component.scss']
})

export class EnzoIncentireRegulationMatrixComponent extends EngeAppGenericPageComponent {
	@Input() incentiveRegulation: MbsIncentiveRegulationDto;
	@Input() procurementType: MbsProcurementTypeDto;

	constructor(
		eacs: EngeAppCommonService,
		private incentiveStageResourceService: MbsIncentiveStageResourceService,
		private incentiveRoleResourceService: MbsIncentiveRoleResourceService,
		private incentiveRegulationValueResourceService: MbsIncentiveRegulationValueResourceService,
		private dialogService: DialogService,
	) { super(eacs); }

	override onLoad() {
		this.loadMatrix();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveStage") this.reloadPage();
		if(event.data === "incentiveRole") this.reloadPage();
		if(event.data === "incentiveRegulationValue") this.reloadPage();
	}

	override async reloadPage() {
		this.loadMatrix();
	}

	protected incentiveStages: MbsIncentiveStageDto[] = [];
	protected incentiveRoles: MbsIncentiveRoleDto[] = [];

	protected valueMatrix: any = {};

	async loadMatrix() {
		await new Promise(resolve => setTimeout(resolve, 10));

		this.incentiveStages = await lastValueFrom(this.incentiveStageResourceService.getAllIncentiveStagesUsingGET({
			procurementTypeIdEquals: this.procurementType.id,
			regulationIdEquals: this.incentiveRegulation.id
		}));

		this.incentiveRoles = await lastValueFrom(this.incentiveRoleResourceService.getAllIncentiveRolesUsingGET({
			procurementTypeIdEquals: this.procurementType.id,
			regulationIdEquals: this.incentiveRegulation.id
		}));
		
		this.valueMatrix = {};
		let values: MbsIncentiveRegulationValueDto[] = await lastValueFrom(this.incentiveRegulationValueResourceService.getAllIncentiveRegulationValuesUsingGET({
			'stage.regulationIdEquals': this.incentiveRegulation.id
		}));
		for(let value of values) {
			if(value.roleId === undefined || value.roleId === null) continue;
			if(value.stageId === undefined || value.stageId === null) continue;

			if(this.valueMatrix[value.roleId] === undefined) this.valueMatrix[value.roleId] = {};
			if(this.valueMatrix[value.roleId][value.stageId] === undefined) this.valueMatrix[value.roleId][value.stageId] = {};

			this.valueMatrix[value.roleId][value.stageId] = value;
		}
	}

	createNewRoleValue(incentiveStage: MbsIncentiveStageDto, incentiveRole: MbsIncentiveRoleDto) {
		this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
			header: 'Aggiungi valore',
			width: '70%',
			data: {
				stage: incentiveStage,
				role: incentiveRole
			}
		});
	}

	updateRoleValue(incentiveStage: MbsIncentiveStageDto, incentiveRole: MbsIncentiveRoleDto, incentiveRegulationValue: MbsIncentiveRegulationValueDto) {
		this.dialogService.open(EnzoIncentiveRegulationValueDialogComponent, {
			header: 'Modifica valore',
			width: '70%',
			data: {
				stage: incentiveStage,
				role: incentiveRole,
				incentiveRegulationValue: incentiveRegulationValue
			}
		});
	}

	async deleteRoleValue(incentiveRegulationValue: MbsIncentiveRegulationValueDto) {
		if(incentiveRegulationValue.id === undefined) return;
		await lastValueFrom(this.incentiveRegulationValueResourceService.deleteIncentiveRegulationValueUsingDELETE(incentiveRegulationValue.id));
		this.eacs.eventer.launchReloadContent("incentiveRegulationValue");
	}
}