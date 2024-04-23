import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { lastValueFrom } from 'rxjs';
import { StalEvent } from "@stal/eventer";
import { EngeAppCommonService, EngeAppGenericPageComponent } from '@enge/common-app';
import { MbsIncentiveRegulationDto, MbsIncentiveRoleDto, MbsIncentiveRoleResourceService, MbsIncentiveRegulationValueDto, MbsIncentiveStageDto, MbsIncentiveStageResourceService, MbsIncentiveRegulationValueResourceService, MbsProcurementTypeDto } from '@mbs-main';
import { EnzoIncentiveRegulationValueDialogComponent } from '../../incentive-regulation-value/incentive-regulation-value-dialog/incentive-regulation-value-dialog.component';
import { EnzoIncentiveRoleDialogComponent } from '../../incentive-role/incentive-role-dialog/incentive-role-dialog.component';
import { EnzoIncentiveStageDialogComponent } from '../../incentive-stage/incentive-stage-dialog/incentive-stage-dialog.component';

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








	createUpdateRoleValue(incentiveStage: MbsIncentiveStageDto, incentiveRole: MbsIncentiveRoleDto, incentiveRegulationValue?: MbsIncentiveRegulationValueDto) {
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
		if(!incentiveRegulationValue.id) return;
		await lastValueFrom(this.incentiveRegulationValueResourceService.deleteIncentiveRegulationValueUsingDELETE(incentiveRegulationValue.id));
		this.eacs.eventer.launchReloadContent("incentiveRegulationValue");
	}










	createUpdateIncentiveStage(incentiveRegulationDto: MbsIncentiveRegulationDto, procurementTypeDto: MbsProcurementTypeDto, incentiveStageDto?: MbsIncentiveStageDto) {
		this.dialogService.open(EnzoIncentiveStageDialogComponent, {
			header: 'Aggiorna fase',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto,
                procurementType: procurementTypeDto,
				incentiveStage: incentiveStageDto,
			}
		});
	}

	async deleteIncentiveStage(incentiveStageDto: MbsIncentiveStageDto) {
		if(!incentiveStageDto.id) return;
		await lastValueFrom(this.incentiveStageResourceService.deleteIncentiveStageUsingDELETE(incentiveStageDto.id));
		this.eacs.eventer.launchReloadContent("incentiveStage");
	}

	








	
	createUpdateNewIncentiveRole(incentiveRegulationDto: MbsIncentiveRegulationDto, procurementTypeDto: MbsProcurementTypeDto, incentiveRoleDto?: MbsIncentiveRoleDto) {
		this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
			header: 'Crea ruolo',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto,
                procurementType: procurementTypeDto,
				incentiveRole: incentiveRoleDto
			}
		});
	}

	async deleteIncentiveRole(incentiveRoleDto: MbsIncentiveRoleDto) {
		if(!incentiveRoleDto.id) return;
		await lastValueFrom(this.incentiveRoleResourceService.deleteIncentiveRoleUsingDELETE(incentiveRoleDto.id));
		this.eacs.eventer.launchReloadContent("incentiveRole");
	}

	


}