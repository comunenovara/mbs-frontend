import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService} from '@mbs-main';
import { EnzoIncentiveRegulationDialogComponent } from '../incentive-regulation-dialog/incentive-regulation-dialog.component';
import { EnzoIncentiveWithheldDialogComponent } from "../../incentive-withheld/incentive-withheld-dialog/incentive-withheld-dialog.component";
import { EnzoIncentiveCalculationMethodDialogComponent } from "../../incentive-calculation-method/incentive-calculation-method-dialog/incentive-calculation-method-dialog.component";
import { EnzoIncentiveStageDialogComponent } from "../../incentive-stage/incentive-stage-dialog/incentive-stage-dialog.component";
import { EnzoIncentiveRoleDialogComponent } from "../../incentive-role/incentive-role-dialog/incentive-role-dialog.component";
import { EnzoIncentiveCalculationDialogComponent } from "../../incentive-calculation/incentive-calculation-dialog/incentive-calculation-dialog.component";

@Component({
	selector: 'enzo-incentive-regulation-detail-page',
	templateUrl: './incentive-regulation-detail-page.component.html',
	styleUrls: ['./incentive-regulation-detail-page.component.scss']
})
export class EnzoIncentiveRegulationDetailPageComponent extends EngeAppGenericDetailPageComponent {
	constructor(
		eacs: EngeAppCommonService,
		route: ActivatedRoute,
		//public tabManagerService: TabManagerService,
		private dialogService: DialogService,
		private resourceService: MbsIncentiveRegulationResourceService,
	) { super(eacs, route); }

	incentiveRegulationDto: MbsIncentiveRegulationDto;

	override onLoad() {
		this.incentiveRegulationDto = this.route.snapshot.data['incentiveRegulation'];
	}

	protected override reloadFromEvent(event: StalEvent) {
		if(event.data === "incentiveRegulation") this.reloadPage();
	}

	override async reloadPage() {
		this.incentiveRegulationDto = await lastValueFrom(this.resourceService.getIncentiveRegulationUsingGET(this.id));
	}

	editIncentiveRegulation(incentiveRegulation: MbsIncentiveRegulationDto) {
		const ref = this.dialogService.open(EnzoIncentiveRegulationDialogComponent, {
			data: { incentiveRegulation: incentiveRegulation },
			header: 'Update incentiveRegulation',
			width: '70%'
		});
	}

	async deleteIncentiveRegulation(incentiveRegulation: MbsIncentiveRegulationDto) {
		if(incentiveRegulation.id === undefined) return;
		await lastValueFrom(this.resourceService.deleteIncentiveRegulationUsingDELETE(incentiveRegulation.id));
	}

	createNewIncentiveWithheld(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveWithheldDialogComponent, {
			header: 'Create IncentiveWithheld',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected incentiveWithheldTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-withheld/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveWithheldListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveWithheldCount: number;

	createNewIncentiveCalculationMethod(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveCalculationMethodDialogComponent, {
			header: 'Create IncentiveCalculationMethod',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected incentiveCalculationMethodTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-calculation-method/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationMethodCount: number;

	createNewIncentiveStage(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveStageDialogComponent, {
			header: 'Create IncentiveStage',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected incentiveStageTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-stage/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveStageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveStageCount: number;

	createNewIncentiveRole(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveRoleDialogComponent, {
			header: 'Create IncentiveRole',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected incentiveRoleTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-role/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveRoleListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveRoleCount: number;

	createNewIncentiveCalculation(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoIncentiveCalculationDialogComponent, {
			header: 'Create IncentiveCalculation',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected incentiveCalculationTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../incentive-calculation/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected incentiveCalculationListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected incentiveCalculationCount: number;

}



