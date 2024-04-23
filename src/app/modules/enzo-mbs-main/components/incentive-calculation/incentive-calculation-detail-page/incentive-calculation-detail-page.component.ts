import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveAssignationDto, MbsIncentiveAssignationResourceService, MbsIncentiveBeneficiaryDto, MbsIncentiveBeneficiaryResourceService, MbsIncentiveCalculationDto, MbsIncentiveCalculationResourceService, MbsIncentiveCalculationValueDto, MbsIncentiveCalculationValueResourceService, MbsIncentiveRegulationValueDto, MbsIncentiveRegulationValueResourceService, MbsIncentiveRoleAssignationDto, MbsIncentiveRoleAssignationResourceService, MbsIncentiveRoleDto, MbsIncentiveStageDto, MbsIncentiveStageResourceService} from '@mbs-main';
import { EnzoIncentiveCalculationDialogComponent } from '../incentive-calculation-dialog/incentive-calculation-dialog.component';
import { EnzoIncentiveRoleAssignationDialogComponent } from "../../incentive-role-assignation/incentive-role-assignation-dialog/incentive-role-assignation-dialog.component";
import { EnzoIncentiveCalculationValueDialogComponent } from "../../incentive-calculation-value/incentive-calculation-value-dialog/incentive-calculation-value-dialog.component";
import { EnzoIncentiveAssignationDialogComponent } from "../../incentive-assignation/incentive-assignation-dialog/incentive-assignation-dialog.component";

@Component({
	selector: 'enzo-incentive-calculation-detail-page',
	templateUrl: './incentive-calculation-detail-page.component.html',
	styleUrls: ['./incentive-calculation-detail-page.component.scss']
})
export class EnzoIncentiveCalculationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveCalculationResourceService,
		private incentiveStageResourceService: MbsIncentiveStageResourceService,
		private incentiveRegulationValueResourceService: MbsIncentiveRegulationValueResourceService,
		private incentiveCalculationValueResourceService: MbsIncentiveCalculationValueResourceService,
		private incentiveRoleAssignationResourceService: MbsIncentiveRoleAssignationResourceService,
		private incentiveAssignationResourceService: MbsIncentiveAssignationResourceService,
	) { super(eacs, route); }

	incentiveCalculationDto: MbsIncentiveCalculationDto;

	override onLoad() {
		this.incentiveCalculationDto = this.route.snapshot.data['incentiveCalculation'];

		this.loadAssignationTable();
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveCalculation") this.reloadPage();
		if(event.data === "incentiveCalculationValue") this.reloadPage();
		if(event.data === "incentiveRoleAssignation") this.reloadPage();
		if(event.data === "incentiveAssignation") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveCalculationDto = await lastValueFrom(this.resourceService.getIncentiveCalculationUsingGET(this.id));

		this.loadAssignationTable();
	}

	editIncentiveCalculation(incentiveCalculation: MbsIncentiveCalculationDto) {
		const ref = this.dialogService.open(EnzoIncentiveCalculationDialogComponent, {
			data: { incentiveCalculation: incentiveCalculation },
			header: 'Update incentiveCalculation',
			width: '70%'
		});
	}

	async deleteIncentiveCalculation(incentiveCalculation: MbsIncentiveCalculationDto) {
		if(incentiveCalculation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveCalculationUsingDELETE(incentiveCalculation.id));
	}







	incentiveStages: MbsIncentiveStageDto[];
	incentiveRegulationValueByStage: any;
	incentiveCalculationValueByIncentiveRegulationValue: any;
	roleAssignationByRole: any;
	incentiveAssignationByRoleAssignation: any;

	async loadAssignationTable() {
		this.incentiveStages = await lastValueFrom(this.incentiveStageResourceService.getAllIncentiveStagesUsingGET({
			regulationIdEquals: this.incentiveCalculationDto.regulation.id,
			procurementTypeIdEquals: this.incentiveCalculationDto.governativeProcurementLot.procurementTypeId,
		}));

		this.incentiveRegulationValueByStage = {};
		{
			let incentiveRegulationValues: MbsIncentiveRegulationValueDto[] = await lastValueFrom(this.incentiveRegulationValueResourceService.getAllIncentiveRegulationValuesUsingGET({
				"stage.regulationIdEquals": this.incentiveCalculationDto.regulation.id,
				"stage.procurementTypeIdEquals": this.incentiveCalculationDto.governativeProcurementLot.procurementTypeId,
			}));

			for(let incentiveRegulationValue of incentiveRegulationValues) {
				if(!incentiveRegulationValue.stageId) continue
				
				if(!this.incentiveRegulationValueByStage[incentiveRegulationValue.stageId])
					this.incentiveRegulationValueByStage[incentiveRegulationValue.stageId] = [];

				this.incentiveRegulationValueByStage[incentiveRegulationValue.stageId].push(incentiveRegulationValue);
			}
		}

		this.incentiveCalculationValueByIncentiveRegulationValue = {};
		{
			let incentiveCalculationValues: MbsIncentiveCalculationValueDto[] = await lastValueFrom(this.incentiveCalculationValueResourceService.getAllIncentiveCalculationValuesUsingGET({
				"calculationIdEquals": this.incentiveCalculationDto.id
			}));

			for(let incentiveCalculationValue of incentiveCalculationValues) {
				if(!incentiveCalculationValue.regulationValueId) continue
				
				if(!this.incentiveCalculationValueByIncentiveRegulationValue[incentiveCalculationValue.regulationValueId])
					this.incentiveCalculationValueByIncentiveRegulationValue[incentiveCalculationValue.regulationValueId] = [];

				this.incentiveCalculationValueByIncentiveRegulationValue[incentiveCalculationValue.regulationValueId].push(incentiveCalculationValue);
			}
		}

		this.roleAssignationByRole = {}
		{
			let roleAssignations: MbsIncentiveRoleAssignationDto[] = await lastValueFrom(this.incentiveRoleAssignationResourceService.getAllIncentiveRoleAssignationsUsingGET({
				"calculationIdEquals": this.incentiveCalculationDto.id
			}));

			for(let roleAssignation of roleAssignations) {
				if(!roleAssignation.roleId) continue
				
				if(!this.roleAssignationByRole[roleAssignation.roleId])
					this.roleAssignationByRole[roleAssignation.roleId] = [];

				this.roleAssignationByRole[roleAssignation.roleId].push(roleAssignation);
			}
		}

		this.incentiveAssignationByRoleAssignation = {};
		{
			let incentiveAssignations: MbsIncentiveAssignationDto[] = await lastValueFrom(this.incentiveAssignationResourceService.getAllIncentiveAssignationsUsingGET({
				"assignation.calculationIdEquals": this.incentiveCalculationDto.id
			}))

			for(let incentiveAssignation of incentiveAssignations) {
				if(!incentiveAssignation.assignationId) continue
				
				if(!this.incentiveAssignationByRoleAssignation[incentiveAssignation.assignationId])
					this.incentiveAssignationByRoleAssignation[incentiveAssignation.assignationId] = [];

				this.incentiveAssignationByRoleAssignation[incentiveAssignation.assignationId].push(incentiveAssignation);
			}
		}
		



	}







	createUpdateIncentiveCalculationValue(incentiveCalculationDto: MbsIncentiveCalculationDto, regulationValueDto: MbsIncentiveRegulationValueDto, incentiveCalculationValueDto?: MbsIncentiveCalculationValueDto) {
		let title = 'Aggiungi valore incentivo';
		if(incentiveCalculationValueDto) 
			title = 'Modifica valore incentivo';

		this.dialogService.open(EnzoIncentiveCalculationValueDialogComponent, {
			header: title,
			width: '70%',
			data: {
				incentiveCalculationValue: incentiveCalculationValueDto,
				calculation: incentiveCalculationDto,
				regulationValue: regulationValueDto,
			}
		});
	}

	createUpdateIncentiveRoleAssignation(incentiveCalculationDto: MbsIncentiveCalculationDto, incentiveRoleDto: MbsIncentiveRoleDto, incentiveRoleAssignationDto?: MbsIncentiveRoleAssignationDto) {
		this.dialogService.open(EnzoIncentiveRoleAssignationDialogComponent, {
			header: 'Assegna ruolo',
			width: '70%',
			data: {
				incentiveRoleAssignation: incentiveRoleAssignationDto,
				calculation: incentiveCalculationDto,
				role: incentiveRoleDto,
				incentiveRegulation: this.incentiveCalculationDto.regulation,
				procurementTypeId: this.incentiveCalculationDto.governativeProcurementLot.procurementTypeId,
			}
		});
	}

	createUpdateIncentiveAssignation(incentiveRoleAssignationDto: MbsIncentiveRoleAssignationDto, incentiveCalculationValueDto: MbsIncentiveCalculationValueDto, incentiveAssignation?: MbsIncentiveAssignationDto) {
		this.dialogService.open(EnzoIncentiveAssignationDialogComponent, {
			header: 'Assegna incentivo',
			width: '70%',
			data: {
				incentiveAssignation: incentiveAssignation,
				assignation: incentiveRoleAssignationDto,
				calculationValue: incentiveCalculationValueDto,
			}
		});
	}



	async deleteIncentiveCalculationValue(incentiveCalculationValueDto: MbsIncentiveCalculationValueDto) {
		if(!incentiveCalculationValueDto.id) return;
		await lastValueFrom(this.incentiveCalculationValueResourceService.deleteIncentiveCalculationValueUsingDELETE(incentiveCalculationValueDto.id));
		this.eacs.eventer.launchReloadContent("incentiveCalculationValue");
	}


	async deleteIncentiveRoleAssignation(incentiveRoleAssignationDto: MbsIncentiveRoleAssignationDto) {
		if(!incentiveRoleAssignationDto.id) return;
		await lastValueFrom(this.incentiveRoleAssignationResourceService.deleteIncentiveRoleAssignationUsingDELETE(incentiveRoleAssignationDto.id));
		this.eacs.eventer.launchReloadContent("incentiveRoleAssignation");
	}

	async deleteIncentiveAssignation(incentiveAssignationDto: MbsIncentiveAssignationDto) {
		if(!incentiveAssignationDto.id) return;
		await lastValueFrom(this.incentiveAssignationResourceService.deleteIncentiveAssignationUsingDELETE(incentiveAssignationDto.id));
		this.eacs.eventer.launchReloadContent("incentiveAssignation");
	}


}



