import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { DialogService } from 'primeng/dynamicdialog';

import { StalEvent } from "@stal/eventer";
import { StalPaginator } from '@stal/paginator';
//import { TabManagerService } from '@stal/carder';

import { EngeAppCommonService, EngeAppGenericDetailPageComponent } from "@enge/common-app";

import { MbsIncentiveRegulationDto, MbsIncentiveRegulationResourceService} from '@mbs-incentive';
import { EnzoIncentiveRegulationDialogComponent } from '../incentive-regulation-dialog/incentive-regulation-dialog.component';
import { EnzoCalculationMethodDialogComponent } from "../../calculation-method/calculation-method-dialog/calculation-method-dialog.component";
import { EnzoWithheldDialogComponent } from "../../withheld/withheld-dialog/withheld-dialog.component";
import { EnzoStageDialogComponent } from "../../stage/stage-dialog/stage-dialog.component";
import { EnzoRoleDialogComponent } from "../../role/role-dialog/role-dialog.component";

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

	createNewCalculationMethod(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoCalculationMethodDialogComponent, {
			header: 'Create CalculationMethod',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected calculationMethodTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../calculation-method/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected calculationMethodListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected calculationMethodCount: number;

	createNewWithheld(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoWithheldDialogComponent, {
			header: 'Create Withheld',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected withheldTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../withheld/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected withheldListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected withheldCount: number;

	createNewStage(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoStageDialogComponent, {
			header: 'Create Stage',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected stageTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../stage/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected stageListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected stageCount: number;

	createNewRole(incentiveRegulationDto: MbsIncentiveRegulationDto) {
		this.dialogService.open(EnzoRoleDialogComponent, {
			header: 'Create Role',
			width: '70%',
			data: {
				regulation: incentiveRegulationDto
			}
		});
	}

	protected roleTableButtons: any[] = [
		{
			label: "Dettagli",
			hideLabel: true,
			icon: "pi pi-search",
			severity: "secondary",
			class: "p-button-sm p-button-outlined",
			link: "../../../role/detail",
			//command: (e: any) => this.tabManagerService.openInCard(),
		}
	];
	protected roleListPaginator: StalPaginator = {
		page: 0,
		size: 10
	};
	protected roleCount: number;

}



